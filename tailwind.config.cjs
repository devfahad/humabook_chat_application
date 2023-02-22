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
        offWhite: "#ddddf7",
        buttonBg: "#7b96ec",
        navbarBg: "#2f2d52",
        sidebarBg: "#3e3c61",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
