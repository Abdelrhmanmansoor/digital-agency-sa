import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "royal-black": "#0A0A0A",
        gold: "#C8A962",
        "gold-light": "#D4B97A",
        "gold-dark": "#A8894A",
        cream: "#FAFAF7",
        "cream-dark": "#F0EDE8",
        "warm-gray": "#8C8C7A",
        "dark-gray": "#3A3A35",
        "light-border": "#E8E6E1",
      },
      fontFamily: {
        display: ["Noto Kufi Arabic", "sans-serif"],
        body: ["Noto Sans Arabic", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        arabic: ["Noto Sans Arabic", "sans-serif"],
        "arabic-display": ["Noto Kufi Arabic", "sans-serif"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        fadeIn: "fadeIn 0.6s ease forwards",
        slideUp: "slideUp 0.6s ease forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
