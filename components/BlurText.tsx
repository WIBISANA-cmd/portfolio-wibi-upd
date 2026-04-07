import { motion } from "motion/react";
import { createElement, useEffect, useMemo, useRef, useState } from "react";

type MotionSnapshot = {
  filter: string;
  opacity: number;
  y: number;
};

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  segmentClassName?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Partial<MotionSnapshot>;
  animationTo?: Array<Partial<MotionSnapshot>>;
  easing?: (value: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: "p" | "span" | "div" | "h1" | "h2";
};

const buildKeyframes = (from: MotionSnapshot, steps: MotionSnapshot[]) => {
  return {
    filter: [from.filter, ...steps.map((step) => step.filter)],
    opacity: [from.opacity, ...steps.map((step) => step.opacity)],
    y: [from.y, ...steps.map((step) => step.y)],
  };
};

const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  segmentClassName = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (value) => value,
  onAnimationComplete,
  stepDuration = 0.35,
  as = "p",
}: BlurTextProps) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot: MotionSnapshot = {
    ...defaultFrom,
    ...animationFrom,
  };

  const toSnapshots: MotionSnapshot[] = (animationTo ?? defaultTo).reduce<MotionSnapshot[]>(
    (acc, partialSnapshot) => {
      const previous = acc[acc.length - 1] ?? fromSnapshot;
      acc.push({
        filter: partialSnapshot.filter ?? previous.filter,
        opacity: partialSnapshot.opacity ?? previous.opacity,
        y: partialSnapshot.y ?? previous.y,
      });
      return acc;
    },
    []
  );

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  const children = (
    <>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className={`inline-block will-change-[transform,filter,opacity] ${segmentClassName}`}
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </>
  );

  return createElement(as, { ref, className: `blur-text ${className}` }, children);
};

export default BlurText;
