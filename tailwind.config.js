/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "index.html",
    "index.js",
    "./watchlist/watchlist.html",
    "./watchlist/watchlist.js",
    "./moviepage/page.html",
    "./moviepage/page.js",
  ],
  theme: {
    extend: {
      keyframes: {
        upDown: {
          "0%": {
            transform: "translateY(-100px)",
          },
          "100%": {
            transform: "translateY(0px)",
          },
        },
        downUp: {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(-100px)",
          },
        },
      },
      animation: {
        upDown: "upDown 0.3s ease-in-out",
        downUp: "downUp 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};
