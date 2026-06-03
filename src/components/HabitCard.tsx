"use client"

import Link from "next/link"
import type { Habit } from "@/types/habit"

const difficultyColors: Record<string, string> = {
  bajo: "bg-success/20 text-success",
  medio: "bg-warning/20 text-warning",
  alto: "bg-danger/20 text-danger",
}

const difficultyLabels: Record<string, string> = {
  bajo: "Bajo",
  medio: "Medio",
  alto: "Alto",
}

interface HabitCardProps {
  habit: Habit
  compact?: boolean
}

export default function HabitCard({ habit, compact }: HabitCardProps) {
  return (
    <article className="group bg-surface rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-500 border border-muted/40 hover:border-primary-light/40">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-display font-semibold text-foreground text-lg leading-tight">{habit.name}</h3>
        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${difficultyColors[habit.difficulty]}`}
        >
          {difficultyLabels[habit.difficulty]}
        </span>
      </div>

      {!compact && (
        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">{habit.summary}</p>
      )}

      <div className="flex items-center gap-3 mb-4 text-xs text-text-light">
        <span>{habit.estimatedTime}</span>
      </div>

      <Link
        href={`/habito/${habit.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-dark hover:text-primary transition-colors duration-200 group-hover:gap-2"
        aria-label={`Ver hábito: ${habit.name}`}
      >
        Ver hábito
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  )
}
