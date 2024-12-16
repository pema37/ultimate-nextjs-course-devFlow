"use server";

import { Session } from "next-auth";
import { ZodError, ZodSchema } from "zod";

import { auth } from "@/auth";
import { UnauthorizedError, ValidationError } from "../http-errors";
import dbConnect from "../mongoose";

type ActionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

// Handles schema validation, authorization, and database connection.
async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>): Promise<{ params?: T; session?: Session | null }> {
  // Step 1: Validate schema
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      }
      throw new Error("Schema validation failed: Unexpected error occurred.");
    }
  }

  // Step 2: Check authorization
  let session: Session | null = null;
  if (authorize) {
    session = await auth();
    if (!session) {
      throw new UnauthorizedError();
    }
  }

  // Step 3: Connect to the database
  await dbConnect();

  // Step 4: Return validated params and session
  return { params, session };
}

export default action;
