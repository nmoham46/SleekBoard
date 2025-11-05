/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT"

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        "primary": ["Poppins", "sans-serif"],
      },

      colors: {
        "primary": "#333",
        "secondary": "#FFF",
        "tertiary": "#F2F4F8",
        "neutral": "#F7F9FB",
        "info": "#999FAA",
        "accent": "#F04122",
        "tPrimary": "#333",
        "tSecondary": "#F7F9FB",
      },

      fontSize: {
        "xxs": "0.625rem",
        "xs": "0.75rem",
        "sm": "0.875rem",
        "normal": "1rem",
        "h6": "1.15rem",
        "h5": "1.25rem",
        "h4": "1.5rem",
        "h3": "1.75rem",
        "h2": "2rem",
        "h1": "2.25rem",
        "lg": "2.5rem",
        "xl": "2.75rem",
        "2xl": "3rem",
        "3xl": "3.25rem",
        "4xl": "3.5rem",
        "5xl": "3.75rem",
        "6xl": "4rem",
        "7xl": "4.25rem",
        "8xl": "4.5rem",
        "9xl": "4.75rem",
      },
    },
    screens: {
      "xxs": "260px",
      "xs": "370px",
      "sm": "540px",
      "md": "767px",
      "lg": "1024px",
      "xl": "1200px"
    },

    container: {
      center: true,
    },
  },

  plugins: [],
})

