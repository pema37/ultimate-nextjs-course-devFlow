import { model, models, Schema, Types, Document } from "mongoose";

// Define the TypeScript interface for the Question fields
export interface IQuestion {
  title: string; // Question title
  content: string; // Question content
  tags: Types.ObjectId[]; // Array of Tag references
  views: number; // View count
  upvotes: number; // Upvote count
  downvotes: number; // Downvote count
  answers: number; // Answer count
  author: Types.ObjectId; // Reference to the User model
}

// Extend IQuestion with Mongoose Document for type-safe models
export interface IQuestionDoc extends IQuestion, Document {}

// Create the Mongoose schema for the Question model
const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    views: { type: Number, default: 0 },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or reuse the Question model
const Question = models?.Question || model<IQuestion>("Question", QuestionSchema);

// Export the Question model
export default Question;


