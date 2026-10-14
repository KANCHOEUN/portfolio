"use client";
import { useId, useState, type ReactNode } from "react";
import { Square, SquareCheckBig, SquareDot, ChevronRight } from "lucide-react";
interface TodoProps {
  status: "done" | "in-progress" | "ready";
  description: string;
  children?: ReactNode;
}
export default function Todo({ status, description, children }: TodoProps) {
  const [open, setOpen] = useState(true);
  const id = useId();
  const Icon =
    status === "done"
      ? SquareCheckBig
      : status === "in-progress"
        ? SquareDot
        : Square;
  const label =
    status === "done"
      ? "구현 완료"
      : status === "in-progress"
        ? "진행 중"
        : "예정";
  const content = (
    <>
      <Icon size={18} className="shrink-0" />
      <span className="sr-only">{label}: </span>
      <span>{description}</span>
      {children && (
        <ChevronRight
          size={16}
          className={`shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
        />
      )}
    </>
  );
  return (
    <div className="mb-2">
      {children ? (
        <button
          aria-expanded={open}
          aria-controls={id}
          className="flex items-center gap-2 text-left"
          onClick={() => setOpen((value) => !value)}
        >
          {content}
        </button>
      ) : (
        <div className="flex items-center gap-2">{content}</div>
      )}
      {children && open && (
        <div id={id} className="pl-6 mt-2">
          {children}
        </div>
      )}
    </div>
  );
}
