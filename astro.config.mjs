import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import prefetch from "@astrojs/prefetch";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	site: "https://invoice-app-gusvianadev.vercel.app/",
	integrations: [
		react(),
		tailwind({
			applyBaseStyles: false,
		}),
		prefetch(),
	],
	output: "hybrid",
	adapter: node({
		mode: "standalone",
	}),
});
