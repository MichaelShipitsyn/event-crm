import React from 'react';
import type { FC } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

type SkeletonWrapProps = {
  isLoading: boolean;
};

export const SkeletonWrap: FC<SkeletonWrapProps> = ({
  children,
  isLoading
}) => {
  if (isLoading) {
    return <Skeleton width="100%" />;
  }

  return <>{children}</>;
};
