import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Cart from '../pages/Cart';

// 1. Create a dynamic mock variable that we can swap out inside individual tests
let mockContextValue = {
  cart: [],
  handleUpdateQuantity: vi.fn(),
  handleRemoveFromCart: vi.fn()
};

// 2. Put vi.mock at the absolute top level. It now reads from our dynamic variable.
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useOutletContext: () => mockContextValue,
  };
});

describe('Cart Page Component', () => {
  it('renders standard fallback notice when array is completely empty', () => {
    // Set the mock state to empty
    mockContextValue = {
      cart: [],
      handleUpdateQuantity: vi.fn(),
      handleRemoveFromCart: vi.fn()
    };

    render(<Cart />);
    
    expect(screen.getByRole('heading', { name: /your cart is empty/i })).toBeInTheDocument();
  });

  it('calculates total prices and fields correctly for current basket items', () => {
    // Populate the mock state with items
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
    
    // Aggregation check: ($10.00 * 2) + ($5.50 * 1) = $25.50
    expect(screen.getByText(/total amount: \$25\.50/i)).toBeInTheDocument();
  });
});