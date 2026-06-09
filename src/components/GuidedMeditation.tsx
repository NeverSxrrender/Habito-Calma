"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface Step {
  text: string
  duration: number
  audioSrc?: string
}

const GAP = 3

const STEPS: Step[] = [
  { text: "Cierra los ojos. Respira profundo. Estás en un lugar seguro.", duration: 9 + GAP, audioSrc: "/audio/mindfulness/meditacion1.wav" },
  { text: "Siente el peso de tu cuerpo. Tus pies en el suelo. Tus manos descansando.", duration: 11 + GAP, audioSrc: "/audio/mindfulness/meditacion2.wav" },
  { text: "Observa tu respiración. No la controles. Solo obsérvala entrar y salir.", duration: 13 + GAP, audioSrc: "/audio/mindfulness/meditacion3.wav" },
  { text: "Si aparece un pensamiento, está bien. Di suavemente: 'es un pensamiento'. Y vuelve a tu respiración.", duration: 16 + GAP, audioSrc: "/audio/mindfulness/meditacion4.wav" },
  { text: "Eres el cielo. Los pensamientos son nubes que pasan. Tú no eres esas nubes.", duration: 13 + GAP, audioSrc: "/audio/mindfulness/meditacion5.wav" },
  { text: "Cada vez que te distraes y vuelves, estás meditando. Eso es todo lo que hay que hacer.", duration: 11 + GAP, audioSrc: "/audio/mindfulness/meditacion6.wav" },
  { text: "Quédate aquí un momento. Sin prisa. Sin nada que hacer. Solo estar.", duration: 11 + GAP, audioSrc: "/audio/mindfulness/meditacion7.wav" },
  { text: "Cuando estés listo, abre los ojos despacio. Lleva esta calma contigo.", duration: 10, audioSrc: "/audio/mindfulness/meditacion8.wav" },
]

export default function GuidedMeditation() {
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<"idle" | "playing" | "paused" | "finished">("idle")
  const [elapsed, setElapsed] = useState(0)
  const [textOpacity, setTextOpacity] = useState(1)
  const [displayText, setDisplayText] = useState(STEPS[0].text)
  const [volume, setVolume] = useState(0.7)

  const elapsedRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stepIndexRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const prevStepRef = useRef(-1)
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    stepIndexRef.current = stepIndex
  }, [stepIndex])

  useEffect(() => {
    elapsedRef.current = elapsed
  }, [elapsed])

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
    }
  }, [])

  const currentStep = STEPS[stepIndex]
  const stepProgress = currentStep ? elapsed / currentStep.duration : 0
  const progress = (stepIndex + Math.min(stepProgress, 1)) / STEPS.length

  const goToStep = useCallback((index: number) => {
    const oldText = STEPS[stepIndexRef.current]?.text ?? null
    const sameStep = stepIndexRef.current === index
    setStepIndex(index)
    setElapsed(0)

    if (oldText && !sameStep) {
      setTextOpacity(0)
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current)
      transitionTimeoutRef.current = setTimeout(() => {
        setDisplayText(STEPS[index].text)
        setTextOpacity(1)
      }, 1000)
    } else {
      setDisplayText(STEPS[index].text)
      setTextOpacity(0)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTextOpacity(1))
      })
    }
  }, [])

  const advance = useCallback(() => {
    const next = stepIndexRef.current + 1
    if (next >= STEPS.length) {
      setPhase("finished")
      return
    }
    goToStep(next)
  }, [goToStep])

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    stopTimer()
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 0.05
        if (next >= STEPS[stepIndexRef.current].duration) {
          advance()
          return 0
        }
        return next
      })
    }, 50)
  }, [stopTimer, advance])

  useEffect(() => {
    if (phase === "playing") {
      startTimer()
    } else {
      stopTimer()
    }
    return stopTimer
  }, [phase, startTimer, stopTimer])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const src = STEPS[stepIndex]?.audioSrc
    if (!src) { audio.pause(); return }

    const stepChanged = prevStepRef.current !== stepIndex
    if (stepChanged) {
      prevStepRef.current = stepIndex
      audio.src = src
      audio.currentTime = 0
    }

    if (phase === "playing") {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [stepIndex, phase])

  const handleStart = () => {
    goToStep(0)
    setPhase("playing")
    const audio = audioRef.current
    if (audio) {
      const src = STEPS[0]?.audioSrc
      if (src) {
        audio.src = src
        audio.currentTime = 0
        audio.play().catch(() => {})
      }
    }
  }

  const handlePause = () => setPhase("paused")
  const handleResume = () => setPhase("playing")
  const handleRestart = () => {
    goToStep(0)
    setPhase("idle")
  }

  if (phase === "finished") {
    return (
      <div className="text-center py-12 space-y-6">
        <div className="transition-opacity duration-1000 opacity-100">
          <span className="text-5xl block mb-4">🧘</span>
          <p className="text-white/80 text-xl sm:text-2xl font-light leading-relaxed">
            Has completado tu meditación guiada.
          </p>
          <p className="text-white/50 text-sm mt-3">
            Lleva esta calma contigo el resto del día.
          </p>
        </div>
        <button
          onClick={handleRestart}
          className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Repetir meditación
        </button>
      </div>
    )
  }

  return (
    <div className="relative">
      <audio ref={audioRef} preload="auto" />

      {phase === "idle" && (
        <div className="text-center py-8 space-y-6">
          <div className="transition-opacity duration-1000 opacity-100">
            <div className="w-24 h-24 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-3xl">🧘</span>
            </div>
            <p className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed">
              Siéntate en una posición cómoda, cierra los ojos y prepárate para
              comenzar.
            </p>
          </div>
          <button
            onClick={handleStart}
            className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Iniciar
          </button>
        </div>
      )}

      {(phase === "playing" || phase === "paused") && (
        <>
          <div className="text-center py-12 min-h-[200px] flex items-center justify-center">
            <p
              className={`text-white/90 text-2xl sm:text-3xl font-light leading-relaxed max-w-lg transition-opacity duration-1000 ${
                textOpacity ? "opacity-100" : "opacity-0"
              }`}
            >
              {displayText}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            {phase === "playing" ? (
              <button
                onClick={handlePause}
                className="px-6 py-2.5 rounded-full bg-warning text-white text-sm font-medium hover:bg-warning/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-warning/50"
              >
                Pausar
              </button>
            ) : (
              <button
                onClick={handleResume}
                className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Reanudar
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4 4V4.5l-4 4z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 h-1 appearance-none bg-white/10 rounded-full cursor-pointer accent-green-400 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-400/70 [&::-webkit-slider-thumb]:cursor-pointer"
              aria-label="Volumen"
            />
          </div>
        </>
      )}

      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-200 ease-linear"
          style={{ width: `${Math.min(progress * 100, 100)}%`, backgroundColor: "#4ade80", opacity: 0.7 }}
        />
      </div>
    </div>
  )
}
