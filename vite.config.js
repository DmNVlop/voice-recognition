import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Importa el plugin de Babel
import babel from "vite-plugin-babel";

import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(),
    // Agrega el plugin de Babel aquí
    babel({
      // Configuración de Babel
      babelConfig: {
        plugins: [
          "@babel/plugin-transform-runtime",
          "@babel/plugin-syntax-jsx",
        ],
        presets: ["@babel/preset-react"],
      },
    }),
  ],
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
