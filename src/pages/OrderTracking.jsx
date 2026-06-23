import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STEPS = [
  { id: 'confirmed', label: 'Order confirmed', icon: '✅', detail: 'The dispensary received your order.' },
  { id: 'preparing', label: 'Preparing', icon: '📦', detail: 'Your items are being packed and ID-tagged.' },
  { id: 'enroute', label: 'Driver en route', icon: '🚗', detail: 'Your driver is on the way to you.' },
  { id: 'delivered', label: 'Delivered', icon: '🌿', detail: 'Enjoy responsibly. Thanks for using BudDash!' },
]

export default function OrderTracking() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (step >= STEPS.length - 1) return
    const t = setTimeout(() => setStep((s) => s + 1), 3500)
    return () => clearTimeout(t)
  }, [step])

  const current = STEPS[step]
  const etaMin = Math.max(0, (STEPS.length - 1 - step) * 12)

  return (
    <div className="page">
      <div className="track">
        <div className="track-hero">
          <div className="track-emoji">{current.icon}</div>
          <h1>{current.label}</h1>
          <p>{current.detail}</p>
          {step < STEPS.length - 1 ? (
            <span className="track-eta">Estimated arrival in ~{etaMin || 12} min</span>
          ) : (
            <span className="track-eta track-done">Order complete</span>
          )}
        </div>

        <div className="track-steps">
          {STEPS.map((s, idx) => (
            <div key={s.id} className={`track-step ${idx <= step ? 'done' : ''} ${idx === step ? 'active' : ''}`}>
              <div className="track-dot">{idx < step ? '✓' : s.icon}</div>
              <div className="track-step-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="track-map">
          <div className="track-map-grid" />
          <div className="track-driver" style={{ left: `${(step / (STEPS.length - 1)) * 100}%` }}>🚗</div>
          <div className="track-home">🏠</div>
        </div>

        <Link to="/" className="btn btn-ghost btn-block">Back to home</Link>
      </div>
    </div>
  )
}
