/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        "headerText" : "#F9F4DA"
      },
      backgroundColor: {
        "wrongLetterBg" : "#eb5d49"
      },
      margin: {
        "langEl" : "0.1rem"
      }
    },
  },
  plugins: [],
}