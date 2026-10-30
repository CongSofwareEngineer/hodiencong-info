import purgecss from "@fullhuman/postcss-purgecss";

const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    ...(process.env.NODE_ENV === "production"
      ? {
          "@fullhuman/postcss-purgecss": {
            content: [
              "./app/**/*.{js,ts,jsx,tsx,mdx}",
              "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
              "./components/**/*.{js,ts,jsx,tsx,mdx}",
            ],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: [/^modal/, /^drawer/, /^dropdown/, /^tooltip/],
            },
          },
        }
      : {}),
  },
};

export default config;