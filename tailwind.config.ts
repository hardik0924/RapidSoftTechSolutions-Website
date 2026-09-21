import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#7C3AED',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(37, 99, 235, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
