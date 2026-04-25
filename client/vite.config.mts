import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { fileURLToPath, URL } from "url"

export default defineConfig({
    server: {
        host: true,
        allowedHosts: ['localhost', '127.0.0.1', '*.ngrok-free.app', '*.ngrok.io'],
        proxy: {
            "/api": {
                target: "http://localhost:4000",
                changeOrigin: true,
            },
        },
    },
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1600,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes("node_modules")) {
                        return id
                            .toString()
                            .split("node_modules/")[1]
                            .split("/")[0]
                            .toString()
                    }
                },
            },
        },
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: fileURLToPath(new URL("./src", import.meta.url)),
            },
        ],
    },
})
