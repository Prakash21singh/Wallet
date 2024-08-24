/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        default: "191919",
        "dark-1": "#191919",
        "dark-2": "#0F0F0F",
        "or-1": "#E3651D",
      },
    },
  },
  plugins: [],
};
