import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import Icon from "../../components/icons/Icon";
import UserContext from "../../context/User";
import { DASHBOARD_DISPENSARIES } from "../../apollo/mocks";
import "../storefront.css";

const PAST_ORDERS = [
  { id: "BD481920", dispensary: "The Green Room", status: "Delivered", date: "Jun 21", total: "62.48", items: ["Blue Dream ⅛", "Watermelon Gummies"] },
  { id: "BD477104", dispensary: "Sunset Botanicals", status: "Delivered", date: "Jun 14", total: "38.97", items: ["Sour Diesel Cart", "Mango THC Seltzer ×2"] },
  { id: "BD471882", dispensary: "Highland Greens", status: "Delivered", date: "Jun 2", total: "84.20", items: ["Live Resin Badder", "OG Kush ⅛", "Pre-Roll 5pk"] },
];

export default function BudOrders() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(UserContext);
  const [active, setActive] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("buddash-last-order");
      if (raw) {
        const o = JSON.parse(raw);
        setActive({
          id: o.id,
          total: o.total,
          items: (o.items || []).map((i) => `${i.qty}× ${i.name}`),
          dispensary: "BudDash order",
        });
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <div className="bd">
      <StoreTopbar />
      <div className="bd-page">
        <h1 className="bd-h1">Your orders</h1>

        {!isLoggedIn && (
          <div className="bd-banner-card">
            <div>
              <strong>Sign in to see all your orders</strong>
              <span>Track live deliveries and reorder your favorites in one tap.</span>
            </div>
            <button className="bd-btn bd-btn-inline" onClick={() => navigate("/login?redirect=/orders")}>Sign in</button>
          </div>
        )}

        {active && (
          <>
            <h3 className="bd-orders-section">Active</h3>
            <div className="bd-order bd-order-active" onClick={() => navigate("/order-confirm")}>
              <div className="bd-order-ico bd-order-ico-live"><Icon name="truck" size={22} /></div>
              <div className="bd-order-main">
                <div className="bd-order-top"><strong>{active.dispensary}</strong><span className="bd-order-status live">In progress</span></div>
                <p className="bd-order-items">{active.items.join(" · ")}</p>
                <span className="bd-order-meta">Order #{active.id} · ${active.total}</span>
              </div>
              <button className="bd-order-track">Track <Icon name="chevronRight" size={16} /></button>
            </div>
          </>
        )}

        <h3 className="bd-orders-section">Past orders</h3>
        <div className="bd-orders-list">
          {PAST_ORDERS.map((o) => {
            const disp = DASHBOARD_DISPENSARIES.find((d) => d.name === o.dispensary);
            return (
              <div className="bd-order" key={o.id}>
                <div className="bd-order-ico"><Icon name="check" size={20} /></div>
                <div className="bd-order-main">
                  <div className="bd-order-top"><strong>{o.dispensary}</strong><span className="bd-order-status">{o.status} · {o.date}</span></div>
                  <p className="bd-order-items">{o.items.join(" · ")}</p>
                  <span className="bd-order-meta">Order #{o.id} · ${o.total}</span>
                </div>
                <button className="bd-order-reorder" onClick={() => navigate(disp ? `/d/${disp.slug}` : "/")}>Reorder</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
