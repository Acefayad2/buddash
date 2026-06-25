import React from "react";
import { useNavigate } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import { useCannabisCart } from "../../context/CannabisCart";
import "../storefront.css";

export default function Bag() {
  const navigate = useNavigate();
  const { items, subtotal, count, add, decrement, remove } = useCannabisCart();

  if (count === 0) {
    return (
      <div className="bd">
        <StoreTopbar />
        <div className="bd-page">
          <div className="bd-empty">
            <div className="bd-empty-leaf">🌿</div>
            <h2>Your bag is empty</h2>
            <p>Add something from a dispensary to get rolling.</p>
            <br />
            <button className="bd-add" onClick={() => navigate("/")}>Browse dispensaries</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bd">
      <StoreTopbar />
      <div className="bd-page">
        <button className="bd-back" onClick={() => navigate("/")}>← Keep shopping</button>
        <h1 className="bd-h1">Your bag ({count})</h1>
        <div className="bd-cols">
          <div className="bd-card">
            {items.map((i) => (
              <div className="bd-item" key={i.id}>
                <div className="bd-item-emoji">{i.emoji}</div>
                <div className="bd-item-info">
                  <strong>{i.name}</strong>
                  <span>{i.dispensary ? `${i.dispensary} · ` : ""}{i.unit} · ${i.price.toFixed(2)}</span>
                </div>
                <div className="bd-qty">
                  <button onClick={() => decrement(i.id)} aria-label="Decrease">−</button>
                  <span>{i.qty}</span>
                  <button onClick={() => add(i)} aria-label="Increase">+</button>
                </div>
                <button className="bd-item-remove" onClick={() => remove(i.id)} aria-label="Remove">🗑</button>
              </div>
            ))}
          </div>

          <div className="bd-card">
            <div className="bd-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="bd-line"><span>Delivery</span><span>$2.99</span></div>
            <div className="bd-hr" />
            <div className="bd-line bd-total"><span>Estimated total</span><span>${(subtotal + 2.99).toFixed(2)}</span></div>
            <br />
            <button className="bd-btn" onClick={() => navigate("/checkout")}>Go to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}
