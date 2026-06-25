import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import Icon from "../../components/icons/Icon";
import { dispensaryBySlug, productsForDispensary } from "../../apollo/mocks";
import { useCannabisCart } from "../../context/CannabisCart";
import "../storefront.css";

const STRAIN_ICON = { Sativa: "sun", Indica: "moon", Hybrid: "hybrid" };

function ProductCard({ p, dispensaryName }) {
  const { add, items } = useCannabisCart();
  const inCart = items.find((i) => i.id === p.id);
  return (
    <div className="bd-prod">
      <div className="bd-prod-img" style={{ backgroundImage: `url(${p.image})` }}>
        {inCart && <span className="bd-prod-incart">{inCart.qty} in bag</span>}
      </div>
      <div className="bd-prod-info">
        <div className="bd-prod-top">
          <span className="bd-prod-name">{p.name}</span>
          <span className="bd-prod-price">${p.price.toFixed(2)}</span>
        </div>
        <div className="bd-prod-tags">
          <span className="bd-tag bd-tag-strain">
            {STRAIN_ICON[p.strain] && <Icon name={STRAIN_ICON[p.strain]} size={12} filled={p.strain === "Hybrid"} />}
            {p.strain}
          </span>
          <span className="bd-tag"><Icon name="flame" size={11} filled /> THC {p.thc}</span>
          <span className="bd-tag">{p.unit}</span>
        </div>
        <p className="bd-prod-desc">{p.desc}</p>
        <button
          className="bd-add"
          onClick={() => add({ id: p.id, name: p.name, price: p.price, image: p.image, emoji: p.emoji, unit: p.unit, dispensary: dispensaryName })}
        >
          <Icon name="plus" size={16} /> Add to bag
        </button>
      </div>
    </div>
  );
}

export default function Menu() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispensary = dispensaryBySlug(slug);
  const products = useMemo(() => productsForDispensary(slug), [slug]);
  const [cat, setCat] = useState("All");

  if (!dispensary) {
    return (
      <div className="bd">
        <StoreTopbar />
        <div className="bd-page">
          <button className="bd-back" onClick={() => navigate("/")}>
            <Icon name="arrowLeft" size={16} /> Back to dashboard
          </button>
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
        <button className="bd-back" onClick={() => navigate("/")}>
          <Icon name="arrowLeft" size={16} /> All dispensaries
        </button>

        <div className="bd-store-hero" style={{ backgroundImage: `url(${dispensary.image})` }}>
          {dispensary.fee === 0 && <span className="bd-store-feechip">$0 delivery fee</span>}
        </div>
        <h1 className="bd-store-title">{dispensary.name}</h1>
        <div className="bd-store-meta">
          <span className="bd-rating"><Icon name="star" size={14} filled /> {dispensary.rating} ({dispensary.reviews})</span>
          <span><Icon name="clock" size={14} /> {dispensary.time} min</span>
          <span><Icon name="pin" size={14} /> {dispensary.distance} mi</span>
          <span><Icon name="truck" size={14} /> {dispensary.fee === 0 ? "Free delivery" : `$${dispensary.fee.toFixed(2)} delivery`}</span>
          <span className="bd-store-open"><Icon name="shield" size={14} /> 21+ · Open now</span>
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
            <ProductCard key={p.id} p={p} dispensaryName={dispensary.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
