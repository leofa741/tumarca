import type { Metadata } from "next";
import AsistenteIAContent from "./AsistenteIAContent";



export const metadata: Metadata = {
  title: "Asistente Inteligente para Empresas | IA que Atiende Clientes 24/7 | TuMarca",
  description:
    "Implementamos asistentes inteligentes que responden clientes las 24 horas, registran leads y ayudan a vender más.",
  keywords: [
    "asistente virtual empresas",
    "chat con IA",
    "IA para empresas",
    "chatbot inteligente",
    "automatización de ventas",
    "RAG",
    "Spring AI",
    "IA Argentina",
  ],
  alternates: {
    canonical: "https://www.tumarca.ar/asistente-ia",
  },
};

export default function Page() {
  return <AsistenteIAContent />;
}