"use client";

import React from "react";

const Button = ({ text, onClick, ...otherProps }) => {
  return (
    <button
      className="button bg-white px-4 py-2 hover:bg-cyan-500 text-cyan-950 rounded font-bold"
      onClick={onClick}
      {...otherProps}
    >
      {text}
    </button>
  );
};

export default Button;
