/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        nagari: {
          green: {
            50: '#f2f8f4',
            100: '#e1efe5',
            200: '#c5dfcd',
            300: '#9bc6aa',
            400: '#6ca881',
            500: '#478c60',
            600: '#34714a',
            700: '#2b5a3c',
            800: '#244831',
            900: '#1e3c2b',
            950: '#102218',
          },
          gold: {
            50: '#fdfbeb',
            100: '#faf3c7',
            200: '#f5e48d',
            300: '#efcf4e',
            400: '#e8b922',
            500: '#d99e15',
            600: '#bc7c0f',
            700: '#965a0f',
            800: '#784712',
            900: '#633b12',
            950: '#391e06',
          },
          red: {
            50: '#fef3f3',
            100: '#fee5e5',
            200: '#fcd0d0',
            300: '#faa7a7',
            400: '#f67070',
            500: '#eb4444',
            600: '#d72828',
            700: '#b51e1e',
            800: '#961c1c',
            900: '#7c1d1d',
            950: '#440b0b',
          }
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["Georgia", "ui-serif", "serif"],
      }
    },
  },
  plugins: [],
};
