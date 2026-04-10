/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Sora'", "system-ui", "sans-serif"],
        display: ["'Outfit'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 80px rgba(59, 130, 246, 0.25)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top left, rgba(14,165,233,0.18), transparent 35%), radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 30%), radial-gradient(circle at bottom center, rgba(16,185,129,0.16), transparent 30%)"
      }
    }
  },
  plugins: []
};
