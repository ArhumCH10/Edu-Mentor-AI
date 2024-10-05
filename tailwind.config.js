/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This ensures Tailwind scans all your files for class names
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto Mono, monospace", // Custom font family you've added
      },
    },
  },
  plugins: [],
};
