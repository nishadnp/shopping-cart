// src/pages/Cart

import { useOutletContext } from "react-router-dom";

export default function Cart() {

  const {cart, handleUpdateQuantity, handleRemoveFromCart} = useOutletContext();

  // Calculate global checkout total
  const orderTotal = cart.reduce((total, item) => 
    total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Your cart is empty.</h2>
        <p>Head over to the Shop page to pick up some products!</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2>Your Shopping Basket</h2>
      
      <div style={{ marginTop: '1.5rem' }}>
        {cart.map((item) => (
          <div 
            key={item.id} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              borderBottom: '1px solid #eee', 
              padding: '1rem 0',
              gap: '1rem'
            }}
          >
            <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
            
            <div style={{ flex: '1', minWidth: '0' }}>
              <h3 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, color: '#666' }}>${item.price.toFixed(2)} each</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
              <input 
                type="number" 
                value={item.quantity} 
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value, 10) || 0)}
                style={{ width: '50px', textAlign: 'center' }}
                min="0"
              />
              <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <div style={{ textAlign: 'right', minWidth: '90px' }}>
              <p style={{ fontWeight: 'bold', margin: '0 0 0.25rem 0' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button 
                onClick={() => handleRemoveFromCart(item.id)}
                style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', borderTop: '2px solid #ccc', paddingTop: '1rem', textAlign: 'right' }}>
        <h3 style={{ fontSize: '1.4rem' }}>Total Amount: ${orderTotal.toFixed(2)}</h3>
        <button style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}