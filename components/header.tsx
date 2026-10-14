import Link from "next/link";
import ThemeToggle from "./theme-toggle";
export default function Header() {
  return (
    <header className="site-header">
      <span className="w-1/3" />
      <Link
        href="/about"
        className="w-1/3 text-center font-medium whitespace-nowrap"
      >
        HYEEUN CHO
      </Link>
      <div className="w-1/3 flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
