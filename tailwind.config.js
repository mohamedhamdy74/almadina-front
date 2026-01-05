/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#4A148C",
        "primary-medium": "#7B1FA2",
        "primary-light": "#9C27B0",
        "accent-pink": "#E91E63", // للمسة الحيوية في اللوجو

        "text-dark": "#212121",
        "text-medium": "#424242",
        "text-light": "#757575",

        "bg-white": "#FFFFFF",
        "bg-light": "#F5F5F5",

        success: "#4CAF50",
        warning: "#FFC107",
        error: "#F44336",
      },
      backgroundImage: (theme) => ({
        "gradient-brand": `linear-gradient(to left   , ${theme(
          "colors.primary-dark"
        )}, ${theme("colors.primary-medium")}, ${theme("colors.primary-dark")})`,
      }),
      fontFamily: {
        amiri: ["Amiri", "serif"],
        cairo: ['"Cairo"', "sans-serif"],
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [animate],
};

