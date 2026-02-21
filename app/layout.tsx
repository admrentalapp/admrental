import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f0f0f",
};

export const metadata: Metadata = {
  title: {
    default: "ADM Rental Service | Locação de Máquinas e Equipamentos Pesados",
    template: "%s | ADM Rental Service",
  },
  description:
    "ADM Rental Service - Líder em locação de máquinas e equipamentos pesados no Brasil. Gruas, guindastes, caminhões e retroescavadeiras. Soluções para construção, mineração e infraestrutura. Solicite orçamento.",
  keywords: [
    "locação de equipamentos pesados",
    "locação de máquinas pesadas",
    "aluguel de grua",
    "aluguel de guindaste",
    "retroescavadeira locação",
    "caminhão munck",
    "ADM Rental Service",
    "equipamentos para construção",
    "terraplanagem",
    "mineração equipamentos",
    "linha içamento",
    "linha amarela",
  ],
  authors: [{ name: "ADM Rental Service", url: "https://admrental.com.br" }],
  creator: "ADM Rental Service",
  publisher: "ADM Rental Service",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://admrental.com.br"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://admrental.com.br",
    siteName: "ADM Rental Service",
    title: "ADM Rental Service | Locação de Máquinas e Equipamentos Pesados",
    description:
      "Líder em locação de máquinas pesadas. Gruas, guindastes, caminhões e retroescavadeiras para sua obra.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ADM Rental Service - Locação de Equipamentos Pesados para Construção e Mineração",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADM Rental Service | Locação de Equipamentos Pesados",
    description: "Líder em locação de máquinas pesadas. Gruas, guindastes e retroescavadeiras.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  category: "construction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
