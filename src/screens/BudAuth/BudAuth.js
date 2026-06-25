import React, { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import StoreTopbar from "../../components/StoreTopbar/StoreTopbar";
import Icon from "../../components/icons/Icon";
import UserContext from "../../context/User";
import "../storefront.css";

const DEMO_EMAIL = "ace@gmail.com";
const DEMO_PASSWORD = "abcd1234";

export default function BudAuth() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { setTokenAsync } = useContext(UserContext);

  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function finish() {
    setTokenAsync("mock-token-buddash", () => {});
    try { localStorage.setItem("buddash-user", JSON.stringify({ name: name || "Ace", email: email || DEMO_EMAIL })); } catch { /* ignore */ }
    navigate(redirect);
  }

  function submit(e) {
    e.preventDefault();
    setError("");
    if (mode === "signin") {
      const ok = email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
      if (!ok) { setError("Invalid credentials. Try the demo account below."); return; }
      finish();
    } else {
      if (!name.trim() || !email.trim() || password.length < 6) {
        setError("Enter your name, email, and a password (6+ characters).");
        return;
      }
      finish();
    }
  }

  return (
    <div className="bd">
      <StoreTopbar showSearch={false} />
      <div className="bd-page bd-auth-page">
        <div className="bd-auth">
          <div className="bd-auth-logo"><Icon name="leaf" size={26} /></div>
          <h1 className="bd-auth-title">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
          <p className="bd-auth-sub">Fast cannabis delivery, 21+. {mode === "signin" ? "Sign in to keep ordering." : "Join BudDash in seconds."}</p>

          <div className="bd-auth-tabs">
            <button className={mode === "signin" ? "on" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button>
            <button className={mode === "signup" ? "on" : ""} onClick={() => { setMode("signup"); setError(""); }}>Sign up</button>
          </div>

          <form onSubmit={submit}>
            {mode === "signup" && (
              <label className="bd-auth-field">
                <span>Full name</span>
                <input className="bd-field" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
              </label>
            )}
            <label className="bd-auth-field">
              <span>Email</span>
              <input className="bd-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" />
            </label>
            <label className="bd-auth-field">
              <span>Password</span>
              <div className="bd-auth-pw">
                <input className="bd-field" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete={mode === "signin" ? "current-password" : "new-password"} />
                <button type="button" className="bd-auth-pwtoggle" onClick={() => setShowPw((s) => !s)}>{showPw ? "Hide" : "Show"}</button>
              </div>
            </label>

            {error && <div className="bd-auth-error"><Icon name="shield" size={15} /> {error}</div>}

            <button type="submit" className="bd-btn">{mode === "signin" ? "Sign in" : "Create account"}</button>
          </form>

          <div className="bd-auth-divider"><span>or</span></div>
          <button className="bd-auth-social" onClick={finish}><Icon name="user" size={18} /> Continue as guest</button>

          {mode === "signin" && (
            <button
              type="button"
              className="bd-auth-demo"
              onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); }}
            >
              Use demo account → <strong>{DEMO_EMAIL}</strong> / {DEMO_PASSWORD}
            </button>
          )}

          <p className="bd-auth-legal">By continuing you confirm you are 21+ and agree to our Terms & Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
}
