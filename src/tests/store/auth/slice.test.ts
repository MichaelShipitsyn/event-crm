import { PayloadAction } from '@reduxjs/toolkit';
import {
  authSliceReducer,
  initialState,
  setCurrentUser,
} from 'store/auth/slice';
import { buildUser } from 'tests/generate';

describe('authSlice', () => {
  test('should return the initial state on first run', () => {
    const nextState = initialState;
    const action = {};
    const result = authSliceReducer(undefined, action as PayloadAction);

    expect(result).toEqual(nextState);
  });

  it('setCurrentUser', () => {
    const payload = buildUser();
    const nextState = {
      ...initialState,
      isAuthenticated: true,
      user: payload,
    };

    const result = authSliceReducer(initialState, setCurrentUser(payload));

    expect(result).toEqual(nextState);
  });
});
