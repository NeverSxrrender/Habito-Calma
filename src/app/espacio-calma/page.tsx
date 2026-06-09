"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BreathingCircle, { BREATHING_PATTERNS, type BreathingPattern } from "@/components/BreathingCircle"
import SoundPlayer from "@/components/SoundPlayer"
import GuidedMeditation from "@/components/GuidedMeditation"

type Practice = "respiracion" | "mindfulness"

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
      <Header />
      <main className="relative min-h-screen">
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <button
                  onClick={() => setActivePractice("respiracion")}
                  className="group p-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/[0.12] hover:border-primary-light/40 hover:shadow-sm transition-all duration-400 text-center"
                  aria-label="Respiración guiada"
                >
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-400">💨</span>
                  <h3 className="font-semibold text-white/90 mb-1.5">Respiración guiada</h3>
                  <p className="text-xs text-white/60">Sigue el ritmo de la respiración con la animación visual.</p>
                </button>

                <button
                  onClick={() => setActivePractice("mindfulness")}
                  className="group p-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/[0.12] hover:border-secondary-light/40 hover:shadow-sm transition-all duration-400 text-center"
                  aria-label="Mindfulness básico"
                >
                  <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-400">🧘</span>
                  <h3 className="font-semibold text-white/90 mb-1.5">Mindfulness básico</h3>
                  <p className="text-xs text-white/60">Un momento de atención plena en tu día.</p>
                </button>

              </div>

              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-white/90 mb-2">Sonidos relajantes</h2>
                <p className="text-white/60 text-sm mb-6">
                  Elige un sonido, selecciona tu variante favorita y ajusta el volumen.
                </p>
                <SoundPlayer />
              </div>
            </>
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

              <div className="bg-white/20 backdrop-blur-sm border border-white/[0.12] rounded-2xl p-6 sm:p-8">
                {activePractice === "mindfulness" ? (
                  <GuidedMeditation />
                ) : (
                  <>
                    <BreathingCircle pattern={selectedPattern} isActive={isActive} />

                    <div className="my-6 space-y-4">
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
                                  : "border-white/[0.12] bg-white/15 text-white/60 hover:border-white/30"
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
                          <p className="font-medium">
                            Estas técnicas son seguras para la gran mayoría de las personas. Si sientes mareo o molestias, detente y respira con normalidad. Su uso es bajo tu propia responsabilidad.
                          </p>
                        </div>
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
                  </>
                )}
              </div>

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
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
