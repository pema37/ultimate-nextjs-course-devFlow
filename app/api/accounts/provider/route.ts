import { NextResponse } from "next/server";
import { APIErrorResponse } from "@/app/types/global";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";
import Account from "@/database/account.model";
import dbConnect from "@/lib/mongoose";

// POST /api/accounts
// Retrieve an account by providerAccountId
export async function POST(request: Request) {
  // Parse the request body
  const { providerAccountId } = await request.json();
  
  try {

    await dbConnect();
    
    // Validate the providerAccountId field
    const validatedData = AccountSchema.safeParse({ providerAccountId });
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    // Find the account by providerAccountId
    const account = await Account.findOne({ providerAccountId });
    if (!account) {
      throw new NotFoundError(`Account with providerAccountId "${providerAccountId}" not found`);
    }

    // Return success response with account data
    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors using a centralized error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}
