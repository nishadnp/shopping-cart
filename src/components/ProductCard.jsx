// src/components/ProductCard.jsx

import { useState } from "react";
import styles from "./ProductCard.module.css"; // 1. Import your styles object

export default function ProductCard({ product, onAddToCart }) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => prev > 0 ? prev - 1 : prev);

    const handleInputChange = e => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            setQuantity(1);
        } else {
            setQuantity(value);
        }
    };

    return (
        // 2. Map classes using JavaScript brackets instead of raw strings, and strip inline styles
        <article className={styles.card}>
            <figure className={styles.imageContainer}>
                <img src={product.image} alt={product.title} className={styles.image} />
            </figure>
            
            {/* Keeping content clean inside a native flow block */}
            <figcaption style={{ padding: '0 0.25rem' }}>
                <h3 className={styles.title} title={product.title}>{product.title}</h3>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
            </figcaption>

            <div className={styles.controlsRow}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <button className={styles.btnQty} onClick={handleDecrement} aria-label="Decrease quantity">-</button>
                    <input 
                        className={styles.qtyInput}
                        type="number" 
                        value={quantity} 
                        onChange={handleInputChange}
                        min="1"
                    />
                    <button className={styles.btnQty} onClick={handleIncrement} aria-label="Increase quantity">+</button>
                </div>
                
                <button 
                    className={styles.btnAction}
                    onClick={() => onAddToCart(product, quantity)}
                    disabled={quantity === 0}
                >
                    Add To Cart
                </button>
            </div>
        </article>
    );
}