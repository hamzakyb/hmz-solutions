import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#d2d2d7",
        input: "#d2d2d7",
        ring: "#007aff",
        background: "#ffffff",
        foreground: "#1d1d1f",
        primary: {
          DEFAULT: "#007aff",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f5f5f7",
          foreground: "#1d1d1f",
        },
        destructive: {
          DEFAULT: "#ff3b30",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f5f5f7",
          foreground: "#86868b",
        },
        accent: {
          DEFAULT: "#f5f5f7",
          foreground: "#1d1d1f",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1d1d1f",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1d1d1f",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: 'media',
  plugins: [],
};

export default config;