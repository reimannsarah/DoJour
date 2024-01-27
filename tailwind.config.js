/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden"
          },
          "100%": {
            width: "100%"
          }
        },
        blink: {
          "50%": {
            borderColor: "transparent"
          },
          "100%": {
            borderColor: "white"
          }
        }
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink 1s infinite"
      },
      colors: {
        'primary': '#051007',
        'secondary': '#739A6B',
      }
    },
  },
  plugins: [],
}

