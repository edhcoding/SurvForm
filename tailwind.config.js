import colors from "./tailwind/colors";
import utilities from "./tailwind/utilities";

const px0_20 = new Array(21).fill(0).map((_, i) => `${i}px`);
const px0_200 = new Array(201).fill(0).map((_, i) => `${i}px`);

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "820px",
    },
    extend: {
      spacing: {
        ...px0_200,
      },
      borderWidth: {
        ...px0_20,
      },
      borderRadius: {
        ...px0_20,
      },
      fontSize: {
        ...px0_200,
      },
      colors,
    },
  },
  plugins: [utilities],
};
