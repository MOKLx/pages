import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import path from "path"

export const basePath: string = "pages/";

export default defineConfig({
  base: '/' + basePath,
  plugins: [tailwindcss(), reactRouter()],
  define: {
    "process.env.ROUTER_BASENAME": JSON.stringify("/pages"),
  },
  resolve: { 
    tsconfigPaths: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

