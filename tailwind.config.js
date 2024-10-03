/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      customBlack: { DEFAULT: "#0f0f0f", light: "#121212" },
      customGray: {
        DEFAULT: "#272727",
        light: "#3f3f3f",
        lighter: "#5f5f5f",
      },
      customWhite: { DEFAULT: "#f1f1f1", dark: "" },
      customBlue: { DEFAULT: "#3ea6ff", light: "" },
      customRed: { DEFAULT: "#f60101", dark: "" },
    },
  },
  plugins: [],
};
