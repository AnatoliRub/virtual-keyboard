// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
import { resolve } from 'path';

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    base: './',
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname),
    build: {
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        cssMinify: false,
    },
});
