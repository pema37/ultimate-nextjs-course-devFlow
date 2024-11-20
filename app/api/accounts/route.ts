import { NextResponse } from "next/server";
import Account from "@/database/account.model"; // Account model for database operations
import handleError from "@/lib/handlers/error"; // Centralized error handler
import { ForbiddenError, ValidationError } from "@/lib/http-errors"; // Custom ForbiddenError for access issues
import dbConnect from "@/lib/mongoose"; // Function to establish database connection
import { AccountSchema } from "@/lib/validations"; // Validation schema for accounts
import { APIErrorResponse } from "@/app/types/global";

// GET /api/accounts
// Retrieve all accounts
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all accounts
    const accounts = await Account.find();

    // Return a successful response with account data
    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors using the centralized error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}

// POST /api/accounts
// Create a new account
export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse and validate the request body
    const body = await request.json();
    const validatedData = AccountSchema.parse(body);

    // Check if an account with the same provider and providerAccountId already exists
    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });

    if (existingAccount) {
      throw new ForbiddenError(
        "An account with the same provider already exists"
      );
    }

    // Create a new account in the database
    const newAccount = await Account.create(validatedData);

    // Return a successful response with the created account data
    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    // Handle any errors using the centralized error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}

