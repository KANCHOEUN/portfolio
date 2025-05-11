"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationFrameId = useRef<number>()
  const isDarkMode = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize particles
    const initParticles = () => {
      particles.current = []
      // Increase particle count for better visibility
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.04), 80)

      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Slightly larger particles for better visibility
          size: Math.random() * 2 + 0.5,
          // Moderate speed
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          // Increased opacity for better visibility
          color: isDarkMode.current
            ? `rgba(171, 178, 191, ${Math.random() * 0.25 + 0.1})`
            : `rgba(56, 58, 66, ${Math.random() * 0.3 + 0.15})`,
        })
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.current.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Connect particles with lines if they're close enough
      connectParticles(ctx)

      animationFrameId.current = requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    const connectParticles = (ctx: CanvasRenderingContext2D) => {
      // Increase max distance for more connections
      const maxDistance = 120

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x
          const dy = particles.current[i].y - particles.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // More visible lines
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = isDarkMode.current
              ? `rgba(171, 178, 191, ${opacity * 0.2})`
              : `rgba(56, 58, 66, ${opacity * 0.25})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles.current[i].x, particles.current[i].y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Check theme changes
    const checkTheme = () => {
      isDarkMode.current = document.documentElement.classList.contains("dark")
      initParticles()
    }

    window.addEventListener("resize", resizeCanvas)
    document.addEventListener("themeChange", checkTheme)

    resizeCanvas()
    checkTheme()
    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      document.removeEventListener("themeChange", checkTheme)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}
