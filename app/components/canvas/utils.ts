import type { MouseEvent } from "react";

type Point = {
  x: number;
  y: number;
};

/**
 * Get mouse position relative to the an element
 * @param event
 * @returns
 */
export function getMousePosition(event: MouseEvent<Element>) {
  const { left, top } = event.currentTarget.getBoundingClientRect();

  return {
    x: event.clientX - left,
    y: event.clientY - top,
  };
}

/**
 * Get the distance between two 2D points
 * @param start
 * @param end
 * @returns
 */
export function get2DPointDistance(start: Point, end: Point) {
  const x = end.x - start.x;
  const y = end.y - start.y;

  return Math.hypot(x, y);
}

/**
 * Get the distance between two points
 * @param start
 * @param end
 * @returns
 */
export function getPointDistance(start: number, end: number) {
  return Math.abs(Math.floor(start - end));
}
