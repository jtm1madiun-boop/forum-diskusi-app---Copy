// src/components/ThreadItem.test.jsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import ThreadItem from './ThreadItem';

const mockThread = {
  id: 'thread-1',
  title: 'Judul Thread',
  body: 'Isi Thread',
  category: 'Test',
  createdAt: '2023-01-01T00:00:00.000Z',
  user: { id: 'user-1', name: 'John Doe', avatar: 'url' },
  authUser: 'user-2',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 5,
};

describe('ThreadItem component', () => {
  it('should call onVote with up-vote when upvote button is clicked', async () => {
    const mockOnVote = vi.fn();
    render(
      <BrowserRouter>
        <ThreadItem {...mockThread} onVote={mockOnVote} />
      </BrowserRouter>
    );

    // Action: Tombol pertama biasanya upvote berdasarkan urutan render Anda
    const voteButtons = screen.getAllByRole('button');
    await userEvent.click(voteButtons[0]);

    // Assert
    expect(mockOnVote).toHaveBeenCalledWith('thread-1', 'up-vote');
  });

  it('should call onVote with down-vote when downvote button is clicked', async () => {
    const mockOnVote = vi.fn();
    render(
      <BrowserRouter>
        <ThreadItem {...mockThread} onVote={mockOnVote} />
      </BrowserRouter>
    );

    // Action: Tombol kedua adalah downvote
    const voteButtons = screen.getAllByRole('button');
    await userEvent.click(voteButtons[1]);

    // Assert
    expect(mockOnVote).toHaveBeenCalledWith('thread-1', 'down-vote');
  });
});