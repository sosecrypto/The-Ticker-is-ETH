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
                    primary: '#2D5FBF', // Ethereum Blue
                    accent: '#629FFF', // Sky Blue
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
