import { useEffect, useState } from 'react'

export default function AgeGate() {
  const [confirmed, setConfirmed] = useState(true)

  useEffect(() => {
    const ok = sessionStorage.getItem('buddash-age-ok')
    if (!ok) setConfirmed(false)
  }, [])

  if (confirmed) return null

  function allow() {
    sessionStorage.setItem('buddash-age-ok', '1')
    setConfirmed(true)
  }

  return (
    <div className="agegate">
      <div className="agegate-card">
        <div className="agegate-leaf">🌿</div>
        <h2>Welcome to BudDash</h2>
        <p>You must be 21 or older to enter. Please confirm your age.</p>
        <div className="agegate-actions">
          <button className="btn btn-primary" onClick={allow}>I'm 21 or older</button>
          <a className="btn btn-ghost" href="https://www.google.com">Exit</a>
        </div>
        <p className="agegate-fine">Demo app with mock data. Cannabis laws vary by location.</p>
      </div>
    </div>
  )
}
