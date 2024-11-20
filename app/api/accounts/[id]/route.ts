import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/app/types/global";

// GET /api/accounts/[id]
// Fetch an account by its unique ID
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract the account ID
    const { id } = await params;
    if (!id) throw new NotFoundError("Account ID is required");

    // Connect to the database
    await dbConnect();

    // Find the account by ID and exclude sensitive fields like password
    const account = await Account.findById(id).select("-password");
    if (!account) throw new NotFoundError(`Account with ID ${id} not found`);

    // Return the account data
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    // Handle errors using a centralized error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}

// DELETE /api/accounts/[id]
// Delete an account by its unique ID
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Extract the account ID
    const { id } = await params;
    if (!id) throw new NotFoundError("Account ID is required");

    // Connect to the database
    await dbConnect();

    // Find and delete the account by ID
    const account = await Account.findByIdAndDelete(id);
    if (!account) throw new NotFoundError(`Account with ID ${id} not found`);

    // Return the deleted account data
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    // Handle errors using a centralized error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}

// PUT /api/accounts/[id]
// Update an account by its unique ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the account ID
  const { id } = await params;
  if (!id) throw new NotFoundError("Account");

  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const body = await request.json();

    // Validate the request body using Zod
    const validatedData = AccountSchema.partial().safeParse(body); // `parse()` directly throws an error on validation failure

    // Find and update the account by ID
    const updatedAccount = await Account.findByIdAndUpdate(id, validatedData, {
      new: true, // Return the updated document
    });

    if (!updatedAccount) throw new NotFoundError("Account");

    // Return the updated account data
    return NextResponse.json({ success: true, data: updatedAccount }, { status: 200 });
  } catch (error) {
    // Handle errors using a centralized error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}

