import { defineConfig } from 'vite';

export default defineConfig({
    root: 'html',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'html/index.html',
                cadastro: 'html/cadastro.html'
            }
        }
    }
});