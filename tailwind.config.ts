import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#bcdcff",
          300: "#8ec6ff",
          400: "#59a6ff",
          500: "#2f83ff",
          600: "#1663f5",
          700: "#0f4de1",
          800: "#133fb6",
          900: "#16398f",
          950: "#122457",
        },
        gold: {
          400: "#ffcc4d",
          500: "#f5b301",
          600: "#d69700",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(16, 40, 80, 0.18)",
        card: "0 4px 20px -6px rgba(16, 40, 80, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
