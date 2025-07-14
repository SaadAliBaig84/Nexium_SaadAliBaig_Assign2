import { NextRequest, NextResponse } from "next/server";
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
type SupaSummary = {
  id: string;
  url: string;
  title: string;
  summary: string;
  translation: string;
  created_at: string;
};

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}, "_id url title content created_at").sort({
      created_at: -1,
    });
    if (!blogs || blogs.length === 0) {
      return NextResponse.json([], { status: 200 });
    }
    const summaries = await fetch(
      `${SUPABASE_URL}/rest/v1/summaries?select=url,title,summary,translation,created_at,shared_id&order=created_at.desc`,
      {
        method: "GET",
        headers: SUPABASE_HEADERS,
      }
    );

    if (!summaries.ok) {
      const errorText = await summaries.text();
      console.error("Supabase fetch failed:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch summaries from Supabase" },
        { status: summaries.status }
      );
    }

    const summariesData: SupaSummary[] = await summaries.json();

    const supaMap = new Map(
      summariesData.map((item: any) => [item.shared_id, item])
    );
    const combined = blogs.map((blog: any) => {
      const shared_id = blog._id.toString();
      const matchingSupa = supaMap.get(shared_id);
      return {
        _id: shared_id,
        title: blog.title,
        url: blog.url,
        content: blog.content,
        created_at: blog.created_at,
        summary: matchingSupa?.summary || "",
        translated_summary: matchingSupa?.translation || "",
      };
    });
    return NextResponse.json(combined, { status: 200 });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json(
      { error: "Failed to fetch summaries" },
      { status: 500 }
    );
  }
}
