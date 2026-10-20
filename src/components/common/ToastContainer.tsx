import React from 'react';
import { useStore } from '../../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 shadow-xl text-on-primary bg-primary border-l-4 ${
            toast.type === 'error'
              ? 'border-error'
              : toast.type === 'info'
              ? 'border-secondary-container'
              : 'border-secondary'
          } transition-all duration-300 animate-slide-up`}
        >
          <span className="material-symbols-outlined text-[18px] text-secondary">
            {toast.type === 'error' ? 'error' : toast.type === 'info' ? 'info' : 'check_circle'}
          </span>
          <span className="font-mono text-xs uppercase tracking-wider">{toast.message}</span>
          <button onClick={() => dismissToast(toast.id)} className="ml-4 text-on-primary/60 hover:text-on-primary">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      ))}
    </div>
  );
};
