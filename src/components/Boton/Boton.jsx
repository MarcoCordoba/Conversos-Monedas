import React from 'react';
import './Boton.css';

const SwapButton = ({ onClick }) => {
  return (
    <button className="swap-button" onClick={onClick} aria-label="Intercambiar monedas">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-left-icon lucide-arrow-right-left"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
    </button>
  );
};

export default SwapButton;

