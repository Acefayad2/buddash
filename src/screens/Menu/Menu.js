import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import { dispensaryBySlug, productsForDispensary } from "../../apollo/mocks";
import { useCannabisCart } from "../../context/CannabisCart";
import "../storefront.css";

export default function Menu() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { add } = useCannabisCart();
  const dispensary = dispensaryBySlug(slug);
  const products = useMemo(() => productsForDispensary(slug), [slug]);
  const [cat, setCat] = useState("All");

  if (!dispensary) {
    return (
      <div className="bd">
        <StoreTopbar />
        <div className="bd-page">
          <button className="bd-back" onClick={() => navigate("/")}>← Back to dashboard</button>
          <p>Dispensary not found.</p>
        </div>
      </div>
    );
  }

  const cats = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
  const shown = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <div className="bd">
      <StoreTopbar />
      <div className="bd-page">
        <button className="bd-back" onClick={() => navigate("/")}>← All dispensaries</button>
        <div className="bd-store-hero" style={{ backgroundImage: `url(${dispensary.image})` }} />
        <h1 className="bd-store-title">{dispensary.name}</h1>
        <div className="bd-store-meta">
          <span className="bd-rating">★ {dispensary.rating} ({dispensary.reviews})</span>
          <span>{dispensary.distance} mi</span>
          <span>{dispensary.time} min</span>
          <span>{dispensary.fee === 0 ? "Free delivery" : `$${dispensary.fee.toFixed(2)} delivery`}</span>
        </div>

        <div className="bd-cats">
          {cats.map((c) => (
            <button key={c} className={`bd-cat ${cat === c ? "bd-cat-on" : ""}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="bd-grid">
          {shown.map((p) => (
            <div className="bd-prod" key={p.id}>
              <div className="bd-prod-emoji">{p.emoji}</div>
              <div className="bd-prod-info">
                <div className="bd-prod-top">
                  <span className="bd-prod-name">{p.name}</span>
                  <span className="bd-prod-price">${p.price.toFixed(2)}</span>
                </div>
                <div className="bd-prod-tags">
                  <span className="bd-tag bd-tag-strain">{p.strain}</span>
                  <span className="bd-tag">THC {p.thc}</span>
                  <span className="bd-tag">{p.unit}</span>
                </div>
                <p className="bd-prod-desc">{p.desc}</p>
                <button
                  className="bd-add"
                  onClick={() => add({ id: p.id, name: p.name, price: p.price, emoji: p.emoji, unit: p.unit, dispensary: dispensary.name })}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
