"use client";
import { initializeWebGazer } from "@/lib/webgazerHandler";
import { useEffect, useState } from "react";

export default function EyeTracker() {
  const [webGazerLoaded, setWebGazerLoaded] = useState(false);

  useEffect(() => {
    initializeWebGazer(setWebGazerLoaded);

    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, []);

  return (
    <div className="text-center m-5 p-8">
      {webGazerLoaded ? "WebGazer is running..." : "Loading WebGazer..."}
    </div>
  );
}
