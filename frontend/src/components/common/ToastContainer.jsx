import { Alert } from '@material-tailwind/react';
import { useToast } from '@/context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-2 max-w-md w-full">
      {toasts.map((toast) => (
        <Alert
          key={toast.id}
          color={toast.type}
          variant="filled"
          className="animate-slide-in-right"
          dismissible={{
            onClose: () => removeToast(toast.id),
          }}
        >
          {toast.message}
        </Alert>
      ))}
    </div>
  );
}

