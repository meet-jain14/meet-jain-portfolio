"use client";

import { useCursorState } from "@/hooks/useCursorState";

export function TerminalCursor() {
  const { cursorRef, isTouchDevice } = useCursorState();

  if (isTouchDevice) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden
      data-state="default"
      data-visible="false"
      className="
        pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2
        opacity-0 transition-opacity duration-150
        [&[data-visible=true]]:opacity-100
      "
    >
      <div
        className="
          flex h-6 w-6 items-center justify-center
          border border-signal font-mono text-[10px] text-signal
          transition-[width,height,border-radius] duration-150 ease-out
          [[data-state=hover]_&]:h-10 [[data-state=hover]_&]:w-10
        "
      >
        <span className="[[data-state=hover]_&]:hidden">[ ]</span>
      </div>
    </div>
  );
}
