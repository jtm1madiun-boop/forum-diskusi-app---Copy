// src/states/threadDetail/action.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncReceiveThreadDetail, receiveThreadDetailActionCreator, clearThreadDetailActionCreator } from './action';
import { showLoadingActionCreator, hideLoadingActionCreator } from '../loading/action';
import api from '../../utils/api';

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    delete api._getThreadDetail;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    const fakeThreadDetail = { id: 'thread-1', title: 'Judul', body: 'Isi', comments: [] };
    api.getThreadDetail = vi.fn().mockResolvedValue(fakeThreadDetail);
    const dispatch = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(api.getThreadDetail).toHaveBeenCalledWith('thread-1');
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetail));
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });

  it('should dispatch action and alert when data fetching failed', async () => {
    const fakeError = new Error('Gagal memuat detail');
    api.getThreadDetail = vi.fn().mockRejectedValue(fakeError);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoadingActionCreator());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(window.alert).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoadingActionCreator());
  });
});