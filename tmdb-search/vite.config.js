import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".", // Define a raiz como o diretório atual
  build: {
    outDir: "dist", // Especifica a pasta de saída para o build
  },
});
