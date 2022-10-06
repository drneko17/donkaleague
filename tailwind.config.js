/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "my-white": "#f7f4f3",
        "my-black": "#0E1116",
        "my-gray": "#2F3D53",
      },
    },
  },
  plugins: [],
};
