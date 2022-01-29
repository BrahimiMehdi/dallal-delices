module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      colors:{
        "mainPink":"#DA716A",
        "mainPurple":"#AD91A3",
        "mainDark":"#5C5C5C",
        "secondary-purple":"#EFC7E1",
        "mainLight":"#FCF7F8"
      },
      backgroundImage:{
        "white-texutre":"url('/textureBg.jpg')",
        "detail-texutre":"url('/details.jpg')",
        "recipes-texture":"url('/recipePage.jpg')",
        "dark-texture":"linear-gradient(0deg, rgba(0,0,0,0.6),url('/textureBg.jpg'),rgba(0,0,0,0.6))"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
}
