import React from "react";
import { useNavigate } from "react-router-dom";
import { useCannabisCart } from "../../context/CannabisCart";
import Icon from "../icons/Icon";

export default function StoreTopbar({ showSearch = true }) {
  const navigate = useNavigate();
  const { count } = useCannabisCart();
  return (
    <header className="bd-topbar">
      <div className="bd-brand" onClick={() => navigate("/")}>
        <span className="bd-logo"><Icon name="leaf" size={20} /></span>
        <span className="bd-wordmark">Bud<span>Dash</span></span>
      </div>
      {showSearch && (
        <div className="bd-search" onClick={() => navigate("/search")}>
          <Icon name="search" size={18} />
          <input placeholder="Search dispensaries, strains, brands" readOnly />
        </div>
      )}
      <div className="bd-spacer" />
      <button className="bd-signin" onClick={() => navigate("/login")}>Sign in</button>
      <button className="bd-cart" onClick={() => navigate("/bag")} aria-label="Cart">
        <Icon name="cart" size={18} />
        <span>Cart</span>
        {count > 0 && <span className="bd-cart-badge">{count}</span>}
      </button>
    </header>
  );
}
