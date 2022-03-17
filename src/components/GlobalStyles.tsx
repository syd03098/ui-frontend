import React from 'react';
import { css, Global } from '@emotion/react';

function GlobalStyles():JSX.Element {
  return (
    <Global styles={css`
      body {
        margin: 0;
      }
      
      *, *:after *:before {
        box-sizing: border-box;
      }    
    `}
    />
  );
}

export default GlobalStyles;
