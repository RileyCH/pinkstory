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
        mainPink: "#EF8679",
        lightPink: "#EBC6BE",
        darkPink: "#C97A6B",
        lightOrange: "#F9D1BA",
        mainGray: "#85858A",
        DarkGray: "#615853",
      },
    },
  },
  plugins: [],
};
