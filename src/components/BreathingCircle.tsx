"use client"

import { useEffect, useRef, useState } from "react"

export interface BreathingPhase {
  name: string
  duration: number
  direction: "expand" | "contract" | "hold"
  instruction: string
}

export interface BreathingPattern {
  id: string
  name: string
  description: string
  phases: BreathingPhase[]
}

export const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    id: "normal",
    name: "Respiración normal",
    description: "Inhala 4s · Sostén 4s · Exhala 6s",
    phases: [
      { name: "Inhala", duration: 4, direction: "expand", instruction: "Inspira suavemente mientras el círculo se expande..." },
      { name: "Sostén", duration: 4, direction: "hold", instruction: "Haz una pausa, siente el aire en tu interior..." },
      { name: "Exhala", duration: 6, direction: "contract", instruction: "Exhala lentamente mientras el círculo se contrae..." },
    ],
  },
  {
    id: "box",
    name: "Respiración en caja (box breathing)",
    description: "Inhala 4s · Mantén 4s · Exhala 4s · Mantén 4s",
    phases: [
      { name: "Inhala", duration: 4, direction: "expand", instruction: "Inspira mientras el círculo crece..." },
      { name: "Mantén", duration: 4, direction: "hold", instruction: "Mantén el aire, siente la pausa..." },
      { name: "Exhala", duration: 4, direction: "contract", instruction: "Exhala mientras el círculo se reduce..." },
      { name: "Mantén", duration: 4, direction: "hold", instruction: "Vacío y en calma, sostenla pausa..." },
    ],
  },
  {
    id: "coherent",
    name: "Respiración coherente",
    description: "Inhala 5s · Exhala 5s",
    phases: [
      { name: "Inhala", duration: 5, direction: "expand", instruction: "Inspira suavemente, el círculo se expande..." },
      { name: "Exhala", duration: 5, direction: "contract", instruction: "Exhala lentamente, el círculo se contrae..." },
    ],
  },
]

const MIN_SCALE = 0.8
const MAX_SCALE = 1.15

interface BreathingCircleProps {
  pattern: BreathingPattern
  isActive: boolean
}

export default function BreathingCircle({ pattern, isActive }: BreathingCircleProps) {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>(pattern.phases[0])
  const frameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const isActiveRef = useRef(isActive)
  const patternRef = useRef(pattern)
  const resetRef = useRef(false)

  useEffect(() => {
    patternRef.current = pattern
  }, [pattern])

  useEffect(() => {
    isActiveRef.current = isActive

    if (!isActive) {
      resetRef.current = true
      return
    }

    const totalMs = pattern.phases.reduce((sum, p) => sum + p.duration * 1000, 0)
    startTimeRef.current = performance.now()
    resetRef.current = false

    const animate = (now: number) => {
      if (!isActiveRef.current) return

      if (resetRef.current) {
        setProgress(0)
        setCurrentPhase(patternRef.current.phases[0])
        resetRef.current = false
        return
      }

      const elapsed = (now - startTimeRef.current) % totalMs
      let accumulated = 0

      for (let i = 0; i < patternRef.current.phases.length; i++) {
        const phaseMs = patternRef.current.phases[i].duration * 1000
        if (elapsed < accumulated + phaseMs) {
          const phaseProgress = (elapsed - accumulated) / phaseMs
          setCurrentPhase(patternRef.current.phases[i])
          setProgress(phaseProgress)
          break
        }
        accumulated += phaseMs
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isActive, pattern])

  const getScale = (): number => {
    const p = currentPhase
    if (p.direction === "expand") return MIN_SCALE + (MAX_SCALE - MIN_SCALE) * progress
    if (p.direction === "contract") return MAX_SCALE - (MAX_SCALE - MIN_SCALE) * progress
    return progress < 0.5 ? MAX_SCALE : MIN_SCALE
  }

  const getInnerScale = (index: number): number => {
    const base = getScale()
    const factor = 1 - index * 0.025
    return base * factor
  }

  const getOpacity = (index: number): number => {
    const base = getScale()
    const normalized = (base - MIN_SCALE) / (MAX_SCALE - MIN_SCALE)
    return 0.35 + normalized * 0.35 - index * 0.05
  }

  const circles = [
    { size: 0, inset: "0rem" },
    { size: 1, inset: "0.75rem" },
    { size: 2, inset: "1.5rem" },
    { size: 3, inset: "2.25rem" },
    { size: 4, inset: "3rem" },
  ]

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary-light/15" />
          <div className="absolute inset-4 rounded-full bg-primary-light/8" />
          <span className="relative text-4xl opacity-40">○</span>
        </div>
        <p className="text-text-muted text-sm">La respiración aparecerá aquí al iniciar la práctica</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8" role="status" aria-live="polite">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {circles.map((c, i) => {
          const s = getInnerScale(i)
          const op = getOpacity(i)
          return (
            <div
              key={c.size}
              className="absolute rounded-full bg-primary"
              style={{
                inset: c.inset,
                transform: `scale(${s})`,
                opacity: Math.max(0.1, op),
                transition: "none",
              }}
            />
          )
        })}
        {circles.length > 0 && (
          <div
            className="absolute rounded-full bg-primary flex items-center justify-center"
            style={{
              inset: "3.5rem",
              transform: `scale(${getScale() * 0.85})`,
              opacity: Math.max(0.2, getOpacity(4) * 1.3),
              transition: "none",
            }}
          >
            <span className="text-white font-display text-sm font-medium" style={{ opacity: 1 }}>
              {currentPhase.name}
            </span>
          </div>
        )}
      </div>
      <p className="text-text-muted text-sm">{currentPhase.instruction}</p>
    </div>
  )
}
