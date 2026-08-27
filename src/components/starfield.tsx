"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas particle field for the white hero: drifting graphite specks with
 * occasional red streaks. Canvas rather than DOM nodes so a few hundred
 * particles stay cheap.
 */
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;

    type Star = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      phase: number;
      speed: number;
    };
    type Shooter = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    };

    let stars: Star[] = [];
    const shooters: Shooter[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(220, Math.floor((width * height) / 6500));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.4,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
      }));
    };

    const spawnShooter = () => {
      const startX = Math.random() * width * 0.9;
      const startY = Math.random() * height * 0.45;
      const angle = (200 + Math.random() * 28) * (Math.PI / 180);
      const speed = 4.5 + Math.random() * 3.5;
      shooters.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        life: 0,
        maxLife: 70 + Math.random() * 40,
      });
    };

    let t = 0;
    let nextShooter = 120;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 1;

      for (const s of stars) {
        if (!reduced) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = width;
          if (s.x > width) s.x = 0;
          if (s.y < 0) s.y = height;
          if (s.y > height) s.y = 0;
        }
        const twinkle = reduced
          ? 0.45
          : 0.35 + 0.45 * Math.abs(Math.sin(t * 0.012 * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(13,13,16,${twinkle * 0.42})`;
        ctx.fill();
      }

      if (!reduced) {
        if (t > nextShooter) {
          spawnShooter();
          nextShooter = t + 420 + Math.random() * 520;
        }

        for (let i = shooters.length - 1; i >= 0; i--) {
          const sh = shooters[i];
          sh.x += sh.vx;
          sh.y += sh.vy;
          sh.life += 1;

          const progress = sh.life / sh.maxLife;
          const alpha = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;

          const tailX = sh.x - sh.vx * 10;
          const tailY = sh.y - sh.vy * 10;
          const grad = ctx.createLinearGradient(tailX, tailY, sh.x, sh.y);
          grad.addColorStop(0, "rgba(224,20,44,0)");
          grad.addColorStop(1, `rgba(224,20,44,${Math.max(alpha, 0) * 0.34})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(sh.x, sh.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.lineCap = "round";
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(sh.x, sh.y, 1.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224,20,44,${Math.max(alpha, 0) * 0.5})`;
          ctx.fill();

          if (sh.life >= sh.maxLife) shooters.splice(i, 1);
        }
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
