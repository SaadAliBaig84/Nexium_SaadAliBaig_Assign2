"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
export default function ResultsPage({
  blogData,
  clear,
  setClear,
}: {
  blogData: { url: string; title: string; content: string };
  clear: boolean;
  setClear: (value: boolean) => void;
}) {
  const [summary, setSummary] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  useEffect(() => {
    if (!blogData) return;
    setSummary(null);
    setTranslation(null);
    const summarize = async () => {
      try {
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: blogData.content }),
        });
        const data = await response.json();
        setSummary(data.summary);
      } catch (err) {
        console.error("Summary error:", err);
      }
    };

    summarize();
  }, [blogData]);

  useEffect(() => {
    if (!summary) return;
    setTranslation(null);
    const translate = async () => {
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: summary }),
        });
        const data = await response.json();
        setTranslation(data.translation);
      } catch (err) {
        console.error("Translation error:", err);
      }
    };

    translate();
  }, [summary]);

  useEffect(() => {
    if (summary && translation) {
      const saveToDatabase = async () => {
        try {
          // Save the blog data, summary, and translation to the database
          await fetch("api/blog/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: blogData.url,
              title: blogData.title,
              content: blogData.content,
              summary: summary,
              translated_summary: translation,
            }),
          });
          toast.success("Data saved to database.");
        } catch (error) {
          console.error("Error saving to database:", error);
        }
      };
      saveToDatabase();
    }
  }, [summary, translation]);

  useEffect(() => {
    if (clear) {
      setSummary(null);
      setTranslation(null);
      setClear(false);
    }
  }, [clear]);
  return (
    <div className="w-full text-[#EEEEEE] font-mono px-4 py-6 my-4 space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-[#393E46] border-0 shadow-md shadow-[#00ADB5] flex justify-center items-center">
          <CardHeader className="justify-center items-center">
            <CardTitle className="text-[#00ADB5] text-2xl">Summary</CardTitle>
          </CardHeader>
          <CardContent className="text-[#EEEEEE]">
            {summary ? (
              <p className="whitespace-pre-line">{summary}</p>
            ) : (
              <Loader className="animate-spin text-[#EEEEEE]" />
            )}
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="bg-[#393E46] border-0 shadow-md shadow-[#00ADB5] flex justify-center items-center">
          <CardHeader className="justify-center items-center">
            <CardTitle className="text-[#00ADB5] text-2xl">
              Urdu Translation
            </CardTitle>
          </CardHeader>
          <CardContent className="text-[#EEEEEE]">
            {translation ? (
              <p className="whitespace-pre-line">{translation}</p>
            ) : (
              <Loader className="animate-spin text-[#EEEEEE]" />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
