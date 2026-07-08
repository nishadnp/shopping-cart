import { useOutletContext } from 'react-router-dom';
import styles from './Cart.module.css';

export default function Cart() {
  const { cart, handleUpdateQuantity, handleRemoveFromCart } = useOutletContext();

  const orderTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>Your cart is empty.</h2>
        <p>Head over to the Shop page to pick up some products!</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Shopping Basket</h2>
      
      <div>
        {cart.map((item) => (
          <div key={item.id} className={styles.itemRow}>
            <img src={item.image} alt={item.title} className={styles.itemImage} />
            
            <div className={styles.itemDetails}>
              <h3 className={styles.itemTitle} title={item.title}>{item.title}</h3>
              <p className={styles.itemPrice}>${item.price.toFixed(2)} each</p>
            </div>

            <div className={styles.quantityControls}>
              <button className={styles.btnQty} onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
              <input 
                type="number" 
                className={styles.qtyInput}
                value={item.quantity} 
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value, 10) || 0)}
                min="0"
              />
              <button className={styles.btnQty} onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
            </div>

            <div className={styles.rightPanel}>
              <p className={styles.subtotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button 
                onClick={() => handleRemoveFromCart(item.id)}
                className={styles.btnRemove}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summarySection}>
        <h3 className={styles.totalPrice}>Total Amount: ${orderTotal.toFixed(2)}</h3>
        <button className={styles.btnCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}