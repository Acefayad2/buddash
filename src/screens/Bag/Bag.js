import React from "react";
import { useNavigate } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import Icon from "../../components/icons/Icon";
import { useCannabisCart } from "../../context/CannabisCart";
import "../storefront.css";

const DELIVERY = 2.99;

export default function Bag() {
  const navigate = useNavigate();
  const { items, subtotal, count, add, decrement, remove } = useCannabisCart();

  if (count === 0) {
    return (
      <div className="bd">
        <StoreTopbar />
        <div className="bd-page">
          <div className="bd-empty">
            <div className="bd-empty-ico"><Icon name="cart" size={42} /></div>
            <h2>Your bag is empty</h2>
            <p>Add something from a dispensary to get rolling.</p>
            <button className="bd-btn bd-btn-inline" onClick={() => navigate("/")}>Browse dispensaries</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bd">
      <StoreTopbar />
      <div className="bd-page">
        <button className="bd-back" onClick={() => navigate("/")}>
          <Icon name="arrowLeft" size={16} /> Keep shopping
        </button>
        <h1 className="bd-h1">Your bag <span className="bd-h1-count">{count}</span></h1>
        <div className="bd-cols">
          <div className="bd-card">
            {items.map((i) => (
              <div className="bd-item" key={i.id}>
                <div
                  className="bd-item-img"
                  style={i.image ? { backgroundImage: `url(${i.image})` } : {}}
                >
                  {!i.image && <Icon name="leaf" size={22} />}
                </div>
                <div className="bd-item-info">
                  <strong>{i.name}</strong>
                  <span>{i.dispensary ? `${i.dispensary} · ` : ""}{i.unit} · ${i.price.toFixed(2)}</span>
                </div>
                <div className="bd-qty">
                  <button onClick={() => decrement(i.id)} aria-label="Decrease"><Icon name="minus" size={15} /></button>
                  <span>{i.qty}</span>
                  <button onClick={() => add(i)} aria-label="Increase"><Icon name="plus" size={15} /></button>
                </div>
                <span className="bd-item-line">${(i.qty * i.price).toFixed(2)}</span>
                <button className="bd-item-remove" onClick={() => remove(i.id)} aria-label="Remove"><Icon name="trash" size={17} /></button>
              </div>
            ))}
          </div>

          <div className="bd-card bd-summary">
            <h3 className="bd-summary-title">Order summary</h3>
            <div className="bd-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="bd-line"><span>Delivery</span><span>${DELIVERY.toFixed(2)}</span></div>
            <div className="bd-hr" />
            <div className="bd-line bd-total"><span>Estimated total</span><span>${(subtotal + DELIVERY).toFixed(2)}</span></div>
            <button className="bd-btn" onClick={() => navigate("/checkout")}>
              Go to checkout <Icon name="chevronRight" size={18} />
            </button>
            <p className="bd-summary-note"><Icon name="shield" size={14} /> 21+ ID verified at delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
}
