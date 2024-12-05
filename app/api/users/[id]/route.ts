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



// POST /api/users
// Create a new user in the database
export async function POST(request: Request) {
  try {
    // Establish a database connection
    await dbConnect();

    // Parse the JSON body from the incoming request
    const body = await request.json();

    // Validate the request body using the UserSchema
    const validatedData = UserSchema.safeParse(body);

    // If validation fails, throw a ValidationError with detailed field errors
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    // Destructure email and username from the validated data
    const { email, username } = validatedData.data;

    // Check if a user with the same email or username already exists in the database
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    // If a duplicate user is found, throw an error with a descriptive message
    if (existingUser) {
      throw new Error(
        existingUser.email === email
          ? "A user with this email already exists"
          : "The username is already taken"
      );
    }

    // Create a new user in the database with the validated data
    const newUser = await User.create(validatedData.data);

    // Return the newly created user in the response with a 201 status code
    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    // Handle errors using a centralized error handler
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


