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
    
    const input = screen.getByRole('spinbutton');
    const incrementBtn = screen.getByRole('button', { name: /increase quantity/i });
    
    expect(input.value).toBe('1');
    await user.click(incrementBtn);
    expect(input.value).toBe('2');
  });

  it('calls onAddToCart with the correct product and quantity', async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();
    
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    
    const incrementBtn = screen.getByRole('button', { name: /increase quantity/i });
    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    
    await user.click(incrementBtn);
    await user.click(addToCartBtn);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 2);
  });
  it('disables the add to cart button when quantity is 0', async () => {
  const user = userEvent.setup();
  render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);
  
  const decrementBtn = screen.getByRole('button', { name: /decrease quantity/i });
  const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
  const input = screen.getByRole('spinbutton');

  await user.click(decrementBtn);
  
  expect(input.value).toBe('0');
  expect(addToCartBtn).toBeDisabled();
});
});