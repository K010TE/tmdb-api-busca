import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

// Ajustar o caminho do arquivo .env para a raiz do projeto
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Variáveis carregadas pelo dotenv:", process.env.VITE_API_TOKEN);

export default defineConfig({
  plugins: [react()],
});
