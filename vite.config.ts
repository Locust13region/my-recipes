import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	// plugins: [react()],
	plugins: [
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "My recipes",
				short_name: "MR",
				description: "Мои рецепты",
				orientation: "portrait",
				display: "standalone",
				theme_color: "#ffffff",
				icons: [
					{
						sizes: "16x16",
						src: "/img/favicon.png",
						type: "image/png",
					},
					{
						src: "/img/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/img/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	server: {
		host: true,
	},
	base: "/my-recipes",
});
