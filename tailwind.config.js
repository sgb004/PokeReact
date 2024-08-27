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
                cancel: "#c1121f",
                "icon-cancel": "#ff9b9b",
                "button-transfer": "#f7d466",
                "icon-transfer": "#ffeeb8",
                "icon-transfer-border": "#b88c00",
                "icon-line": "#023e8a",
                header: "#caf0f8",
                "screen-grid": "#edf2f4",
                "screen-grid-recent": "#e3f2f7",
                selected: "#b8d0eb",
                info: "#086a9b",
                success: "#486e52",
                warning: "#cbad14",
                error: "#b51d40",
                stats: "#ffa62b",
                "stats-full": "#ef233c",
                "stats-full-alt": "#d24119",
                "icon-favorite": "#ffc300",
                "icon-edit": "#ff9770",
                "stat-slider": "#edede9",
                "edit-back": "#faf8ef",
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
                "backdrop-grey-scale": {
                    "0%": {
                        background: "rgba(0, 0, 0, 0)",
                        "backdrop-filter": "grayscale(0)",
                    },
                    "100%": {
                        background: "rgba(0, 0, 0, 0.5)",
                        "backdrop-filter": "grayscale(100%)",
                    },
                },
                in: {
                    "0%": {
                        opacity: 0,
                    },
                    "100%": {
                        opacity: 1,
                    },
                },
                "show-recent": {
                    from: {
                        "grid-template-rows": "0fr",
                    },
                    to: {
                        "grid-template-rows": "1fr",
                    },
                },
                "hide-recent": {
                    from: {
                        "grid-template-rows": "1fr",
                    },
                    to: {
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
                "backdrop-grey-scale":
                    "backdrop-grey-scale 0.5s forwards ease-in",
                in: "in 0.25s ease-in",
                "show-recent": "show-recent 0.5s ease-out forwards",
                "hide-recent": "hide-recent 0.5s ease-out forwards",
                "up-down": "up-down 1s linear infinite",
                "screen-go-top": "screen-go-top 0.35s ease-in forwards",
                "screen-go-bottom":
                    "screen-go-bottom 0.7s ease-in-out forwards",
            },
            size: {
                "screen-header-button": "30px",
                "screen-header-button-icon": "22px",
                "screen-header-button-icon-active": "20px",
            },
            screens: {
                xs: "440px",
            },
        },
    },
    plugins: [],
};
