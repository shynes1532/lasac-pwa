import { useEffect } from 'react';

// Colores neutros del Grupo (cuando no hay marca activa: pantalla selector).
const TEMA_GRUPO = { primary: '#dc2626', primaryDark: '#991b1b', onPrimary: '#ffffff' };

// Aplica las variables CSS de la marca activa al <html>, de modo que todas las
// utilidades .bg-brand / .text-brand / .bg-brand-gradient adopten su color.
// Tailwind no puede generar clases dinámicas por color, por eso usamos CSS vars.
export default function useTemaMarca(marca) {
  useEffect(() => {
    const tema = marca?.tema || TEMA_GRUPO;
    const root = document.documentElement;
    const [g1, g2] = tema.gradient || [tema.primary, tema.primaryDark];
    root.style.setProperty('--brand', tema.primary);
    root.style.setProperty('--brand-dark', tema.primaryDark);
    root.style.setProperty('--brand-on', tema.onPrimary || '#ffffff');
    root.style.setProperty('--brand-grad-from', g1);
    root.style.setProperty('--brand-grad-to', g2);

    // Sincroniza el color de la barra del navegador (PWA)
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', tema.primary);
  }, [marca]);
}
