"use client"

import Link from "next/link"
import { useRef, useEffect, useState, useMemo } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HabitCard from "@/components/HabitCard"
import CategoryPanel from "@/components/CategoryPanel"
import categories from "@/data/categories.json"
import habitsData from "@/data/habits.json"
import type { Habit, HabitCategory } from "@/types/habit"

const habits = habitsData as Habit[]
const allCategories = categories as HabitCategory[]

const categoryIcons: Record<string, string> = {
  "ejercicio-fisico": "🏃",
  "sueno-descanso": "🌙",
  "alimentacion-basica": "🥗",
  "bienestar-mental": "🧠",
}

const LEAVES = [
  { top: "8%", w: 22, h: 30, color: "#A8D5CB", anim: 1, dur: 9, del: 0 },
  { top: "25%", w: 15, h: 21, color: "#7FB5A8", anim: 2, dur: 11, del: 1.8 },
  { top: "42%", w: 18, h: 25, color: "#D4C9E0", anim: 3, dur: 8.5, del: 3.2 },
  { top: "58%", w: 13, h: 18, color: "#B8A9C9", anim: 1, dur: 10, del: 0.6 },
  { top: "72%", w: 20, h: 28, color: "#A8C5DA", anim: 2, dur: 12, del: 2.4 },
  { top: "85%", w: 16, h: 22, color: "#C8DDEB", anim: 3, dur: 9.5, del: 1.2 },
  { top: "18%", w: 12, h: 17, color: "#7FB5A8", anim: 1, dur: 13, del: 4.5 },
  { top: "65%", w: 17, h: 24, color: "#A8D5CB", anim: 2, dur: 10.5, del: 3.8 },
]

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = heroRef.current
    if (el) {
      el.classList.remove("opacity-0", "translate-y-8")
      el.classList.add("opacity-100", "translate-y-0")
    }
  }, [])

  const featuredHabits = habits.filter((h) => h.featured).slice(0, 8)

  const categoryHabits = useMemo(
    () => (selectedCategory ? habits.filter((h) => h.categoryId === selectedCategory.id) : []),
    [selectedCategory]
  )

  const openCategory = (cat: HabitCategory) => setSelectedCategory(cat)
  const closeCategory = () => setSelectedCategory(null)

  return (
    <>
      <Header />
      <main>
        <section
          ref={heroRef}
          className="min-h-[80dvh] flex flex-col items-center justify-center text-center px-4 py-20 opacity-0 translate-y-8 transition-all duration-[800ms] ease-out"
        >
            <div className="max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light/20 text-primary-dark text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" aria-hidden="true" />
                Bienestar basado en ciencia
              </div>

              <div
                className="relative overflow-hidden rounded-3xl"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-[2500ms] ${hovered ? "opacity-100" : "opacity-0"}`}>
                  {LEAVES.map((leaf, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        top: leaf.top,
                        width: leaf.w,
                        height: leaf.h,
                        borderRadius: "50% 0 50% 0",
                        background: leaf.color,
                        opacity: 0.4,
                        transform: "rotate(45deg)",
                        left: "-40px",
                        animation: hovered ? `leaf-drift-${leaf.anim} ${leaf.dur}s ease-in-out ${leaf.del}s infinite` : "none",
                      }}
                    />
                  ))}
                </div>

                <div className="relative min-h-[180px]">
                  <div className={`transition-all duration-[2500ms] ease-out will-change-transform ${hovered ? "translate-x-28 opacity-0" : ""}`}>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                      {"Hábito Calma".split(" ").map((word, i, arr) => (
                        <span
                          key={i}
                          className="inline-block transition-all duration-[1800ms] ease-out will-change-transform"
                          style={{ transitionDelay: hovered ? `${i * 120}ms` : `${(arr.length - 1 - i) * 120}ms` }}
                        >
                          {word}{i < arr.length - 1 ? "\u00A0" : ""}
                        </span>
                      ))}
                    </h1>

                    <p className="text-lg sm:text-xl text-text-muted font-light mb-3 max-w-lg mx-auto leading-relaxed">
                      Una biblioteca de hábitos para vivir con más calma y energía
                    </p>

                    <p className="text-sm sm:text-base text-text-light max-w-md mx-auto leading-relaxed mb-10">
                      Hábitos generales con base científica, explicados de forma sencilla. Sin prisa. Sin ruido. Sin datos personales.
                    </p>
                  </div>

                  <div className={`absolute inset-0 transition-all duration-[2500ms] ease-out will-change-transform ${hovered ? "translate-x-0 opacity-100" : "-translate-x-28 opacity-0"}`}>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
                      {"Hábito Calma".split(" ").map((word, i, arr) => (
                        <span
                          key={i}
                          className="inline-block transition-all duration-[1800ms] ease-out will-change-transform"
                          style={{ transitionDelay: hovered ? `${(arr.length - 1 - i) * 120}ms` : `${i * 120}ms` }}
                        >
                          {word}{i < arr.length - 1 ? "\u00A0" : ""}
                        </span>
                      ))}
                    </h1>

                    <p className="text-lg sm:text-xl text-text-muted font-light mb-3 max-w-lg mx-auto leading-relaxed">
                      Una biblioteca de hábitos para vivir con más calma y energía
                    </p>

                    <p className="text-sm sm:text-base text-text-light max-w-md mx-auto leading-relaxed mb-10">
                      Hábitos generales con base científica, explicados de forma sencilla. Sin prisa. Sin ruido. Sin datos personales.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Explorar hábitos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
        </section>

        <div
          className={`transition-all duration-[600ms] ease-in-out ${
            selectedCategory ? "opacity-30 scale-[0.97] pointer-events-none" : "opacity-100 scale-100"
          }`}
        >
          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="categorias">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-3">Categorías</h2>
            <p className="text-text-muted mb-8 max-w-lg">Explora hábitos organizados por área de bienestar.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => openCategory(cat)}
                  className="group p-6 rounded-2xl bg-surface border border-muted/40 hover:border-primary-light/40 hover:shadow-sm transition-all duration-400 text-left w-full"
                  aria-label={`Abrir panel: ${cat.name}`}
                >
                  <span className="text-3xl block mb-3">{categoryIcons[cat.id] || "📋"}</span>
                  <h3 className="font-display font-semibold text-foreground mb-1.5">{cat.name}</h3>
                  <p className="text-xs text-text-muted leading-relaxed">{cat.description}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-1">
                  Hábitos destacados
                </h2>
                <p className="text-text-muted">Seleccionados para empezar tu camino de calma.</p>
              </div>
              <Link
                href="/catalogo"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary-dark hover:text-primary transition-colors duration-200"
              >
                Ver todos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredHabits.map((habit) => (
                <HabitCard key={habit.slug} habit={habit} compact />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary-dark hover:text-primary transition-colors duration-200"
              >
                Ver todos los hábitos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="rounded-3xl bg-gradient-to-br from-primary-light/20 via-secondary-light/10 to-tertiary-light/20 p-8 sm:p-12 text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-foreground mb-3">
                Espacio de calma
              </h2>
              <p className="text-text-muted max-w-md mx-auto mb-6">
                Un lugar para detenerte y respirar. Prácticas guiadas, sonidos relajantes y un temporizador consciente.
              </p>
              <Link
                href="/espacio-calma"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-white font-medium text-sm hover:bg-secondary/80 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
              >
                Entrar al espacio de calma
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {selectedCategory && (
        <CategoryPanel
          category={selectedCategory}
          habits={categoryHabits}
          onClose={closeCategory}
        />
      )}

      <Footer />
    </>
  )
}
