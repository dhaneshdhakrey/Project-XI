import React, { useState, useEffect, createContext, useContext } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext();

const ToastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

const ToastStyles = {
  [ToastTypes.SUCCESS]: {
    background: 'bg-black',
    progressBar: 'bg-white'
  },
  [ToastTypes.ERROR]: {
    background: 'bg-red-500',
    progressBar: 'bg-red-700'
  },
  [ToastTypes.WARNING]: {
    background: 'bg-yellow-500',
    progressBar: 'bg-yellow-700'
  },
  [ToastTypes.INFO]: {
    background: 'bg-black',
    progressBar: 'bg-white'
  }
};

const ToastItem = ({ id, message, type = ToastTypes.INFO, duration = 3000, onClose }) => {
  const [progress, setProgress] = useState(100);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => Math.max(0, prev - (100 / (duration / 10))));
    }, 10);

    const closeTimer = setTimeout(() => {
      setIsRemoving(true);
      setTimeout(onClose, 300);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const { background, progressBar } = ToastStyles[type];

  return (
    <div 
      style={{
        marginTop: '5rem',
        position: 'relative',
        marginBottom: '1rem',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        color: 'white',
        overflow: 'hidden',
        animation: isRemoving 
          ? 'slideOut 0.3s ease-in forwards' 
          : 'slideIn 0.3s ease-out',
        '@keyframes slideIn': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 }
        },
        '@keyframes slideOut': {
          '0%': { transform: 'translateX(0)', opacity: 1 },
          '100%': { transform: 'translateX(100%)', opacity: 0 }
        }
      }}
     className={background }
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={() => {
          setIsRemoving(true);
          setTimeout(onClose, 300);
        }} className="ml-4">
          <X size={20} />
        </button>
      </div>
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '4px',
          width: `${progress}%`
        }}
        className={progressBar}
      />
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = ToastTypes.INFO, duration = 3000) => {
    const id = Date.now();
    setToasts(current => [...current, { id, message, type, duration }]);
  };

  const removeToast = (id) => {
    setToasts(current => current.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 50,
        width: '20rem'
      }}>
        {toasts.map(toast => (
          <ToastItem 
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const addToast = useContext(ToastContext);
  if (!addToast) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return addToast;
};

export { ToastTypes };