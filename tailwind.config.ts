import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-d2coding)", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        onedark: {
          background: "#282c34",
          foreground: "#abb2bf",
          red: "#e06c75",
          green: "#98c379",
          yellow: "#e5c07b",
          blue: "#61afef",
          purple: "#c678dd",
          cyan: "#56b6c2",
          border: "#3e4451",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
            color: "#abb2bf",
            a: {
              color: "#61afef",
              "&:hover": {
                color: "#56b6c2",
              },
            },
            h1: {
              color: "#e5c07b",
            },
            h2: {
              color: "#e5c07b",
            },
            h3: {
              color: "#e5c07b",
            },
            h4: {
              color: "#e5c07b",
            },
            strong: {
              color: "#c678dd",
            },
            code: {
              color: "#98c379",
              backgroundColor: "#2c313a",
              padding: "0.25rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            blockquote: {
              color: "#abb2bf",
              borderLeftColor: "#3e4451",
            },
            hr: {
              borderColor: "#3e4451",
            },
            ul: {
              li: {
                "&::before": {
                  backgroundColor: "#abb2bf",
                },
              },
            },
            ol: {
              li: {
                "&::before": {
                  color: "#abb2bf",
                },
              },
            },
          },
        },
        invert: {
          css: {
            color: "#abb2bf",
            a: {
              color: "#61afef",
              "&:hover": {
                color: "#56b6c2",
              },
            },
            h1: {
              color: "#e5c07b",
            },
            h2: {
              color: "#e5c07b",
            },
            h3: {
              color: "#e5c07b",
            },
            h4: {
              color: "#e5c07b",
            },
          },
        },
        light: {
          css: {
            color: "#383a42",
            a: {
              color: "#4078f2",
              "&:hover": {
                color: "#0184bc",
              },
            },
            h1: {
              color: "#c18401",
            },
            h2: {
              color: "#c18401",
            },
            h3: {
              color: "#c18401",
            },
            h4: {
              color: "#c18401",
            },
            strong: {
              color: "#a626a4",
            },
            code: {
              color: "#50a14f",
              backgroundColor: "#eaeaeb",
              padding: "0.25rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            blockquote: {
              color: "#383a42",
              borderLeftColor: "#d4d4d4",
            },
            hr: {
              borderColor: "#d4d4d4",
            },
            ul: {
              li: {
                "&::before": {
                  backgroundColor: "#383a42",
                },
              },
            },
            ol: {
              li: {
                "&::before": {
                  color: "#383a42",
                },
              },
            },
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
export default config
