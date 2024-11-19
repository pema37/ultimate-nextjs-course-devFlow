import { Schema, models, model, Types, Document } from "mongoose";

// Define the TypeScript interface for the Interaction fields
export interface IInteraction {
  user: Types.ObjectId; // Reference to the User model
  action: string; // Type of interaction (e.g., "upvote", "downvote", etc.)
  actionId: Types.ObjectId; // Reference to the related Question or Answer
  actionType: "question" | "answer"; // Specifies the type of the action
}

// Extend IInteraction with Mongoose Document for type-safe models
export interface IInteractionDoc extends IInteraction, Document {}

// Create the Mongoose schema for the Interaction model
const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, enum: ["question", "answer"], required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or reuse the Interaction model
const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

// Export the Interaction model
export default Interaction;



