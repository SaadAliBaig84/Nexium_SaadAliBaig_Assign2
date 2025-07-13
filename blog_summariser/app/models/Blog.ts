import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    url: String,
    title: String,
    content: String,
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Blog-Summarizer" }
);

export const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
