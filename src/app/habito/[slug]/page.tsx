"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import habitsData from "@/data/habits.json"
import categories from "@/data/categories.json"
import type { Habit } from "@/types/habit"

const habits = habitsData as Habit[]

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

export default function HabitoPage() {
  const params = useParams()
  const slug = params.slug as string

  const habit = useMemo(() => habits.find((h) => h.slug === slug), [slug])
  const category = useMemo(
    () => categories.find((c) => c.id === habit?.categoryId),
    [habit?.categoryId]
  )

  if (!habit) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <h1 className="font-display text-2xl font-semibold text-foreground mb-2">Hábito no encontrado</h1>
            <p className="text-text-muted mb-6">El hábito que buscas no existe o ha sido eliminado.</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-200"
            >
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-foreground transition-colors duration-200 mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Volver al catálogo
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
              {category && <span>{category.name}</span>}
              <span aria-hidden="true">·</span>
              <span className={`px-2 py-0.5 rounded-full ${difficultyColors[habit.difficulty]}`}>
                Dificultad {difficultyLabels[habit.difficulty]}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-3">
              {habit.name}
            </h1>

            <p className="text-text-muted text-lg font-light leading-relaxed">{habit.summary}</p>

            <div className="flex items-center gap-4 mt-4 text-sm text-text-muted">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {habit.estimatedTime}
              </span>
            </div>
          </header>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Qué es</h2>
            <p className="text-foreground leading-relaxed">{habit.description}</p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Por qué ayuda</h2>
            <div className="bg-primary-light/10 rounded-2xl p-6 border border-primary-light/20">
              <p className="text-foreground leading-relaxed text-[15px]">{habit.scientificExplanation}</p>
            </div>
          </section>

          {habit.precautions && (
            <section className="mb-10">
              <h2 className="font-display text-xl font-semibold text-foreground mb-3">Cuándo evitarlo / Precauciones</h2>
              <div className="bg-warning/10 rounded-2xl p-6 border border-warning/20">
                <p className="text-foreground leading-relaxed text-[15px]">{habit.precautions}</p>
              </div>
            </section>
          )}

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Cómo empezar hoy</h2>
            <ol className="space-y-3">
              {habit.howToStart.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-primary-light/30 text-primary-dark flex items-center justify-center text-xs font-semibold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-foreground leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">Errores comunes</h2>
            <ul className="space-y-2">
              {habit.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex gap-2 text-foreground leading-relaxed">
                  <span className="shrink-0 text-danger mt-1" aria-hidden="true">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-10">
            <div className="bg-gradient-to-br from-secondary-light/20 via-tertiary-light/10 to-primary-light/20 rounded-2xl p-6 sm:p-8 text-center">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">Mindfulness asociado</h2>
              <p className="text-text-muted text-sm mb-4">
                Complementa este hábito con la práctica de <strong>{habit.mindfulnessName}</strong> en el Espacio de Calma.
              </p>
              <Link
                href={`/espacio-calma`}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-secondary text-white text-sm font-medium hover:bg-secondary/80 transition-colors duration-300"
              >
                Ir a {habit.mindfulnessName}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>

          <div className="border-t border-muted/40 pt-8 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Volver al catálogo
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
