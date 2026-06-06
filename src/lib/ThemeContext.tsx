"use client"

import { createContext, useContext, useState, useCallback, useLayoutEffect } from "react"

type ThemeContextValue = {
  dark: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({
  children,
  initialDark,
}: {
  children: React.ReactNode
  initialDark: boolean
}) {
  const [dark, setDark] = useState(initialDark)

  useLayoutEffect(() => {
    if (initialDark) return
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (stored === "dark" || (!stored && prefersDark)) {
      setDark(true)
      document.documentElement.classList.add("dark")
      document.cookie = "theme=dark;path=/;max-age=31536000"
    }
  }, [initialDark])

  const toggle = useCallback(() => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    document.cookie = `theme=${next ? "dark" : "light"};path=/;max-age=31536000`
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
