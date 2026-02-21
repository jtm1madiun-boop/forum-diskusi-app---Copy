import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncSetAuthUser, setAuthUserActionCreator } from './action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // Mocking fungsi API
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    // Kembalikan fungsi asli setelah selesai pengujian
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;
    
    // Bersihkan mock
    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    const fakeToken = 'fake-token';
    const fakeUser = { id: 'user-1', name: 'John Doe' };
    api.login = vi.fn().mockResolvedValue(fakeToken);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeUser);
    const dispatch = vi.fn();

    // Action
    await asyncSetAuthUser({ email: 'test@gmail.com', password: 'password' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(api.login).toHaveBeenCalledWith({ email: 'test@gmail.com', password: 'password' });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('should dispatch action and throw error when data fetching failed', async () => {
    // Arrange
    const fakeError = new Error('Ups, something went wrong');
    api.login = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();
    window.alert = vi.fn(); // Menghindari pesan error asli di console

    // Action
    await asyncSetAuthUser({ email: 'test@gmail.com', password: 'password' })(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});