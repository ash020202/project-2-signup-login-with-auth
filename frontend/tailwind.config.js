/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "4px 7px 0px black",
        "btn-shadow": "5px 5px 0px 0px #000",
      },
    },
  },
  plugins: [],
};
