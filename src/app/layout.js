import { Inter } from "next/font/google";
import '@/styles/main.scss';
import Header from "@/components/Header";
import ClientHeader from "@/components/ClientHeader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "InfraConnect",
  description: "InfraConnect é uma plataforma de gerenciamento de infraestrutura de TI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="shortcut icon" href="https://img.icons8.com/?size=100&id=2344&format=png&color=8801a3" type="image/x-icon" />
      </head>
      <body className={`${inter.variable}`}>
        <ClientHeader />
        {children}
      </body>
    </html>
  );
}
