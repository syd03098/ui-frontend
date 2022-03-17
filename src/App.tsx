import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import BlurScroll from './components/BlurScroll';

function App() {
  const [array, setArray] = useState<number[]>([0]);

  const appendElement = useCallback(() => {
    const latest = array[array.length - 1];
    setArray((prev) => ([
      ...prev,
      latest + 1,
    ]));
  }, [array]);

  return (
    <>
      <div css={css`
        width: 100%;
        max-height: 480px;      
      `}
      >
        <BlurScroll>
          <ul>
            {array.map((element) => (
              <li key={element}>{element}</li>
            ))}
          </ul>
        </BlurScroll>
      </div>
      <button
        css={css`
          position: absolute;
          left: 0;
          bottom: 0;          
        `}
        onClick={appendElement}
      >
        append
      </button>
    </>
  );
}

export default App;
