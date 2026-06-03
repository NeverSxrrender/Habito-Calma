"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HabitCard from "@/components/HabitCard"
import categories from "@/data/categories.json"
import habitsData from "@/data/habits.json"
import type { Habit } from "@/types/habit"

const habits = habitsData as Habit[]

export default function CatalogoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHabits = useMemo(() => {
    return habits.filter((h) => {
      if (selectedCategory && h.categoryId !== selectedCategory) return false
      if (selectedDifficulty && h.difficulty !== selectedDifficulty) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return h.name.toLowerCase().includes(q) || h.summary.toLowerCase().includes(q)
      }
      return true
    })
  }, [selectedCategory, selectedDifficulty, searchQuery])

  return (
    <>
      <Header />
      <main>
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">Catálogo de hábitos</h1>
          <p className="text-text-muted mb-8">
            Explora todos los hábitos disponibles. Usa los filtros para encontrar lo que buscas.
          </p>

          <div className="space-y-4 mb-8">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Buscar hábitos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-muted/50 text-foreground text-sm placeholder:text-text-light focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
                aria-label="Buscar hábitos por nombre o descripción"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtros">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  selectedCategory === null
                    ? "bg-primary text-white"
                    : "bg-muted/50 text-text-muted hover:bg-muted"
                }`}
                aria-pressed={selectedCategory === null}
              >
                Todas las categorías
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? "bg-primary text-white"
                      : "bg-muted/50 text-text-muted hover:bg-muted"
                  }`}
                  aria-pressed={selectedCategory === cat.id}
                >
                  {cat.name}
                </button>
              ))}

              <span className="w-px h-6 bg-muted-dark self-center mx-1" aria-hidden="true" />

              {["bajo", "medio", "alto"].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? null : diff)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedDifficulty === diff
                      ? "bg-primary text-white"
                      : "bg-muted/50 text-text-muted hover:bg-muted"
                  }`}
                  aria-pressed={selectedDifficulty === diff}
                >
                  {diff === "bajo" ? "Baja dificultad" : diff === "medio" ? "Media dificultad" : "Alta dificultad"}
                </button>
              ))}
            </div>
          </div>

          {filteredHabits.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-muted text-lg mb-2">No hay hábitos con esos filtros</p>
              <p className="text-text-light text-sm">Prueba con otros filtros o términos de búsqueda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredHabits.map((habit) => (
                <HabitCard key={habit.slug} habit={habit} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-foreground transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
