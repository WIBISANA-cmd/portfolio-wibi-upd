"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoImage from "@/app/logo.png";

export function WebsitePreloader() {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    let exitTimeout: ReturnType<typeof setTimeout> | null = null;
    let removeTimeout: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 5) + 1;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);

        exitTimeout = setTimeout(() => {
          setIsExiting(true);
        }, 400);

        removeTimeout = setTimeout(() => {
          setIsRendered(false);
        }, 1600);
      }

      setProgress(currentProgress);
    }, 40);

    return () => {
      clearInterval(interval);
      if (exitTimeout) clearTimeout(exitTimeout);
      if (removeTimeout) clearTimeout(removeTimeout);
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a] transition-opacity duration-1000 ease-in-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden
    >
      <style>{`
        .ripple-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: 0 0 20px 0px rgba(255, 255, 255, 0.02) inset,
                      0 0 20px 0px rgba(255, 255, 255, 0.02);
          animation: pulse-ripple 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .delay-1 { animation-delay: 1s; }
        .delay-2 { animation-delay: 2s; }

        @keyframes pulse-ripple {
          0% { transform: scale(0.5); opacity: 0; border-width: 2px; }
          50% { opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; border-width: 0px; }
        }
      `}</style>

      <div
        className={`relative flex items-center justify-center transition-all duration-1000 ease-in-out ${
          isExiting ? "scale-[2] opacity-0 blur-md" : "scale-100"
        }`}
      >
        <div className="absolute flex items-center justify-center w-64 h-64 pointer-events-none">
          <div className="ripple-circle w-32 h-32" />
          <div className="ripple-circle w-32 h-32 delay-1" />
          <div className="ripple-circle w-32 h-32 delay-2" />
        </div>

        <div className="relative z-10 flex flex-col items-center cursor-default group">
          <Image
            src={logoImage}
            alt="Logo"
            width={120}
            height={120}
            className="h-16 md:h-20 w-auto object-contain opacity-95 transition-transform duration-500 group-hover:scale-105"
            priority
          />

          <div className="w-12 h-[1px] bg-white/20 my-4 transition-all duration-500 group-hover:w-20 group-hover:bg-white/50" />

          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-500 font-light">
              Loading
            </span>
            <span className="text-sm font-mono tracking-widest text-white/80 w-8 text-right">
              {progress}%
            </span>
          </div>

          <div className="w-48 h-[2px] bg-white/10 mt-6 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gray-500 via-white to-gray-500 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
