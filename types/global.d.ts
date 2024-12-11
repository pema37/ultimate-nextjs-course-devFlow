import { NextResponse } from "next/server";

// Interface representing a Tag
interface Tag {
  _id: string; // Unique identifier for the tag
  name: string; // Name of the tag
}

// Interface representing an Author
interface Author {
  _id: string; // Unique identifier for the author
  name: string; // Name of the author
  image: string; // URL to the author's profile image
}

// Interface representing a Question
interface Question {
  _id: string; // Unique identifier for the question
  title: string; // Title of the question
  tags: Tag[]; // List of associated tags
  author: Author; // Author of the question
  createdAt: Date; // Timestamp of when the question was created
  upvotes: number; // Number of upvotes for the question
  answers: number; // Number of answers the question has received
  views: number; // Number of views the question has received
}

// Generic structure for an API response
type ActionResponse<T = null> = {
  success: boolean; // Indicates whether the action was successful
  data?: T; // Optional payload for successful responses
  error?: {
    message: string; // A descriptive error message
    details?: Record<string, string[]>; // Optional detailed field-level errors
  };
  status?: number; // Optional HTTP status code
};

// Specialized type for a successful response
type SuccessResponse<T = null> = ActionResponse<T> & { success: true };

// Specialized type for an error response
type ErrorResponse = ActionResponse<undefined> & { success: false };

// Wrapper type for error responses using Next.js's NextResponse
type APIErrorResponse = NextResponse<ErrorResponse>;

// Wrapper type for general API responses, supporting both success and error cases
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

