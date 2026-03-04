"use client";

import { useState } from "react";
import { Square, SquareCheckBig, SquareDot, ChevronRight } from "lucide-react";

interface TodoProps {
  status: "done" | "in-progress" | "ready";
  description: string;
  children?: React.ReactNode;
}

export default function Todo({ status, description, children }: TodoProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-2">
      <div
        className={`flex items-center gap-2 ${children ? "cursor-pointer select-none" : ""}`}
        onClick={children ? () => setOpen((v) => !v) : undefined}
      >
        {status === "done" && <SquareCheckBig size={18} className="shrink-0" />}
        {status === "in-progress" && <SquareDot size={18} className="shrink-0" />}
        {status === "ready" && <Square size={18} className="shrink-0" />}
        <span>{description}</span>
        {children && (
          <ChevronRight
            size={16}
            className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
          />
        )}
      </div>
      {children && open && <div className="pl-6 mt-2">{children}</div>}
    </div>
  );
}
