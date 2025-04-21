/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./app/components/**.{js,ts,jsx,tsx}",

      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      colors: {
        'custom-purple': 'rgb(110, 41, 230)'
      },
      extend: {
        keyframes: {
          "fade-out": {
              "0%": {
                  opacity: 1
              },
              "100%": {
                  opacity: 0
              },
          },
        },
        animation: {
          'fadeOut': 'fade-out 1s ease-out 0.25s 1',
        }
      },
    },
    plugins: [],
  }
