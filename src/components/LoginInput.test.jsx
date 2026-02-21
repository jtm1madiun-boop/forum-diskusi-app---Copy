import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const emailInput = screen.getByPlaceholderText('contoh@email.com');
    await userEvent.type(emailInput, 'user@test.com');
    expect(emailInput).toHaveValue('user@test.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    await userEvent.type(passwordInput, 'passwordtest');
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    
    const emailInput = screen.getByPlaceholderText('contoh@email.com');
    await userEvent.type(emailInput, 'user@test.com');
    
    const passwordInput = screen.getByPlaceholderText('Masukkan password');
    await userEvent.type(passwordInput, 'passwordtest');
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    await userEvent.click(loginButton);
    
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'user@test.com',
      password: 'passwordtest',
    });
  });
});