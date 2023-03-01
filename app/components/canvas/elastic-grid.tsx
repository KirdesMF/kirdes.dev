import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { getMousePosition, getPointDistance } from "./utils";
import type { MouseEvent } from "react";

// TODO: add a fallback background image for browsers that don't support canvas and slow devices

type Point = {
  x: number;
  y: number;
};

type Path = {
  startPoint: Point;
  controlPoint: Point;
  endPoint: Point;
  snapped?: boolean;
  orientation?: "horizontal" | "vertical";
};

type Grid = {
  width: number;
  height: number;
  size: number;
};

/**
 * Create a svg path d attribute
 * @param options
 * @returns d attribute
 */
export function setPathAttribute(options: Path) {
  const { startPoint, controlPoint, endPoint } = options;

  return `M${startPoint.x},${startPoint.y} Q${controlPoint.x},${controlPoint.y} ${endPoint.x},${endPoint.y}`;
}

/**
 * Create a grid of elastic lines
 * @param options
 * @returns
 */
function createGrid(options: Grid) {
  const { width, height, size } = options;

  const grid: Path[] = [];

  for (let x = 0; x < width; x += size) {
    grid.push({
      startPoint: { x, y: 0 },
      controlPoint: { x, y: height / 2 },
      endPoint: { x, y: height },
      snapped: false,
      orientation: "vertical",
    });
  }

  for (let y = 0; y < height; y += size) {
    grid.push({
      startPoint: { x: 0, y },
      controlPoint: { x: width / 2, y },
      endPoint: { x: width, y },
      snapped: false,
      orientation: "horizontal",
    });
  }

  return grid;
}

/**
 * Resize canvas to fit parent
 * @param canvas
 */
function resizeCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  const dpr = devicePixelRatio || 1;

  const width = canvas.parentElement?.clientWidth || 100;
  const height = canvas.parentElement?.clientHeight || 100;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx?.scale(dpr, dpr);
}

/**
 * Draw grid on canvas
 * @param canvas
 * @param grid
 * @returns
 */
function draw(canvas: HTMLCanvasElement, grid: Path[]) {
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(-0.5, -0.5);

  grid.forEach((line) => {
    const attribute = setPathAttribute(line);
    const path = new Path2D(attribute);

    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.setLineDash([5, 5]);
    ctx.stroke(path);
  });

  ctx.restore();
}

/**
 * Canvas Grid of elastic lines
 */
export function ElasticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid = useRef<Path[]>([]);
  const maxGrabDistance = 50;

  function onMouseMove(event: MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const { x, y } = getMousePosition(event);

    if (!canvas) return;

    grid.current.forEach((line) => {
      // vertical lines
      if (line.orientation === "vertical") {
        const distance = getPointDistance(line.startPoint.x, x);
        const isSnapped = distance < 5;
        const shouldBack =
          Math.abs(line.controlPoint.x - line.startPoint.x) > maxGrabDistance;

        if (isSnapped && !line.snapped) {
          line.snapped = true;
          gsap.killTweensOf(line);
        }

        if (shouldBack) {
          line.snapped = false;

          gsap.to(line.controlPoint, {
            x: line.startPoint.x,
            ease: "elastic.out(1, 0.1)",
            duration: 2.5,
          });
        }
      }

      // horizontal lines
      if (line.orientation === "horizontal") {
        const distance = getPointDistance(line.startPoint.y, y);
        const isSnapped = distance < 5;
        const shouldBack =
          Math.abs(line.controlPoint.y - line.startPoint.y) > maxGrabDistance;

        if (isSnapped && !line.snapped) {
          line.snapped = true;
          gsap.killTweensOf(line);
        }

        if (shouldBack) {
          line.snapped = false;

          gsap.to(line.controlPoint, {
            y: line.startPoint.y,
            ease: "elastic.out(1, 0.1)",
            duration: 2.5,
          });
        }
      }

      // snap to mouse position
      if (line.snapped) {
        line.controlPoint = { x, y };
      }
    });
  }

  function onMouseLeave() {
    grid.current.forEach((line) => {
      line.snapped = false;

      if (line.orientation === "vertical") {
        gsap.to(line.controlPoint, {
          x: line.startPoint.x,
          ease: "elastic.out(1, 0.1)",
          duration: 2.5,
        });
      }

      if (line.orientation === "horizontal") {
        gsap.to(line.controlPoint, {
          y: line.startPoint.y,
          ease: "elastic.out(1, 0.1)",
          duration: 2.5,
        });
      }
    });

    gsap.ticker.remove(draw);
  }

  function init() {
    resizeCanvas(canvasRef.current!);
    grid.current = createGrid({
      width: canvasRef.current!.width,
      height: canvasRef.current!.height,
      size: 70,
    });
  }

  // draw grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    init();
    gsap.ticker.add(() => draw(canvas, grid.current));

    return () => gsap.ticker.remove(draw);
  }, []);

  // resize canvas on parent resize
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const resizeObserver = new ResizeObserver(init);
    resizeObserver.observe(canvas);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    ></canvas>
  );
}
