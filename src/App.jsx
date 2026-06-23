import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import AgeGate from './components/AgeGate.jsx'
import Home from './pages/Home.jsx'
import Dispensary from './pages/Dispensary.jsx'
import Checkout from './pages/Checkout.jsx'
import OrderTracking from './pages/OrderTracking.jsx'

export default function App() {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <AgeGate />
      <Navbar onCartClick={() => setCartOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/d/:id" element={<Dispensary />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<OrderTracking />} />
        </Routes>
      </main>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <footer className="footer">
        <span>🌿 BudDash</span>
        <span>Demo app · Mock data · Must be 21+ · Not for actual sale</span>
      </footer>
    </>
  )
}
