/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        gray: {
          100: "#DDDDDD",
          200: "#CCCCCC",
          300: "#999999",
          400: "#77777777",
        },
        blue: {
          500: "#7695EC",
        },
        red: {
          500: "#FF5151",
        },
        green: {
          500: "#47B960",
        },
      },
    },
  },
  plugins: [],
};
