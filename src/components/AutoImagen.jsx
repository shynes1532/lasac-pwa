import React, { useState, useEffect } from 'react';

// Imagen de vehículo con placeholder por marca.
// basePath: carpeta de imágenes de la marca (ej: '/images/fiat/').
// modelo: slug del archivo (ej: 'cronos' -> /images/fiat/cronos.png).
// ext: extensión conocida (png/jpg/webp). Si se pasa, se prueba primero;
//      si no, se prueban todas. El resto queda como respaldo.
// El fallback (sin imagen) usa el gradiente de la marca (.bg-brand-gradient).
// transparent: sin fondo (para imágenes flotantes sobre el hero).
// sinFallback: si no hay imagen no renderiza nada (en vez del cartel con el nombre).
const EXTENSIONES = ['png', 'jpg', 'jpeg', 'webp'];

const AutoImagen = ({ basePath = '/images/', modelo, nombre = '', ext, className = '', alt = '', contain = false, transparent = false, sinFallback = false }) => {
  // Orden de extensiones a intentar: la conocida primero, el resto como respaldo.
  const candidatos = ext ? [ext, ...EXTENSIONES.filter((e) => e !== ext)] : EXTENSIONES;

  const [idx, setIdx] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reinicia al cambiar de imagen
  useEffect(() => {
    setIdx(0);
    setError(false);
    setLoading(true);
  }, [modelo, basePath, ext]);

  // Avanza a la siguiente extensión; si no quedan, muestra el fallback.
  const avanzar = () => {
    if (idx < candidatos.length - 1) setIdx(idx + 1);
    else { setError(true); setLoading(false); }
  };

  // El dev server responde 200 con el HTML de la app para archivos inexistentes;
  // en ese caso onLoad dispara pero la imagen no decodifica (naturalWidth === 0),
  // así que lo tratamos como error y probamos la siguiente extensión.
  const onLoad = (e) => {
    if (e.target.naturalWidth === 0) avanzar();
    else setLoading(false);
  };

  const etiqueta = (nombre || modelo || '').toString().toUpperCase();

  if (error || !modelo) {
    if (sinFallback) return null;
    return (
      <div className={`${transparent ? '' : 'bg-brand-gradient'} flex flex-col items-center justify-center ${className}`}>
        <div className="text-white/40 text-xl font-black text-center px-2 leading-tight">{etiqueta}</div>
      </div>
    );
  }

  const src = `${basePath}${modelo}.${candidatos[idx]}`;

  return (
    <div className={`relative ${transparent ? '' : 'bg-brand-gradient'} ${className}`}>
      {loading && (
        <div className="absolute inset-0 loading-shimmer" aria-hidden="true" />
      )}
      <img
        key={src}
        src={src}
        alt={alt || nombre || modelo}
        className={`w-full h-full ${contain ? 'object-contain' : 'object-cover'} transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={onLoad}
        onError={avanzar}
      />
    </div>
  );
};

export default AutoImagen;
