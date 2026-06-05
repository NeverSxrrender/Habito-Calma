"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
  drift: number
  driftSpeed: number
  twinkleOffset: number
}

export default function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let stars: Star[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      stars = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.015 + 0.005,
        drift: Math.random() * canvas.width,
        driftSpeed: Math.random() * 0.008 + 0.002,
        twinkleOffset: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (time: number) => {
      ctx.fillStyle = "#0d1117"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        const twinkle = Math.sin(time * 0.001 * star.speed * 60 + star.twinkleOffset)
        const currentOpacity = star.opacity * (0.6 + twinkle * 0.4)
        const driftX = Math.sin(time * 0.0001 * star.driftSpeed * 10 + star.drift) * 8

        ctx.beginPath()
        ctx.arc(star.x + driftX, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 252, 240, ${currentOpacity})`
        ctx.shadowBlur = star.radius > 0.9 ? 4 : 0
        ctx.shadowColor = `rgba(200, 230, 220, ${currentOpacity * 0.8})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    createStars()
    animationId = requestAnimationFrame(draw)

    window.addEventListener("resize", () => { resize(); createStars() })

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
