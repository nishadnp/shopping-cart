import { Link, Outlet } from 'react-router-dom'
import './App.css'


function App() {

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart (0)</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
