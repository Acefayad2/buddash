import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SAVED_ADDRESSES } from "../apollo/mocks";

const AddressContext = createContext(null);
const STORAGE_KEY = "buddash-address";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return SAVED_ADDRESSES[0];
}

export function AddressProvider({ children }) {
  const [address, setAddressState] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(address));
    } catch {
      /* ignore */
    }
  }, [address]);

  const value = useMemo(
    () => ({ address, setAddress: setAddressState }),
    [address]
  );

  return <AddressContext.Provider value={value}>{children}</AddressContext.Provider>;
}

export function useAddress() {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error("useAddress must be used within AddressProvider");
  return ctx;
}
