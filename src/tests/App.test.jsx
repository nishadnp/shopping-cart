import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App'; // Import your actual component

describe('App Component', () => {
  it('renders the correct heading text', () => {
    // 1. Tell RTL to render the component in its virtual browser (jsdom)
    render(<App />);

    // 2. Search the virtual screen for the heading text
    const heading = screen.getByRole('heading', { name: /hello, shopping cart!/i });

    // 3. Assert that it is physically present in the DOM
    expect(heading).toBeInTheDocument();
  });
});