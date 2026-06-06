"use client"

import { useState, useEffect, useCallback } from "react"
import type { Habit, HabitCategory } from "@/types/habit"
import { CategoryIcon } from "./HabitCard"
import Link from "next/link"

const difficultyLabels: Record<string, string> = {
  bajo: "Fácil",
  medio: "Media",
  alto: "Dificultad",
}

const difficultyColors: Record<string, string> = {
  bajo: "bg-[#EAF2E8] text-[#3C7C4B] dark:bg-[#1D2E23] dark:text-[#6FBE82]",
  medio: "bg-[#FDF2E2] text-[#B25E00] dark:bg-[#302619] dark:text-[#E2983B]",
  alto: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
}

// Category details mapper for Drawer rich elements
const categoryExtraDetails: Record<string, {
  heroTitle: string
  heroDesc: string
  heroHighlight: string
  heroImage: string
  benefits: { icon: string; title: string; desc: string }[]
  steps: string[]
  emojis: Record<string, string>
}> = {
  "ejercicio-fisico": {
    heroTitle: "Muévete cada día (aunque sea poco)",
    heroDesc: "Tu cuerpo está hecho para moverse. Cuando no lo haces, pierde energía, fuerza y claridad mental.",
    heroHighlight: "Con solo 20–30 min al día puedes mejorar tu energía, reducir estrés y dormir mejor.",
    heroImage: "/exercise_illustration.png",
    benefits: [
      { icon: "⚡", title: "Más energía", desc: "Mejora tu vitalidad y rendimiento diario." },
      { icon: "😊", title: "Mejor ánimo", desc: "Reduce estrés y mejora tu bienestar." },
      { icon: "🌙", title: "Mejor descanso", desc: "Favorece un sueño más profundo." }
    ],
    steps: [
      "Empieza con pequeños pasos (10–15 min).",
      "Elige actividades que disfrutes.",
      "Sé constante, no perfecto."
    ],
    emojis: {
      "caminar-20-30-minutos": "🚶",
      "entrenamiento-de-fuerza-basico": "🏋️",
      "yoga-o-movilidad-diaria": "🧘"
    }
  },
  "sueno-descanso": {
    heroTitle: "Duerme bien, recarga tu cerebro",
    heroDesc: "El descanso nocturno de calidad limpia las toxinas acumuladas en el cerebro y consolida la memoria diaria.",
    heroHighlight: "Dormir de 7 a 9 horas seguidas mejora tu enfoque, reduce la fatiga mental y estabiliza tu humor.",
    heroImage: "/meditation_hero.jpg",
    benefits: [
      { icon: "🧠", title: "Foco mental", desc: "Consolida tu aprendizaje y memoria." },
      { icon: "🛡️", title: "Estabilidad", desc: "Regula las emociones y reduce el estrés." },
      { icon: "🔧", title: "Reparación", desc: "Regenera tus músculos y sistema inmune." }
    ],
    steps: [
      "Evita pantallas 45 minutos antes de dormir.",
      "Mantén tu habitación fresca y completamente a oscuras.",
      "Intenta levantarte a la misma hora todos los días."
    ],
    emojis: {
      "horario-regular-de-sueno": "⏰",
      "rutina-nocturna-sin-pantallas": "📵",
      "ambiente-de-sueno-optimo": "🌌"
    }
  },
  "alimentacion-basica": {
    heroTitle: "Alimentación real y consciente",
    heroDesc: "Comer bien no se trata de dietas restrictivas, sino de elegir ingredientes densos en nutrientes y comer con calma.",
    heroHighlight: "Una hidratación adecuada y masticar lento previenen la fatiga y mejoran la absorción de energía.",
    heroImage: "/meditation_hero.jpg",
    benefits: [
      { icon: "🥗", title: "Digestión óptima", desc: "Reduce la inflamación y pesadez." },
      { icon: "🔋", title: "Energía estable", desc: "Evita los bajones y picos de insulina." },
      { icon: "💡", title: "Claridad mental", desc: "Aporta grasas buenas para las neuronas." }
    ],
    steps: [
      "Toma un vaso de agua al despertar.",
      "Dedica al menos 20 minutos a comer sin ver pantallas.",
      "Suma una verdura fresca o fruta a cada comida."
    ],
    emojis: {
      "comer-a-horas-regulares": "🍽️",
      "reducir-ultraprocesados": "🥦",
      "comer-sin-pantallas": "🧘",
      "hidratacion-constante": "💧"
    }
  },
  "bienestar-mental": {
    heroTitle: "Calma tu mente del ruido diario",
    heroDesc: "El estrés y la sobreestimulación digital agotan tus recursos cognitivos. Las pausas de presencia devuelven el equilibrio.",
    heroHighlight: "Con solo unos minutos de respiración pausada regulas el ritmo cardíaco y calmas la rumiación.",
    heroImage: "/meditation_hero.jpg",
    benefits: [
      { icon: "🧘", title: "Menos estrés", desc: "Baja los niveles de cortisol activamente." },
      { icon: "🎯", title: "Foco claro", desc: "Reduce la fatiga por multitarea." },
      { icon: "🌱", title: "Resiliencia", desc: "Mejor regulación ante imprevistos." }
    ],
    steps: [
      "Realiza 3 respiraciones profundas al sentir tensión.",
      "Escribe dos cosas sencillas por las que estás agradecido.",
      "Tómate 10 minutos para pasear o descansar sin el móvil."
    ],
    emojis: {
      "respiracion-consciente-diaria": "💨",
      "pausa-digital-diaria": "📵",
      "diario-de-gratitud": "📓",
      "vaciado-mental-antes-de-dormir": "🧹"
    }
  }
}

interface CategoryPanelProps {
  category: HabitCategory
  habits: Habit[]
  onClose: () => void
}

export default function CategoryPanel({ category, habits, onClose }: CategoryPanelProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 200)
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

  const extra = categoryExtraDetails[category.id] || {
    heroTitle: `Hábitos de ${category.name}`,
    heroDesc: category.description,
    heroHighlight: "",
    heroImage: "/meditation_hero.jpg",
    benefits: [],
    steps: [],
    emojis: {}
  }

  // Category classes for background accents
  const categoryBgClasses: Record<string, string> = {
    "ejercicio-fisico": "bg-[#EAF2E8] text-[#3C7C4B] dark:bg-[#1D2E23] dark:text-[#6FBE82]",
    "sueno-descanso": "bg-[#ECEAF5] text-[#6E53B0] dark:bg-[#201B2E] dark:text-[#9F8BE2]",
    "alimentacion-basica": "bg-[#FDF2E2] text-[#B25E00] dark:bg-[#302619] dark:text-[#E2983B]",
    "bienestar-mental": "bg-[#E4EEF8] text-[#3578A7] dark:bg-[#1A2835] dark:text-[#67A6D2]",
  }

  const iconBgClass = categoryBgClasses[category.id] || "bg-[#EAF2E8] text-[#3C7C4B]"

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-200 ease-out ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label={`Panel de ${category.name}`}
      />

      {/* DRAWER CONTAINER */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[580px] bg-surface border-l border-muted/30 shadow-2xl transition-transform duration-200 ease-out transform overflow-y-auto flex flex-col ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ scrollbarWidth: "thin", scrollbarColor: "#D5D0C8 transparent" }}
      >
        <div className="p-10 space-y-8 flex-1">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center p-3 ${iconBgClass}`}>
                <CategoryIcon categoryId={category.id} className="w-6 h-6" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">{category.name}</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full text-text-muted hover:text-foreground hover:bg-muted/30 transition-colors duration-200"
              aria-label="Cerrar panel"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Banner Hero Card */}
          <div className="bg-[#F2F7F2] dark:bg-[#1A2821] border border-primary-dark/8 dark:border-primary-dark/20 rounded-2xl p-7 flex gap-5 items-center">
            <div className="flex-1">
              <h3 className="font-display font-bold text-foreground text-[16px] leading-snug mb-2">
                {extra.heroTitle}
              </h3>
              <p className="text-text-muted text-[12.5px] leading-relaxed mb-3">
                {extra.heroDesc}
              </p>
              {extra.heroHighlight && (
                <p className="text-primary-dark font-semibold text-[12.5px] leading-relaxed">
                  {extra.heroHighlight}
                </p>
              )}
            </div>
            <div className="w-[130px] shrink-0 relative flex justify-center">
              <img
                src={extra.heroImage}
                alt={category.name}
                width={130}
                height={130}
                className="object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>

          {/* Beneficios Principales */}
          {extra.benefits.length > 0 && (
            <div>
              <h4 className="text-[13px] font-bold text-foreground tracking-wider uppercase mb-4">
                Beneficios principales
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {extra.benefits.map((b, idx) => (
                  <div key={idx} className="bg-background rounded-2xl p-4 text-center flex flex-col items-center gap-2 border border-muted/20">
                    <div className="w-9 h-9 rounded-full bg-surface shadow-xs flex items-center justify-center text-lg">
                      {b.icon}
                    </div>
                    <span className="font-semibold text-[12px] text-foreground">{b.title}</span>
                    <span className="text-[10px] text-text-muted leading-tight">{b.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cómo empezar */}
          {extra.steps.length > 0 && (
            <div>
              <h4 className="text-[13px] font-bold text-foreground tracking-wider uppercase mb-4">
                Cómo empezar
              </h4>
              <div className="flex flex-col gap-3.5">
                {extra.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3.5 items-center">
                    <div className="w-7 h-7 rounded-full bg-primary-dark text-white font-bold text-[12px] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-foreground text-[13px] font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hábitos de la Categoría */}
          <div>
            <h4 className="text-[13px] font-bold text-foreground tracking-wider uppercase mb-4">
              Hábitos de {category.name.toLowerCase()} ({habits.length})
            </h4>
            <div className="flex flex-col gap-3.5">
              {habits.map((habit) => {
                const habitEmoji = extra.emojis[habit.slug] || "📋"
                return (
                  <article key={habit.slug} className="bg-background rounded-2xl p-5 flex items-center justify-between gap-4 border border-muted/20">
                    <div className="flex gap-3.5 items-center min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center text-xl shrink-0 shadow-xs">
                        {habitEmoji}
                      </div>
                      <div className="min-w-0 flex flex-col gap-1">
                        <h5 className="font-display font-semibold text-foreground text-[13px] truncate">
                          {habit.name}
                        </h5>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-text-light">{habit.estimatedTime}</span>
                          <span className="text-[10px] text-text-light">•</span>
                          <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${difficultyColors[habit.difficulty]}`}>
                            {difficultyLabels[habit.difficulty]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/habito/${habit.slug}`}
                      className="px-5 py-2 bg-primary-dark hover:bg-primary-dark/80 text-white rounded-full text-[13px] font-semibold shrink-0 transition-colors duration-200"
                    >
                      Empezar
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-10 border-t border-muted/30 bg-surface flex flex-col items-center gap-5">
          <div className="text-[13px] text-text-muted italic flex items-center gap-2">
            <svg className="w-4 h-4 text-primary-dark opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.192 15.757c0-.962-.399-1.923-1.197-2.692-.8-.77-1.801-1.155-3.003-1.155H6.5v-.462c0-1.859.506-3.327 1.519-4.403C9.032 6.01 10.519 5.42 12.5 5.27l-.462-1.924c-2.73.256-4.838 1.25-6.326 2.98C4.225 8.056 3.48 10.366 3.48 13.257c0 2.213.628 3.974 1.884 5.282 1.256 1.308 2.808 1.962 4.654 1.962.962 0 1.859-.385 2.692-1.154.833-.77 1.25-1.764 1.25-2.98 0-.61-.096-1.17-.288-1.61zm10 0c0-.962-.399-1.923-1.197-2.692-.8-.77-1.801-1.155-3.003-1.155H16.5v-.462c0-1.859.506-3.327 1.519-4.403 1.013-1.077 2.502-1.667 4.481-1.817l-.462-1.924c-2.73.256-4.838 1.25-6.326 2.98-1.487 1.73-2.232 4.04-2.232 6.931 0 2.213.628 3.974 1.884 5.282 1.256 1.308 2.808 1.962 4.654 1.962.962 0 1.859-.385 2.692-1.154.833-.77 1.25-1.764 1.25-2.98 0-.61-.096-1.17-.288-1.61z"/>
            </svg>
            Pequeños hábitos, grandes cambios.
          </div>
          <button
            onClick={handleClose}
            className="w-full text-center py-3 rounded-full border border-muted-dark/50 hover:bg-background text-foreground text-[13px] font-semibold transition-all duration-200"
          >
            Volver al catálogo
          </button>
        </div>
      </div>
    </>
  )
}
