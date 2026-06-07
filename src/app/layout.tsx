import type { Metadata } from "next"
import { Nunito, Plus_Jakarta_Sans } from "next/font/google"
import { cookies } from "next/headers"
import "./globals.css"
import BackgroundLayer from "@/components/BackgroundLayer"
import { ThemeProvider } from "@/lib/ThemeContext"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
  weight: ["400", "600", "700"],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get("theme")
  const isDark = themeCookie?.value === "dark"

  return (
    <html lang="es" className={`scroll-smooth ${nunito.variable} ${plusJakartaSans.variable}${isDark ? " dark" : ""}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <ThemeProvider initialDark={isDark}>
          <BackgroundLayer />
          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
