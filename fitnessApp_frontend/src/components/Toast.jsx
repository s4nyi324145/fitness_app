import { X, CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { useToast } from '../context/toastContext';
import '../style/toast.css';

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    const getIcon = (type) => {
        switch(type) {
            case 'success': return <CheckCircle2 size={20} />;
            case 'error': return <XCircle size={20} />;
            case 'warning': return <AlertCircle size={20} />;
            default: return <Info size={20} />;
        }
    };

    return (
        <div className="toast-container">
            
            {toasts.map(toast => (
                <div key={toast.id} className={`toast toast-${toast.type}`}>
                    <div className="toast-progress">
                        <div className="toast-progress-bar"></div>
                    </div>
                    <div className="toast-icon">
                        {getIcon(toast.type)}
                    </div>
                    
                    <p className="toast-message">{toast.message}</p>
                    <button 
                        className="toast-close"
                        onClick={() => removeToast(toast.id)}
                    >
                        <X size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
}