import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const random = gsap.utils.random;

type Point = {
  x: number;
  y: number;
};

class Particle {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  opacity: number;
  size: number;
  radius: number;
  rotation: number;
  center: Point;
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.x = random(0, canvas.width);
    this.y = random(0, canvas.height);
    this.opacity = random(0.1, 0.3);
    this.size = random(2, 6);
    this.radius = this.size < 3 ? 1 : 2;
    this.rotation = random(0, 360);
    this.center = {
      x: this.x + this.size,
      y: this.y + this.size,
    };
  }

  draw() {
    // draw rounded rect
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.rotate((this.rotation * Math.PI) / 180);
    this.ctx.translate(-this.center.x, -this.center.y);

    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillStyle = "rgb(0, 255, 204)";

    this.ctx.beginPath();
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.restore();
  }
  update() {}
}

/**
 * Resize canvas to fit parent
 * @param canvas
 */
function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = canvas.parentElement?.clientWidth || 100;
  canvas.height = canvas.parentElement?.clientHeight || 100;
}

export function CanvasParticle({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  function createParticles(canvas: HTMLCanvasElement) {
    for (let i = 0; i < 60; i++) {
      particles.current.push(new Particle(canvas));
    }
  }

  function draw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    particles.current.forEach((particle) => {
      particle.draw();
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas(canvas);
    createParticles(canvas);
    draw(canvas);
  }, []);

  return <canvas ref={canvasRef} className={className}></canvas>;
}
