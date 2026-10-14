import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
        mono: ["Consolas", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
