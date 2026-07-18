"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface UseTypedRevealOptions {
  /** ms delay between each character */
  speed?: number;
  /** ms delay before typing starts */
  startDelay?: number;
}

/**
 * Types out `text` one character at a time, once, on mount.
 * If the user prefers reduced motion, the full text is shown immediately
 * with no animation — this is a content-reveal effect, not decoration,
 * so reduced motion must not hide or delay the actual content.
 */
export function useTypedReveal(
  text: string,
  { speed = 35, startDelay = 200 }: UseTypedRevealOptions = {},
) {
  const prefersReducedMotion = useReducedMotion();
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    if (prefersReducedMotion) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval>;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayedText(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          clearInterval(intervalId);
          setIsComplete(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, prefersReducedMotion]);

  return { displayedText, isComplete };
}
