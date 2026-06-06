"use client"

import { useEffect, useRef } from "react"

const COLS = 120
const ROWS = 70

export default function WaterDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    let buf1: Float32Array
    let buf2: Float32Array
    let animationId: number
    let screenW = 0
    let screenH = 0

    const resize = () => {
      screenW = window.innerWidth
      screenH = window.innerHeight
      canvas.width = screenW
      canvas.height = screenH
      const size = COLS * ROWS
      buf1 = new Float32Array(size)
      buf2 = new Float32Array(size)
    }

    const addDrop = (col: number, row: number) => {
      const cx = Math.round(col)
      const cy = Math.round(row)
      const radius = 20
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > radius) continue
          const c = cx + dx
          const r = cy + dy
          if (c < 1 || c >= COLS - 1 || r < 1 || r >= ROWS - 1) continue
          const val = Math.cos((dist / radius) * (Math.PI / 2))
          buf1[r * COLS + c] += val * 256
        }
      }
    }

    const stepWaves = () => {
      for (let r = 1; r < ROWS - 1; r++) {
        for (let c = 1; c < COLS - 1; c++) {
          const idx = r * COLS + c
          const cur = buf1[idx]
          const sum =
            buf1[(r - 1) * COLS + c] +
            buf1[(r + 1) * COLS + c] +
            buf1[r * COLS + (c - 1)] +
            buf1[r * COLS + (c + 1)]
          const next = (sum / 2 - buf2[idx]) * 0.985
          buf2[idx] = cur
          buf1[idx] = next
        }
      }
    }

    const draw = () => {
      stepWaves()

      const starsCanvas = document.getElementById("stars-canvas") as HTMLCanvasElement | null
      if (starsCanvas && starsCanvas.width > 0 && starsCanvas.height > 0) {
        ctx.drawImage(starsCanvas, 0, 0)
        const imageData = ctx.getImageData(0, 0, screenW, screenH)
        const src = imageData.data
        const dst = new Uint8ClampedArray(src.length)

        const cellW = screenW / COLS
        const cellH = screenH / ROWS

        for (let y = 0; y < screenH; y++) {
          for (let x = 0; x < screenW; x++) {
            const c = Math.floor(x / cellW)
            const r = Math.floor(y / cellH)
            const oi = (y * screenW + x) * 4

            if (c < 2 || c >= COLS - 2 || r < 2 || r >= ROWS - 2) {
              dst[oi] = src[oi]
              dst[oi + 1] = src[oi + 1]
              dst[oi + 2] = src[oi + 2]
              dst[oi + 3] = src[oi + 3]
              continue
            }

            const idx = r * COLS + c
            const gx = (buf1[idx + 1] - buf1[idx - 1]) * 3
            const gy = (buf1[(r + 1) * COLS + c] - buf1[(r - 1) * COLS + c]) * 3

            const sx = Math.round(x + gx)
            const sy = Math.round(y + gy)

            if (sx < 0 || sx >= screenW || sy < 0 || sy >= screenH) {
              dst[oi] = 0
              dst[oi + 1] = 0
              dst[oi + 2] = 0
              dst[oi + 3] = 255
              continue
            }

            const si = (sy * screenW + sx) * 4
            dst[oi] = src[si]
            dst[oi + 1] = src[si + 1]
            dst[oi + 2] = src[si + 2]
            dst[oi + 3] = src[si + 3]
          }
        }

        const outputImageData = new ImageData(dst, screenW, screenH)
        ctx.putImageData(outputImageData, 0, 0)
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    animationId = requestAnimationFrame(draw)

    const handleMouseMove = (e: MouseEvent) => {
      const col = e.clientX / (screenW / COLS)
      const row = e.clientY / (screenH / ROWS)
      addDrop(col, row)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  )
}
