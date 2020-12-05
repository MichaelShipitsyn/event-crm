import { RootState } from 'store/rootReducer';

export const isCached = (url: string) => (state: RootState) => {
  return state.cache.cache.includes(url);
};
