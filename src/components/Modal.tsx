import React from "react";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}

const Modal = ({ isOpen, closeModal, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div
        className={`relative bg-white h-[80%] w-[60%] rounded-lg shadow-lg `}
      >
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          Close
        </button>
        {title && <h1 className="text-2xl font-semibold mb-4">{title}</h1>}
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
