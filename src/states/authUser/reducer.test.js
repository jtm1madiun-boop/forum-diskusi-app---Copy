// src/states/authUser/reducer.test.js
import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return authUser when given by SET_AUTH_USER action', () => {
    const initialState = null;
    const fakeUser = { id: 'user-1', name: 'John' };
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: fakeUser },
    };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toEqual(fakeUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    const initialState = { id: 'user-1', name: 'John' };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: { authUser: null },
    };
    const nextState = authUserReducer(initialState, action);
    expect(nextState).toBeNull();
  });
});