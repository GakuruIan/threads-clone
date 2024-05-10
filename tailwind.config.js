/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",

    './vueform.config.js', 
    './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
    './node_modules/@vueform/vueform/themes/tailwind/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        dark:{
          50:"#212121",
          100:"#232323",
          200:"#242424",
          300:"#252525",
          400:"#262626",
          500:"#272727",
          600:"#282828",
          700:"#292929",
          800:"#303030",
          900:"#333333",
        },
        light:{
          100:"rgba(255,255,255,0.1)",
          200:"rgba(255,255,255,0.03)"
        },
        bubble:"#FF00C7"
      },
    },
  },
  plugins: [
    require('@vueform/vueform/tailwind')
  ],
}