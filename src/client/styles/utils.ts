export const pxToRem = (value: number, base: number = 10): string => {
  return `${value / base}rem`;
};

export const baseFont = () => `font-family: 'Raleway', sans-serif`;
export const headerFont = () => `font-family: 'Montserrat', sans-serif`;
