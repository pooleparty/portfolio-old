import { baseFont, headerFont } from './utils';
import { COLORS } from './vars';

export default `
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    ${baseFont()};
    color: ${COLORS.white};
    background: ${COLORS.greyBlue};
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-size: 1.6rem;
    line-height: 1.35

    @media only screen and (min-width: 57.625em) {
      font-size: 1.5rem;
    }

    @media only screen and (min-width: 75em) {
      font-size: 1.6rem;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    ${headerFont()};
  }
`;
