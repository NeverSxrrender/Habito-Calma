"use client"

import { Barbell, Moon, Leaf, Brain } from "@phosphor-icons/react"
import Link from "next/link"
import type { Habit } from "@/types/habit"

export function CategoryIcon({ categoryId, className = "w-5 h-5" }: { categoryId: string; className?: string }) {
  switch (categoryId) {
    case "ejercicio-fisico":
      return <Barbell className={className} weight="duotone" color="#4a9e8a" />
    case "sueno-descanso":
      return <Moon className={className} weight="duotone" color="#4a9e8a" />
    case "alimentacion-basica":
      return <Leaf className={className} weight="duotone" color="#4a9e8a" />
    case "bienestar-mental":
      return <Brain className={className} weight="duotone" color="#4a9e8a" />
    default:
      return <Barbell className={className} weight="duotone" color="#4a9e8a" />
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
