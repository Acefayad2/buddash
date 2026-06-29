import React, { useState } from "react";
import Icon from "../icons/Icon";
import { useAddress } from "../../context/Address";
import { SAVED_ADDRESSES } from "../../apollo/mocks";

export default function AddressModal({ open, onClose }) {
  const { address, setAddress } = useAddress();
  const [typed, setTyped] = useState("");

  if (!open) return null;

  const choose = (a) => {
    setAddress(a);
    onClose();
  };

  const submitTyped = (e) => {
    e.preventDefault();
    const line = typed.trim();
    if (!line) return;
    // Custom typed address: default to the widest service area so it still shows results.
    setAddress({ id: "custom", label: "New address", line, city: "Delivery address", area: "custom" });
    onClose();
  };

  return (
    <div className="addr-overlay" onClick={onClose}>
      <div className="addr-modal" role="dialog" aria-label="Choose delivery address" onClick={(e) => e.stopPropagation()}>
        <div className="addr-head">
          <h3>Delivery address</h3>
          <button className="addr-close" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>
        </div>

        <form className="addr-search" onSubmit={submitTyped}>
          <Icon name="search" size={18} />
          <input
            autoFocus
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Enter a new address"
          />
          {typed && <button type="submit" className="addr-use">Use</button>}
        </form>

        <p className="addr-label">Saved addresses</p>
        <div className="addr-list">
          {SAVED_ADDRESSES.map((a) => {
            const active = a.id === address.id;
            return (
              <button key={a.id} className={`addr-item ${active ? "addr-item-on" : ""}`} onClick={() => choose(a)}>
                <span className="addr-item-ico"><Icon name="pin" size={18} /></span>
                <span className="addr-item-main">
                  <strong>{a.label} · {a.line}</strong>
                  <span>{a.city}</span>
                </span>
                {active && <Icon name="check" size={18} />}
              </button>
            );
          })}
        </div>

        <p className="addr-foot"><Icon name="shield" size={14} /> 21+ delivery only · we verify ID at the door</p>
      </div>
    </div>
  );
}
