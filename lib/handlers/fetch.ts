import logger from "../logger"; // Logger utility for logging events
import handleError from "./error"; // Centralized error handling utility
import { RequestError } from "../http-errors"; // Custom error class for HTTP errors
import { ActionResponse } from "@/app/types/global";

// Extend FetchOptions to include timeout support
interface FetchOptions extends RequestInit {
  timeout?: number; // Optional timeout in milliseconds
}

// Type guard to check if a value is an instance of the Error class
function isError(error: unknown): error is Error {
  return error instanceof Error;
}

// Main fetch handler function
export async function fetchHandler<T>(
  url: string, // The URL to make the request to
  options: FetchOptions = {} // Options for the fetch request
): Promise<ActionResponse<T>> {
  const {
    timeout = 5000, // Default timeout of 5000ms
    headers: customHeaders = {}, // Custom headers provided by the user
    ...restOptions // Remaining options passed to fetch
  } = options;

  // Create an AbortController for managing request timeouts
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout); // Abort the request if timeout is exceeded

  // Define default headers for JSON-based requests
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Merge default headers with custom headers
  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };

  // Final fetch configuration
  const config: RequestInit = {
    ...restOptions, // Include additional options like method, body, etc.
    headers, // Use merged headers
    signal: controller.signal, // Attach the abort signal
  };

  try {
    // Perform the fetch request
    const response = await fetch(url, config);

    // Clear the timeout on success or error
    clearTimeout(id);

    // Throw an error if the response status is not OK (2xx)
    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }

    // Parse and return the JSON response
    return await response.json();
  } catch (err) {
    // Handle errors
    const error = isError(err) ? err : new Error("Unknown error"); // Fallback to generic error

    // Log timeout warnings separately
    if (error.name === "AbortError") {
      logger.warn(`Request to ${url} timed out`);
    } else {
      // Log other errors with the URL context
      logger.error(`Error fetching ${url}: ${error.message}`);
    }

    // Return a handled error response
    return handleError(error) as ActionResponse<T>;
  }
}
