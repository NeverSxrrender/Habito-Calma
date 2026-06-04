"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import type { Habit, HabitCategory } from "@/types/habit"

const difficultyLabels: Record<string, string> = {
  bajo: "Baja",
  medio: "Media",
  alto: "Alta",
}

const difficultyColors: Record<string, string> = {
  bajo: "bg-success/20 text-success",
  medio: "bg-warning/20 text-warning",
  alto: "bg-danger/20 text-danger",
}

interface CategoryPanelProps {
  category: HabitCategory
  habits: Habit[]
  onClose: () => void
}

export default function CategoryPanel({ category, habits, onClose }: CategoryPanelProps) {
  const [openHabit, setOpenHabit] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 400)
  }, [onClose])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose()
  }

  const toggleHabit = (slug: string) => {
    setOpenHabit(openHabit === slug ? null : slug)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center transition-opacity duration-[400ms] ease-in-out ${
        visible ? "bg-black/15" : "bg-transparent pointer-events-none"
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Panel de ${category.name}`}
    >
      <div
        className={`mt-16 mb-16 w-[85%] sm:w-[75%] lg:w-[70%] max-w-4xl max-h-[82dvh] overflow-y-auto rounded-3xl bg-surface shadow-xl border border-muted/30 transition-all duration-[400ms] ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#D5D0C8 transparent" }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 bg-surface/95 border-b border-muted/30 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl">{category.icon}</span>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-foreground">{category.name}</h2>
          </div>
          <button
            onClick={handleClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-text-muted hover:text-foreground hover:bg-muted/50 transition-colors duration-300"
            aria-label="Cerrar panel"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cerrar
          </button>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-8">
          <div className="bg-primary-light/8 rounded-xl p-4 sm:p-5 border border-primary-light/15">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">{category.introScientific}</p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground text-base mb-4 flex items-center gap-2">
              <span className="w-1 h-5 rounded-full bg-primary" aria-hidden="true" />
              Hábitos de {category.name.toLowerCase()}
              <span className="text-xs font-normal text-text-muted">({habits.length})</span>
            </h3>

            <div className="space-y-3">
              {habits.map((habit) => {
                const isOpen = openHabit === habit.slug
                return (
                  <article
                    key={habit.slug}
                    className={`rounded-xl border transition-colors duration-400 ${
                      isOpen
                        ? "border-primary-light/40 bg-primary-light/5"
                        : "border-muted/40 bg-surface hover:border-muted-dark/50"
                    }`}
                  >
                    <button
                      onClick={() => toggleHabit(habit.slug)}
                      className="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display font-medium text-foreground text-sm sm:text-base leading-snug">
                          {habit.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColors[habit.difficulty]}`}>
                            {difficultyLabels[habit.difficulty]}
                          </span>
                          <span className="text-xs text-text-light">{habit.estimatedTime}</span>
                        </div>
                      </div>
                      <svg
                        className={`w-4 h-4 shrink-0 text-text-muted transition-transform duration-400 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 space-y-5 border-t border-muted/20 pt-4 animate-fade-in-up">
                        <div>
                          <h5 className="font-display font-semibold text-foreground text-sm mb-1.5">Qué es</h5>
                          <p className="text-foreground text-sm leading-relaxed">{habit.description}</p>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-foreground text-sm mb-1.5">Por qué ayuda</h5>
                          <div className="bg-primary-light/15 rounded-lg p-3.5 border border-primary-light/20">
                            <p className="text-foreground text-sm leading-relaxed">{habit.scientificExplanation}</p>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-foreground text-sm mb-1.5">Cómo empezar hoy</h5>
                          <ol className="space-y-1.5">
                            {habit.howToStart.map((step, i) => (
                              <li key={i} className="flex gap-2 text-sm">
                                <span className="shrink-0 w-5 h-5 rounded-full bg-primary-light/30 text-primary-dark flex items-center justify-center text-[10px] font-semibold mt-0.5">
                                  {i + 1}
                                </span>
                                <span className="text-foreground leading-relaxed">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div>
                          <h5 className="font-display font-semibold text-foreground text-sm mb-1.5">Errores comunes</h5>
                          <ul className="space-y-1">
                            {habit.commonMistakes.map((mistake, i) => (
                              <li key={i} className="flex gap-1.5 text-sm">
                                <span className="shrink-0 text-danger mt-0.5" aria-hidden="true">
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </span>
                                <span className="text-foreground leading-relaxed">{mistake}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gradient-to-r from-secondary-light/20 via-tertiary-light/10 to-primary-light/20 rounded-xl p-4 text-center">
                          <p className="text-xs text-text-muted mb-1.5">
                            Complementa este hábito con{' '}
                            <strong>{habit.mindfulnessName}</strong>
                          </p>
                          <Link
                            href="/espacio-calma"
                            className="inline-flex items-center gap-1 text-xs font-medium text-secondary hover:text-secondary/80 transition-colors duration-200"
                            onClick={() => setTimeout(handleClose, 100)}
                          >
                            Ir a {habit.mindfulnessName}
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex justify-center p-4 bg-surface/95 border-t border-muted/30 rounded-b-3xl">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary/10 text-primary-dark text-sm font-medium hover:bg-primary/20 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Volver
          </button>
        </div>
      </div>
    </div>
  )
}
