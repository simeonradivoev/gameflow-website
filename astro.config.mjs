// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV, process.cwd(), '');

// https://astro.build/config
export default defineConfig({
    site: env.SITE_URL,
    base: env.SITE_BASE,
    vite: {
        plugins: [
            tailwindcss()
        ]
    }
});