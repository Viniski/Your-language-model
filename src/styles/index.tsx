import { css, Global } from '@emotion/react';
import fonts from './fonts';
import reset from './reset';
import scrollbar from './scrollbar';
import variables from './variables';

const styles = css`
  ${variables}
  ${scrollbar}
  ${reset}
  ${fonts}

  html,
  body,
  #root-wrapper,
  #root {
    height: 100%;
    width: 100%;
  }

  button {
    font-family: inherit;
  }
`;

const globalStyles = <Global styles={styles} />;

export default globalStyles;
