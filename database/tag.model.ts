import { Schema, models, model, Document } from "mongoose";

// Define the TypeScript interface for the Tag fields
export interface ITag {
  name: string; // The name of the tag (unique)
  questions: number; // Number of questions associated with the tag
}

// Extend ITag with Mongoose Document for type-safe models
export interface ITagDoc extends ITag, Document {}

// Create the Mongoose schema for the Tag model
const TagSchema = new Schema<ITag>(
  {
    name: { type: String, required: true, unique: true },
    questions: { type: Number, default: 0 },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or reuse the Tag model
const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

// Export the Tag model for use in other parts of the application
export default Tag;

