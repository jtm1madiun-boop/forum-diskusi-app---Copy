// src/components/RegisterInput.stories.jsx
import RegisterInput from './RegisterInput';
import { fn, within, userEvent } from '@storybook/test';

export default {
  title: 'Components/RegisterInput',
  component: RegisterInput,
  tags: ['autodocs'],
  // Menyediakan mock function untuk prop 'register'
  args: {
    register: fn(),
  },
};

// Skenario 1: Tampilan Default (Kosong)
export const Default = {};

// Skenario 2: Tampilan ketika User sudah mengetik (Filled)
export const Filled = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Mensimulasikan user mengisi form registrasi
    const nameInput = canvas.getByPlaceholderText('Nama Anda');
    await userEvent.type(nameInput, 'Achmad Ali Izzudin');
    
    const emailInput = canvas.getByPlaceholderText('contoh@email.com');
    await userEvent.type(emailInput, 'aliizzudin@yahoo.co.id');
    
    const passwordInput = canvas.getByPlaceholderText('Minimal 6 karakter');
    await userEvent.type(passwordInput, 'izulganteng');
  },
};