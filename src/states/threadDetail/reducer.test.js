import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    const initialState = null;
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: { id: 'thread-1', title: 'Detail Thread 1', comments: [] }
      }
    };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    const initialState = { id: 'thread-1', title: 'Detail Thread 1' };
    const action = { type: ActionType.CLEAR_THREAD_DETAIL };
    const nextState = threadDetailReducer(initialState, action);
    expect(nextState).toBeNull();
  });
});