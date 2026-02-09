import { heroui } from "@heroui/theme";
import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          "0%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
        "spin-3": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        },
        'float': {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        }
      },
      animation: {
        zoom: "zoom 0.2s ease-in-out",
        spin3s: "spin-3 3s infinite linear",
        'slide-up': 'slide-up 0.5s ease-in-out',
        'float': 'float 3s  ease-in-out infinite',
        'scale-in': 'scale-in 0.5s ease-out',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        title: {
          fontSize: "24px",
          fontWeight: "700",
        },
        medium: "18px",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      theme: "light",
      defaultTheme: "light",
      defaultExtendTheme: "light",
      layout: {
        radius: {
          small: "2px", // rounded-small
          medium: "8px", // rounded-medium
          large: "12px", // rounded-large
        },
      },
      themes: {
        layout: {
          layout: {
            radius: "8px",
          },
        },
        light: {
          colors: {
            default: {
              DEFAULT: "#2c724c",
              foreground: '#ffffff'
            },
            primary: {
              DEFAULT: "#fcd34d",
              foreground: '#000000'
            },
            secondary: {
              DEFAULT: "#ff4343",
              foreground: '#000000'
            },
            success: {
              DEFAULT: "#2c724c",
            },
          },
        },
        dark: {
          colors: {
            background: "#020617", // Rich obsidian
            foreground: "#f8fafc", // Ghost white
            primary: {
              DEFAULT: "#fbbf24", // Premium Amber
              foreground: "#000000",
            },
            secondary: {
              DEFAULT: "#6366f1", // Elegant Indigo
              foreground: "#ffffff",
            },
            success: {
              DEFAULT: "#10b981", // Modern Emerald
            },
            warning: {
              DEFAULT: "#f59e0b", // Warm Amber
            },
            danger: {
              DEFAULT: "#f43f5e", // Sophisticated Rose
            },
            default: {
              DEFAULT: "#1e293b", // Slate surface
              foreground: "#f1f5f9",
            },
            content1: {
              DEFAULT: "#0f172a", // Card background
              foreground: "#f1f5f9",
            },
          },
        },
      },
    }),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".text-title": {
          fontFamily: "var(--font-title) !important",
          fontSize: "24px",
          fontWeight: "700",
        },

        ".absolute-center": {},
        ".skeleton-loading": {},
        ".bg-red-linear": {
          background: "linear-gradient(270deg, #FF535F 0%, #A91325 100%)",
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};

module.exports = config;
