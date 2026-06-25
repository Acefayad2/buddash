import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import Icon from "../../components/icons/Icon";
import UserContext from "../../context/User";
import "../storefront.css";

const MENU = [
  { icon: "clock", label: "Order history", to: "/orders", desc: "View and reorder past orders" },
  { icon: "pin", label: "Addresses", to: "/account", desc: "812 Whittington Ter, Denver" },
  { icon: "truck", label: "Payment methods", to: "/account", desc: "Cash on delivery" },
  { icon: "shield", label: "ID & verification", to: "/account", desc: "21+ verified" },
  { icon: "bell", label: "Notifications", to: "/account", desc: "Order updates & deals" },
];

export default function BudAccount() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(UserContext);

  let user = { name: "Ace", email: "ace@gmail.com" };
  try {
    const raw = localStorage.getItem("buddash-user");
    if (raw) user = JSON.parse(raw);
  } catch { /* ignore */ }

  if (!isLoggedIn) {
    return (
      <div className="bd">
        <StoreTopbar />
        <div className="bd-page">
          <div className="bd-empty">
            <div className="bd-empty-ico"><Icon name="user" size={42} /></div>
            <h2>You're not signed in</h2>
            <p>Sign in to manage your orders, addresses, and payment.</p>
            <button className="bd-btn bd-btn-inline" onClick={() => navigate("/login?redirect=/account")}>Sign in or sign up</button>
          </div>
        </div>
      </div>
    );
  }

  const initials = (user.name || "U").split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="bd">
      <StoreTopbar />
      <div className="bd-page">
        <h1 className="bd-h1">Account</h1>

        <div className="bd-card bd-account-head">
          <div className="bd-avatar">{initials}</div>
          <div>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <span className="bd-account-badge"><Icon name="shield" size={14} /> 21+ verified</span>
        </div>

        <div className="bd-card bd-account-menu">
          {MENU.map((m) => (
            <button key={m.label} className="bd-account-row" onClick={() => navigate(m.to)}>
              <span className="bd-account-row-ico"><Icon name={m.icon} size={20} /></span>
              <span className="bd-account-row-main">
                <strong>{m.label}</strong>
                <span>{m.desc}</span>
              </span>
              <Icon name="chevronRight" size={18} />
            </button>
          ))}
        </div>

        <button className="bd-account-logout" onClick={() => { logout(); navigate("/"); }}>
          Log out
        </button>
      </div>
    </div>
  );
}
