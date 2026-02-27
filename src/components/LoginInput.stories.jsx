// src/components/LoginInput.stories.jsx
import LoginInput from './LoginInput';
import { fn, within, userEvent } from '@storybook/test';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
  // Menyediakan mock function untuk prop 'login'
  args: {
    login: fn(),
  },
};

// Skenario 1: Tampilan Default (Kosong)
export const Default = {};

// Skenario 2: Tampilan ketika User sudah mengetik (Filled)
export const Filled = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Mengambil elemen input berdasarkan placeholder
    const emailInput = canvas.getByPlaceholderText('contoh@email.com');
    const passwordInput = canvas.getByPlaceholderText('Masukkan password');

    // Mensimulasikan user mengetik
    await userEvent.type(emailInput, 'aliizzudin@yahoo.co.id');
    await userEvent.type(passwordInput, 'izulganteng');
  },
};