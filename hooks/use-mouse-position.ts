"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { throttle } from "@/lib/utils"

interface MousePosition {
  x: number | null
  y: number | null
}

export function useMousePosition(throttleMs: number = 16): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  })
  const isActiveRef = useRef(true)

  const updateMousePosition = useCallback(
    throttle((ev: MouseEvent) => {
      if (!isActiveRef.current) return
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }, throttleMs),
    [throttleMs]
  )

  const resetMousePosition = useCallback(() => {
    setMousePosition({ x: null, y: null })
  }, [])

  useEffect(() => {
    isActiveRef.current = true
    
    // Passive event listeners for better performance
    window.addEventListener("mousemove", updateMousePosition, { passive: true })
    window.addEventListener("mouseleave", resetMousePosition, { passive: true })
    
    // Handle page visibility to pause tracking when not visible
    const handleVisibilityChange = () => {
      isActiveRef.current = !document.hidden
      if (document.hidden) {
        resetMousePosition()
      }
    }
    
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      isActiveRef.current = false
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseleave", resetMousePosition)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [updateMousePosition, resetMousePosition])

  return mousePosition
}
