"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  radius: number
  baseOpacity: number
  twinkleSpeed: number
  twinkleOffset: number
  driftXSpeed: number
  driftYSpeed: number
  driftXOffset: number
  driftYOffset: number
  driftAmplitude: number
}

interface ShootingStar {
  x: number
  y: number
  speed: number
  angle: number
  length: number
  opacity: number
  delay: number
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
    const shootingStars: ShootingStar[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createStars = () => {
      stars = Array.from({ length: 150 }, () => {
        const radius = Math.random() * 1.8 + 0.3
        const depth = radius / 2.1
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          baseOpacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.002 + 0.0005,
          twinkleOffset: Math.random() * Math.PI * 2,
          driftXSpeed: (Math.random() * 0.0006 + 0.0002) * (1 + depth),
          driftYSpeed: (Math.random() * 0.0003 + 0.0001) * (1 + depth),
          driftXOffset: Math.random() * Math.PI * 2,
          driftYOffset: Math.random() * Math.PI * 2,
          driftAmplitude: 15 + depth * 30,
        }
      })
    }

    const scheduleShootingStar = () => {
      const delay = Math.random() * 8000 + 3000
      setTimeout(() => {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.7,
          y: Math.random() * canvas.height * 0.4,
          speed: Math.random() * 4 + 3,
          angle: Math.PI / 4 + Math.random() * Math.PI * 0.3,
          length: Math.random() * 80 + 60,
          opacity: Math.random() * 0.5 + 0.5,
          delay: 0,
        })
        scheduleShootingStar()
      }, delay)
    }

    const draw = (time: number) => {
      ctx.fillStyle = "#0d1117"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset)
        const opacity = star.baseOpacity * (0.5 + twinkle * 0.5)

        const driftX = Math.sin(time * star.driftXSpeed + star.driftXOffset) * star.driftAmplitude
        const driftY = Math.sin(time * star.driftYSpeed + star.driftYOffset) * star.driftAmplitude * 0.3

        const sx = star.x + driftX
        const sy = star.y + driftY

        const glow = star.radius > 1.2
        if (glow) {
          ctx.beginPath()
          ctx.arc(sx, sy, star.radius * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200, 230, 220, ${opacity * 0.08})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(sx, sy, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 252, 240, ${opacity})`
        if (glow) {
          ctx.shadowBlur = 6
          ctx.shadowColor = `rgba(200, 230, 220, ${opacity * 0.6})`
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        s.x += Math.cos(s.angle) * s.speed
        s.y += Math.sin(s.angle) * s.speed

        const tailX = s.x - Math.cos(s.angle) * s.length
        const tailY = s.y - Math.sin(s.angle) * s.length

        const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
        gradient.addColorStop(0.6, `rgba(255, 255, 255, ${s.opacity * 0.3})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`)

        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.stroke()

        if (s.x > canvas.width + 100 || s.y > canvas.height + 100 || s.x < -200 || s.y < -200) {
          shootingStars.splice(i, 1)
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    createStars()
    scheduleShootingStar()
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
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden="true"
    />
  )
}
