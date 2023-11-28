"use client";
import React from "react";

const Modal = ({ onClose, isVisible, title, children }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-2/6 flex flex-col">
        <button
          className="text-xl place-self-end rounded-full bg-white text-black px-2"
          onClick={onClose}
        >
          x
        </button>
        <div className="bg-white p-2 rounded">
          <div className="flex flex-col px-10 py-4">
            <h1 className="text-4xl mb-10">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
