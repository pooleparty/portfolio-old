/* eslint-disable import/prefer-default-export */

export function getPath(path) {
  const pathCopy = [...path];
  const points = [];
  while (pathCopy.length > 0) {
    const y = pathCopy.pop();
    const x = pathCopy.pop();
    if (typeof x !== 'undefined' && typeof y !== 'undefined') {
      points.push({ x, y });
    }
  }
  return points;
}
