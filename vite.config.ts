import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// base './' keeps asset paths relative, so the build works on any host or sub-folder.
// viteSingleFile inlines JS + CSS into dist/index.html, so the built page also opens by double-click.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
});
