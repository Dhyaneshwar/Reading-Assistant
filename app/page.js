"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [webGazerLoaded, setWebGazerLoaded] = useState(false);

  useEffect(() => {
    const loadWebGazer = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://webgazer.cs.brown.edu/webgazer.js?";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load WebGazer"));
        document.head.appendChild(script);
      });
    };

    const initializeWebGazer = async () => {
      try {
        await loadWebGazer();
        const { webgazer } = window;
        if (webgazer) {
          webgazer
            .setGazeListener((data, elapsedTime) => {
              if (data == null) {
                return;
              }
              console.log("Gaze Data:", data);
              console.log("Elapsed Time:", elapsedTime);
            })
            .begin();
          setWebGazerLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    initializeWebGazer();

    return () => {
      if (window.webgazer) {
        window.webgazer.end();
      }
    };
  }, []);

  return (
    <div>
      {webGazerLoaded ? "WebGazer is running..." : "Loading WebGazer..."}
    </div>
  );
}
