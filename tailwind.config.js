/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,jsx,ts,tsx}",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            colors: {
                pokedex: "#b51d40",
                camera: "#086a9b",
                "camera-light": "#00acf8",
                "indicator-red": "#c6002b",
                "indicator-red-light": "#fc2b5a",
                "indicator-yellow": "#dec548",
                "indicator-yellow-light": "#f7d466",
                "indicator-green": "#4d905e",
                "indicator-green-light": "#7ca880",
            },
        },
    },
    plugins: [],
};
