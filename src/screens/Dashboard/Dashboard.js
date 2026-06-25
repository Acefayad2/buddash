import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_DISPENSARIES } from "../../apollo/mocks";
import { useCannabisCart } from "../../context/CannabisCart";
import "./Dashboard.css";

const SIDEBAR = [
  { icon: "🏠", label: "Home" },
  { icon: "🌿", label: "Flower" },
  { icon: "🍬", label: "Edibles" },
  { icon: "💨", label: "Vapes" },
  { icon: "🚬", label: "Pre-Rolls" },
  { icon: "🍯", label: "Concentrates" },
  { icon: "🥤", label: "Drinks" },
  { icon: "🧴", label: "Topicals" },
  { icon: "🛍️", label: "Accessories" },
  { icon: "🏷️", label: "Deals" },
  { icon: "⭐", label: "Brands" },
  { icon: "🎁", label: "Gift Cards" },
];

const MOODS = [
  { icon: "🌿", label: "Flower" },
  { icon: "🍬", label: "Edibles" },
  { icon: "💨", label: "Vapes" },
  { icon: "🚬", label: "Pre-Rolls" },
  { icon: "🏷️", label: "Deals" },
  { icon: "☀️", label: "Sativa" },
  { icon: "🌙", label: "Indica" },
  { icon: "🌗", label: "Hybrid" },
  { icon: "🥤", label: "Drinks" },
  { icon: "🍯", label: "Concentrates" },
];

function Stars({ rating, reviews }) {
  return (
    <span className="dd-card-rating">
      {rating} <span className="dd-star">★</span>{" "}
      <span className="dd-muted">({reviews})</span>
    </span>
  );
}

function DispensaryCard({ d, onClick }) {
  return (
    <div className="dd-card" onClick={onClick}>
      <div className="dd-card-img" style={{ backgroundImage: `url(${d.image})` }}>
        {d.promo && <span className="dd-card-promo">{d.promo}</span>}
        <button
          className="dd-card-heart"
          onClick={(e) => e.stopPropagation()}
          aria-label="Save"
        >
          ♡
        </button>
      </div>
      <div className="dd-card-name">{d.name}</div>
      <Stars rating={d.rating} reviews={d.reviews} />
      <div className="dd-card-meta">
        {d.distance} mi · {d.time} min
      </div>
      <div className="dd-card-fee">
        {d.fee === 0 ? "$0 delivery fee" : `$${d.fee.toFixed(2)} delivery fee`}
      </div>
    </div>
  );
}

function Carousel({ title, items, navigate }) {
  const ref = React.useRef(null);
  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 600, behavior: "smooth" });
  };
  return (
    <section className="dd-section">
      <div className="dd-section-head">
        <h2>{title}</h2>
        <div className="dd-section-actions">
          <span className="dd-seeall">See All</span>
          <button className="dd-arrow" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
          <button className="dd-arrow" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
        </div>
      </div>
      <div className="dd-carousel" ref={ref}>
        {items.map((d) => (
          <DispensaryCard key={d.id} d={d} onClick={() => navigate(`/d/${d.slug}`)} />
        ))}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { count } = useCannabisCart();
  const [active, setActive] = useState("Home");
  const [mode, setMode] = useState("Delivery");

  const all = DASHBOARD_DISPENSARIES;
  const cheap = all.filter((d) => d.fee < 2);
  const fast = [...all].sort((a, b) => a.time - b.time);

  return (
    <div className="dd">
      {/* Top bar */}
      <header className="dd-topbar">
        <div className="dd-brand" onClick={() => navigate("/")}>
          <span className="dd-leaf">🌿</span>
          <span>Bud<span className="dd-brand-accent">Dash</span></span>
        </div>
        <div className="dd-search">
          <span className="dd-search-ico">🔍</span>
          <input placeholder="Search BudDash" />
        </div>
        <button className="dd-address">
          <span className="dd-pin">📍</span> 812 Whittington Ter <span className="dd-chevron">▾</span>
        </button>
        <div className="dd-toggle">
          {["Delivery", "Pickup"].map((m) => (
            <button
              key={m}
              className={mode === m ? "dd-toggle-on" : ""}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <button className="dd-icon-btn" aria-label="Notifications">🔔</button>
        <button className="dd-cart" aria-label="Cart" onClick={() => navigate("/bag")}>🛒 <span>{count}</span></button>
        <button className="dd-signin" onClick={() => navigate("/login")}>Sign In</button>
        <button className="dd-signup" onClick={() => navigate("/login")}>Sign Up</button>
      </header>

      <div className="dd-body">
        {/* Sidebar */}
        <aside className="dd-sidebar">
          {SIDEBAR.map((s) => (
            <button
              key={s.label}
              className={`dd-nav ${active === s.label ? "dd-nav-on" : ""}`}
              onClick={() => setActive(s.label)}
            >
              <span className="dd-nav-ico">{s.icon}</span> {s.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main className="dd-main">
          <h1 className="dd-mood-title">What are you in the mood for?</h1>
          <div className="dd-moods">
            {MOODS.map((m) => (
              <button key={m.label} className="dd-mood">
                <span className="dd-mood-ico">{m.icon}</span> {m.label}
              </button>
            ))}
          </div>

          <Carousel title="Under $2 delivery fee" items={cheap} navigate={navigate} />

          <div className="dd-banner">
            <div className="dd-banner-left">
              <h3>Get $5 off your first order</h3>
              <p>Use code <strong>BUD5</strong> at checkout. New customers, 21+.</p>
              <button className="dd-banner-btn" onClick={() => navigate("/login")}>Order now</button>
            </div>
            <div className="dd-banner-art">🌿</div>
          </div>

          <Carousel title="Popular near you" items={all} navigate={navigate} />
          <Carousel title="Fastest delivery" items={fast} navigate={navigate} />
        </main>
      </div>
    </div>
  );
}
