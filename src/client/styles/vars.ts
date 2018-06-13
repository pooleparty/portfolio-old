export const COLORS = {
  white: '#F2F5F7',
  blue: '#336AA8',
  black: '#041F25',
  font: '#3C9EE9',
  greyBlue: '#7B9EC6',
  darkBlue: '#054790',
  secondary: '#FF6D37',
};

export function lighten(color: string, amount: number) {
  return `color: ${color}; opacity:  ${amount};`;
}

// export const COLORS = {
//   white: '#FFFFFF',
//   base: '#FF6D37',
//   font: '#3C9EE9',
//   gray1: '#424242',
//   gray2: '#282828',
// };

export const BREAKPOINTS = {
  mobile: '37.5em',
};

export const NAVBAR_HEIGHT = '7rem';
export const SIDEBAR_WIDTH = '19rem';

// dark-gray: #282828
// gray: #424242
// white: #FFFFFF
// orange: #FF6D37
// orangeAlt: #FE7138
