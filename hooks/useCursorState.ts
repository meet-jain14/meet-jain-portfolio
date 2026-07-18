"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

interface UseCursorStateResult {
  /** Attach to the cursor's outer element. Position/scale are written directly to its style. */
  cursorRef: RefObject<HTMLDivElement | null>;
  /** True on touch/coarse-pointer devices — callers should not render the cursor at all. */
  isTouchDevice: boolean;
}

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor-hover]';

/**
 * Tracks pointer position and hover-over-interactive-element state, writing
 * directly to the cursor DOM node's transform/class list on each frame
 * rather than through React state — this avoids a re-render on every
 * mousemove, which matters for a cursor that has to feel instant.
 */
export function useCursorState(): UseCursorStateResult {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const coarsePointerQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    setIsTouchDevice(coarsePointerQuery.matches);

    const onCoarseChange = (event: MediaQueryListEvent) => setIsTouchDevice(event.matches);
    coarsePointerQuery.addEventListener("change", onCoarseChange);

    return () => coarsePointerQuery.removeEventListener("change", onCoarseChange);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursorEl = cursorRef.current;
    if (!cursorEl) return;

    document.documentElement.classList.add("has-custom-cursor");
    cursorEl.dataset.visible = "false";

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let rafId: number;

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (cursorEl.dataset.visible !== "true") {
        cursorEl.dataset.visible = "true";
      }
    };

    // documentElement mouseleave fires when the pointer exits the viewport
    // entirely (browser chrome, other windows) — pointermove simply stops
    // firing in that case, which otherwise leaves the cursor frozen in its
    // last position instead of disappearing.
    const onDocumentLeave = () => {
      cursorEl.dataset.visible = "false";
    };
    const onDocumentEnter = () => {
      cursorEl.dataset.visible = "true";
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) {
        cursorEl.dataset.state = "hover";
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const related = event.relatedTarget as Element | null;
      if (
        target?.closest(INTERACTIVE_SELECTOR) &&
        !related?.closest(INTERACTIVE_SELECTOR)
      ) {
        cursorEl.dataset.state = "default";
      }
    };

    function render() {
      cursorEl!.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      rafId = requestAnimationFrame(render);
    }
    rafId = requestAnimationFrame(render);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onDocumentLeave);
    document.documentElement.addEventListener("mouseenter", onDocumentEnter);
    window.addEventListener("blur", onDocumentLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("mouseleave", onDocumentLeave);
      document.documentElement.removeEventListener("mouseenter", onDocumentEnter);
      window.removeEventListener("blur", onDocumentLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [isTouchDevice]);

  return { cursorRef, isTouchDevice };
}
