import  { createContext, useContext, useState } from 'react';


export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    function showToast(message, type, duration) {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
        if (duration > 0)
            setTimeout(() => removeToast(id), duration)
    ;
    }

    function removeToast(id) {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }

    const showSuccess = (message) => showToast(message, 'success', 3000);
    const showError = (message) => showToast(message, 'error', 0);
    const showInfo = (message) => showToast(message, 'info', 4000);
    const showWarning = (message) => showToast(message, 'warning',5000);

     return (
        <ToastContext.Provider value={{ 
            showToast, 
            showSuccess, 
            showError, 
            showInfo, 
            showWarning,
            toasts,
            removeToast 
        }}>
            {children}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);