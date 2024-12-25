/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        secondary: "#f43f5e",
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
};
