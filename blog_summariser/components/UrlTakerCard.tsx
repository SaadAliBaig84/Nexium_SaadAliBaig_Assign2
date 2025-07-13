"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
export function UrlTakerCard({
  setBlogData,
}: {
  setBlogData: (blogData: {
    url: string;
    title: string;
    content: string;
  }) => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        console.error("Failed to fetch the URL");
        return;
      }
      const data = await response.json();
      setBlogData({ url, title: data.title, content: data.clean_text });
    } catch (error) {
      console.error("Error fetching URL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[#393E46] text-[#00ADB5] w-full max-w-xl mx-auto shadow-md border-0 shadow-[#00ADB5]">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Enter Blog URL</h2>
        <Input
          placeholder="https://example.com/blog-post"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="text-[#00ADB5] bg-[#EEEEEE] placeholder:text-gray-500 border-0 "
        />
        <Button
          onClick={handleSubmit}
          className="bg-[#EEEEEE] text-[#14181d] hover:bg-[#d6d6d6]"
        >
          {loading ? <Loader className="animate-spin" /> : "Summarize"}
        </Button>
      </CardContent>
    </Card>
  );
}
