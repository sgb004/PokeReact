/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,jsx,ts,tsx}",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                "work-sans": ["Work Sans", "sans-serif"],
            },
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
                "button-yellow": "#f7d466",
                "button-blue": "#00acf8",
                "bg-border-gray": "#6d6d6d",
                accept: "#4d905e",
                "accept-icon": "#d9ed92",
                "button-transfer": "#f7d466",
                "icon-transfer": "#ffeeb8",
                "icon-transfer-border": "#b88c00",
                "icon-line": "#023e8a",
                header: "#caf0f8",
                "screen-grid": "#edf2f4",
                selected: "#b8d0eb",
                info: "#086a9b",
                success: "#486e52",
                warning: "#cbad14",
                error: "#b51d40",
            },
            backgroundImage: {
                "img-header":
                    'url(\'data:image/svg+xml,<svg width="500" height="91" xmlns="http://www.w3.org/2000/svg"><path d="M0 90h87.5c.833 0 1.757-.158 2.553-.407.795-.248 1.317-.542 2.002-1.016l60.89-42.154s1.363-.84 2.119-1.078c.782-.247 2.436-.345 2.436-.345H500" fill="none" stroke="%23000" stroke-linecap="round" stroke-linejoin="round"/></svg>\')',
            },
            keyframes: {
                "front-cover-triangule": {
                    "0%": { filter: "drop-shadow(0 0 0px var(--bg-color))" },
                    "100%": { filter: "drop-shadow(0 0 50px var(--bg-color))" },
                },
                "show-notification": {
                    "0%": {
                        opacity: 1,
                        left: "-100%",
                        "margin-top": "0",
                        "grid-template-rows": "0fr",
                    },
                    "6.25%": {
                        opacity: 1,
                        left: "-100%",
                        "margin-top": "5px",
                        "grid-template-rows": "1fr",
                    },
                    "12.5%, 87.5%": {
                        opacity: 1,
                        left: "0%",
                        "margin-top": "5px",
                        "grid-template-rows": "1fr",
                    },
                    "93.75%": {
                        opacity: 0,
                        left: "0%",
                        "margin-top": "5px",
                        "grid-template-rows": "1fr",
                    },
                    "100%": {
                        opacity: 0,
                        left: "0%",
                        "margin-top": "0",
                        "grid-template-rows": "0fr",
                    },
                },
            },
            animation: {
                "front-cover-triangule":
                    "front-cover-triangule 2s infinite ease-in-out",
                "show-notification":
                    "show-notification calc(var(--duration, 3s) + 1s) ease-in-out forwards",
                "far-near": "far-near 1s linear infinite",
            },
            size: {
                "screen-header-button": "30px",
                "screen-header-button-icon": "22px",
                "screen-header-button-icon-active": "20px",
            },
        },
    },
    plugins: [],
};
