/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        themePink: {
          50: "#fcf5f4",
          100: "#fae8e6",
          200: "#f6d5d2",
          300: "#efb7b2",
          400: "#e48d85",
          500: "#d6675d",
          600: "#c4544a",
          700: "#a23c33",
          800: "#86352e",
          900: "#70322c",
          950: "#3c1613",
        },
        themeGray: {
          50: "#f8f8f8",
          100: "#f0f0f0",
          200: "#e6e6e6",
          300: "#d1d1d1",
          400: "#b4b4b4",
          500: "#9a9a9a",
          600: "#818181",
          700: "#6a6a6a",
          800: "#5a5a5a",
          900: "#4e4e4e",
          950: "#282828",
        },
        themeOrange: {
          50: "#fef4ee",
          100: "#fce7d8",
          200: "#f9d1ba",
          300: "#f3a67e",
          400: "#ee7749",
          500: "#e95526",
          600: "#da3d1c",
          700: "#b52b19",
          800: "#90251c",
          900: "#752119",
          950: "#3f0d0b",
        },
      },
    },
  },
  plugins: [],
};
