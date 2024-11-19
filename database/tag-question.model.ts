import { Schema, models, model, Types, Document } from "mongoose";

// Define the TypeScript interface for the TagQuestion fields
export interface ITagQuestion {
  tag: Types.ObjectId; // Reference to the Tag model
  question: Types.ObjectId; // Reference to the Question model
}

// Extend ITagQuestion with Mongoose Document for type-safe models
export interface ITagQuestionDoc extends ITagQuestion, Document {}

// Create the Mongoose schema for the TagQuestion model
const TagQuestionSchema = new Schema<ITagQuestion>(
  {
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or reuse the TagQuestion model
const TagQuestion =
  models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

// Export the TagQuestion model
export default TagQuestion;
