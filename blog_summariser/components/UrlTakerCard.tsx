"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "lucide-react";
export function UrlTakerCard({
  setBlogData,
  setClear,
}: {
  setBlogData: (
    blogData: {
      url: string;
      title: string;
      content: string;
    } | null
  ) => void;
  setClear: (value: boolean) => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!url) return;
    setLoading(true);
    setClear(false);
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
      setBlogData({
        url,
        title: data.title,
        content: data.clean_text,
      });
      toast.success("Url scraped successfully.");
    } catch (error) {
      console.error("Error fetching URL:", error);
      toast.error("Error fetching URL. Please retry...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-[#393E46] text-[#00ADB5] w-full max-w-xl mx-auto shadow-md border-0 shadow-[#00ADB5]">
      <CardHeader className="flex flex-row justify-center">
        <Link />
        <h2 className="text-xl font-semibold">Enter Blog URL</h2>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <Input
          placeholder="https://example.com/blog-post"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="text-[#00ADB5] bg-[#EEEEEE] placeholder:text-gray-500 border-0 "
        />
        <Button
          onClick={handleSubmit}
          className="bg-[#EEEEEE] text-[#14181d] hover:bg-[#d6d6d6] mx-1"
        >
          {loading ? <Loader className="animate-spin" /> : "Summarize"}
        </Button>
        <Button
          onClick={() => {
            setClear(true);
            setBlogData(null);
          }}
          className="bg-[#EEEEEE] text-[#14181d] hover:bg-[#d6d6d6] mx-1"
        >
          Clear
        </Button>
      </CardContent>
    </Card>
  );
}
