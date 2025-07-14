import { connectToDatabase } from "@/app/lib/mongodb";
import { Blog } from "@/app/models/Blog";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const SUPABASE_URL = process.env.SUPABASE_URL || "";
if (!SUPABASE_SERVICE_ROLE_KEY || !SUPABASE_URL) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY and SUPABASE_URL must be defined in the environment variables."
  );
}

const SUPABASE_HEADERS = {
  apikey: SUPABASE_SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    const { url, title, content, summary, translated_summary } =
      await request.json();

    if (!url || !title || !content || !summary || !translated_summary) {
      console.log("*********here");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const conn = await connectToDatabase();
    const new_blog = await Blog.create({
      url,
      title,
      content,
    });
    if (!new_blog) {
      return NextResponse.json(
        { error: "Failed to save the blog post" },
        { status: 500 }
      );
    }
    const shared_id = new_blog._id.toString();
    console.log("Shared ID:", shared_id);
    const response = await fetch(`${SUPABASE_URL}/rest/v1/summaries`, {
      headers: SUPABASE_HEADERS,
      method: "POST",
      body: JSON.stringify({
        url,
        title,
        summary,
        translation: translated_summary,
        shared_id,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      console.log("*********here********");
      console.error("Supabase error response:", errorDetails);
      return NextResponse.json(
        { error: "Failed to save the summary" },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Blog post and summary saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in saving blog post:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
