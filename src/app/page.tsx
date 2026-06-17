"use client"

import Link from "next/link"
import { useRef, useEffect, useState, useMemo } from "react"
import { Barbell, Moon, Leaf, Brain, Flask } from "@phosphor-icons/react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import HabitCard from "@/components/HabitCard"
import CategoryPanel from "@/components/CategoryPanel"
import categories from "@/data/categories.json"
import habitsData from "@/data/habits.json"
import type { Habit, HabitCategory } from "@/types/habit"

const habits = habitsData as Habit[]
const allCategories = categories as HabitCategory[]

// Category specific icon and color maps
const categoryMetaData: Record<string, {
  bgClass: string
  textClass: string
  icon: React.ReactNode
}> = {
  "ejercicio-fisico": {
    bgClass: "bg-[#1e3a2f] dark:bg-[#1e3a2f]",
    textClass: "text-[#4a9e8a] dark:text-[#4a9e8a]",
    icon: <Barbell size={28} weight="duotone" color="#4a9e8a" />
  },
  "sueno-descanso": {
    bgClass: "bg-[#1e3a2f] dark:bg-[#1e3a2f]",
    textClass: "text-[#4a9e8a] dark:text-[#4a9e8a]",
    icon: <Moon size={28} weight="duotone" color="#4a9e8a" />
  },
  "alimentacion-basica": {
    bgClass: "bg-[#1e3a2f] dark:bg-[#1e3a2f]",
    textClass: "text-[#4a9e8a] dark:text-[#4a9e8a]",
    icon: <Leaf size={28} weight="duotone" color="#4a9e8a" />
  },
  "bienestar-mental": {
    bgClass: "bg-[#1e3a2f] dark:bg-[#1e3a2f]",
    textClass: "text-[#4a9e8a] dark:text-[#4a9e8a]",
    icon: <Brain size={28} weight="duotone" color="#4a9e8a" />
  }
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
  
  // Filtering states for habits
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("all")
  const [filterLabel, setFilterLabel] = useState("Filtrar por categoría")
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = heroRef.current
    if (el) {
      el.classList.remove("opacity-0", "translate-y-8")
      el.classList.add("opacity-100", "translate-y-0")
    }
  }, [])

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".filter-container")) {
        setFilterOpen(false)
      }
    }
    document.addEventListener("click", handleOutsideClick)
    return () => document.removeEventListener("click", handleOutsideClick)
  }, [])

  // Filter habits list
  const filteredHabits = useMemo(() => {
    if (selectedFilterCategory === "all") return habits
    return habits.filter(h => h.categoryId === selectedFilterCategory)
  }, [selectedFilterCategory])

  const displayHabits = useMemo(() => filteredHabits.slice(0, 4), [filteredHabits])

  const categoryHabits = useMemo(
    () => (selectedCategory ? habits.filter((h) => h.categoryId === selectedCategory.id) : []),
    [selectedCategory]
  )

  const openCategory = (cat: HabitCategory) => setSelectedCategory(cat)
  const closeCategory = () => setSelectedCategory(null)

  const handleFilterSelect = (catId: string, label: string) => {
    setSelectedFilterCategory(catId)
    setFilterLabel(label)
    setFilterOpen(false)
  }

  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          
          {/* HERO */}
          <section
            ref={heroRef}
            className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-center bg-surface border border-muted/30 rounded-[32px] p-8 lg:p-12 shadow-sm transition-all duration-[800ms] ease-out opacity-0 translate-y-8"
          >
            <div className="space-y-8">
              <div className="relative rounded-3xl">
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
                <div className="relative min-h-[120px]">
                  <div className={`transition-all duration-[2500ms] ease-out will-change-transform ${hovered ? "translate-x-28 opacity-0 pointer-events-none" : ""}`}>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
                      {"Hábito Calma".split(" ").map((word, i, arr) => (
                        <span
                          key={i}
                          className="inline-block transition-all duration-[1800ms] ease-out will-change-transform"
                          style={{ transitionDelay: hovered ? `${i * 120}ms` : `${(arr.length - 1 - i) * 120}ms` }}
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                        >
                          {word}{i < arr.length - 1 ? "\u00A0" : ""}
                        </span>
                      ))}
                    </h1>
                    <p className="text-text-muted text-base sm:text-lg max-w-lg leading-relaxed">
                      Una biblioteca de hábitos para vivir con más calma, energía y bienestar.
                    </p>
                  </div>

                  <div className={`absolute inset-0 transition-all duration-[2500ms] ease-out will-change-transform ${hovered ? "translate-x-0 opacity-100" : "-translate-x-28 opacity-0 pointer-events-none"}`}>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight mb-4">
                      {"Hábito Calma".split(" ").map((word, i, arr) => (
                        <span
                          key={i}
                          className="inline-block transition-all duration-[1800ms] ease-out will-change-transform"
                          style={{ transitionDelay: hovered ? `${(arr.length - 1 - i) * 120}ms` : `${i * 120}ms` }}
                          onMouseEnter={() => setHovered(true)}
                          onMouseLeave={() => setHovered(false)}
                        >
                          {word}{i < arr.length - 1 ? "\u00A0" : ""}
                        </span>
                      ))}
                    </h1>
                    <p className="text-text-muted text-base sm:text-lg max-w-lg leading-relaxed">
                      Una biblioteca de hábitos para vivir con más calma, energía y bienestar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Three Science Features */}
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5f0] dark:bg-[#1a2e26]">
                  <Leaf size={16} className="text-[#3C7C4B] dark:text-[#6FBE82] shrink-0" />
                  <span className="font-semibold text-[13px] text-foreground whitespace-nowrap">Hábitos pequeños, cambios reales</span>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5f0] dark:bg-[#1a2e26]">
                  <Moon size={16} className="text-[#6E53B0] dark:text-[#9F8BE2] shrink-0" />
                  <span className="font-semibold text-[13px] text-foreground whitespace-nowrap">A tu ritmo, sin presión</span>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e8f5f0] dark:bg-[#1a2e26]">
                  <Flask size={16} className="text-[#B25E00] dark:text-[#E2983B] shrink-0" />
                  <span className="font-semibold text-[13px] text-foreground whitespace-nowrap">Con base científica</span>
                </div>
              </div>

              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-dark hover:bg-primary-dark/80 text-white font-semibold text-xs transition-all duration-300 shadow-xs hover:translate-y-[-1px] focus:outline-hidden"
              >
                Explorar hábitos
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            
            <div className="w-full flex justify-center items-center">
              <img
                src="/meditation_hero.jpg"
                alt="Ilustración meditación"
                loading="lazy"
                className="w-full max-w-[280px] h-auto object-contain dark:opacity-90"
              />
            </div>
          </section>

          {/* CATEGORIES */}
          <section id="categorias-seccion" className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Categorías de hábitos</h2>
              <p className="text-text-muted text-xs">Explora hábitos organizados por área de bienestar.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {allCategories.map((cat) => {
                const meta = categoryMetaData[cat.id] || {
                  bgClass: "bg-[#EAF2E8] dark:bg-[#1D2E23]",
                  textClass: "text-[#3C7C4B] dark:text-[#6FBE82]",
                  icon: "📋"
                }
                const count = habits.filter(h => h.categoryId === cat.id).length
                
                return (
                  <div
                    key={cat.id}
                    onClick={() => openCategory(cat)}
                    className="group bg-surface hover:shadow-md border border-muted/30 hover:border-primary-dark/30 rounded-2xl p-6 cursor-pointer flex flex-col gap-3 transition-all duration-300"
                  >
                    <div className="flex-1">
                      <div className={`rounded-xl flex items-center justify-center mb-4 p-2.5 ${meta.bgClass} ${meta.textClass}`}>
                        {meta.icon}
                      </div>
                      <h3 className="font-semibold text-foreground text-[17px] group-hover:text-primary-dark transition-colors duration-200 mb-1.5">
                        {cat.name}
                      </h3>
                      <p className="text-[13px] text-text-muted leading-relaxed line-clamp-3">
                        {cat.description}
                      </p>
                    </div>
                    
                    <span className="inline-block self-start text-[13px] font-semibold px-4 py-1.5 rounded-full bg-background text-text-muted mt-auto">
                      {count} {count === 1 ? "hábito" : "hábitos"}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ALL HABITS */}
          <section className="space-y-6">
            <div className="flex justify-between items-end border-b border-muted/20 pb-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">Todos los hábitos</h2>
                <p className="text-text-muted text-xs">Explora cada hábito y comienza tu cambio hoy.</p>
              </div>

              {/* Dynamic Filter Dropdown */}
              <div className="filter-container relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-surface hover:bg-background border border-muted/40 rounded-full text-xs font-semibold text-foreground transition-all duration-200"
                >
                  {filterLabel}
                  <svg className={`w-3.5 h-3.5 text-text-muted transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {filterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-surface border border-muted/30 rounded-xl shadow-lg z-30 py-1 overflow-hidden animate-fade-in-up">
                    <button
                      onClick={() => handleFilterSelect("all", "Todos")}
                      className={`w-full text-left px-4 py-2.5 text-xs transition-colors duration-150 ${selectedFilterCategory === "all" ? "bg-primary-light/20 font-semibold text-primary-dark" : "text-foreground hover:bg-background"}`}
                    >
                      Todos
                    </button>
                    {allCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleFilterSelect(cat.id, cat.name)}
                        className={`w-full text-left px-4 py-2.5 text-xs transition-colors duration-150 ${selectedFilterCategory === cat.id ? "bg-primary-light/20 font-semibold text-primary-dark" : "text-foreground hover:bg-background"}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Grid of habits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayHabits.map((habit) => (
                <HabitCard
                  key={habit.slug}
                  habit={habit}
                  onClick={() => {
                    const cat = allCategories.find((c) => c.id === habit.categoryId)
                    if (cat) openCategory(cat)
                  }}
                />
              ))}
            </div>

            {filteredHabits.length > 4 && (
              <div className="flex justify-center pt-2">
                <a
                  href="/catalogo"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-surface hover:bg-background border border-muted/40 rounded-full text-xs font-semibold text-foreground transition-all duration-200"
                >
                  Ver todos los hábitos
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            )}
          </section>

           {/* CALM SPACE SECTION */}
           <section className="py-8">
             <div className="rounded-3xl bg-gradient-to-br from-primary-light/30 via-tertiary-light/20 to-primary-light/10 p-8 sm:p-12 text-center border border-primary-light/20 animate-float hover:shadow-[0_16px_48px_rgba(74,158,138,0.3)] transition-all duration-[400ms] ease-in-out hover:scale-[1.03]">
               <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">
                 Espacio de calma
               </h2>
               <p className="text-text-muted max-w-md mx-auto mb-6 text-sm">
                 Un lugar para detenerte y respirar. Prácticas guiadas, sonidos relajantes y un temporizador consciente.
               </p>
               <Link
                 href="/espacio-calma"
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-dark hover:bg-primary-dark/80 text-white font-semibold text-xs transition-all duration-300 shadow-xs"
               >
                 Entrar al espacio de calma
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
               </Link>
             </div>
           </section>
        </div>
      </main>

      {/* DRAWER PANEL */}
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
