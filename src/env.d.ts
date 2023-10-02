/// <reference types="astro/client" />
interface ImportMetaEnv {
	readonly PUBLIC_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
