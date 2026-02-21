import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncAddThread, addThreadActionCreator } from './action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when thread creation success', async () => {
    // Arrange
    const fakeThread = { id: 'thread-1', title: 'New Thread', body: 'Body Thread', category: 'React' };
    api.createThread = vi.fn().mockResolvedValue(fakeThread);
    const dispatch = vi.fn();

    // Action
    await asyncAddThread({ title: 'New Thread', body: 'Body Thread', category: 'React' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.createThread).toHaveBeenCalledWith({ title: 'New Thread', body: 'Body Thread', category: 'React' });
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});