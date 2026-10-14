import { Bot, Fish, Leaf, PiggyBank } from "lucide-react";
import type { ProjectIcon as IconType } from "@/data/types";
const icons = { bot: Bot, fish: Fish, leaf: Leaf, pig: PiggyBank };
const colors = {
  bot: "var(--purple)",
  fish: "var(--blue)",
  leaf: "var(--green)",
  pig: "var(--red)",
};
export default function ProjectIcon({ icon }: { icon: IconType }) {
  const Icon = icons[icon];
  return (
    <Icon
      size={16}
      style={{ color: colors[icon] }}
      className="shrink-0"
      aria-hidden="true"
    />
  );
}
