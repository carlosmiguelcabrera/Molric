'use client'

import { useEffect, useRef } from 'react'

export default function HeroParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    // Read colors from CSS variables at runtime (respects theme changes)
    const getColors = () => {
      const style = getComputedStyle(document.documentElement)
      const accent = style.getPropertyValue('--accent').trim() || '#00e5ff'
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      return { accent, isLight }
    }

    // Parse a hex/rgb color into r,g,b components
    const parseColor = (color) => {
      // handle hex
      const hex = color.replace('#', '')
      if (hex.length === 6) {
        return {
          r: parseInt(hex.slice(0, 2), 16),
          g: parseInt(hex.slice(2, 4), 16),
          b: parseInt(hex.slice(4, 6), 16),
        }
      }
      // handle rgb(...)
      const match = color.match(/\d+/g)
      if (match && match.length >= 3) {
        return { r: +match[0], g: +match[1], b: +match[2] }
      }
      // fallback
      return { r: 0, g: 229, b: 255 }
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 1 + Math.random() * 0.5,         // 1–1.5px
        opacity: 0.3 + Math.random() * 0.2,       // 30–50%
        vx: (Math.random() - 0.5) * 0.7,          // −0.35 … 0.35 → effective speed 0.2–0.5
        vy: (Math.random() - 0.5) * 0.7,
      }
    }

    const initParticles = () => {
      const count = 80 + Math.floor(Math.random() * 21) // 80–100
      particles = Array.from({ length: count }, createParticle)
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { accent, isLight } = getColors()
      const { r, g, b } = parseColor(accent)
      // In light mode boost opacity so particles are visible on a white background
      const lineOpacity = isLight ? 0.18 : 0.07
      const particleOpacityBase = isLight ? 0.55 : 0
      const particleOpacityRange = isLight ? 0.2 : 1

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${r},${g},${b},${lineOpacity})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        // p.opacity is always in 0–1 range; in light mode we shift the base up
        const opacity = isLight
          ? particleOpacityBase + p.opacity * particleOpacityRange
          : p.opacity
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
        ctx.fill()
      }
    }

    const update = () => {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < -2) p.x = canvas.width + 2
        else if (p.x > canvas.width + 2) p.x = -2

        if (p.y < -2) p.y = canvas.height + 2
        else if (p.y > canvas.height + 2) p.y = -2
      }
    }

    const loop = () => {
      update()
      draw()
      animationId = requestAnimationFrame(loop)
    }

    const handleResize = () => {
      resize()
    }

    resize()
    initParticles()
    loop()

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
      aria-hidden="true"
    />
  )
}
