import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import prefetch from "@astrojs/prefetch";

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
	adapter: vercel(),
});
