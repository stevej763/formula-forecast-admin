import { useEffect, useRef, type ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Side panel that slides in from the right, so the list it came from stays
 * visible. Built on the native <dialog> for focus trapping, Escape to close
 * and an inert background.
 */
const Modal = ({ isOpen, onClose, title, description, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="panel-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="my-0 mr-0 ml-auto flex h-dvh max-h-dvh w-full max-w-md flex-col border-l border-graphite bg-carbon p-0 text-chalk open:animate-[ff-panel-in_180ms_ease-out] [&:not([open])]:hidden"
    >
      <header className="flex items-start gap-4 border-b border-graphite px-6 py-5">
        <div className="min-w-0 flex-1">
          <h2 id="panel-title" className="font-heading text-xl">
            {title}
          </h2>
          {description && <p className="mt-1 text-sm text-ash">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mt-1 -mr-2 rounded-md p-2 text-ash hover:bg-graphite hover:text-chalk"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </header>
      <div className="ff-scrollbar min-h-0 flex-1 overflow-y-auto px-6 py-6">{isOpen && children}</div>
    </dialog>
  );
};

export default Modal;
