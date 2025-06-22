"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const socialLinks = [
  {
    name: "telegram",
    url: "https://t.me/T480001",
    type: "link",
  },
  {
    name: "github",
    url: "https://github.com/4T88",
    type: "link",
  },
  {
    name: "signal",
    url: "https://signal.me/#eu/SgtT32M3OvNqKcqsZQY0YyLgE8tBskPO3Ziv9EXUMgnyvgyUIG5HEIzYdN6UuqoA",
    type: "link",
  },
  {
    name: "discord",
    url: "#",
    type: "copy",
    copyText: "4T88",
  },
  {
    name: "email",
    url: "mailto:contact@4t88.xyz",
    type: "link",
  },
]

export default function BiolinkPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  const audioContextRef = useRef<AudioContext | null>(null)
  const [showCopyMessage, setShowCopyMessage] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch (e) {
        console.log("Audio not supported")
      }
    }
  }, [])

  // Play hover sound
  const playHoverSound = useCallback(() => {
    if (!audioContextRef.current) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContextRef.current.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.02, audioContextRef.current.currentTime + 0.01) // Very quiet
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1)

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + 0.1)
    } catch (e) {
      // Silently fail if audio doesn't work
    }
  }, [])

  // Play click sound
  const playClickSound = useCallback(() => {
    if (!audioContextRef.current) return

    try {
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)

      oscillator.frequency.setValueAtTime(1000, audioContextRef.current.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.15)

      gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.03, audioContextRef.current.currentTime + 0.01) // Very quiet
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.15)

      oscillator.start(audioContextRef.current.currentTime)
      oscillator.stop(audioContextRef.current.currentTime + 0.15)
    } catch (e) {
      // Silently fail if audio doesn't work
    }
  }, [])

  const handleDiscordClick = async () => {
    playClickSound()
    try {
      await navigator.clipboard.writeText("4T88")
      setShowCopyMessage(true)
      setTimeout(() => setShowCopyMessage(false), 3000)
    } catch (err) {
      console.error("Failed to copy to clipboard:", err)
    }
  }

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  useEffect(() => {
    // Initialize audio on first user interaction
    const initAudioOnInteraction = () => {
      initAudio()
      document.removeEventListener("click", initAudioOnInteraction)
      document.removeEventListener("touchstart", initAudioOnInteraction)
    }

    document.addEventListener("click", initAudioOnInteraction)
    document.addEventListener("touchstart", initAudioOnInteraction)

    return () => {
      document.removeEventListener("click", initAudioOnInteraction)
      document.removeEventListener("touchstart", initAudioOnInteraction)
    }
  }, [initAudio])

  useEffect(() => {
    // Simulate loading time and wait for fonts/assets
    const loadTimer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setIsLoaded(true), 100)
    }, 2000)

    return () => clearTimeout(loadTimer)
  }, [])

  useEffect(() => {
    if (isLoading) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Add mouse move listener with throttling
    let mouseThrottle = false
    const throttledMouseMove = (e: MouseEvent) => {
      if (!mouseThrottle) {
        mouseThrottle = true
        requestAnimationFrame(() => {
          handleMouseMove(e)
          mouseThrottle = false
        })
      }
    }
    window.addEventListener("mousemove", throttledMouseMove, { passive: true })

    // Enhanced Node class with mouse interaction
    class Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      originalX: number
      originalY: number
      baseVx: number
      baseVy: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalX = this.x
        this.originalY = this.y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.baseVx = this.vx
        this.baseVy = this.vy
        this.radius = Math.random() * 1.5 + 0.5
      }

      update() {
        // Mouse interaction
        const mouse = mouseRef.current
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          // Repulsion effect
          const force = (maxDistance - distance) / maxDistance
          const repulsionStrength = 2
          this.vx += (dx / distance) * force * repulsionStrength
          this.vy += (dy / distance) * force * repulsionStrength
        }

        // Apply velocity with damping
        this.x += this.vx
        this.y += this.vy

        // Damping to return to base velocity
        this.vx *= 0.98
        this.vy *= 0.98
        this.vx += this.baseVx * 0.02
        this.vy += this.baseVy * 0.02

        // Boundary collision
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1
          this.baseVx *= -1
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1
          this.baseVy *= -1
        }

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))
      }

      draw() {
        // Add subtle glow effect near mouse
        const mouse = mouseRef.current
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const glowIntensity = (100 - distance) / 100
          ctx.shadowColor = "#FEFAE0"
          ctx.shadowBlur = glowIntensity * 10
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "#FEFAE0"
        ctx.fill()

        ctx.shadowBlur = 0 // Reset shadow
      }
    }

    // Create nodes
    const nodes: Node[] = []
    const nodeCount = window.innerWidth < 768 ? 20 : 35
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node())
    }

    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    // Optimized animation loop
    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Update and draw nodes
        nodes.forEach((node) => {
          node.update()
          node.draw()
        })

        // Draw enhanced connections
        const maxConnections = 4
        const mouse = mouseRef.current

        for (let i = 0; i < nodes.length; i++) {
          let connections = 0
          for (let j = i + 1; j < nodes.length && connections < maxConnections; j++) {
            const dx = nodes[i].x - nodes[j].x
            const dy = nodes[i].y - nodes[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 140) {
              // Check if connection is near mouse for enhanced effect
              const midX = (nodes[i].x + nodes[j].x) / 2
              const midY = (nodes[i].y + nodes[j].y) / 2
              const mouseDist = Math.sqrt((midX - mouse.x) ** 2 + (midY - mouse.y) ** 2)

              let opacity = 0.5 * (1 - distance / 140)
              let lineWidth = 0.8

              // Enhance lines near mouse
              if (mouseDist < 80) {
                const enhancement = (80 - mouseDist) / 80
                opacity += enhancement * 0.3
                lineWidth += enhancement * 0.5
              }

              ctx.beginPath()
              ctx.moveTo(nodes[i].x, nodes[i].y)
              ctx.lineTo(nodes[j].x, nodes[j].y)
              ctx.strokeStyle = `rgba(254, 250, 224, ${Math.min(opacity, 0.8)})`
              ctx.lineWidth = lineWidth
              ctx.stroke()
              connections++
            }
          }
        }

        lastTime = currentTime
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", throttledMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isLoading, handleMouseMove])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          {/* Cool Loading Animation */}
          <div className="relative mb-8">
            {/* Outer rotating ring */}
            <div className="w-20 h-20 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mx-auto"></div>

            {/* Middle pulsing ring */}
            <div
              className="absolute inset-2 w-16 h-16 border-2 border-transparent border-t-gray-300 border-l-gray-300 rounded-full animate-spin-reverse mx-auto"
              style={{ animationDuration: "1.5s" }}
            ></div>

            {/* Inner fast spinning dot */}
            <div
              className="absolute inset-6 w-8 h-8 border-2 border-transparent border-t-gray-500 rounded-full animate-spin mx-auto"
              style={{ animationDuration: "0.8s" }}
            ></div>

            {/* Center glowing dot */}
            <div className="absolute inset-8 w-4 h-4 bg-white rounded-full animate-pulse mx-auto shadow-lg shadow-white/50"></div>

            {/* Outer glow effect */}
            <div
              className="absolute inset-0 w-20 h-20 border border-white/20 rounded-full animate-ping mx-auto"
              style={{ animationDuration: "2s" }}
            ></div>
          </div>

          {/* Loading Text */}
          <div className="text-white text-xl font-bold mb-2 tracking-wider">4T88</div>
          <div className="text-gray-400 text-sm animate-pulse">Loading...</div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-1 mt-4">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
      {/* Animated Network Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />

      {/* Copy Message Popup */}
      {showCopyMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg z-20 text-sm animate-slide-down">
          discord username "4t88" copied to clipboard!
        </div>
      )}

      {/* Content */}
      <div
        className={`relative z-10 text-center transition-all duration-1000 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wider">4T88</h1>
        </div>

        {/* Links with animated underlines and sound effects */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-gray-300 text-sm md:text-base font-medium">
          {socialLinks.map((link, index) => (
            <div key={index} className="flex items-center">
              <span className="text-gray-500 mr-1">&gt;</span>
              {link.type === "copy" ? (
                <button
                  onClick={handleDiscordClick}
                  onMouseEnter={playHoverSound}
                  className="relative group cursor-pointer min-h-[44px] flex items-center transition-colors duration-300 hover:text-white"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                  </span>
                </button>
              ) : (
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHoverSound}
                  onClick={playClickSound}
                  className="relative group min-h-[44px] flex items-center transition-colors duration-300 hover:text-white"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
