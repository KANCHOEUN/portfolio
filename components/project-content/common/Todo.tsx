import { Square, SquareCheckBig, SquareDot } from "lucide-react";

interface TodoProps {
  status: "done" | "in-progress" | "ready";
  description: string;
}

export default function Todo({ status, description }: TodoProps) {
  return (
    <div className="flex items-center gap-2 mb-2">
      {status === "done" && <SquareCheckBig size={18} />}
      {status === "in-progress" && <SquareDot size={18} />}
      {status === "ready" && <Square size={18} />}
      <span>{description}</span>
    </div>
  );
}
