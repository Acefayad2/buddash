import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import Icon from "../../components/icons/Icon";
import { DASHBOARD_DISPENSARIES, productsForDispensary } from "../../apollo/mocks";
import "../storefront.css";

const QUICK = ["Flower", "Edibles", "Vapes", "Pre-Rolls", "Sativa", "Indica", "Deals"];

// Build a flat product index across the first few dispensaries (mock).
const PRODUCT_INDEX = DASHBOARD_DISPENSARIES.slice(0, 4).flatMap((d) =>
  productsForDispensary(d.slug).map((p) => ({ ...p, dispSlug: d.slug, dispName: d.name }))
);

export default function BudSearch() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const query = q.trim().toLowerCase();

  const { dispensaries, products } = useMemo(() => {
    if (!query) return { dispensaries: [], products: [] };
    const dispensaries = DASHBOARD_DISPENSARIES.filter((d) => d.name.toLowerCase().includes(query));
    const products = PRODUCT_INDEX.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.strain.toLowerCase().includes(query)
    ).slice(0, 12);
    return { dispensaries, products };
  }, [query]);

  const hasResults = dispensaries.length > 0 || products.length > 0;

  return (
    <div className="bd">
      <StoreTopbar showSearch={false} />
      <div className="bd-page">
        <h1 className="bd-h1">Search</h1>

        <div className="bd-searchbar">
          <Icon name="search" size={20} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dispensaries, strains, products"
          />
          {q && <button className="bd-searchbar-clear" onClick={() => setQ("")} aria-label="Clear"><Icon name="close" size={18} /></button>}
        </div>

        {!query && (
          <>
            <h3 className="bd-orders-section">Popular searches</h3>
            <div className="bd-cats">
              {QUICK.map((c) => (
                <button key={c} className="bd-cat" onClick={() => setQ(c)}>{c}</button>
              ))}
            </div>
            <h3 className="bd-orders-section">Top dispensaries</h3>
            <div className="bd-grid">
              {DASHBOARD_DISPENSARIES.slice(0, 6).map((d) => (
                <DispRow key={d.id} d={d} navigate={navigate} />
              ))}
            </div>
          </>
        )}

        {query && !hasResults && (
          <div className="bd-empty">
            <div className="bd-empty-ico"><Icon name="search" size={42} /></div>
            <h2>No results for “{q}”</h2>
            <p>Try a strain, category, or dispensary name.</p>
          </div>
        )}

        {dispensaries.length > 0 && (
          <>
            <h3 className="bd-orders-section">Dispensaries</h3>
            <div className="bd-grid">
              {dispensaries.map((d) => <DispRow key={d.id} d={d} navigate={navigate} />)}
            </div>
          </>
        )}

        {products.length > 0 && (
          <>
            <h3 className="bd-orders-section">Products</h3>
            <div className="bd-grid">
              {products.map((p) => (
                <div className="bd-prod" key={`${p.dispSlug}-${p.id}`} onClick={() => navigate(`/d/${p.dispSlug}`)} style={{ cursor: "pointer" }}>
                  <div className="bd-prod-img" style={{ backgroundImage: `url(${p.image})` }} />
                  <div className="bd-prod-info">
                    <div className="bd-prod-top">
                      <span className="bd-prod-name">{p.name}</span>
                      <span className="bd-prod-price">${p.price.toFixed(2)}</span>
                    </div>
                    <div className="bd-prod-tags">
                      <span className="bd-tag bd-tag-strain">{p.strain}</span>
                      <span className="bd-tag">THC {p.thc}</span>
                    </div>
                    <p className="bd-prod-desc">{p.dispName}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function DispRow({ d, navigate }) {
  return (
    <div className="bd-prod" onClick={() => navigate(`/d/${d.slug}`)} style={{ cursor: "pointer" }}>
      <div className="bd-prod-img" style={{ backgroundImage: `url(${d.image})` }} />
      <div className="bd-prod-info">
        <div className="bd-prod-top">
          <span className="bd-prod-name">{d.name}</span>
          <span className="bd-prod-price" style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
            <Icon name="star" size={13} filled /> {d.rating}
          </span>
        </div>
        <p className="bd-prod-desc" style={{ marginBottom: 0 }}>{d.time} min · {d.distance} mi · {d.fee === 0 ? "Free delivery" : `$${d.fee.toFixed(2)} delivery`}</p>
      </div>
    </div>
  );
}
