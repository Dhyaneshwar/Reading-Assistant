"use client";
import { initializeWebGazer } from "@/lib/webgazerHandler";
import { useEffect, useState } from "react";

export default function EyeTracker() {
  const [webGazerLoaded, setWebGazerLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showPredictions, setShowPredictions] = useState(true);

  useEffect(() => {
    initializeWebGazer(setWebGazerLoaded, showPreview, showPredictions);

    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, [setWebGazerLoaded, showPreview, showPredictions]);

  return (
    <div className="flex justify-evenly align-middle">
      <div className="text-center m-5 p-8">
        {webGazerLoaded ? "WebGazer is running..." : "Loading WebGazer..."}
      </div>
      <div className="flex align-middle">
        <button
          className="bg-slate-400 m-6 p-2 w-[8rem] h-[4rem]"
          onClick={() => setShowPreview((prevstate) => !prevstate)}
        >
          {showPreview ? "Hide" : "Show"} Preview
        </button>
        <button
          className="bg-slate-400 m-6 p-2 w-[8rem]  h-[4rem]"
          onClick={() => setShowPredictions((prevstate) => !prevstate)}
        >
          {showPredictions ? "Hide" : "Show"} Predictions
        </button>
      </div>
    </div>
  );
}
