import { z } from "zod";

// Schema for sign-in validation
export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" }) // Email cannot be empty
    .email({ message: "Please provide a valid email address." }), // Must be a valid email

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }) // Minimum password length
    .max(100, { message: "Password cannot exceed 100 characters." }), // Maximum password length
});

// Schema for sign-up validation
export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }) // Minimum username length
    .max(30, { message: "Username cannot exceed 30 characters." }) // Maximum username length
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores.", // Username format restrictions
    }),

  name: z
    .string()
    .min(1, { message: "Name is required." }) // Name is required
    .max(50, { message: "Name cannot exceed 50 characters." }) // Maximum name length
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces.", // Name format restrictions
    }),

  email: z
    .string()
    .min(1, { message: "Email is required." }) // Email cannot be empty
    .email({ message: "Please provide a valid email address." }), // Must be a valid email

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }) // Minimum password length
    .max(100, { message: "Password cannot exceed 100 characters." }) // Maximum password length
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." }) // At least one uppercase letter
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." }) // At least one lowercase letter
    .regex(/[0-9]/, { message: "Password must contain at least one number." }) // At least one number
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.", // At least one special character
    }),
});

// Schema for asking a question
export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title is required and must be at least 5 characters long." }) // Minimum title length
    .max(100, { message: "Title cannot exceed 100 characters." }), // Maximum title length

  content: z
    .string()
    .min(1, { message: "Body is required." }), // Content/body cannot be empty

  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag is required." }) // Individual tags must have at least 1 character
        .max(30, { message: "Tag cannot exceed 30 characters." }) // Maximum tag length
    )
    .min(1, { message: "At least one tag is required." }) // At least one tag must be provided
    .max(3, { message: "Cannot add more than 3 tags." }), // Maximum number of tags
});

// Schema for user data
export const UserSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." }), // Name is required

  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." }), // Minimum username length

  email: z
    .string()
    .email({ message: "Please provide a valid email address." }), // Must be a valid email

  bio: z
    .string()
    .optional(), // Bio is optional

  image: z
    .string()
    .url({ message: "Please provide a valid URL." })
    .optional(), // Image URL is optional

  location: z
    .string()
    .optional(), // Location is optional

  portfolio: z
    .string()
    .url({ message: "Please provide a valid URL." })
    .optional(), // Portfolio URL is optional

  reputation: z
    .number()
    .optional(), // Reputation is optional
});
