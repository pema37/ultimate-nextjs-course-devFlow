import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";

export type ResponseType = "api" | "server";

/**
 * Formats the response based on the response type.
 */
const formatResponse = (
  responseType: ResponseType,
  status: number,
  message: string,
  errors?: Record<string, string[]>
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: errors,
    },
  };

  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { status, ...responseContent };
};

/**
 * Handles errors and formats them into a consistent response structure.
 */
const handleError = (error: unknown, responseType: ResponseType = "server") => {
  // Check if the error is a known RequestError
  if (error instanceof RequestError) {
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.errors
    );
  }

  // Check if the error is a Zod validation error
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );

    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.errors
    );
  }

  // Check if the error is a generic Error
  if (error instanceof Error) {
    return formatResponse(responseType, 500, error.message);
  }

  // Handle unexpected errors
  return formatResponse(responseType, 500, "An unexpected error occurred");
};

export default handleError;

