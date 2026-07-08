import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import styles from './App.module.css';

function App() {
  // Root-level cart state: shared with all route children through Outlet context.
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, {...product, quantity}];
    });
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => item.id === productId ? {...item, quantity: newQuantity} : item)
    );
  };

  const handleRemoveFromCart = productId => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <div className={styles.appLayout}>
      <header className={styles.header}>
        <nav className={styles.navContainer}>
          <Link to="/" className={styles.logo}>SwiftStore</Link>
          <div className={styles.navLinks}>
            <Link className={styles.link} to="/">Home</Link>
            <Link className={styles.link} to="/shop">Shop</Link>
            <Link className={`${styles.link} ${styles.cartLink}`} to="/cart">
              Cart ({totalItems})
            </Link>
          </div>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <Outlet context={{cart, handleAddToCart, handleUpdateQuantity, handleRemoveFromCart}} />
      </main>

      
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} SwiftStore Inc. All rights reserved. Built for engineering evaluation.
          </p>
          <div className={styles.footerLinks}>
            <a href="https://github.com/nishadnp" target="_blank" rel="noreferrer" className={styles.footerLink}>GitHub</a>
            <Link to="/shop" className={styles.footerLink}>Privacy Policy</Link>
            <Link to="/shop" className={styles.footerLink}>Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;