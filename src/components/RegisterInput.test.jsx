import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('RegisterInput component', () => {
  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    
    const nameInput = screen.getByPlaceholderText('Nama Anda');
    await userEvent.type(nameInput, 'John Doe');

    const emailInput = screen.getByPlaceholderText('contoh@email.com');
    await userEvent.type(emailInput, 'john@test.com');
    
    const passwordInput = screen.getByPlaceholderText('Minimal 6 karakter');
    await userEvent.type(passwordInput, 'password123');
    
    const registerButton = screen.getByRole('button', { name: 'Daftar' });
    await userEvent.click(registerButton);
    
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
    });
  });
});