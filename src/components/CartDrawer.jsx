import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, add, decrement, remove, count } = useCart()
  const navigate = useNavigate()

  function checkout() {
    onClose()
    navigate('/checkout')
  }

  return (
    <>
      <div className={`drawer-overlay ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="drawer-head">
          <h3>Your cart {count > 0 && `(${count})`}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <div className="drawer-empty-leaf">🌿</div>
            <p>Your cart is empty.</p>
            <span>Add something to get rolling.</span>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((i) => (
                <div className="cart-item" key={i.id}>
                  <div className="cart-item-emoji">{i.emoji}</div>
                  <div className="cart-item-info">
                    <strong>{i.name}</strong>
                    <span>{i.unit} · ${i.price.toFixed(2)}</span>
                  </div>
                  <div className="qty">
                    <button onClick={() => decrement(i.id)} aria-label="Decrease">−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => add(i)} aria-label="Increase">+</button>
                  </div>
                  <button className="cart-item-remove" onClick={() => remove(i.id)} aria-label="Remove">🗑</button>
                </div>
              ))}
            </div>
            <div className="drawer-foot">
              <div className="drawer-subtotal">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
              <button className="btn btn-primary btn-block" onClick={checkout}>
                Go to checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
