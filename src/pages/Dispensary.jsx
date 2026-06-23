import { useParams, Link } from 'react-router-dom'
import { dispensaryById, productsByDispensary } from '../data/catalog.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Dispensary() {
  const { id } = useParams()
  const d = dispensaryById(id)
  const items = productsByDispensary(id)

  if (!d) {
    return (
      <div className="page">
        <p className="empty-note">Dispensary not found. <Link to="/">Back home</Link></p>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="dispensary-header" style={{ background: d.image }}>
        {d.promo && <span className="dispensary-promo">{d.promo}</span>}
      </div>
      <div className="dispensary-headline">
        <Link to="/" className="back-link">← All dispensaries</Link>
        <h1>{d.name}</h1>
        <p className="dispensary-tag">{d.tagline}</p>
        <div className="dispensary-meta">
          <span className="rating">★ {d.rating}</span>
          <span>({d.reviews.toLocaleString()} reviews)</span>
          <span>🕒 {d.etaMin}–{d.etaMax} min</span>
          <span>🚚 {d.deliveryFee === 0 ? 'Free delivery' : `$${d.deliveryFee.toFixed(2)} delivery`}</span>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <h2>Menu</h2>
          <span className="section-sub">{items.length} items</span>
        </div>
        <div className="product-grid">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
