// src/components/landing/ParticleField.tsx
import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  shape: 'circle' | 'square' | 'triangle' | 'diamond';
  color: string;
  angle: number;
  spinSpeed: number;
}

export const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000, radius: 100 };

    const getColors = () => {
      if (theme === 'dark') {
        return {
          primary: 'rgba(250, 250, 250, 0.45)',
          secondary: 'rgba(4, 116, 252, 0.45)',
          tertiary: 'rgba(250, 250, 250, 0.15)',
        };
      } else {
        return {
          primary: 'rgba(4, 116, 252, 0.35)',
          secondary: 'rgba(15, 23, 42, 0.2)',
          tertiary: 'rgba(4, 116, 252, 0.08)',
        };
      }
    };

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(120, Math.floor((canvas.width * canvas.height) / 10000));
      const colors = getColors();

      // Create shape clusters representing a loosely defined neural brain/heart network
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < numParticles; i++) {
        // Sample targets around a brain/neural cluster formation (a pair of overlapping circles)
        let tx = 0;
        let ty = 0;
        if (i % 2 === 0) {
          // Left hemisphere
          const radius = (0.2 + Math.random() * 0.15) * Math.min(canvas.width, canvas.height);
          const angle = Math.random() * Math.PI * 2;
          tx = centerX - radius * 0.5 + Math.cos(angle) * radius * 0.8;
          ty = centerY + Math.sin(angle) * radius * 0.8;
        } else {
          // Right hemisphere
          const radius = (0.18 + Math.random() * 0.15) * Math.min(canvas.width, canvas.height);
          const angle = Math.random() * Math.PI * 2;
          tx = centerX + radius * 0.5 + Math.cos(angle) * radius * 0.8;
          ty = centerY + Math.sin(angle) * radius * 0.8;
        }

        const size = Math.random() * 5 + 3;
        const shapes: Particle['shape'][] = ['circle', 'square', 'triangle', 'diamond'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Color selection
        let color = colors.primary;
        if (Math.random() > 0.7) color = colors.secondary;
        if (Math.random() > 0.9) color = colors.tertiary;

        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: tx,
          baseY: ty,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size,
          shape,
          color,
          angle: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const drawShape = (p: Particle) => {
      ctx.beginPath();
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      } else if (p.shape === 'square') {
        ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else if (p.shape === 'triangle') {
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
      } else if (p.shape === 'diamond') {
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, 0);
        ctx.lineTo(0, p.size / 2);
        ctx.lineTo(-p.size / 2, 0);
      }

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawLines = () => {
      const colors = getColors();
      ctx.strokeStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(4, 116, 252, 0.04)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getColors();

      // Recolor existing particles in case theme changed on-the-fly
      particles.forEach((p, idx) => {
        if (idx % 2 === 0) {
          p.color = colors.primary;
        } else if (idx % 3 === 0) {
          p.color = colors.secondary;
        } else {
          p.color = colors.tertiary;
        }

        // Apply continuous rotation
        p.angle += p.spinSpeed;

        // Easing towards base target positions (the neural shape layout)
        const dxBase = p.baseX - p.x;
        const dyBase = p.baseY - p.y;
        
        // Add random drift force
        p.vx += dxBase * 0.0005 + (Math.random() - 0.5) * 0.02;
        p.vy += dyBase * 0.0005 + (Math.random() - 0.5) * 0.02;

        // Apply mouse repulsion force
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const force = (mouse.radius - distMouse) / mouse.radius;
          const repelX = (dxMouse / distMouse) * force * 4.0;
          const repelY = (dyMouse / distMouse) * force * 4.0;
          p.vx -= repelX;
          p.vy -= repelY;
        }

        // Friction / Speed limit
        p.vx *= 0.95;
        p.vy *= 0.95;

        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Boundary constraint
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        drawShape(p);
      });

      drawLines();
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    handleResize();
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'auto',
      }}
    />
  );
};

export default ParticleField;
