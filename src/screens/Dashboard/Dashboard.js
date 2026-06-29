import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_DISPENSARIES } from "../../apollo/mocks";
import { useCannabisCart } from "../../context/CannabisCart";
import Icon from "../../components/icons/Icon";
import "./Dashboard.css";

const SIDEBAR = [
  { icon: "home", label: "Home" },
  { icon: "leaf", label: "Flower" },
  { icon: "cookie", label: "Edibles" },
  { icon: "vape", label: "Vapes" },
  { icon: "joint", label: "Pre-Rolls" },
  { icon: "droplet", label: "Concentrates" },
  { icon: "cup", label: "Drinks" },
  { icon: "lotion", label: "Topicals" },
  { icon: "bagShop", label: "Accessories" },
  { icon: "tag", label: "Deals" },
  { icon: "badge", label: "Brands" },
  { icon: "gift", label: "Gift Cards" },
];

const MOODS = [
  { icon: "leaf", label: "Flower" },
  { icon: "cookie", label: "Edibles" },
  { icon: "vape", label: "Vapes" },
  { icon: "joint", label: "Pre-Rolls" },
  { icon: "sun", label: "Sativa" },
  { icon: "moon", label: "Indica" },
  { icon: "hybrid", label: "Hybrid" },
  { icon: "cup", label: "Drinks" },
  { icon: "droplet", label: "Concentrates" },
  { icon: "tag", label: "Deals" },
];

// Reveal-on-scroll wrapper (IntersectionObserver, GPU-friendly, reduced-motion safe).
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

// Tracks whether a remote image has loaded so we can show a shimmer skeleton first.
function useImageLoaded(src) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!src) return;
    let active = true;
    const img = new Image();
    img.onload = () => active && setLoaded(true);
    img.onerror = () => active && setLoaded(true);
    img.src = src;
    return () => {
      active = false;
    };
  }, [src]);
  return loaded;
}

function DispensaryCard({ d, onClick }) {
  const loaded = useImageLoaded(d.image);
  // Cursor-tracked spotlight: feed pointer position into CSS custom props.
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article className="dd-card" onClick={onClick} onMouseMove={onMove}>
      <div className="dd-card-tray">
        <div
          className={`dd-card-img ${loaded ? "" : "is-loading"}`}
          style={loaded ? { backgroundImage: `url(${d.image})` } : undefined}
        >
          <button
            className="dd-card-heart"
            onClick={(e) => e.stopPropagation()}
            aria-label="Save dispensary"
          >
            <Icon name="heart" size={18} />
          </button>
          <span className="dd-card-fee-chip">
            {d.fee === 0 ? "$0 delivery fee" : `$${d.fee.toFixed(2)} delivery fee`}
          </span>
        </div>
      </div>
      <div className="dd-card-body">
        <div className="dd-card-row">
          <span className="dd-card-name">{d.name}</span>
          <span className="dd-card-rating">
            <Icon name="star" size={13} filled /> {d.rating}
          </span>
        </div>
        <div className="dd-card-meta">
          <Icon name="clock" size={13} /> {d.time} min · {d.distance} mi
          <span className="dd-card-reviews">· {d.reviews} ratings</span>
        </div>
        {d.promo && <span className="dd-card-promo"><Icon name="tag" size={12} /> {d.promo}</span>}
      </div>
    </article>
  );
}

function Carousel({ title, items, navigate, delay }) {
  const ref = React.useRef(null);
  const scroll = (dir) => {
    if (ref.current) ref.current.scrollBy({ left: dir * 640, behavior: "smooth" });
  };
  return (
    <Reveal delay={delay} className="dd-section">
      <div className="dd-section-head">
        <h2>{title}</h2>
        <div className="dd-section-actions">
          <span className="dd-seeall">See all</span>
          <button className="dd-arrow" onClick={() => scroll(-1)} aria-label="Scroll left">
            <Icon name="chevronLeft" size={20} />
          </button>
          <button className="dd-arrow" onClick={() => scroll(1)} aria-label="Scroll right">
            <Icon name="chevronRight" size={20} />
          </button>
        </div>
      </div>
      <div className="dd-carousel" ref={ref}>
        {items.map((d) => (
          <DispensaryCard key={d.id} d={d} onClick={() => navigate(`/d/${d.slug}`)} />
        ))}
      </div>
    </Reveal>
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
          <span className="dd-logo"><Icon name="leaf" size={20} /></span>
          <span className="dd-wordmark">Bud<span>Dash</span></span>
        </div>

        <button className="dd-address">
          <Icon name="pin" size={16} />
          <span className="dd-address-text">812 Whittington Ter</span>
          <Icon name="chevronDown" size={15} />
        </button>

        <div className="dd-search" onClick={() => navigate("/search")}>
          <Icon name="search" size={18} />
          <input placeholder="Search dispensaries, strains, brands" readOnly />
        </div>

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

        <button className="dd-icon-btn" aria-label="Notifications">
          <Icon name="bell" size={20} />
        </button>
        <button className="dd-cart" aria-label="Cart" onClick={() => navigate("/bag")}>
          <Icon name="cart" size={18} />
          <span>Cart</span>
          {count > 0 && <span className="dd-cart-badge">{count}</span>}
        </button>
        <button className="dd-signin" onClick={() => navigate("/login")}>Sign in</button>
        <button className="dd-signup" onClick={() => navigate("/login")}>Sign up</button>
      </header>

      <div className="dd-body">
        {/* Sidebar */}
        <aside className="dd-sidebar">
          <p className="dd-sidebar-label">Categories</p>
          {SIDEBAR.map((s) => (
            <button
              key={s.label}
              className={`dd-nav ${active === s.label ? "dd-nav-on" : ""}`}
              onClick={() => setActive(s.label)}
            >
              <span className="dd-nav-ico"><Icon name={s.icon} size={20} /></span> {s.label}
            </button>
          ))}
          <div className="dd-sidebar-card">
            <Icon name="shield" size={22} />
            <div>
              <strong>21+ verified delivery</strong>
              <span>Licensed dispensaries, ID checked at the door.</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="dd-main">
          {/* Hero */}
          <Reveal>
            <section className="dd-hero">
              <div className="dd-hero-text">
                <span className="dd-hero-kicker">New customers · 21+</span>
                <h1>$5 off your first delivery</h1>
                <p>Premium flower, edibles & more — delivered in 30 minutes. Use code <strong>BUD5</strong>.</p>
                <button className="dd-hero-btn" onClick={() => navigate("/login")}>
                  Start an order
                  <span className="dd-hero-btn-ico"><Icon name="chevronRight" size={18} /></span>
                </button>
              </div>
              <div className="dd-hero-glow" aria-hidden="true">
                <Icon name="leaf" size={150} />
              </div>
            </section>
          </Reveal>

          <Reveal delay={60}>
            <h2 className="dd-mood-title">Shop by category</h2>
            <div className="dd-moods">
              {MOODS.map((m, i) => (
                <button key={m.label} className="dd-mood" style={{ transitionDelay: `${i * 18}ms` }}>
                  <span className="dd-mood-ico"><Icon name={m.icon} size={22} /></span>
                  {m.label}
                </button>
              ))}
            </div>
          </Reveal>

          <Carousel title="Under $2 delivery fee" items={cheap} navigate={navigate} delay={40} />
          <Carousel title="Popular near you" items={all} navigate={navigate} delay={40} />
          <Carousel title="Fastest delivery" items={fast} navigate={navigate} delay={40} />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="dd-bottomnav">
        <button className="dd-bn dd-bn-on"><Icon name="home" size={22} /><span>Home</span></button>
        <button className="dd-bn" onClick={() => navigate("/search")}><Icon name="search" size={22} /><span>Search</span></button>
        <button className="dd-bn" onClick={() => navigate("/bag")}>
          <span className="dd-bn-cart"><Icon name="cart" size={22} />{count > 0 && <i>{count}</i>}</span>
          <span>Cart</span>
        </button>
        <button className="dd-bn" onClick={() => navigate("/orders")}><Icon name="clock" size={22} /><span>Orders</span></button>
        <button className="dd-bn" onClick={() => navigate("/account")}><Icon name="user" size={22} /><span>Account</span></button>
      </nav>
    </div>
  );
}
