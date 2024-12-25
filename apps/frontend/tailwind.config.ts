import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#68346F",
        dark: {
          primary: "#552a5b",
        },
      },
      width: {
        "10/21": "47%",
      },
    },
  },
  plugins: [],
} satisfies Config;
