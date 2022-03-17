import React, {
  forwardRef, ReactNode, useCallback, useDebugValue, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState,
} from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';

type BlurScrollProps = {
  overlayHeight?: number;
  children?: ReactNode;
};

function drawOverlay(height: number): SerializedStyles {
  return css`
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 8px;
      height: ${height}px;
      background: linear-gradient(360deg, #fff 11.98%, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0) 100%);
    }
  `;
}

function BlurScroll({
  children,
  overlayHeight = 120,
}: BlurScrollProps) {
  const [hitBottom, setHitBottom] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    if (scrollRef.current) {
      const defaultHeight = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      const scrolled = scrollRef.current.scrollTop;
      setHitBottom(defaultHeight <= scrolled);
    }
  }, []);

  const [overflow, setOverflow] = useState<boolean>(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(setTimeout(() => {}, 0));

  useLayoutEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!scrollRef.current) {
        return;
      }

      const totalHeight = scrollRef.current.scrollHeight;
      const contentsHeight = scrollRef.current.clientHeight;
      setOverflow(totalHeight > contentsHeight);
    }, 0);

    return ():void => {
      clearTimeout(timeoutRef.current);
    };
  }, [children, onScroll]);

  return (
    <Contents data-f="SD-0f7a">
      {overflow && <div style={{ visibility: hitBottom ? 'hidden' : 'visible' }} css={drawOverlay(overlayHeight)} data-f="SD-2b51" />}
      <ScrollY ref={scrollRef} onScroll={onScroll} data-f="BS-e7e2">
        {children}
      </ScrollY>
    </Contents>
  );
}

const ScrollY = styled.div`
  width: 100%;
  height: 100%;
  max-height: inherit;
  position: relative;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #e2e2e2;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  max-height: inherit;
  position: relative;
`;

export default BlurScroll;
