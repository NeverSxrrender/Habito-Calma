"use client"

import Link from "next/link"
import type { Habit } from "@/types/habit"

export function CategoryIcon({ categoryId, className = "w-5 h-5" }: { categoryId: string; className?: string }) {
  switch (categoryId) {
    case "ejercicio-fisico":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 18 Q10 14 11 11" />
          <circle cx="12" cy="8" r="3.5" />
          <path d="M13.5 5 L17 3" />
          <circle cx="18.5" cy="3" r="2" />
        </svg>
      )
    case "sueno-descanso":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <path d="M19 3v4M21 5h-4" />
        </svg>
      )
    case "alimentacion-basica":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      )
    case "bienestar-mental":
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
        </svg>
      )
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      )
  }
}

const difficultyColors: Record<string, string> = {
  bajo: "bg-[#EAF2E8] text-[#3C7C4B] dark:bg-[#1D2E23] dark:text-[#6FBE82]",
  medio: "bg-[#FDF2E2] text-[#B25E00] dark:bg-[#302619] dark:text-[#E2983B]",
  alto: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
}

const difficultyLabels: Record<string, string> = {
  bajo: "Fácil",
  medio: "Media",
  alto: "Dificultad",
}

interface HabitCardProps {
  habit: Habit
  compact?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export default function HabitCard({ habit, compact, onClick }: HabitCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <article 
      onClick={handleClick}
      className="group bg-surface rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-muted/30 hover:border-primary-dark/30 flex flex-col cursor-pointer"
    >
      <div>
        <div className="flex gap-3 items-start mb-3">
          <div className="flex items-center justify-center w-9 h-9 p-2 rounded-xl bg-background text-primary-dark shrink-0">
            <CategoryIcon categoryId={habit.categoryId} className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-primary-dark transition-colors duration-200">
              {habit.name}
            </h3>
            <p className="text-[11px] text-text-light mt-1">{habit.estimatedTime}</p>
          </div>
        </div>

        {!compact && (
          <p className="text-text-muted text-[12px] leading-relaxed line-clamp-2 mt-2">
            {habit.summary}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4">
        <span
          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${difficultyColors[habit.difficulty]}`}
        >
          {difficultyLabels[habit.difficulty]}
        </span>

        <Link
          href={`/habito/${habit.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary-dark hover:text-primary transition-colors duration-200"
          aria-label={`Ver hábito: ${habit.name}`}
        >
          Ver hábito
          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
