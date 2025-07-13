import { NextRequest, NextResponse } from "next/server";
import { extract } from "@extractus/article-extractor";
import * as cheerio from "cheerio";
export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const article = await extract(url);

    if (!article || !article.content) {
      return NextResponse.json(
        { error: "Failed to extract data from the URL" },
        { status: 500 }
      );
    }
    const $ = cheerio.load(article.content);

    const cleanText = $("p,h1,h2,h3")
      .map((_, el) => $(el).text().trim())
      .get()
      .join("\n\n");
    return NextResponse.json(
      {
        title: article.title,
        content: article.content,
        clean_text: cleanText,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
