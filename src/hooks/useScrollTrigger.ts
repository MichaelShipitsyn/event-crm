import React, { useRef, RefObject } from 'react';
import throttle from 'lodash.throttle';

type Props = {
  threshold: number;
  onReachBottom: () => void;
  refElement: RefObject<HTMLDivElement> | null;
};

export const useScrollTrigger = ({
  threshold,
  onReachBottom,
  refElement
}: Props) => {
  const isScrolledToBottom = () => {
    if (refElement !== null && refElement.current !== null) {
      return (
        refElement.current.clientHeight + refElement.current.scrollTop >=
        refElement.current.scrollHeight - threshold
      );
    }
    return false;
  };

  const scrollToTop = () => {
    if (refElement !== null && refElement.current !== null) {
      refElement.current.scrollTop = 0;
    }
  };

  const scrollToBottom = () => {
    if (refElement !== null && refElement.current !== null) {
      refElement.current.scrollTop = refElement.current.scrollHeight;
    }
  };

  const scrollHandler = throttle(() => {
    if (!refElement) return;

    if (onReachBottom && isScrolledToBottom()) {
      onReachBottom();
    }
  }, 250);

  return { scrollHandler, scrollToTop, scrollToBottom };
};
