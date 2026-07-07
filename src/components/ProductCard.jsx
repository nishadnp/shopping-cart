// src/components/ProductCard

import { useState } from "react";

export default function ProductCard({product, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => prev > 0 ? prev - 1 : prev);

    const handleInputChange = e => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            setQuantity(1);
        }
        else {
            setQuantity(value);
        }
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                <h3 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>{product.title}</h3>
                <p style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <button onClick={handleDecrement} aria-label="Decrease quantity">-</button>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={handleInputChange}
                    style={{ width: '50px', textAlign: 'center' }} 
                    min="1"
                />
                <button onClick={handleIncrement} aria-label="Increase quantity">+</button>
                </div>
                <button 
                onClick={() => onAddToCart(product, quantity)}
                disabled={quantity === 0}
                style={{ 
                    width: '100%', 
                    padding: '0.5rem', 
                    cursor: quantity === 0 ? 'not-allowed' : 'pointer', // UX touch
                    backgroundColor: quantity === 0 ? '#ccc' : '#0070f3', // Visual cue
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px'
                }}
                >
                Add To Cart
                </button>
            </div>
        </div>
    );
}