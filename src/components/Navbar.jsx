import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar({ onCartClick }) {
  const { count } = useCart()
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <span className="brand-leaf">🌿</span>
          <span>Bud<span className="brand-accent">Dash</span></span>
        </Link>
        <div className="nav-search">
          <span className="nav-search-icon">📍</span>
          <input placeholder="Delivering to 123 Main St" readOnly />
        </div>
        <button className="cart-btn" onClick={onCartClick} aria-label="Open cart">
          🛒 Cart
          {count > 0 && <span className="cart-badge">{count}</span>}
        </button>
      </div>
    </header>
  )
}
