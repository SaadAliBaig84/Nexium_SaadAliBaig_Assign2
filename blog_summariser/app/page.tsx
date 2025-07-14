"use client";
import PreviousSummaries from "@/components/prevSummaries";
import ResultsPage from "@/components/results";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { UrlTakerCard } from "@/components/UrlTakerCard";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
export default function Home() {
  const [blogData, setBlogData] = useState<{
    url: string;
    title: string;
    content: string;
  } | null>(null);

  const [clear, setClear] = useState(false);

  return (
    <>
      <div
        className="flex flex-col justify-start items-center min-h-screen w-full  font-mono space-y-4 text-center"
        style={{
          backgroundImage: "url('/carbon_fibre.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-[#00ADB5] m-4 drop-shadow-[0_0_15px_#00ADB5] flex items-center justify-center"
        >
          <BrainCircuit className="h-24 w-24 " />
        </motion.div>

        <Card className="w-fit min-w-[70vh] text-center text-2xl sm:text-3xl font-semibold mt-2 bg-[#393E46] border-0 text-[#00ADB5] shadow-md shadow-[#00ADB5]">
          <CardHeader>
            <CardTitle>Welcome to the blog summariser app!</CardTitle>
          </CardHeader>
        </Card>
        <UrlTakerCard setBlogData={setBlogData} setClear={setClear} />
        {blogData && !clear && (
          <ResultsPage blogData={blogData} clear={clear} setClear={setClear} />
        )}
        <PreviousSummaries />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </>
  );
}
