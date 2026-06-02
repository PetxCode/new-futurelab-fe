import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favIcon.png", "logo.svg", "robots.txt", "tailwindcss.js"],
        workbox: {
          globPatterns: [
            "**/*.{js,css,html,ico,png,svg,webp,woff,woff2,ttf,eot}",
          ],
          globIgnores: ["**/node_modules/**/*", "**/dist/**/*"],
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
          runtimeCaching: [
            // Cache Unsplash images used in TailwindBattle
            {
              urlPattern: /^https:\/\/images\.unsplash\.com\/.*/,
              handler: "CacheFirst",
              options: {
                cacheName: "unsplash-images",
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
            // Cache images
            {
              urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif|webp)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
            // Cache CSS and JS
            {
              urlPattern: /^https:\/\/.*\.(css|js)$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "static-resources",
                expiration: {
                  maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
              },
            },
            // Cache fonts
            {
              urlPattern: /^https:\/\/fonts\..*\..*/,
              handler: "CacheFirst",
              options: {
                cacheName: "google-fonts",
                expiration: {
                  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                },
              },
            },
            // Cache CDN resources (Tailwind, etc)
            {
              urlPattern: /^https:\/\/cdn\..*\..*/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "cdn-resources",
                expiration: {
                  maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                },
              },
            },
            // Network first for API calls
            {
              urlPattern: /^https:\/\/api\..*/,
              handler: "NetworkFirst",
              options: {
                cacheName: "api-calls",
                expiration: {
                  maxAgeSeconds: 24 * 60 * 60, // 24 hours
                },
              },
            },
          ],
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
        },
        manifest: false, // Use public/manifest.json instead
        devOptions: {
          enabled: true,
          navigateFallback: "offline.html",
          suppressWarnings: true,
        },
      }),
    ],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
