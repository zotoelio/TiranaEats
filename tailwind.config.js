/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // Next.js App Router
    "./frontend/**/*.{js,ts,jsx,tsx}",  // Your components, dashboard, auth pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

