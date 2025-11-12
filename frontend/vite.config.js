// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      // Proxy requests starting to the backend for development
      "/api": {
        target: "http://localhost:8090", // The target backend server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        // rewrite: (path) => path.replace(/^\/api/, ""), // Rewrites the path by removing '/api'
        secure: false, // Set to true for HTTPS targets, false for HTTP
        // Optionally, add an agent for handling specific HTTP agents like for self-signed certificates
        // agent: new http.Agent(),
      },
      "/tiles": {
        target: "http://localhost:8090", // The target backend server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        // rewrite: (path) => path.replace(/^\/api/, ""), // Rewrites the path by removing '/api'
        secure: false, // Set to true for HTTPS targets, false for HTTP
        // Optionally, add an agent for handling specific HTTP agents like for self-signed certificates
        // agent: new http.Agent(),
      },
      "/_": {
        target: "http://localhost:8090", // The target backend server
        changeOrigin: true, // Changes the origin of the host header to the target URL
        // rewrite: (path) => path.replace(/^\/_/, ""), // Rewrites the path by removing '/api'
        secure: false, // Set to true for HTTPS targets, false for HTTP
        // Optionally, add an agent for handling specific HTTP agents like for self-signed certificates
        // agent: new http.Agent(),
      },
    },
  },
});
