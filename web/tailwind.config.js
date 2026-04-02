/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1e293b",
        sand: "#f5efe6",
        clay: "#d97706",
        moss: "#1f7665",
        berry: "#8b1e3f",
      },
      boxShadow: {
        panel: "0 18px 50px rgba(30, 41, 59, 0.12)",
      },
      fontFamily: {
        sans: ["Georgia", "Cambria", "\"Times New Roman\"", "serif"],
      },
    },
  },
  plugins: [],
};
