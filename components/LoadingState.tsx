"use client";

import { useEffect, useRef } from "react";
import { animateLoading } from "@/lib/animations";

/**
 * LoadingState component
 * 
 * Simple loading indicator for transitions
 * Uses GSAP for smooth pulsing animation
 * 
 * Design: Minimal, centered, non-intrusive
 */
export function LoadingState() {
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      if (dot) {
        // Stagger the loading animation for each dot
        setTimeout(() => {
          animateLoading(dot);
        }, index * 200);
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            ref={(el) => {
              dotsRef.current[i] = el;
            }}
            className="h-3 w-3 rounded-full bg-white"
          />
        ))}
      </div>
    </div>
  );
}
