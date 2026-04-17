/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
        mono: ["var(--font-mono)"],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'noto-sans': ['var(--font-noto-sans)'],
        monomaniacOne: ['var(--font-monomaniac-one)'],
      },
  },
  darkMode: "class",
  plugins: [],
};

export default config;
