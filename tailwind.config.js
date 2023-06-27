// tailwind.config.js
module.exports = {
  content: ["./{src,app,pages}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#188CA5",
        light: "#CACBCB",
        dark: "#172048",
      },
    },
  },
  plugins: [],
}
