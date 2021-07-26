import type { HTMLProps, ReactNode } from 'react';
import React, { forwardRef } from 'react';
import { Helmet } from 'react-helmet';

interface PageProps extends HTMLProps<HTMLDivElement> {
  children?: ReactNode;
  title: string;
}

export const Page = forwardRef<HTMLDivElement, PageProps>(
  ({ children, title = '', ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);
