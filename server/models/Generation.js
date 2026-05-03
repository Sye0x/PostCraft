import mongoose from "mongoose";

const generationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    result: {
      type: String,
      required: true,
    },

    provider: {
      type: String,
      default: "gemini",
    },
  },
  {
    timestamps: true,
  },
);

const Generation = mongoose.model("Generation", generationSchema);

export default Generation;
