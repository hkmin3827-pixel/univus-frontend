/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Tailwind가 적용될 파일 위치
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6", // Figma 블루
        secondary: "#1E293B", // 다크 그레이
        accent: "#FBBF24", // 포인트 색상
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"], // Figma 폰트
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
