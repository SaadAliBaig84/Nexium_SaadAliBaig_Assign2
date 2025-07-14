"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
export default function SummaryDetailPage() {
  const router = useRouter();
  const [summaryData, setSummaryData] = useState<null | {
    title: string;
    url: string;
    content: string;
    summary: string;
    translated_summary: string;
    created_at: string;
  }>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("summaryItem");
    if (!data) {
      router.push("/"); // Redirect to home if no data
      return;
    }
    setSummaryData(JSON.parse(data));
  }, [router]);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("summaryItem");
    };
  }, []);
  if (!summaryData) return null;

  return (
    <div
      className="flex flex-col justify-start items-center min-h-screen w-full  font-mono space-y-4 text-center"
      style={{
        backgroundImage: "url('/carbon_fibre.png')",
        backgroundSize: "auto",
        backgroundRepeat: "repeat",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-[#00ADB5] m-4 drop-shadow-[0_0_15px_#00ADB5] flex items-center justify-center"
      >
        <BrainCircuit className="h-24 w-24 " />
      </motion.div>
      <Card className="bg-[#393E46] border-0 shadow-md shadow-[#00ADB5] text-[#EEEEEE] max-w-[90vh]">
        <CardHeader>
          <CardTitle className="text-[#00ADB5] text-2xl">
            {summaryData.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{summaryData.url}</p>
          <p className="text-xs mt-1">
            {new Date(summaryData.created_at).toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-[#393E46] border-0 shadow-md shadow-[#00ADB5] text-[#EEEEEE] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-[#00ADB5] text-xl">
            Original Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{summaryData.content}</p>
        </CardContent>
      </Card>

      <Card className="bg-[#393E46] border-0 shadow-md shadow-[#00ADB5] text-[#EEEEEE] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-[#00ADB5] text-xl">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{summaryData.summary}</p>
        </CardContent>
      </Card>

      <Card className="bg-[#393E46] border-0 shadow-md shadow-[#00ADB5] text-[#EEEEEE] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-[#00ADB5] text-xl">Translation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">
            {summaryData.translated_summary}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
