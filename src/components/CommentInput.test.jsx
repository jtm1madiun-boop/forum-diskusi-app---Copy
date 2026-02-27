// src/components/CommentInput.test.jsx
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  it('should handle content typing correctly', async () => {
    // Arrange
    render(<CommentInput addComment={() => {}} />);
    const textarea = screen.getByPlaceholderText('Tulis komentarmu...');

    // Action
    await userEvent.type(textarea, 'Ini komentar test');

    // Assert
    expect(textarea).toHaveValue('Ini komentar test');
  });

  it('should call addComment function when form is submitted with non-empty content', async () => {
    // Arrange
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);
    const textarea = screen.getByPlaceholderText('Tulis komentarmu...');
    const submitButton = screen.getByRole('button', { name: 'Kirim Komentar' });

    // Action
    await userEvent.type(textarea, 'Komentar yang valid');
    await userEvent.click(submitButton);

    // Assert
    expect(mockAddComment).toHaveBeenCalledWith('Komentar yang valid');
  });
});