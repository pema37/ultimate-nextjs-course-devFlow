import { Schema, models, model, Types, Document } from "mongoose";

// Define the TypeScript interface for the Vote fields
export interface IVote {
  author: Types.ObjectId; // Reference to the User model
  actionId: Types.ObjectId; // ID of the action being voted on (Question/Answer)
  actionType: "question" | "answer"; // Type of action (question or answer)
  voteType: "upvote" | "downvote"; // Type of vote (upvote or downvote)
}

// Extend IVote with Mongoose Document for type-safe models
export interface IVoteDoc extends IVote, Document {}

// Create the Mongoose schema for the Vote model
const VoteSchema = new Schema<IVote>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actionId: { type: Schema.Types.ObjectId, required: true },
    actionType: { type: String, enum: ["question", "answer"], required: true },
    voteType: { type: String, enum: ["upvote", "downvote"], required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create or reuse the Vote model
const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

// Export the Vote model
export default Vote;


