import { Schema, models, model, Types, Document } from "mongoose";

// Define the TypeScript interface for the Answer fields
export interface IAnswer {
  author: Types.ObjectId; // Reference to the User model
  question: Types.ObjectId; // Reference to the Question model
  content: string; // Answer content
  upvotes: number; // Upvote count
  downvotes: number; // Downvote count
}

// Extend IAnswer with Mongoose Document for type-safe models
export interface IAnswerDoc extends IAnswer, Document {}

// Create the Mongoose schema for the Answer model
const AnswerSchema = new Schema<IAnswer>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or reuse the Answer model
const Answer = models?.Answer || model<IAnswer>("Answer", AnswerSchema);

// Export the Answer model
export default Answer;
