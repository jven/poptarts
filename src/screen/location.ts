export interface Location {
  x: number,
  y: number
}

export function euclideanDistance(p1: Location, p2: Location): number {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}
