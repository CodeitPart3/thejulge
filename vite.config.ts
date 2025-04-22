import path from "path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import tsPathsConfig from "./tsconfig.paths.json";

const aliases = Object.entries(tsPathsConfig.compilerOptions.paths).map(
  ([key, [value]]) => ({
    find: key.replace("/*", ""),
    replacement: path.resolve(__dirname, value.replace("/*", "")),
  }),
);

//* https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: aliases,
  },
});
