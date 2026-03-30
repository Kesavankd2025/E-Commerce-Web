import React, { useState, useCallback } from 'react';
import { Check, X, Info } from 'lucide-react';

let toastId = 0;
let globalSetToasts = null;

export function showToast(message, type = 'success') {
  if (globalSetToasts) {
    const id = ++toastId;
    globalSetToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      globalSetToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  globalSetToasts = setToasts;

  const IconMap = { success: Check, error: X, info: Info };

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const Icon = IconMap[toast.type] || Info;
        return (
          <div key={toast.id} className={`toast toast-${toast.type} show`}>
            <div className="toast-icon"><Icon size={14} /></div>
            <div className="toast-message">{toast.message}</div>
          </div>
        );
      })}
    </div>
  );
}
