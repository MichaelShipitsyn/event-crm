import Skeleton from '@material-ui/lab/Skeleton';
import type { FC } from 'react';
import React from 'react';

type SkeletonWrapProps = {
  isLoading: boolean;
};

export const SkeletonWrap: FC<SkeletonWrapProps> = ({
  children,
  isLoading,
}) => {
  if (isLoading) {
    return <Skeleton width="100%" />;
  }

  return <>{children}</>;
};
