import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface Props {
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal = ({  onClose, children, className = "" }: Props) => {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-xl bg-zinc-900 border border-zinc-800 p-5 ${className}`}
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal")!,
  );
};

export default Modal;
