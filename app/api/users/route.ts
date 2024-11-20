import { NextResponse } from "next/server";

import User from "@/database/user.model"; // User model for database interactions
import handleError from "@/lib/handlers/error"; // Custom error handler
import { ValidationError } from "@/lib/http-errors"; // Error type for validation issues
import dbConnect from "@/lib/mongoose"; // Function to establish a database connection
import { UserSchema } from "@/lib/validations"; // Validation schema for user data
import { APIErrorResponse } from "@/app/types/global"; // Type for API error responses

// Fetch all users
export async function GET() {
  try {
    // Ensure the database connection is established
    await dbConnect();

    // Retrieve all users from the database
    const users = await User.find();

    // Return a success response with the retrieved users
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the operation
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Create a new user
export async function POST(request: Request) {
  try {
    // Ensure the database connection is established
    await dbConnect();

    // Parse the request body to extract user data
    const body = await request.json();

    // Validate the request body against the UserSchema
    const validatedData = UserSchema.safeParse(body);

    // If validation fails, throw a ValidationError with specific field errors
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, username } = validatedData.data;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    // Check if a user with the same username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw new Error("Username already exists");

    // Create a new user in the database using the validated data
    const newUser = await User.create(validatedData.data);

    // Return a success response with the newly created user
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    // Handle any errors that occur during the operation
    return handleError(error, "api") as APIErrorResponse;
  }
}
