import * as path from "path";

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const isCodeSandbox = "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env


export default defineConfig({
  root: "src/",
    publicDir: "../public/",
    base: "./",
    server:
    {
        host: true,
        open: !isCodeSandbox // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: true
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "./src"),
        },      
      ],
    },
    plugins: [svgr(), react()],
  });
  