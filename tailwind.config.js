/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#000742",
        danger: "#DC2626",
        success: 'green'
      },
    },
  },
  plugins: [],
};
