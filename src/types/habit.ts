export interface HabitCategory {
  id: string
  name: string
  description: string
  introScientific: string
  icon: string
}

export interface Habit {
  slug: string
  name: string
  categoryId: string
  difficulty: "bajo" | "medio" | "alto"
  estimatedTime: string
  summary: string
  description: string
  scientificExplanation: string
  precautions: string
  howToStart: string[]
  commonMistakes: string[]
  mindfulnessSlug: string
  mindfulnessName: string
  featured?: boolean
}
