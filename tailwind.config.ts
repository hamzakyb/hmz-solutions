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
        // Altın rengi tanımları
        gold: {
          50: '#f7f6f3',
          100: '#efede5',
          200: '#dfdacb',
          300: '#cabbad',
          400: '#b4a070',
          500: '#af9c64', // The specific color requested
          600: '#9a8651',
          700: '#806d41',
          800: '#695a38',
          900: '#564a31',
          950: '#2e2719',
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