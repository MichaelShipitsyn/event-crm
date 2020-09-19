import React, {
  forwardRef,
} from 'react';
import type {
  HTMLProps,
  ReactNode
} from 'react';
import { Helmet } from 'react-helmet';

interface PageProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  title: string;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(({
  children,
  title = '',
  ...rest
}, ref) => {

  return (
    <div
      ref={ref as any}
      {...rest}
    >
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
});
