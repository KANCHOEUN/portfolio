"use client";
import { ChevronRight } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
export default function Toggle({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="my-2">
      <button
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className="font-medium flex items-center text-left gap-2"
      >
        <ChevronRight
          size={18}
          className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        />
        {title}
      </button>
      {open && (
        <div id={id} className="pl-6 mt-2">
          {children}
        </div>
      )}
    </div>
  );
}
