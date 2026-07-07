import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 10.99,
  image: 'https://via.placeholder.com/150',
};

describe('ProductCard Component', () => {
  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    
    expect(screen.getByRole('heading', { name: /test product/i })).toBeInTheDocument();
    expect(screen.getByText(/\$10.99/)).toBeInTheDocument();
  });

  it('increments quantity when + button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
    
    const input = screen.getByRole('spinbutton'); // numeric inputs are spinbuttons
    const incrementBtn = screen.getByRole('button', { name: /increase quantity/i });
    
    expect(input.value).toBe('1');
    await user.click(incrementBtn);
    expect(input.value).toBe('2');
  });

  it('calls onAddToCart with the correct product and quantity', async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn(); // Creates a fake placeholder spy function
    
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    
    const incrementBtn = screen.getByRole('button', { name: /increase quantity/i });
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    
    // Simulate user behavior: increment to 2, then click add
    await user.click(incrementBtn);
    await user.click(addToCartBtn);
    
    // Check if our spy function was triggered with the exact values
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 2);
  });
  it('disables the add to cart button when quantity is 0', async () => {
  const user = userEvent.setup();
  render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
  
  const decrementBtn = screen.getByRole('button', { name: /decrease quantity/i });
  const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
  const input = screen.getByRole('spinbutton');

  // Start at 1, decrement once to hit 0
  await user.click(decrementBtn);
  
  expect(input.value).toBe('0');
  expect(addToCartBtn).toBeDisabled();
});
});