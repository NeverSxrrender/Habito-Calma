"use client"

import { useState, useEffect, useRef, useCallback } from "react"

interface Step {
  text: string
  duration: number
  audioSrc?: string
}

const STEPS: Step[] = [
  { text: "Cierra los ojos. Respira profundo. Estás en un lugar seguro.", duration: 8, audioSrc: "/audio/mindfulness/meditacion1.mp3" },
  { text: "Siente el peso de tu cuerpo. Tus pies en el suelo. Tus manos descansando.", duration: 10, audioSrc: "/audio/mindfulness/meditacion2.mp3" },
  { text: "Observa tu respiración. No la controles. Solo obsérvala entrar y salir.", duration: 12, audioSrc: "/audio/mindfulness/meditacion3.mp3" },
  { text: "Si aparece un pensamiento, está bien. Nómbralo suavemente: 'pensando'. Y vuelve a tu respiración.", duration: 15, audioSrc: "/audio/mindfulness/meditacion4.mp3" },
  { text: "Eres el cielo. Los pensamientos son nubes que pasan. Tú no eres esas nubes.", duration: 12, audioSrc: "/audio/mindfulness/meditacion5.mp3" },
  { text: "Cada vez que te distraes y vuelves, estás meditando. Eso es todo lo que hay que hacer.", duration: 10, audioSrc: "/audio/mindfulness/meditacion6.mp3" },
  { text: "Quédate aquí un momento. Sin prisa. Sin nada que hacer. Solo estar.", duration: 15, audioSrc: "/audio/mindfulness/meditacion7.mp3" },
  { text: "Cuando estés listo, abre los ojos despacio. Lleva esta calma contigo.", duration: 10, audioSrc: "/audio/mindfulness/meditacion8.mp3" },
]

export default function GuidedMeditation() {
  const [stepIndex, setStepIndex] = useState(0)
  const [phase, setPhase] = useState<"idle" | "playing" | "paused" | "finished">("idle")
  const [fadeIn, setFadeIn] = useState(true)
  const [elapsed, setElapsed] = useState(0)

  const elapsedRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stepIndexRef = useRef(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    stepIndexRef.current = stepIndex
  }, [stepIndex])

  useEffect(() => {
    elapsedRef.current = elapsed
  }, [elapsed])

  const currentStep = STEPS[stepIndex]
  const stepProgress = currentStep ? elapsed / currentStep.duration : 0
  const progress = (stepIndex + Math.min(stepProgress, 1)) / STEPS.length

  const goToStep = useCallback((index: number) => {
    setStepIndex(index)
    setElapsed(0)
    setFadeIn(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setFadeIn(true))
    })
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

  const phaseRef = useRef(phase)
  useEffect(() => { phaseRef.current = phase }, [phase])

  useEffect(() => {
    const src = STEPS[stepIndex]?.audioSrc
    if (!src || phaseRef.current !== "playing") return

    const audio = audioRef.current ?? new Audio()
    audioRef.current = audio
    audio.src = src
    audio.currentTime = 0
    audio.play().catch(() => {})
  }, [stepIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (phase === "playing") {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }

    return () => { audio.pause() }
  }, [phase])

  const handleStart = () => {
    goToStep(0)
    setPhase("playing")
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
      {phase === "idle" && (
        <div className="text-center py-8 space-y-6">
          <div
            className={`transition-opacity duration-1000 ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
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
                fadeIn ? "opacity-100" : "opacity-0"
              }`}
            >
              {currentStep.text}
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
