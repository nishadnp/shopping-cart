import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import styles from './App.module.css'; // 1. Import your scoped module styles

function App() {
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
      prevCart.map(item => 
        item.id === productId ? {...item, quantity: newQuantity} : item)
    );
  };

  const handleRemoveFromCart = productId => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  return (
    <>
      {/* 2. Wrap your navigation inside a structured header tag and use modules */}
      <header className={styles.header}>
        <nav className={styles.navContainer}>
          <Link to="/" className={styles.logo}>SwiftStore</Link>
          <div className={styles.navLinks}>
            <Link className={styles.link} to="/">Home</Link>
            <Link className={styles.link} to="/shop">Shop</Link>
            {/* Template literals make combining multiple scoped classes clean */}
            <Link className={`${styles.link} ${styles.cartLink}`} to="/cart">
              Cart ({totalItems})
            </Link>
          </div>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <Outlet context={{cart, handleAddToCart, handleUpdateQuantity, handleRemoveFromCart}} />
      </main>
    </>
  );
}

export default App;