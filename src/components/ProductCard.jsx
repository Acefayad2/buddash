import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { add } = useCart()
  return (
    <div className="product-card">
      <div className="product-emoji">{product.emoji}</div>
      <div className="product-body">
        <div className="product-top">
          <strong className="product-name">{product.name}</strong>
          <span className="product-price">${product.price.toFixed(2)}</span>
        </div>
        <div className="product-tags">
          <span className="tag tag-strain">{product.strain}</span>
          <span className="tag">THC {product.thc}</span>
          <span className="tag tag-muted">{product.unit}</span>
        </div>
        <p className="product-desc">{product.desc}</p>
        <button className="btn btn-primary btn-sm" onClick={() => add(product)}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
