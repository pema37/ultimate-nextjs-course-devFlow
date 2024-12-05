import User from "@/database/user.model"; // Mongoose User model
import handleError from "@/lib/handlers/error"; // Custom error handler
import { NotFoundError, ValidationError } from "@/lib/http-errors"; // Custom NotFoundError for 404 handling
import dbConnect from "@/lib/mongoose"; // Establish a database connection
import { APIErrorResponse } from "@/app/types/global"; // API error response type
import { NextResponse } from "next/server"; // Next.js response utilities
import { UserSchema } from "@/lib/validations"; // Zod schema for user validation


// GET /api/users/[id]
// Fetch a user by their unique ID
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract the user ID from the request parameters
    const { id } = await params;
    if (!id) throw new NotFoundError("User"); // Throw 404 error if ID is missing

    // Connect to the database
    await dbConnect();

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User"); // Throw 404 error if user is not found

    // Return the user data in the response
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    // Handle errors and return a structured error response
    return handleError(error, "api") as APIErrorResponse;
  }
}


// DELETE /api/users/[id]
// Delete a user by their unique ID
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract the user ID from the request parameters
    const { id } = await params;
    if (!id) throw new NotFoundError("User"); // Throw 404 error if ID is missing

    // Connect to the database
    await dbConnect();

    // Find and delete the user by ID
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User"); // Throw 404 error if user is not found

    // Return the deleted user data in the response
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    // Handle errors and return a structured error response
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT /api/users/[id]
// Update a user by their unique ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract the user ID from the request parameters
    const { id } = await params;
    if (!id) throw new NotFoundError("User"); // Throw 404 error if ID is missing

    // Connect to the database
    await dbConnect();

    // Parse and validate the request body using Zod schema
    const body = await request.json();
    const validatedData = UserSchema.partial().parse(body); // Allow partial updates

    // Find and update the user by ID
    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true, // Return the updated document
    });

    if (!updatedUser) throw new NotFoundError("User"); // Throw 404 error if user is not found

    // Return the updated user data in the response
    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
  } catch (error) {
    // Handle errors and return a structured error response
    return handleError(error, "api") as APIErrorResponse;
  }
}


