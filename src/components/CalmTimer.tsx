"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface CalmTimerProps {
  initialMinutes: number
  onComplete: () => void
}

export default function CalmTimer({ initialMinutes, onComplete }: CalmTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const initialMinutesRef = useRef(initialMinutes)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (initialMinutes !== initialMinutesRef.current) {
      initialMinutesRef.current = initialMinutes
      setSecondsLeft(initialMinutes * 60)
    }
  }, [initialMinutes])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearTimer()
            setIsRunning(false)
            onCompleteRef.current()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return clearTimer
  }, [isRunning, secondsLeft, clearTimer])

  const handleStart = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(initialMinutes * 60)
    }
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
    clearTimer()
  }

  const handleReset = () => {
    setIsRunning(false)
    clearTimer()
    setSecondsLeft(initialMinutes * 60)
  }

  const progress = 1 - secondsLeft / (initialMinutes * 60)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#E8E4DE" strokeWidth="4" />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#7FB5A8"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 44}`}
            strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress)}`}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>
        <span className="text-foreground font-display text-2xl font-semibold tabular-nums" aria-live="polite">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            aria-label="Iniciar temporizador"
          >
            {secondsLeft === 0 ? "Reiniciar" : "Iniciar"}
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-5 py-2 rounded-full bg-warning text-white text-sm font-medium hover:bg-warning/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-warning/50"
            aria-label="Pausar temporizador"
          >
            Pausar
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-5 py-2 rounded-full bg-muted text-text-muted text-sm font-medium hover:bg-muted-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-muted/50"
          aria-label="Reiniciar temporizador"
        >
          Reiniciar
        </button>
      </div>
    </div>
  )
}
