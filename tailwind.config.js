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
                    dark: '#050508', // Deep Navy/Black
                    primary: '#3C4CA8', // Ethereum Blue
                    accent: '#A086FC', // Glowing Purple
                    light: '#F5F5FA',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
