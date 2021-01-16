import React, { RefObject } from 'react';

type Props = {
  refElement: RefObject<HTMLDivElement> | null;
};

export const useScrollTrigger = ({ refElement }: Props) => {
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

  return { scrollToTop, scrollToBottom };
};
