"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreathingCircle, { BREATHING_PATTERNS, type BreathingPattern } from "@/components/BreathingCircle"
import SoundPlayer from "@/components/SoundPlayer"
import WaterDistortion from "@/components/WaterDistortion"

type Practice = "respiracion" | "mindfulness" | "sonidos"

export default function EspacioCalmaPage() {
  const [activePractice, setActivePractice] = useState<Practice | null>(null)
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0])
  const [isActive, setIsActive] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  const handleExit = () => {
    setIsActive(false)
    setActivePractice(null)
  }

  return (
    <>
      <style>{'body { background: #0d1117 !important; }'}</style>
      <WaterDistortion />
      <Header />
      <main className="relative min-h-screen">
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!activePractice ? (
            <>
              <div className="text-center mb-12">
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white/90 mb-3">
                  Espacio de calma
                </h1>
                <p className="text-white/60 text-lg font-light max-w-xl mx-auto leading-relaxed">
                  Un espacio para detenerte y respirar. Tú controlas todo: el sonido, la práctica.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                <button
                  onClick={() => setActivePractice("respiracion")}
                  className="group p-6 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hover:border-primary-light/40 hover:shadow-sm transition-all duration-400 text-center"
                  aria-label="Respiración guiada"
                >
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-400">💨</span>
                  <h3 className="font-display font-semibold text-white/90 mb-1.5">Respiración guiada</h3>
                  <p className="text-xs text-white/60">Sigue el ritmo de la respiración con la animación visual.</p>
                </button>

                <button
                  onClick={() => setActivePractice("mindfulness")}
                  className="group p-6 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hover:border-secondary-light/40 hover:shadow-sm transition-all duration-400 text-center"
                  aria-label="Mindfulness básico"
                >
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-400">🧘</span>
                  <h3 className="font-display font-semibold text-white/90 mb-1.5">Mindfulness básico</h3>
                  <p className="text-xs text-white/60">Un momento de atención plena en tu día.</p>
                </button>

                <button
                  onClick={() => setActivePractice("sonidos")}
                  className="group p-6 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 hover:border-tertiary-light/40 hover:shadow-sm transition-all duration-400 text-center"
                  aria-label="Sonidos relajantes"
                >
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-400">🎵</span>
                  <h3 className="font-display font-semibold text-white/90 mb-1.5">Sonidos relajantes</h3>
                  <p className="text-xs text-white/60">Elige entre cuencos, lluvia, viento, agua o ruido blanco.</p>
                </button>
              </div>

              <div className="max-w-lg mx-auto bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="font-display font-semibold text-white/90 mb-3 text-center">Prácticas de relajación</h3>
                <SoundPlayer />
              </div>
            </>
          ) : activePractice === "sonidos" ? (
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-semibold text-white/90">Sonidos relajantes</h2>
                <button
                  onClick={handleExit}
                  className="text-sm px-3 py-1.5 rounded-full bg-white/10 text-white/60 hover:bg-white/20 transition-colors duration-200"
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
                <h2 className="font-display text-2xl font-semibold text-white/90">
                  {activePractice === "respiracion" ? "Respiración guiada" : "Mindfulness básico"}
                </h2>
                <button
                  onClick={handleExit}
                  className="text-sm px-3 py-1.5 rounded-full bg-white/10 text-white/60 hover:bg-white/20 transition-colors duration-200"
                  aria-label="Salir de la práctica"
                >
                  Salir
                </button>
              </div>

              <div className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                {activePractice === "respiracion" && (
                  <BreathingCircle pattern={selectedPattern} isActive={isActive} />
                )}

                {activePractice === "mindfulness" && (
                  <div className="text-center py-8">
                    <div className={`transition-all duration-700 ease-in-out ${isActive ? "opacity-100" : "opacity-40"}`}>
                      <div className="w-24 h-24 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <span className="text-3xl">🧘</span>
                      </div>
                      <p className="text-white/60 text-sm max-w-xs mx-auto leading-relaxed">
                        {isActive
                          ? "Observa tus pensamientos como nubes que pasan. No los juzgues, solo obsérvalos."
                          : "Siéntate en una posición cómoda, cierra los ojos y prepárate para comenzar."}
                      </p>
                    </div>
                  </div>
                )}

                <div className="my-6 space-y-4">
                  {activePractice === "respiracion" && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm text-white/60 block">Tipo de respiración</label>
                        <div className="grid grid-cols-1 gap-2">
                          {BREATHING_PATTERNS.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setSelectedPattern(p)}
                              className={`text-left px-4 py-2.5 rounded-xl border text-sm transition-all duration-300 ${
                                selectedPattern.id === p.id
                                  ? "border-primary/50 bg-primary/20 text-white/90"
                                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                              }`}
                              aria-pressed={selectedPattern.id === p.id}
                            >
                              <span className="font-medium">{p.name}</span>
                              <span className="block text-xs text-white/40 mt-0.5">{p.description}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={() => setShowDisclaimer(!showDisclaimer)}
                          className="text-xs text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors duration-200"
                          aria-expanded={showDisclaimer}
                        >
                          {showDisclaimer ? "Ocultar aviso" : "Aviso"}
                        </button>
                      </div>

                      {showDisclaimer && (
                        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-xs text-white/60 leading-relaxed space-y-2">
                          <p>
                            Las técnicas de respiración aquí descritas son herramientas de relajación general y no sustituyen atención médica ni tratamiento profesional.
                          </p>
                          <p>
                            Si durante la práctica experimentas mareo, malestar o incomodidad, detén el ejercicio y respira con normalidad.
                          </p>
                          <p>
                            Personas con afecciones respiratorias, cardiovasculares, ansiedad severa u otras condiciones médicas deben adaptar los ejercicios a su comodidad.
                          </p>
                          <p className="font-medium">
                            El uso de estas técnicas es bajo tu propia responsabilidad.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex justify-center">
                    {!isActive ? (
                      <button
                        onClick={() => setIsActive(true)}
                        className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        aria-label="Iniciar práctica"
                      >
                        Iniciar práctica
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsActive(false)}
                        className="px-6 py-2.5 rounded-full bg-warning text-white text-sm font-medium hover:bg-warning/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-warning/50"
                        aria-label="Pausar práctica"
                      >
                        Pausar
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
              className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 transition-colors duration-200"
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
