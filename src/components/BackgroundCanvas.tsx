'use client';

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Set initial size
    handleResize();

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Horizon & vanishing point settings
      const vanishingPointY = height * 0.25;
      const vanishingPointX = width / 2;

      // Draw subtle horizontal scanlines/glows
      ctx.strokeStyle = 'rgba(200, 16, 46, 0.03)';
      ctx.lineWidth = 1;

      // 1. Perspective Radial Lines
      const numLines = 36;
      ctx.beginPath();
      for (let i = 0; i <= numLines; i++) {
        // Distribute lines radiating from the vanishing point
        const angleRatio = i / numLines;
        const targetX = (angleRatio - 0.5) * width * 3.5 + vanishingPointX;
        
        ctx.moveTo(vanishingPointX, vanishingPointY);
        
        // Calculate points along the line and warp them
        const steps = 30;
        let lastX = vanishingPointX;
        let lastY = vanishingPointY;

        for (let j = 1; j <= steps; j++) {
          const stepRatio = j / steps;
          
          // Exponential distribution to look like 3D depth
          const py = vanishingPointY + Math.pow(stepRatio, 1.8) * (height - vanishingPointY);
          let px = vanishingPointX + (targetX - vanishingPointX) * stepRatio;

          // Apply wave animation
          const wave = Math.sin(time * 3 + stepRatio * 4 + angleRatio * 6) * 8;
          px += wave;

          // Apply mouse gravity warp
          if (mouseRef.current) {
            const dx = px - mouseRef.current.x;
            const dy = py - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const warpRadius = 220;

            if (dist < warpRadius) {
              const force = (warpRadius - dist) / warpRadius;
              const angle = Math.atan2(dy, dx);
              // Warp lines away from cursor slightly (repulsion well)
              px += Math.cos(angle) * force * 35;
              let tempY = py + Math.sin(angle) * force * 15;
              ctx.lineTo(px, tempY);
              lastX = px;
              lastY = tempY;
              continue;
            }
          }

          ctx.lineTo(px, py);
          lastX = px;
          lastY = py;
        }
      }
      ctx.stroke();

      // 2. Transverse Horizontal Perspective Lines
      const numHorizLines = 22;
      ctx.beginPath();
      for (let i = 0; i < numHorizLines; i++) {
        // Move lines towards the viewer over time (time % 1)
        const offsetRatio = ((i + (time * 15) % 1) / numHorizLines);
        const py = vanishingPointY + Math.pow(offsetRatio, 2.2) * (height - vanishingPointY);
        
        // Horizontal line span
        const leftLimitX = (0 - 0.5) * width * 3.5 + vanishingPointX;
        const rightLimitX = (1 - 0.5) * width * 3.5 + vanishingPointX;
        const startX = vanishingPointX + (leftLimitX - vanishingPointX) * offsetRatio;
        const endX = vanishingPointX + (rightLimitX - vanishingPointX) * offsetRatio;

        const segments = 40;
        let lastSegmentX = startX;
        let lastSegmentY = py;

        for (let s = 0; s <= segments; s++) {
          const sRatio = s / segments;
          let sx = startX + (endX - startX) * sRatio;
          let sy = py;

          // Apply wave animation
          const wave = Math.sin(time * 3 + offsetRatio * 4 + sRatio * 6) * 5;
          sy += wave;

          // Apply mouse gravity warp
          if (mouseRef.current) {
            const dx = sx - mouseRef.current.x;
            const dy = sy - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const warpRadius = 220;

            if (dist < warpRadius) {
              const force = (warpRadius - dist) / warpRadius;
              const angle = Math.atan2(dy, dx);
              sx += Math.cos(angle) * force * 35;
              sy += Math.sin(angle) * force * 15;
            }
          }

          if (s === 0) {
            ctx.moveTo(sx, sy);
          } else {
            ctx.lineTo(sx, sy);
          }
          lastSegmentX = sx;
          lastSegmentY = sy;
        }
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 3. Fading Horizon Mask Gradient
      const grad = ctx.createLinearGradient(0, vanishingPointY - 40, 0, height);
      grad.addColorStop(0, 'rgba(5, 5, 5, 1)'); // Deep block out horizon
      grad.addColorStop(0.15, 'rgba(5, 5, 5, 0.85)'); // Fade grid in
      grad.addColorStop(0.5, 'rgba(5, 5, 5, 0)'); // Fully transparent middle/bottom
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-10] pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block bg-transparent" />
    </div>
  );
}
