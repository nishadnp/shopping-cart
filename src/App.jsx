import { Link, Outlet } from 'react-router-dom'
import './App.css'
import { useState } from 'react'


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
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
      </nav>
      <main>
        <Outlet context={{cart, handleAddToCart, handleUpdateQuantity, handleRemoveFromCart}} />
      </main>
    </>
  )
}

export default App
