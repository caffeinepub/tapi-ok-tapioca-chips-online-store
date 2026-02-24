import { useEffect, useRef } from 'react';

interface HeroBackgroundProps {
  className?: string;
}

export default function HeroBackground({ className = '' }: HeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system for floating organic elements
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      canvasWidth: number;
      canvasHeight: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
        // Golden/amber hues (30-50 degrees)
        this.hue = Math.random() * 20 + 30;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > this.canvasWidth) this.x = 0;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.y > this.canvasHeight) this.y = 0;
        if (this.y < 0) this.y = this.canvasHeight;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `hsla(${this.hue}, 65%, 60%, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 80);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Animation variables
    let animationFrame: number;
    let gradientOffset = 0;

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;

      // Create animated gradient background
      gradientOffset += 0.0005;
      
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Warm golden gradient with smooth transitions
      const hue1 = 35 + Math.sin(gradientOffset) * 10;
      const hue2 = 45 + Math.cos(gradientOffset * 0.7) * 10;
      const hue3 = 25 + Math.sin(gradientOffset * 1.3) * 8;

      gradient.addColorStop(0, `hsl(${hue1}, 55%, 45%)`);
      gradient.addColorStop(0.5, `hsl(${hue2}, 60%, 50%)`);
      gradient.addColorStop(1, `hsl(${hue3}, 50%, 40%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle radial overlay for depth
      const radialGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      radialGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      radialGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connecting lines between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `hsla(40, 60%, 60%, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrame = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Static gradient for users who prefer reduced motion
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'hsl(38, 55%, 45%)');
      gradient.addColorStop(0.5, 'hsl(42, 60%, 50%)');
      gradient.addColorStop(1, 'hsl(30, 50%, 40%)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      animate();
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ willChange: 'transform' }}
    />
  );
}
