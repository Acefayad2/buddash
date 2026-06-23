import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const DELIVERY_FEE = 2.99
const SERVICE_FEE = 1.5
const TAX_RATE = 0.15

export default function Checkout() {
  const { items, subtotal, count, clear } = useCart()
  const navigate = useNavigate()
  const [tip, setTip] = useState(5)

  if (count === 0) {
    return (
      <div className="page">
        <div className="checkout-empty">
          <div className="drawer-empty-leaf">🌿</div>
          <h2>Nothing to check out</h2>
          <p>Your cart is empty.</p>
          <Link className="btn btn-primary" to="/">Browse dispensaries</Link>
        </div>
      </div>
    )
  }

  const tax = subtotal * TAX_RATE
  const total = subtotal + DELIVERY_FEE + SERVICE_FEE + tax + tip

  function placeOrder(e) {
    e.preventDefault()
    clear()
    navigate('/order')
  }

  return (
    <div className="page">
      <div className="checkout">
        <form className="checkout-main" onSubmit={placeOrder}>
          <Link to="/" className="back-link">← Keep shopping</Link>
          <h1>Checkout</h1>

          <section className="card">
            <h3>Delivery address</h3>
            <div className="field-row">
              <input className="field" placeholder="Street address" defaultValue="123 Main St" required />
              <input className="field field-narrow" placeholder="Apt" />
            </div>
            <div className="field-row">
              <input className="field" placeholder="City" defaultValue="Denver" required />
              <input className="field field-narrow" placeholder="ZIP" defaultValue="80202" required />
            </div>
            <textarea className="field" placeholder="Delivery notes (gate code, etc.)" rows={2} />
          </section>

          <section className="card">
            <h3>ID verification</h3>
            <p className="muted">Driver will verify a valid government ID (21+) on delivery.</p>
            <label className="check">
              <input type="checkbox" required /> I confirm I am 21 or older and will present valid ID.
            </label>
          </section>

          <section className="card">
            <h3>Payment</h3>
            <p className="muted">💵 Cash on delivery (demo). Card processing requires a cannabis-friendly provider.</p>
            <label className="check">
              <input type="radio" name="pay" defaultChecked /> Cash on delivery
            </label>
          </section>

          <section className="card">
            <h3>Add a tip for your driver</h3>
            <div className="tip-row">
              {[0, 3, 5, 8].map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`chip ${tip === t ? 'chip-active' : ''}`}
                  onClick={() => setTip(t)}
                >
                  {t === 0 ? 'None' : `$${t}`}
                </button>
              ))}
            </div>
          </section>

          <button type="submit" className="btn btn-primary btn-block btn-lg">
            Place order · ${total.toFixed(2)}
          </button>
        </form>

        <aside className="checkout-summary">
          <div className="card sticky">
            <h3>Order summary</h3>
            <div className="summary-items">
              {items.map((i) => (
                <div className="summary-line" key={i.id}>
                  <span>{i.qty}× {i.name}</span>
                  <span>${(i.qty * i.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr />
            <div className="summary-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-line"><span>Delivery</span><span>${DELIVERY_FEE.toFixed(2)}</span></div>
            <div className="summary-line"><span>Service fee</span><span>${SERVICE_FEE.toFixed(2)}</span></div>
            <div className="summary-line"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="summary-line"><span>Driver tip</span><span>${tip.toFixed(2)}</span></div>
            <hr />
            <div className="summary-line summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  )
}
