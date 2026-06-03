"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreathingCircle from "@/components/BreathingCircle"
import CalmTimer from "@/components/CalmTimer"
import SoundPlayer from "@/components/SoundPlayer"

type Practice = "respiracion" | "mindfulness" | "sonidos"

export default function EspacioCalmaPage() {
  const [activePractice, setActivePractice] = useState<Practice | null>(null)
  const [breathingDuration, setBreathingDuration] = useState(4)
  const [timerMinutes, setTimerMinutes] = useState(5)
  const [isActive, setIsActive] = useState(false)
  const [showCompletion, setShowCompletion] = useState(false)

  const handleStart = () => {
    setIsActive(true)
    setShowCompletion(false)
  }

  const handleComplete = () => {
    setIsActive(false)
    setShowCompletion(true)
  }

  const handleExit = () => {
    setIsActive(false)
    setShowCompletion(false)
    setActivePractice(null)
  }

  return (
    <>
      <Header />
      <main>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!activePractice ? (
            <>
              <div className="text-center mb-12">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
                  Espacio de calma
                </h1>
                <p className="text-text-muted text-lg font-light max-w-xl mx-auto leading-relaxed">
                  Un espacio para detenerte y respirar. Tú controlas todo: el sonido, el tiempo, la práctica.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                <button
                  onClick={() => setActivePractice("respiracion")}
                  className="group p-6 rounded-2xl bg-surface border border-muted/40 hover:border-primary-light/40 hover:shadow-sm transition-all duration-400 text-center"
                  aria-label="Respiración guiada"
                >
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-400">💨</span>
                  <h3 className="font-display font-semibold text-foreground mb-1.5">Respiración guiada</h3>
                  <p className="text-xs text-text-muted">Sigue el ritmo de la respiración con la animación visual.</p>
                </button>

                <button
                  onClick={() => setActivePractice("mindfulness")}
                  className="group p-6 rounded-2xl bg-surface border border-muted/40 hover:border-secondary-light/40 hover:shadow-sm transition-all duration-400 text-center"
                  aria-label="Mindfulness básico"
                >
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-400">🧘</span>
                  <h3 className="font-display font-semibold text-foreground mb-1.5">Mindfulness básico</h3>
                  <p className="text-xs text-text-muted">Un momento de atención plena con temporizador consciente.</p>
                </button>

                <button
                  onClick={() => setActivePractice("sonidos")}
                  className="group p-6 rounded-2xl bg-surface border border-muted/40 hover:border-tertiary-light/40 hover:shadow-sm transition-all duration-400 text-center"
                  aria-label="Sonidos relajantes"
                >
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-400">🎵</span>
                  <h3 className="font-display font-semibold text-foreground mb-1.5">Sonidos relajantes</h3>
                  <p className="text-xs text-text-muted">Elige entre cuencos, lluvia, viento, agua o ruido blanco.</p>
                </button>
              </div>

              <div className="max-w-lg mx-auto bg-surface border border-muted/40 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-foreground mb-3 text-center">Prácticas de relajación</h3>
                <SoundPlayer />
              </div>
            </>
          ) : activePractice === "sonidos" ? (
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">Sonidos relajantes</h2>
                <button
                  onClick={handleExit}
                  className="text-sm px-3 py-1.5 rounded-full bg-muted/50 text-text-muted hover:bg-muted transition-colors duration-200"
                  aria-label="Salir de sonidos"
                >
                  Salir
                </button>
              </div>
              <SoundPlayer />
            </div>
          ) : (
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {activePractice === "respiracion" ? "Respiración guiada" : "Mindfulness básico"}
                </h2>
                <button
                  onClick={handleExit}
                  className="text-sm px-3 py-1.5 rounded-full bg-muted/50 text-text-muted hover:bg-muted transition-colors duration-200"
                  aria-label="Salir de la práctica"
                >
                  Salir
                </button>
              </div>

              <div className="bg-surface border border-muted/40 rounded-2xl p-6 sm:p-8">
                {showCompletion && (
                  <div className="text-center mb-6 p-4 bg-primary-light/20 rounded-xl">
                    <p className="text-primary-dark font-medium">Práctica completada</p>
                    <p className="text-sm text-text-muted">Has dedicado este tiempo a tu bienestar. Respira.</p>
                  </div>
                )}

                <BreathingCircle duration={breathingDuration} isActive={isActive && activePractice === "respiracion"} />

                {activePractice === "mindfulness" && (
                  <div className="text-center py-8">
                    <div
                      className={`transition-all duration-700 ease-in-out ${
                        isActive ? "opacity-100" : "opacity-40"
                      }`}
                    >
                      <div className="w-24 h-24 mx-auto rounded-full bg-secondary-light/30 flex items-center justify-center mb-4">
                        <span className="text-3xl">🧘</span>
                      </div>
                      <p className="text-text-muted text-sm max-w-xs mx-auto leading-relaxed">
                        {isActive
                          ? "Observa tus pensamientos como nubes que pasan. No los juzgues, solo obsérvalos."
                          : "Siéntate en una posición cómoda, cierra los ojos y prepárate para comenzar."}
                      </p>
                    </div>
                  </div>
                )}

                <div className="my-6">
                  {activePractice === "respiracion" && (
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <label htmlFor="breathing-duration" className="text-sm text-text-muted">
                        Ritmo (segundos):
                      </label>
                      <select
                        id="breathing-duration"
                        value={breathingDuration}
                        onChange={(e) => setBreathingDuration(Number(e.target.value))}
                        className="bg-muted/30 border border-muted/50 rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
                        aria-label="Duración del ciclo de respiración"
                      >
                        <option value={3}>3 seg</option>
                        <option value={4}>4 seg</option>
                        <option value={5}>5 seg</option>
                        <option value={6}>6 seg</option>
                      </select>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4 mb-4">
                    <label htmlFor="timer-minutes" className="text-sm text-text-muted">
                      Duración:
                    </label>
                    <select
                      id="timer-minutes"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(Number(e.target.value))}
                      className="bg-muted/30 border border-muted/50 rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
                      aria-label="Duración de la práctica en minutos"
                    >
                      <option value={1}>1 min</option>
                      <option value={2}>2 min</option>
                      <option value={3}>3 min</option>
                      <option value={5}>5 min</option>
                      <option value={10}>10 min</option>
                    </select>
                  </div>

                  <CalmTimer initialMinutes={timerMinutes} onComplete={handleComplete} />

                  <div className="mt-4 text-center">
                    {!isActive && !showCompletion && (
                      <button
                        onClick={handleStart}
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label="Iniciar práctica"
                      >
                        Iniciar práctica
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              onClick={handleExit}
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-foreground transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
