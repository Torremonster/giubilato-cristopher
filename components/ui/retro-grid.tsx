"use client";
import { useEffect, useRef } from "react";

interface Lightning {
  x: number;
  segments: { x1: number; y1: number; x2: number; y2: number }[];
  alpha: number;
  life: number;
  maxLife: number;
}

interface RetroGridProps {
  gridColor?: string;
  showScanlines?: boolean;
  glowEffect?: boolean;
  className?: string;
}

function RetroGrid({
  gridColor = "#ffe600",
  showScanlines = true,
  glowEffect = true,
  className = "",
}: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 255, g: 230, b: 0 };
    };

    // Grid settings
    const cellWidth = 120;
    const cellDepth = 80;
    const numCellsWide = 16;
    const numCellsDeep = 20;
    const cameraX = 0;
    const cameraY = 60;
    const cameraZ = 400;
    const focalLength = 500;
    let offset = 0;
    const speed = 1.5;

    // Lightning state
    const lightnings: Lightning[] = [];
    let lightningTimer = 0;
    const lightningInterval = 120; // frames between lightning strikes

    const project3DTo2D = (x: number, y: number, z: number) => {
      const relX = x - cameraX;
      const relY = y - cameraY;
      const relZ = z - cameraZ;
      if (relZ <= 10) return null;
      const scale = focalLength / relZ;
      const screenX = canvas.width / 2 + relX * scale;
      const screenY = canvas.height * 0.5 - relY * scale;
      return { x: screenX, y: screenY, scale, z: relZ };
    };

    const drawCell = (x: number, z: number, zOffset: number) => {
      const actualZ = z - zOffset;
      if (actualZ < -cellDepth || actualZ > numCellsDeep * cellDepth) return;
      const topLeft = project3DTo2D(x - cellWidth / 2, 0, actualZ);
      const topRight = project3DTo2D(x + cellWidth / 2, 0, actualZ);
      const bottomLeft = project3DTo2D(x - cellWidth / 2, 0, actualZ + cellDepth);
      const bottomRight = project3DTo2D(x + cellWidth / 2, 0, actualZ + cellDepth);
      if (!topLeft || !topRight || !bottomLeft || !bottomRight) return;
      if (actualZ < 0) return;
      const distanceFactor = Math.min(1, actualZ / (numCellsDeep * cellDepth));
      const alpha = Math.max(0.3, 1 - distanceFactor * 0.7);
      const lineWidth = Math.max(1, 2.5 * (1 - distanceFactor * 0.5));
      if (glowEffect) {
        ctx.shadowBlur = 10 * (1 - distanceFactor);
        ctx.shadowColor = gridColor;
      }
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = gridColor;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(bottomLeft.x, bottomLeft.y);
      ctx.lineTo(bottomRight.x, bottomRight.y);
      ctx.lineTo(topRight.x, topRight.y);
      ctx.lineTo(topLeft.x, topLeft.y);
      ctx.closePath();
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawScanlines = () => {
      if (!showScanlines) return;
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = "#000000";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }
      ctx.globalAlpha = 1;
    };

    // Generate a jagged lightning bolt from (sx,sy) going downward
    const generateLightning = (): Lightning => {
      const startX = Math.random() * canvas.width;
      const startY = 0;
      const endY = canvas.height * 0.55; // horizon line
      const steps = 8 + Math.floor(Math.random() * 6);
      const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];
      let cx = startX;
      let cy = startY;
      for (let i = 0; i < steps; i++) {
        const ny = cy + (endY - startY) / steps;
        const nx = cx + (Math.random() - 0.5) * 80;
        segments.push({ x1: cx, y1: cy, x2: nx, y2: ny });
        cx = nx;
        cy = ny;
      }
      const maxLife = 18 + Math.floor(Math.random() * 10);
      return { x: startX, segments, alpha: 1, life: 0, maxLife };
    };

    const drawLightnings = () => {
      const rgb = hexToRgb(gridColor);
      for (const bolt of lightnings) {
        const progress = bolt.life / bolt.maxLife;
        // Flash in, then fade out
        const alpha = progress < 0.2
          ? progress / 0.2
          : 1 - (progress - 0.2) / 0.8;
        // Main bolt
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.95})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (const seg of bolt.segments) {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }
        ctx.stroke();
        // Glow layer
        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.5})`;
        ctx.lineWidth = 6;
        ctx.shadowBlur = 40;
        ctx.beginPath();
        for (const seg of bolt.segments) {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }
        ctx.stroke();
        ctx.restore();
        bolt.life++;
      }
      // Remove dead bolts
      for (let i = lightnings.length - 1; i >= 0; i--) {
        if (lightnings[i].life >= lightnings[i].maxLife) {
          lightnings.splice(i, 1);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = hexToRgb(gridColor);

      // Sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.55);
      skyGradient.addColorStop(0, `rgba(${rgb.r * 0.03}, ${rgb.g * 0.03}, 0, 1)`);
      skyGradient.addColorStop(0.4, `rgba(${rgb.r * 0.07}, ${rgb.g * 0.07}, 0, 1)`);
      skyGradient.addColorStop(0.75, `rgba(${rgb.r * 0.18}, ${rgb.g * 0.16}, 0, 1)`);
      skyGradient.addColorStop(1, `rgba(${rgb.r * 0.35}, ${rgb.g * 0.3}, 0, 1)`);
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.55);

      // Ground gradient
      const groundGradient = ctx.createLinearGradient(0, canvas.height * 0.55, 0, canvas.height);
      groundGradient.addColorStop(0, `rgba(${rgb.r * 0.08}, ${rgb.g * 0.07}, 0, 1)`);
      groundGradient.addColorStop(0.3, `rgba(${rgb.r * 0.04}, ${rgb.g * 0.03}, 0, 1)`);
      groundGradient.addColorStop(1, "#000000");
      ctx.fillStyle = groundGradient;
      ctx.fillRect(0, canvas.height * 0.55, canvas.width, canvas.height * 0.45);

      // Animate grid
      offset += speed;
      if (offset >= cellDepth) offset = 0;
      for (let row = -5; row < numCellsDeep + 5; row++) {
        const z = row * cellDepth;
        for (let col = -Math.floor(numCellsWide / 2); col <= Math.floor(numCellsWide / 2); col++) {
          const x = col * cellWidth;
          drawCell(x, z, offset);
        }
      }

      // Lightning
      lightningTimer++;
      if (lightningTimer >= lightningInterval) {
        // Spawn 1–2 bolts
        const count = Math.random() < 0.3 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          lightnings.push(generateLightning());
        }
        // Random next interval: 80–200 frames
        lightningTimer = -(Math.floor(Math.random() * 120));
      }
      drawLightnings();

      drawScanlines();

      // Vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.8
      );
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [gridColor, showScanlines, glowEffect]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ background: "#000000", width: "100%", height: "100%" }}
    />
  );
}

export default RetroGrid;
