import { useEffect, useRef } from "react";

export function CanvasParticle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}
