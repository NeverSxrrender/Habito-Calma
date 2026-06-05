"use client"

import { useState, useRef, useEffect } from "react"

interface Sound {
  id: string
  name: string
  icon: string
  description: string
  src: string
}

const sounds: Sound[] = [
  {
    id: "cuencos",
    name: "Cuencos tibetanos",
    icon: "🔔",
    description: "Armónicos suaves y resonantes para meditación profunda",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    id: "lluvia",
    name: "Lluvia suave",
    icon: "🌧️",
    description: "Gotas de lluvia cayendo sobre hojas y tierra",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    id: "viento",
    name: "Viento ligero",
    icon: "🍃",
    description: "Brisa suave moviendo hojas de árboles",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    id: "agua",
    name: "Agua tranquila",
    icon: "💧",
    description: "Arroyo sereno y ondas en un estanque",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
  {
    id: "ruido-blanco",
    name: "Ruido blanco suave",
    icon: "🌊",
    description: "Sonido uniforme y constante para enmascarar distracciones",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
  },
]

export default function SoundPlayer() {
  const [activeSound, setActiveSound] = useState<string | null>(null)
  const [volume, setVolume] = useState(0.5)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const volumeRef = useRef(volume)

  useEffect(() => {
    volumeRef.current = volume
  }, [volume])

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.loop = true
    }

    const audio = audioRef.current
    audio.volume = volumeRef.current

    if (activeSound && isPlaying) {
      const sound = sounds.find((s) => s.id === activeSound)
      if (sound) {
        audio.src = sound.src
        audio.play().catch((e) => {
          console.log("Audio play prevented:", e)
          setIsPlaying(false)
        })
      }
    } else {
      audio.pause()
      audio.src = ""
    }

    return () => {
      audio.pause()
    }
  }, [activeSound, isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const handleSelect = (id: string) => {
    if (activeSound === id && isPlaying) {
      setIsPlaying(false)
    } else {
      setActiveSound(id)
      setIsPlaying(true)
    }
  }

  const handleStop = () => {
    setIsPlaying(false)
    setActiveSound(null)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sounds.map((sound) => {
          const isActive = activeSound === sound.id && isPlaying
          return (
            <button
              key={sound.id}
              onClick={() => handleSelect(sound.id)}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 text-left ${
                isActive
                  ? "border-primary bg-primary-light/20 shadow-sm"
                  : "border-white/10 bg-white/5 hover:border-primary-light/40 hover:bg-primary-light/10"
              }`}
              aria-label={`${isActive ? "Detener" : "Reproducir"}: ${sound.name}`}
              aria-pressed={isActive}
            >
              <span className="text-2xl">{sound.icon}</span>
              <div className="min-w-0">
                <p className="font-medium text-white/90 text-sm">{sound.name}</p>
                <p className="text-xs text-white/60 truncate">{sound.description}</p>
              </div>
              {isActive && (
                <span className="ml-auto shrink-0 flex gap-0.5" aria-hidden="true">
                  <span className="w-0.5 h-3 bg-primary rounded-full animate-pulse-soft" />
                  <span className="w-0.5 h-4 bg-primary rounded-full animate-pulse-soft delay-100" />
                  <span className="w-0.5 h-2 bg-primary rounded-full animate-pulse-soft delay-200" />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {isPlaying && activeSound && (
        <div className="mt-4 flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <label htmlFor="volume-slider" className="text-sm text-white/60 shrink-0">
            Volumen
          </label>
          <input
            id="volume-slider"
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
            onClick={handleStop}
            className="text-xs px-3 py-1.5 rounded-full bg-danger/10 text-danger hover:bg-danger/20 transition-colors duration-200"
            aria-label="Detener todos los sonidos"
          >
            Detener
          </button>
        </div>
      )}
    </div>
  )
}
