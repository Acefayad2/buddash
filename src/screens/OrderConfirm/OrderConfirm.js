import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import "../storefront.css";

const STEPS = [
  { id: "confirmed", label: "Order confirmed", icon: "✅", detail: "The dispensary received your order." },
  { id: "preparing", label: "Preparing", icon: "📦", detail: "Your items are being packed and ID-tagged." },
  { id: "enroute", label: "Driver en route", icon: "🚗", detail: "Your driver is on the way to you." },
  { id: "delivered", label: "Delivered", icon: "🌿", detail: "Enjoy responsibly. Thanks for using BudDash!" },
];

export default function OrderConfirm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("buddash-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (step >= STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 3500);
    return () => clearTimeout(t);
  }, [step]);

  const current = STEPS[step];
  const eta = Math.max(0, (STEPS.length - 1 - step) * 12) || 12;

  return (
    <div className="bd">
      <StoreTopbar />
      <div className="bd-page">
        <div className="bd-track">
          <div className="bd-track-emoji">{current.icon}</div>
          <h1>{current.label}</h1>
          <p>{current.detail}</p>
          {order && <p style={{ marginTop: 8 }}>Order <strong>#{order.id}</strong> · ${order.total}</p>}
          {step < STEPS.length - 1 ? (
            <div className="bd-eta">Estimated arrival in ~{eta} min</div>
          ) : (
            <div className="bd-eta">Order complete 🎉</div>
          )}

          <div className="bd-steps">
            {STEPS.map((s, idx) => (
              <div key={s.id} className={`bd-step ${idx <= step ? "done" : ""} ${idx === step ? "active" : ""}`}>
                <div className="bd-dot">{idx < step ? "✓" : s.icon}</div>
                <div className="bd-step-label">{s.label}</div>
              </div>
            ))}
          </div>

          <button className="bd-btn" style={{ maxWidth: 260, margin: "0 auto" }} onClick={() => navigate("/")}>
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
