import { model, models, Schema, Types } from "mongoose";

// Define the TypeScript interface for the Account model
export interface IAccount {
  userId: Types.ObjectId; // Reference to the User model
  name: string; // Account name
  image?: string; // Optional image URL
  password?: string; // Optional account password
  provider: string; // Authentication provider (e.g., Google, Facebook)
  providerAccountId: string; // Unique ID for the account from the provider
}

// Create the Mongoose schema for the Account model
const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Account model or reuse the existing one (to avoid re-compilation in Next.js environments)
const Account = models?.Account || model<IAccount>("Account", AccountSchema);

// Export the Account model for use in other parts of the application
export default Account;



