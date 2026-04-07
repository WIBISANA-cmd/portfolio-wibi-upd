"use client";

import { useEffect, useRef, useState } from "react";

type UseSectionInViewOptions = {
  threshold?: number;
  rootMargin?: string;
  initialInView?: boolean;
};

export function useSectionInView<T extends HTMLElement = HTMLElement>({
  threshold = 0.05,
  rootMargin = "0px",
  initialInView = true,
}: UseSectionInViewOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(initialInView);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
