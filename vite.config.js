import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
    let host = "localhost";

    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    host = process.env.VITE_APP_HOST || host;

    return defineConfig({
        plugins: [
            react(),
            laravel({
                input: ["resources/css/app.css", "resources/js/app.jsx"],
                refresh: true,
            }),
        ],
        server: {
            hmr: {
                host,
            },
            host,
        },
    });
};
