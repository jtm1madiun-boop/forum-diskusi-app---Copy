// src/states/isPreload/reducer.test.js
import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = true;
    const action = { type: 'UNKNOWN' };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return isPreload value when given by SET_IS_PRELOAD action', () => {
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: false },
    };
    const nextState = isPreloadReducer(initialState, action);
    expect(nextState).toEqual(false);
  });
});