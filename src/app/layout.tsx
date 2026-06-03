import type { Metadata } from "next"
import { Inter, Quicksand } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Hábito Calma — Biblioteca de hábitos para vivir con calma",
  description:
    "Hábitos generales con base científica, explicados de forma sencilla. Sin prisa. Sin ruido. Sin datos personales.",
  keywords: ["hábitos", "calma", "bienestar", "salud", "mindfulness", "relajación"],
  authors: [{ name: "Hábito Calma" }],
  metadataBase: new URL("https://habito-calma.vercel.app"),
  openGraph: {
    title: "Hábito Calma",
    description: "Una biblioteca de hábitos para vivir con más calma y energía.",
    type: "website",
    locale: "es_ES",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`scroll-smooth ${inter.variable} ${quicksand.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        {children}
      </body>
    </html>
  )
}
