export function getPath(path: number[]): Point[] {
  const pathCopy = [...path];
  const points: Point[] = [];
  while (pathCopy.length > 0) {
    const y = pathCopy.pop();
    const x = pathCopy.pop();
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      points.push({ x, y });
    }
  }
  return points;
}
