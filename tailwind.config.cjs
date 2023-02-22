/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dimGray: "#374151",
        darkBlue: "#5d5b8d",
        dimBlue: "#a7bcff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        bgButton: "#7b96ec",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
