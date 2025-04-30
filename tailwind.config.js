/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Vite의 entry HTML
    "./src/**/*.{js,ts,jsx,tsx}", // 모든 소스 코드 대상
  ],
  theme: {
    extend: {
      maxWidth: {
        "screen-1440": "1440px",
      },
      screens: {
        mobile: { max: "375px" },
        tablet: "744px",
        pc: "1440px",
      },
    },
  },

  plugins: [],
};
