import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, dispensaries, products } from '../data/catalog.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const [activeCat, setActiveCat] = useState('all')
  const [query, setQuery] = useState('')

  const filtered = products.filter((p) => {
    const catOk = activeCat === 'all' || p.category === activeCat
    const q = query.trim().toLowerCase()
    const qOk = !q || p.name.toLowerCase().includes(q) || p.strain.toLowerCase().includes(q)
    return catOk && qOk
  })

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <h1>Cannabis, delivered.</h1>
          <p>Browse local dispensaries and get it dropped at your door in under an hour.</p>
          <div className="hero-search">
            <input
              placeholder="Search strains, edibles, vapes…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="cat-row">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`chip ${activeCat === c.id ? 'chip-active' : ''}`}
            onClick={() => setActiveCat(c.id)}
          >
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Dispensaries near you</h2>
          <span className="section-sub">{dispensaries.length} open now</span>
        </div>
        <div className="dispensary-grid">
          {dispensaries.map((d) => (
            <Link to={`/d/${d.id}`} className="dispensary-card" key={d.id}>
              <div className="dispensary-banner" style={{ background: d.image }}>
                {d.promo && <span className="dispensary-promo">{d.promo}</span>}
              </div>
              <div className="dispensary-info">
                <div className="dispensary-top">
                  <strong>{d.name}</strong>
                  <span className="rating">★ {d.rating}</span>
                </div>
                <p className="dispensary-tag">{d.tagline}</p>
                <div className="dispensary-meta">
                  <span>🕒 {d.etaMin}–{d.etaMax} min</span>
                  <span>🚚 {d.deliveryFee === 0 ? 'Free' : `$${d.deliveryFee.toFixed(2)}`}</span>
                  <span>({d.reviews.toLocaleString()})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{activeCat === 'all' ? 'Popular right now' : categories.find((c) => c.id === activeCat).label}</h2>
          <span className="section-sub">{filtered.length} items</span>
        </div>
        {filtered.length === 0 ? (
          <p className="empty-note">No products match your search.</p>
        ) : (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
