import React from "react";
import { useNavigate } from "react-router-dom";
import { useCannabisCart } from "../../context/CannabisCart";

export default function StoreTopbar({ showSearch = true }) {
  const navigate = useNavigate();
  const { count } = useCannabisCart();
  return (
    <header className="bd-topbar">
      <div className="bd-brand" onClick={() => navigate("/")}>
        <span className="bd-leaf">🌿</span>
        <span>Bud<span className="bd-brand-accent">Dash</span></span>
      </div>
      {showSearch && (
        <div className="bd-search">
          <span style={{ opacity: 0.5 }}>🔍</span>
          <input placeholder="Search BudDash" />
        </div>
      )}
      <div className="bd-spacer" />
      <button className="bd-signin" onClick={() => navigate("/login")}>Sign In</button>
      <button className="bd-cart" onClick={() => navigate("/bag")}>
        🛒 <span className="bd-cart-badge">{count}</span>
      </button>
    </header>
  );
}
