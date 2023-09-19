import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
       satoshi: ['Satoshi, sans-serif'],
        inter: ['Inter, sans-serif']
      }
    },
    colors: {
      white: "#fafafa",
      black: "#0c0a09",
      blue: "#1e40af",
      red: "#be123c",
    },

  },
  plugins: [],
}
export default config
