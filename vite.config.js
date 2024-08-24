import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: "buffer", // Alias 'buffer' module
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Define 'global' as 'globalThis' for browser
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true, // Polyfill Buffer
        }),
      ],
    },
  },
});
