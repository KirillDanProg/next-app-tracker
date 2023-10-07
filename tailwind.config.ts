import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        '@/app/*.{ts, tsx}'
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                satoshi: [ 'Satoshi, sans-serif' ],
                inter: [ 'Inter, sans-serif' ]
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
        colors: {
            white: "#fafafa",
            black: "#0c0a09",
            blue: "#1e40af",
            red: "#be123c",
        },
    },
    plugins: [ require("tailwindcss-animate") ],
}

export default config
