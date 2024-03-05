import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "",
  plugins: [react(), viteTsconfigPaths()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "font-family": "Inter, sans-serif",
          "primary-color": "#2E16E6",
          "text-color": " #262626",
          "height-base": "40px",
          "height-lg": "64px",
          "height-sm": "24px",
          "zindex-message": "999999",
        },
      },
    },
  },
});
