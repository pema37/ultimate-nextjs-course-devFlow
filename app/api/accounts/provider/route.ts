import { NextResponse } from "next/server";
import { APIErrorResponse } from "@/types/global";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { z } from "zod"; // Import zod for custom validation
import Account from "@/database/account.model";
import dbConnect from "@/lib/mongoose";

// Define a schema specifically for providerAccountId validation
const ProviderAccountIdSchema = z.object({
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." })
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid Provider Account ID format." }),
});

// POST /api/accounts/provider
export async function POST(request: Request) {
  try {
    // Parse the request body
    const { providerAccountId } = await request.json();

    // Validate the providerAccountId field
    const validatedData = ProviderAccountIdSchema.safeParse({ providerAccountId });
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    // Connect to the database
    await dbConnect();

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
