"use client"

import { useState, useRef, useEffect } from "react"

interface SoundVariant {
  id: string
  label: string
  src: string
}

interface SoundGroup {
  id: string
  name: string
  icon: string
  description: string
  variants: SoundVariant[]
}

const soundGroups: SoundGroup[] = [
  {
    id: "ruido-blanco",
    name: "Ruido blanco",
    icon: "📻",
    description: "Sonido constante para enmascarar distracciones",
    variants: [
      { id: "ruido-blanco-1", label: "Variante 1", src: "/audio/ruido-blanco/ruido-blanco1.wav" },
      { id: "ruido-blanco-2", label: "Variante 2", src: "/audio/ruido-blanco/ruido-blanco2.wav" },
    ],
  },
  {
    id: "cuencos",
    name: "Cuencos tibetanos",
    icon: "🔔",
    description: "Armónicos suaves y resonantes para meditación profunda",
    variants: [
      { id: "cuencos-1", label: "Variante 1", src: "/audio/cuencos-tibetanos/cuencos-tibetanos1.wav" },
      { id: "cuencos-2", label: "Variante 2", src: "/audio/cuencos-tibetanos/cuencos-tibetanos2.wav" },
    ],
  },
  {
    id: "agua",
    name: "Agua suave",
    icon: "🌊",
    description: "Río sereno y agua fluyendo que invita a la relajación",
    variants: [
      { id: "agua-1", label: "Variante 1", src: "/audio/agua-suave/agua-suave1.wav" },
      { id: "agua-2", label: "Variante 2", src: "/audio/agua-suave/agua-suave2.wav" },
    ],
  },

  {
    id: "lluvia",
    name: "Lluvia suave",
    icon: "🌧️",
    description: "Gotas de lluvia cayendo sobre hojas y tierra",
    variants: [
      { id: "lluvia-1", label: "Variante 1", src: "/audio/lluvia-suave/lluvia-suave1.wav" },
      { id: "lluvia-2", label: "Variante 2", src: "/audio/lluvia-suave/lluvia-suave2.wav" },
    ],
  },

  {
    id: "otros",
    name: "Otros sonidos relajantes",
    icon: "🎵",
    description: "Sonidos adicionales para variar tu experiencia de calma",
    variants: [
      { id: "otros-1", label: "Variante 1", src: "/audio/otros/otros1.mp3" },
    ],
  },
]

let sharedAudioInstance: HTMLAudioElement | undefined

function getSharedAudio(): HTMLAudioElement {
  if (!sharedAudioInstance) {
    sharedAudioInstance = new Audio()
    sharedAudioInstance.loop = true
  }
  return sharedAudioInstance
}

export default function SoundPlayer() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null)
  const [activeVariant, setActiveVariant] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.5)
  const volumeRef = useRef(volume)

  useEffect(() => {
    volumeRef.current = volume
  }, [volume])

  useEffect(() => {
    const audio = getSharedAudio()
    audio.volume = volumeRef.current

    if (activeVariant) {
      for (const group of soundGroups) {
        for (const v of group.variants) {
          if (v.id === activeVariant) {
            if (audio.src !== v.src) {
              audio.src = v.src
            }
            audio.play().catch(() => {
              setActiveVariant(null)
            })
            return
          }
        }
      }
    } else {
      audio.pause()
    }
  }, [activeVariant])

  useEffect(() => {
    getSharedAudio().volume = volume
  }, [volume])

  const handleToggle = (groupId: string) => {
    setExpandedGroup((prev) => (prev === groupId ? null : groupId))
    setActiveVariant(null)
  }

  const handleVariantClick = (variantId: string) => {
    setActiveVariant((prev) => (prev === variantId ? null : variantId))
  }

  const getPlayingVariant = () => {
    if (!activeVariant) return null
    for (const group of soundGroups) {
      for (const v of group.variants) {
        if (v.id === activeVariant) return v
      }
    }
    return null
  }

  const playing = getPlayingVariant()

  return (
    <div className="w-full space-y-3">
      {soundGroups.map((group) => {
        const isExpanded = expandedGroup === group.id
        return (
          <div
            key={group.id}
            className="rounded-2xl border border-white/[0.12] bg-white/15 backdrop-blur-sm overflow-hidden transition-all duration-700 ease-in-out"
          >
            <button
              onClick={() => handleToggle(group.id)}
              className="w-full flex items-center gap-3 p-4 sm:p-5 text-left transition-colors duration-300 hover:bg-white/10"
              aria-expanded={isExpanded}
            >
              <span className="text-2xl sm:text-3xl shrink-0">{group.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white/90 text-sm sm:text-base">{group.name}</p>
                <p className="text-xs sm:text-sm text-white/60 truncate">{group.description}</p>
              </div>
              <svg
                className={`w-5 h-5 text-white/40 shrink-0 transition-transform duration-700 ease-in-out ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`transition-all duration-700 ease-in-out ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-white/10 pt-4">
                <p className="text-xs text-white/50 mb-3">Elige una variante:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.variants.map((v) => {
                    const isActive = activeVariant === v.id
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleVariantClick(v.id)}
                        className={`px-4 py-2 rounded-lg border text-sm transition-all duration-300 ${
                          isActive
                            ? "border-primary bg-primary/20 text-white shadow-sm"
                            : "border-white/[0.12] bg-white/10 text-white/70 hover:border-white/30 hover:text-white/90"
                        }`}
                        aria-label={`${isActive ? "Detener" : "Reproducir"}: ${v.label}`}
                        aria-pressed={isActive}
                      >
                        <span className="flex items-center gap-2">
                          {v.label}
                          {isActive && (
                            <span className="flex gap-0.5" aria-hidden="true">
                              <span className="w-0.5 h-2.5 bg-primary rounded-full animate-pulse-soft" />
                              <span className="w-0.5 h-3.5 bg-primary rounded-full animate-pulse-soft delay-100" />
                              <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse-soft delay-200" />
                            </span>
                          )}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {activeVariant && playing && (
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-white/50 shrink-0">Volumen</label>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="flex-1 h-1.5 accent-primary rounded-full cursor-pointer"
                      aria-label="Control de volumen"
                    />
                    <button
                      onClick={() => setActiveVariant(null)}
                      className="text-xs px-3 py-1.5 rounded-full bg-danger/10 text-danger hover:bg-danger/20 transition-colors duration-200"
                      aria-label="Detener"
                    >
                      Detener
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
