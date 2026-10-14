"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}
export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let particles: Particle[] = [];
    const color = resolvedTheme === "light" ? "56,58,66" : "171,178,191";
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const draw = (time: number) => {
      if (time - lastTime >= 32) {
        lastTime = time;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const p of particles) {
          p.x = (p.x + p.vx + canvas.width) % canvas.width;
          p.y = (p.y + p.vy + canvas.height) % canvas.height;
          ctx.fillStyle = `rgba(${color},0.2)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        for (let i = 0; i < particles.length; i++)
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i],
              b = particles[j],
              distance = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
            if (distance < 14400) {
              ctx.strokeStyle = `rgba(${color},${(1 - distance / 14400) * 0.15})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
      }
      frame = requestAnimationFrame(draw);
    };
    const update = () => {
      stop();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!document.hidden && !reduced.matches)
        frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count =
        window.innerWidth < 768
          ? 16
          : Math.min(48, Math.floor(window.innerWidth * 0.03));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      }));
      update();
    };
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    resize();
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
    };
  }, [resolvedTheme]);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
