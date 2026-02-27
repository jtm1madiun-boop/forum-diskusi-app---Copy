// src/states/isPreload/action.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when preload success', async () => {
    const fakeUser = { id: 'user-1', name: 'John Doe' };
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeUser);
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('should dispatch action correctly when preload failed (no user session)', async () => {
    api.getOwnProfile = vi.fn().mockRejectedValue(new Error('No token'));
    const dispatch = vi.fn();

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});