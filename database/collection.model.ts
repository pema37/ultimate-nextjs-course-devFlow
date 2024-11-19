import { Schema, models, model, Types, Document } from "mongoose";

// Define the TypeScript interface for the Collection fields
export interface ICollection {
  author: Types.ObjectId; // Reference to the User model
  question: Types.ObjectId; // Reference to the Question model
}

// Extend ICollection with Mongoose Document for type-safe models
export interface ICollectionDoc extends ICollection, Document {}

// Create the Mongoose schema for the Collection model
const CollectionSchema = new Schema<ICollection>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or reuse the Collection model
const Collection = models?.Collection || model<ICollection>("Collection", CollectionSchema);

// Export the Collection model
export default Collection;


