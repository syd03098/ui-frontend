/* eslint-disable no-use-before-define */
/* eslint-disable react/display-name */
import React, {
  KeyboardEvent,
  useCallback, useLayoutEffect, useRef, useState,
} from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import FocusTrap, { ModalContentsRef } from './FocusTrap';
import GlobalStyles from '../GlobalStyles';

function TrapFocus():JSX.Element {
  const [isOpen, setOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const modalContentsRef = useRef<ModalContentsRef>(null);
  const lastFocusedElement = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    if (!isOpen || !wrapperRef.current) {
      return;
    }

    /** remember entry buttons */
    const currentFocusedElement = document.activeElement;
    if (!wrapperRef.current.contains(currentFocusedElement)) {
      lastFocusedElement.current = currentFocusedElement as HTMLDivElement;
      modalContentsRef.current?.focus();
    }

    // eslint-disable-next-line consistent-return
    return () => {
      /** button will get focused again after modal closed */
      lastFocusedElement.current?.focus();
      lastFocusedElement.current = undefined;
    };
  }, [isOpen]);

  const onClick = useCallback((e) => {
    if (wrapperRef.current === e.target as HTMLElement) {
      setOpen(!isOpen);
    }
  }, [isOpen]);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (!isOpen) {
      return;
    }

    if (e.key === 'Tab') {
      modalContentsRef.current?.changeActive(e.shiftKey);
    }
  }, [isOpen]);

  return (
    <>
      <GlobalStyles />
      <Container>
        <button>dummy</button>
        <button
          css={css` 
              &:focus { 
                border: 1px solid #4286f4; 
                color: blue; 
              }        
            `}
          onClick={() => setOpen(!isOpen)}
        >
          open
        </button>
        {isOpen && (
          <Fixed
            ref={wrapperRef}
            tabIndex={-1}
            onClick={onClick}
            onKeyUp={onKeyDown}
          >
            <FocusTrap ref={modalContentsRef} />
          </Fixed>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Fixed = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0, 0.3);
`;

export default TrapFocus;
