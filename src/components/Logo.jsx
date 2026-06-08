import React from 'react';

// Logo del Grupo LASAC (wordmark + arco tricolor). Identidad del grupo.
export const LogoGrupo = ({ className = 'h-8' }) => (
  <svg viewBox="0 0 200 50" className={className}>
    <text x="0" y="38" fontFamily="Arial Black, sans-serif" fontSize="36" fontWeight="900" fill="#e5e7eb" letterSpacing="2">LASAC</text>
    <path d="M155 8 Q175 8 175 25 Q175 42 155 42" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round" />
    <path d="M160 12 Q177 12 177 25 Q177 38 160 38" stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M165 16 Q179 16 179 25 Q179 34 165 34" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
  </svg>
);

// Wordmark de la marca activa para el header.
// Si más adelante hay logo en imagen, se puede usar:
//   <img src={`/images/grupo/${marca.id}-logo.png`} .../>
export const MarcaWordmark = ({ marca, className = '' }) => {
  if (!marca) return null;
  return (
    <span className={`font-black tracking-wide text-lg leading-none ${className}`}>
      {marca.nombre}
    </span>
  );
};

export default LogoGrupo;
