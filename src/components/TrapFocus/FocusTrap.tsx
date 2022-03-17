import React, {
  CSSProperties, forwardRef, useImperativeHandle, useRef,
} from 'react';
import styled from '@emotion/styled';
/* eslint-disable no-use-before-define */
/* eslint-disable react/display-name */

const focusHelperStyle: CSSProperties = {
  outline: 'none',
};

export type ModalContentsRef = {
  focus: () => void;
  changeActive: (withShift: boolean) => void;
}

const FocusTrap = forwardRef<ModalContentsRef>((props, ref) => {
  const firstFocusRef = useRef<HTMLButtonElement>(null);
  const endFocusRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      firstFocusRef.current?.focus();
    },
    changeActive: (withShift: boolean) => {
      const currentFocusedElement = document.activeElement;

      if (withShift && currentFocusedElement === firstFocusRef.current) {
        endFocusRef.current?.focus();
      } else if (!withShift && currentFocusedElement === endFocusRef.current) {
        firstFocusRef.current?.focus();
      }
    },
  }));

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <button ref={firstFocusRef} />
      <Layout>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
      </Layout>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <button ref={endFocusRef} />
    </>
  );
});

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  font-size: 14px;
`;

export default FocusTrap;
