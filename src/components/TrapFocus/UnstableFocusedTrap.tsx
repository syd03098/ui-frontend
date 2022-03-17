/* eslint-disable no-use-before-define */
import { PropsWithChildren, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

type HTMLFocusableElement = HTMLButtonElement | HTMLInputElement | HTMLSelectElement;

function UnstableFocusedTrap(
  { isOpen, children }: PropsWithChildren<{ isOpen: boolean }>,
): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  /** focus trap */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function keyDownHandler(e: KeyboardEvent): void {
      if (e.key !== 'Tab' || !containerRef.current) {
        return;
      }

      const instance = containerRef.current;
      const focusableChildElement = instance?.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex="0"]',
      );

      if (focusableChildElement.length > 0) {
        const $firstElement = focusableChildElement[0];
        const $lastElement = focusableChildElement[focusableChildElement.length - 1];

        if (!e.shiftKey && document.activeElement === $lastElement) {
          e.preventDefault();
          ($firstElement as HTMLFocusableElement).focus();
        }

        if (e.shiftKey && document.activeElement === $firstElement) {
          e.preventDefault();
          ($lastElement as HTMLFocusableElement).focus();
        }
      }
    }

    document.addEventListener('keydown', keyDownHandler);
    // eslint-disable-next-line consistent-return
    return (): void => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} data-f="FF-a73e">
      {children}
    </div>
  );
}

export default UnstableFocusedTrap;
