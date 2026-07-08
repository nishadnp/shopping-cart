import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from '../pages/Cart';

let mockContextValue = {
  cart: [],
  handleUpdateQuantity: vi.fn(),
  handleRemoveFromCart: vi.fn()
};

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => mockContextValue,
  };
});

describe('Cart Page Component', () => {
  it('renders standard fallback notice when array is completely empty', () => {
    mockContextValue = {
      cart: [],
      handleUpdateQuantity: vi.fn(),
      handleRemoveFromCart: vi.fn()
    };

    render(<Cart />);
    
    expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument();
  });

  it('calculates total prices and fields correctly for current basket items', () => {
    mockContextValue = {
      cart: [
        { id: 1, title: 'Item Alpha', price: 10.00, quantity: 2, image: '' },
        { id: 2, title: 'Item Beta', price: 5.50, quantity: 1, image: '' }
      ],
      handleUpdateQuantity: vi.fn(),
      handleRemoveFromCart: vi.fn()
    };

    render(<Cart />);
    
    expect(screen.getByRole('heading', { name: /item alpha/i })).toBeInTheDocument();
    expect(screen.getByText(/total amount: \$25\.50/i)).toBeInTheDocument();
  });
});