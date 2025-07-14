import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
type SummaryCard = {
  _id: string;
  url: string;
  title: string;
  content: string;
  created_at: string;
  summary: string;
  translated_summary: string;
};

export default function PreviousSummaries() {
  const [summaries, setSummaries] = useState<SummaryCard[]>([]);
  const router = useRouter();
  const onClick = (item: SummaryCard) => {
    sessionStorage.setItem("summaryItem", JSON.stringify(item));
    router.push(`/summary`);
  };
  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const response = await fetch("/api/blog/fetch", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch summaries");
        }
        const data = await response.json();
        setSummaries(data);
      } catch (err) {
        console.error("Error fetching summaries:", err);
      }
    };
    fetchSummaries();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-[#00ADB5] m-4">
        Previous Summaries:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {summaries.map((item, idx) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.3 }}
          >
            <Card
              className="bg-[#393E46] text-[#00ADB5] w-full max-w-xl mx-auto shadow-md border-0 shadow-[#00ADB5]"
              onClick={() => onClick(item)}
            >
              <CardHeader>
                <CardTitle className="text-[#EEEEEE] text-lg truncate">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 truncate">{item.url}</p>
                <p className="text-xs mt-2 text-gray-500">
                  {new Date(item.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
