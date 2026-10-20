import React from 'react';
import { Home, Car, PiggyBank, Flame, Newspaper, ShieldAlert, Wrench, Headset, MapPin, CreditCard, Scale, HelpCircle, AlertTriangle, Lightbulb, Star, Mountain, Factory, FileText, PartyPopper, Sparkles, Truck, Package, Building2 } from 'lucide-react';

// Íconos Lucide por sección y por tipo de atención (reemplazan a los emojis en la UI).
export const SECCION_ICONS = {
  inicio: Home, catalogo: Car, simulador: PiggyBank, oportunidades: Flame, novedades: Newspaper,
  siniestros: ShieldAlert, turnos: Wrench, atencion: Headset, contacto: MapPin, credito: CreditCard, legal: Scale,
};
export const TIPO_ATENCION_ICONS = { consulta: HelpCircle, reclamo: AlertTriangle, sugerencia: Lightbulb, felicitacion: Star };

export function SeccionIcon({ id, className = 'h-5 w-5', ...rest }) {
  const I = SECCION_ICONS[id] || HelpCircle;
  return <I className={className} aria-hidden="true" {...rest} />;
}
export function TipoAtencionIcon({ id, className = 'h-6 w-6', ...rest }) {
  const I = TIPO_ATENCION_ICONS[id] || HelpCircle;
  return <I className={className} aria-hidden="true" {...rest} />;
}

// Sucursales (por ciudad), tipos de usuario del Plan de Ahorro y familias de modelos.
export const SUCURSAL_ICONS = { Ushuaia: Mountain, 'Río Grande': Factory };
export function SucursalIcon({ ciudad, className = 'h-8 w-8', ...rest }) {
  const I = SUCURSAL_ICONS[ciudad] || MapPin;
  return <I className={className} aria-hidden="true" {...rest} />;
}
export const TIPO_USUARIO_PLAN_ICONS = { suscriptor: FileText, adjudicado: PartyPopper, nuevo: Sparkles };
export function TipoUsuarioPlanIcon({ id, className = 'h-6 w-6', ...rest }) {
  const I = TIPO_USUARIO_PLAN_ICONS[id] || HelpCircle;
  return <I className={className} aria-hidden="true" {...rest} />;
}
export const FAMILIA_ICONS = { cronos: Car, argo: Car, pulse: Mountain, strada: Truck, fiorino: Package, toro: Truck, fastback: Car, titano: Mountain, mobi: Building2 };
export function FamiliaIcon({ familia, className = 'h-5 w-5', ...rest }) {
  const I = FAMILIA_ICONS[familia] || Car;
  return <I className={className} aria-hidden="true" {...rest} />;
}
