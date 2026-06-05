"use client"

import { usePathname } from "next/navigation"
import StarryBackground from "./StarryBackground"

export default function BackgroundLayer() {
  const pathname = usePathname()
  if (pathname !== "/espacio-calma") return null
  return <StarryBackground />
}
