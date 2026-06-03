"use client"

import { useEffect, useRef, useState } from "react"

interface BreathingCircleProps {
  duration: number
  isActive: boolean
}

export default function BreathingCircle({ duration, isActive }: BreathingCircleProps) {
  const [phase, setPhase] = useState<"inhala" | "exhala" | "pausa">("inhala")
  const startTimeRef = useRef<number>(0)
  const frameRef = useRef<number>(0)
  const isActiveRef = useRef(isActive)

  useEffect(() => {
    isActiveRef.current = isActive

    if (!isActive) {
      return
    }

    const inhaleDuration = duration * 0.4 * 1000
    const holdDuration = duration * 0.2 * 1000
    const exhaleDuration = duration * 0.4 * 1000
    const totalCycle = inhaleDuration + holdDuration + exhaleDuration

    startTimeRef.current = performance.now()

    const animate = (now: number) => {
      if (!isActiveRef.current) {
        setPhase("inhala")
        return
      }

      const elapsed = (now - startTimeRef.current) % totalCycle

      if (elapsed < inhaleDuration) {
        setPhase("inhala")
      } else if (elapsed < inhaleDuration + holdDuration) {
        setPhase("pausa")
      } else {
        setPhase("exhala")
      }

      frameRef.current = requestAnimationFrame(animate)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [isActive, duration])

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary-light/20" />
          <div className="absolute inset-4 rounded-full bg-primary-light/10" />
          <span className="relative text-4xl opacity-50">○</span>
        </div>
        <p className="text-text-muted text-sm">La respiración aparecerá aquí al iniciar la práctica</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8" role="status" aria-live="polite">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full transition-all duration-[400ms] ease-in-out ${
            phase === "inhala"
              ? "bg-primary/20 scale-100 opacity-60"
              : phase === "pausa"
              ? "bg-primary/25 scale-110 opacity-70"
              : "bg-primary/15 scale-90 opacity-40"
          }`}
        />
        <div
          className={`absolute inset-4 rounded-full transition-all duration-[400ms] ease-in-out ${
            phase === "inhala"
              ? "bg-primary/30 scale-100"
              : phase === "pausa"
              ? "bg-primary/35 scale-110"
              : "bg-primary/20 scale-85"
          }`}
        />
        <div
          className={`absolute inset-12 rounded-full transition-all duration-[400ms] ease-in-out ${
            phase === "inhala"
              ? "bg-primary/40 scale-100"
              : phase === "pausa"
              ? "bg-primary/45 scale-110"
              : "bg-primary/25 scale-80"
          }`}
        />
        <div
          className={`absolute inset-[3.2rem] rounded-full transition-all duration-[400ms] ease-in-out ${
            phase === "inhala"
              ? "bg-primary/60 scale-100"
              : phase === "pausa"
              ? "bg-primary/65 scale-110"
              : "bg-primary/35 scale-75"
          }`}
        />
        <div
          className={`absolute inset-[4rem] rounded-full transition-all duration-[400ms] ease-in-out flex items-center justify-center ${
            phase === "inhala"
              ? "bg-primary/80 scale-100"
              : phase === "pausa"
              ? "bg-primary/85 scale-110"
              : "bg-primary/50 scale-70"
          }`}
        >
          <span className="text-white font-display text-sm font-medium">
            {phase === "inhala" ? "Inhala" : phase === "pausa" ? "Sostén" : "Exhala"}
          </span>
        </div>
      </div>
      <p className="text-text-muted text-sm">
        {phase === "inhala"
          ? "Inspira suavemente mientras el círculo se expande..."
          : phase === "pausa"
          ? "Haz una pausa, siente el aire en tu interior..."
          : "Exhala lentamente mientras el círculo se contrae..."}
      </p>
    </div>
  )
}
