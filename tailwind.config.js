// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)", // nền chính
        secondary: "var(--color-secondary)", // nền phụ
        background: "var(--color-background)", // bg page
        foreground: "var(--color-foreground)", // bg nội dung
        card: "var(--color-card)", // bg card
        border: "var(--color-border)", // màu border
        borderlight: "var(--color-border)",
        text: {
          DEFAULT: "var(--color-text)",
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          error: "var(--color-error)",
        },
        accent: {
          blue: "var(--color-accent-blue)",
          success: "var(--color-success)",
          error: "var(--color-error)",
        },
      },
    },
  },
  keyframes: {
    spin: { to: { transform: "rotate(360deg)" } },
  },
  animation: {
    "spin-slow": "spin 1.4s linear infinite",
    "spin-slower": "spin 2s linear infinite",
  },
  container: {
    center: true,
    padding: "1rem",
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },

  plugins: [
    function ({ addBase, theme }) {
      addBase({
        body: {
          color: theme("colors.text.DEFAULT"),
          backgroundColor: theme("colors.background"),
        },
      });
    },
  ],
};
