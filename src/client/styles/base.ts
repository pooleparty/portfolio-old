
import { baseFont, headerFont, pxToRem } from './utils';
import { COLORS } from './vars';

export default `
@import url('https://fonts.googleapis.com/css?family=Montserrat|Raleway');

  html {
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  html {
    ${baseFont()};
    color: ${COLORS.white};
    background: ${COLORS.base};
    font-size: 100%;
  }

  body {
    margin: 0;
    font-size: ${pxToRem(14)};
    line-height: 1.35

    @media only screen and (min-width: 992px) {
      font-size: ${pxToRem(15)};
    }

    @media only screen and (min-width: 1200px) {
      font-size: ${pxToRem(16)};
    }
  }

  h1, h2, h3, h4, h5, h6 {
    ${headerFont()};
}
`;
