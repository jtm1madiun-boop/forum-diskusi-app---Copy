import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          { id: 'thread-1', title: 'Thread 1', body: 'Body 1', category: 'React' }
        ]
      }
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return new threads array with added thread when given by ADD_THREAD action', () => {
    const initialState = [{ id: 'thread-1', title: 'Thread 1', body: 'Body 1' }];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: { id: 'thread-2', title: 'Thread 2', body: 'Body 2' }
      }
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });
});