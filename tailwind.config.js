/** @type {import('tailwindcss').Config} */


export default {
  darkMode: "class", 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nền & bề mặt
        "bg-primary": "#0F172A", // Xanh đen sâu
        "bg-secondary": "#1E293B", // Xanh đen nhạt hơn
        "bg-tertiary": "#334155", // Bề mặt sáng hơn chút

        // Text
        "text-primary": "#F1F5F9", // Trắng ngà
        "text-secondary": "#CBD5E1", // Xám nhạt
        "text-muted": "#94A3B8", // Xám mờ

        // Accent (màu nhấn)
        "accent-primary": "#38BDF8", // Xanh cyan tươi
        "accent-secondary": "#818CF8", // Tím xanh
        "accent-danger": "#F87171", // Đỏ cam
        "accent-success": "#4ADE80", // Xanh lá
        "accent-warning": "#FBBF24", // Vàng

        // Border
        "border-primary": "#475569",
        "border-secondary": "#64748B",
      },
    },
     container: {
    center: true,
    padding: '1rem 2rem',

    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  },
  plugins: [],
} satisfies Config;
