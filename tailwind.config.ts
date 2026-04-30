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
        saffron: {
          50:  "#FFF0E6",
          100: "#FFD4B3",
          400: "#FF8C42",
          600: "#FF6200",
          900: "#8A3400",
        },
        navy: {
          50:  "#E8EEF8",
          100: "#C0CEEE",
          400: "#4F74C8",
          600: "#003580",
          900: "#001840",
        },
        india: {
          green: "#138808",
          "green-light": "#E6F4E6",
          gold: "#C8A400",
          "gold-light": "#FFF8E1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-down": "slideDown 0.25s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { maxHeight: "0", opacity: "0" },
          "100%": { maxHeight: "500px", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
