import { RootState } from 'store';

const isRootState = (state: unknown): state is RootState => {
  return !!(state as RootState);
};

export const isCached = (url: string) => (state: RootState) => {
  return state.cache.cache.includes(url);
};

export const getCache = (state: unknown) => {
  if (isRootState(state)) {
    return state.cache.cache;
  }

  return [];
};
