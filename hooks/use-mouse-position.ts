"use client"

import { useState, useEffect } from "react"

interface MousePosition {
  x: number | null
  y: number | null
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    const resetMousePosition = () => {
      setMousePosition({ x: null, y: null })
    }
    
    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mouseleave", resetMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseleave", resetMousePosition)
    }
  }, [])

  return mousePosition
}
