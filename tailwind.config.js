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
            backgroundImage: {
                "img-header":
                    'url(\'data:image/svg+xml,<svg width="500" height="91" xmlns="http://www.w3.org/2000/svg"><path d="M0 90h87.5c.833 0 1.757-.158 2.553-.407.795-.248 1.317-.542 2.002-1.016l60.89-42.154s1.363-.84 2.119-1.078c.782-.247 2.436-.345 2.436-.345H500V0" fill="none" stroke="%23000" stroke-linecap="round" stroke-linejoin="round"/></svg>\')',
            },
            keyframes: {
                "front-cover-triangule": {
                    "0%": { filter: "drop-shadow(0 0 0px var(--bg-color))" },
                    "100%": { filter: "drop-shadow(0 0 50px var(--bg-color))" },
                },
            },
            animation: {
                "front-cover-triangule":
                    "front-cover-triangule 2s infinite ease-in-out",
            },
        },
    },
    plugins: [],
};
