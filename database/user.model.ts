import { model, models, Schema } from "mongoose";

// Define the TypeScript interface for the User model
export interface IUser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  image: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
}

// Create the Mongoose schema for the User model
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String, required: true },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the User model or reuse the existing one (to avoid re-compilation in Next.js environments)
const User = models?.User || model<IUser>("User", UserSchema);

// Export the User model for use in other parts of the application
export default User;


