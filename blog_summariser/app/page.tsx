"use client";
import ResultsPage from "@/components/results";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UrlTakerCard } from "@/components/UrlTakerCard";
import { useState } from "react";
export default function Home() {
  const [blogData, setBlogData] = useState<{
    url: string;
    title: string;
    content: string;
  } | null>(null);

  return (
    <>
      <div className="flex flex-col justify-start min-h-screen w-full bg-[#14181d] font-mono">
        <Card className="h-1/12 text-center text-3xl font-semibold my-4 mx-4 bg-[#393E46] border-0 text-[#00ADB5] shadow-md shadow-[#00ADB5]">
          <CardHeader>
            <CardTitle>Welcome to the blog summariser app!</CardTitle>
          </CardHeader>
        </Card>
        <UrlTakerCard setBlogData={setBlogData} />
        {blogData && <ResultsPage blogData={blogData} />}
      </div>
    </>
  );
}
