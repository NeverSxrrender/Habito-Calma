"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ThemeToggle from "./ThemeToggle"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/espacio-calma", label: "Espacio de calma" },
  { href: "/sobre-este-proyecto", label: "Sobre este proyecto" },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const isEspacioCalma = pathname === "/espacio-calma"

  return (
    <header
      className={`${
        isEspacioCalma
          ? "fixed top-0 left-0 right-0 z-50 bg-[rgba(13,17,23,0.7)] backdrop-blur-md"
          : "sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-muted/50"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" aria-label="Navegación principal">
        <Link
          href="/"
          className={`text-xl font-semibold transition-colors duration-300 flex items-center gap-2 ${
            isEspacioCalma ? "text-white/90 hover:text-white" : "text-primary-dark hover:text-primary"
          }`}
          aria-label="Hábito Calma - Inicio"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-18 12 12)">
              <path
                d="M20.5 4 C20.5 12 12 20.5 4 20.5 C4 12.5 12.5 4 20.5 4 Z"
                fill="#4a9e8a"
              />
              <path
                d="M19 5.5 L5 19.5"
                stroke="#ffffff"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeOpacity="0.45"
              />
              <path
                d="M15 9 Q13 9.5 11 10.5"
                stroke="#ffffff"
                strokeWidth="0.9"
                strokeLinecap="round"
                fill="none"
                strokeOpacity="0.4"
              />
              <path
                d="M11 13 Q9 13.5 7 14.5"
                stroke="#ffffff"
                strokeWidth="0.9"
                strokeLinecap="round"
                fill="none"
                strokeOpacity="0.4"
              />
              <path
                d="M4 20.5 L2.5 22"
                stroke="#4a9e8a"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </svg>
          Hábito Calma
        </Link>

        <div className="flex items-center gap-1">
          {!isEspacioCalma && <ThemeToggle />}
          <button
            className={`sm:hidden p-2 rounded-lg transition-colors duration-200 ${
              isEspacioCalma ? "hover:bg-white/10" : "hover:bg-muted/50"
            }`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <svg className={`w-6 h-6 ${isEspacioCalma ? "text-white" : "text-foreground"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <ul className="hidden sm:flex items-center gap-1" role="list">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? isEspacioCalma
                        ? "bg-white/20 text-white"
                        : "bg-primary-light/30 text-primary-dark"
                      : isEspacioCalma
                        ? "text-white/60 hover:text-white hover:bg-white/10"
                        : "text-text-muted hover:text-foreground hover:bg-muted/50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
        </div>
      </nav>

      {open && (
        <div
          className={`sm:hidden border-t backdrop-blur-sm ${
            isEspacioCalma ? "border-white/10 bg-[#0d1117]/95" : "border-muted/50 bg-background/95"
          }`}
        >
          <ul className="px-4 py-3 space-y-1" role="list">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? isEspacioCalma
                          ? "bg-white/20 text-white"
                          : "bg-primary-light/30 text-primary-dark"
                        : isEspacioCalma
                          ? "text-white/60 hover:text-white hover:bg-white/10"
                          : "text-text-muted hover:text-foreground hover:bg-muted/50"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
        </ul>
        </div>
      )}
    </header>
  )
}
