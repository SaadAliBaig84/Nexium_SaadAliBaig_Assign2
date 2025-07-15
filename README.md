#  Blog Summarizer App

Welcome to the **Blog Summarizer App**, a full-stack web application that fetches a blog post from a URL, summarizes its content using AI, translates the summary into Urdu, and stores both the original and summarized content.

##  Features

-  **URL-based Blog Scraping** – Paste a blog URL, and we’ll extract the content.
-  **AI Summarization** – Automatically summarizes long blog content.
-  **Urdu Translation** – Translates the summary using a dictionary-based approach.
-  **Storage** – Stores original content in MongoDB and summaries in Supabase.
-  **History View** – View all previously summarized blogs with timestamp.
-  **Detail View** – Click on a previous summary to view full details on a separate page.
-  **Responsive & Animated UI** – Built with Next.js, TailwindCSS, ShadCN, and Framer Motion.

---

## Tech Stack

| Layer       | Technology                        |
|-------------|------------------------------------|
| Frontend    | Next.js (App Router), TypeScript   |
| Styling     | TailwindCSS, ShadCN UI             |
| Animation   | Framer Motion                      |
| Backend     | Next.js API Routes, TypeScript     |
| Scraping    | `readability` + custom cleaning    |
| Summarizer  | Mocked (simulate LLM summarization)|
| Translator  | Urdu dictionary (JSON-based)       |
| DB (content)| MongoDB (via Mongoose)             |
| DB (summary)| Supabase (PostgreSQL REST API)     |
| Hosting     | Vercel                             |

---




