import { NextResponse } from "next/server";

import { APIErrorResponse } from "@/app/types/global";
import User from "@/database/user.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { z } from "zod";


// Define a simple schema for email validation
const EmailSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address." }),
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email } = await request.json();
    if (!email) throw new ValidationError({ email: ["Email is required."] });

    // Validate the email field
    const validatedData = EmailSchema.safeParse({ email });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User");

    // Return success response with user data
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors using a centralized error handler
    return handleError(error, "api") as APIErrorResponse;
  }
}

