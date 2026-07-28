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
        ink: "#111111",
        "royal-black": "#111111",
        brand: {
          DEFAULT: "#F0B100",
          dark: "#D89E00",
          deep: "#8A6D00",
          tint: "rgba(240,177,0,0.10)",
        },
        gold: "#B78A00",
        "gold-light": "#F3DFA0",
        "gold-dark": "#8A6D00",
        cream: "#FAFAF8",
        "cream-dark": "#F2F2F0",
        "warm-gray": "#6B6B6B",
        "dark-gray": "#333333",
        "light-border": "#EAEAE6",
      },
      /* لا بد أن تطابق متغيّرات globals.css: أي فرق هنا يجعل عنصرًا يحمل
         className="font-display" يتجاوز خط العناوين بصمت. */
      fontFamily: {
        display: ["ThmanyahDisplay", "ThmanyahSans", "Zain", "serif"],
        body: ["ThmanyahSans", "Zain", "sans-serif"],
        mono: ["Space Mono", "monospace"],
        arabic: ["ThmanyahSans", "Zain", "sans-serif"],
        "arabic-display": ["ThmanyahDisplay", "ThmanyahSans", "Zain", "serif"],
      },
      borderRadius: {
        DEFAULT: "10px",
        card: "14px",
      },
      boxShadow: {
        card: "0 4px 16px rgba(17,17,17,0.06)",
        lift: "0 12px 32px rgba(17,17,17,0.10)",
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
