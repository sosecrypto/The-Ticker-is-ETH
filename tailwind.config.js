/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#050508',
                    darker: '#020204',
                    surface: '#0a0a12',
                    'surface-light': '#1a1a2e',
                    primary: '#2D5FBF',
                    'primary-light': '#4A7AD4',
                    'primary-dark': '#1E4090',
                    accent: '#629FFF',
                    'accent-dark': '#3C7AE0',
                    'accent-light': '#8BB8FF',
                    light: '#F5F5FA',
                    muted: '#9ca3af',
                },
                eth: {
                    purple: '#A086FC',
                    'purple-light': '#C4B5FD',
                    'purple-dark': '#7B6BD8',
                    'purple-deep': '#3C4CA8',
                },
                social: {
                    telegram: '#26A5E4',
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
