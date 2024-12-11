import { z } from "zod";

// Reusable validation schemas
const EmailSchema = z
  .string()
  .min(1, { message: "Email is required." })
  .email({ message: "Please provide a valid email address." });

const PasswordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters long." })
  .max(100, { message: "Password cannot exceed 100 characters." })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." });

const UsernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long." })
  .max(30, { message: "Username cannot exceed 30 characters." })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores.",
  })
  .regex(/^(?!.*__)[a-zA-Z0-9_]+$/, {
    message: "Username cannot contain consecutive underscores.",
  })
  .regex(/^[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$/, {
    message: "Username cannot start or end with an underscore.",
  });

// Authentication schemas
export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignUpSchema = z.object({
  username: UsernameSchema,
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name can only contain letters and spaces." }),
  email: EmailSchema,
  password: PasswordSchema,
});

// Question posting schema
export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title cannot exceed 100 characters." }),
  content: z.string().min(1, { message: "Body is required." }),
  tags: z
    .array(
      z
        .string()
        .min(1, { message: "Tag is required." })
        .max(30, { message: "Tag cannot exceed 30 characters." })
    )
    .min(1, { message: "At least one tag is required." })
    .max(3, { message: "Cannot add more than 3 tags." }),
});

// User profile schema
export const UserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  username: UsernameSchema,
  email: EmailSchema,
  bio: z.string().optional(),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  location: z.string().optional(),
  portfolio: z.string().url({ message: "Please provide a valid URL." }).optional(),
  reputation: z.number().optional(),
});

// Account schema for database
export const AccountSchema = z.object({
  userId: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, { message: "Invalid User ID format." }), // MongoDB ObjectId
  name: z.string().min(1, { message: "Name is required." }),
  image: z.string().url({ message: "Please provide a valid URL." }).optional(),
  password: PasswordSchema.optional(),
  provider: z.string().min(1, { message: "Provider is required." }),
  providerAccountId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, { message: "Invalid Provider Account ID format." }),
});

// OAuth schema for sign-in
export const SignInWithOAuthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required." }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required." }),
    username: UsernameSchema,
    email: EmailSchema,
    image: z.string().url({ message: "Invalid image URL." }).optional(),
  }),
});
