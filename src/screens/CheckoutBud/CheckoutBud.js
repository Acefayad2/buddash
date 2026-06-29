import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import Icon from "../../components/icons/Icon";
import { useCannabisCart } from "../../context/CannabisCart";
import { useAddress } from "../../context/Address";
import "../storefront.css";

const DELIVERY = 2.99;
const SERVICE = 1.5;
const TAX_RATE = 0.15;

export default function CheckoutBud() {
  const navigate = useNavigate();
  const { items, subtotal, count, clear } = useCannabisCart();
  const { address } = useAddress();
  const [tip, setTip] = useState(5);
  const [idChecked, setIdChecked] = useState(false);

  // Prefill from the address the user picked on the dashboard.
  const zip = (address.city.match(/\d{5}/) || [""])[0];
  const city = address.city.replace(/,?\s*[A-Z]{2}\s*\d{5}.*$/, "").trim() || address.city;

  if (count === 0) {
    return (
      <div className="bd">
        <StoreTopbar />
        <div className="bd-page">
          <div className="bd-empty">
            <div className="bd-empty-ico"><Icon name="cart" size={42} /></div>
            <h2>Nothing to check out</h2>
            <p>Your bag is empty.</p>
            <button className="bd-btn bd-btn-inline" onClick={() => navigate("/")}>Browse dispensaries</button>
          </div>
        </div>
      </div>
    );
  }

  const tax = subtotal * TAX_RATE;
  const total = subtotal + DELIVERY + SERVICE + tax + tip;

  function placeOrder(e) {
    e.preventDefault();
    const order = {
      id: "BD" + Math.floor(100000 + Math.random() * 900000),
      total: total.toFixed(2),
      items: items.map((i) => ({ name: i.name, qty: i.qty })),
      placedAt: Date.now(),
    };
    try {
      localStorage.setItem("buddash-last-order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    clear();
    navigate("/order-confirm");
  }

  return (
    <div className="bd">
      <StoreTopbar />
      <form className="bd-page" onSubmit={placeOrder}>
        <button type="button" className="bd-back" onClick={() => navigate("/bag")}>
          <Icon name="arrowLeft" size={16} /> Back to bag
        </button>
        <h1 className="bd-h1">Checkout</h1>
        <div className="bd-cols">
          <div>
            <div className="bd-card bd-section">
              <h3 className="bd-section-h"><Icon name="pin" size={18} /> Delivery address</h3>
              <div className="bd-row">
                <input key={address.id} className="bd-field" placeholder="Street address" defaultValue={address.line} required />
                <input className="bd-field" placeholder="Apt" style={{ maxWidth: 110 }} />
              </div>
              <div className="bd-row">
                <input key={`${address.id}-c`} className="bd-field" placeholder="City" defaultValue={city} required />
                <input key={`${address.id}-z`} className="bd-field" placeholder="ZIP" defaultValue={zip} style={{ maxWidth: 130 }} required />
              </div>
              <textarea className="bd-field" placeholder="Delivery notes (gate code, etc.)" rows={2} />
            </div>

            <div className="bd-card bd-section">
              <h3 className="bd-section-h"><Icon name="shield" size={18} /> ID verification (21+)</h3>
              <label className={`bd-check ${idChecked ? "bd-check-on" : ""}`}>
                <input type="checkbox" checked={idChecked} onChange={(e) => setIdChecked(e.target.checked)} required />
                <span className="bd-check-box"><Icon name="check" size={14} /></span>
                I confirm I am 21+ and will present a valid government ID on delivery.
              </label>
            </div>

            <div className="bd-card bd-section">
              <h3 className="bd-section-h"><Icon name="truck" size={18} /> Payment</h3>
              <p className="bd-muted-note">Cash on delivery (demo). Card processing needs a cannabis-friendly provider.</p>
              <label className="bd-radio bd-radio-on">
                <input type="radio" name="pay" defaultChecked /> Cash on delivery
              </label>
            </div>

            <div className="bd-card bd-section">
              <h3 className="bd-section-h"><Icon name="heart" size={18} /> Tip your driver</h3>
              <div className="bd-tips">
                {[0, 3, 5, 8].map((t) => (
                  <button type="button" key={t} className={`bd-tip ${tip === t ? "bd-tip-on" : ""}`} onClick={() => setTip(t)}>
                    {t === 0 ? "None" : `$${t}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bd-card bd-summary">
            <h3 className="bd-summary-title">Order summary</h3>
            {items.map((i) => (
              <div className="bd-line" key={i.id}><span>{i.qty}× {i.name}</span><span>${(i.qty * i.price).toFixed(2)}</span></div>
            ))}
            <div className="bd-hr" />
            <div className="bd-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="bd-line"><span>Delivery</span><span>${DELIVERY.toFixed(2)}</span></div>
            <div className="bd-line"><span>Service fee</span><span>${SERVICE.toFixed(2)}</span></div>
            <div className="bd-line"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="bd-line"><span>Driver tip</span><span>${tip.toFixed(2)}</span></div>
            <div className="bd-hr" />
            <div className="bd-line bd-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button type="submit" className="bd-btn">Place order · ${total.toFixed(2)}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
