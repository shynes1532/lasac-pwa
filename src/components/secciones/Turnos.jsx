import React, { useState } from 'react';
import Calendario from '../Calendario.jsx';
import { horarios } from '../../data/grupo.js';

const VACIO = { nombre: '', telefono: '', patente: '', modelo: '', km: '', servicio: '', sucursal: '', fecha: null, horario: '' };

export default function Turnos({ marca }) {
  const [turno, setTurno] = useState(VACIO);
  const [enviado, setEnviado] = useState(false);
  const set = (patch) => setTurno((prev) => ({ ...prev, ...patch }));
  const sucursales = marca.contacto.sucursales || [];

  const formatFecha = (fecha) => (fecha ? fecha.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' }) : '');

  const enviar = () => {
    const fechaStr = turno.fecha ? formatFecha(turno.fecha) : 'A confirmar';
    const sucObj = sucursales.find((s) => s.ciudad === turno.sucursal);
    const wa = sucObj?.waService || marca.contacto.whatsapp.ventas;
    const msg = `🔧 *SOLICITUD DE TURNO - ${marca.nombre.toUpperCase()}*%0A%0A👤 ${turno.nombre}%0A📱 ${turno.telefono}%0A🚗 ${turno.modelo} - ${turno.patente}%0A📊 ${turno.km} km%0A🔧 ${turno.servicio}%0A📅 ${fechaStr} ${turno.horario}%0A📍 ${turno.sucursal}`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
    setEnviado(true);
  };

  const completo = turno.nombre && turno.telefono && turno.patente && turno.modelo && turno.km && turno.servicio && turno.sucursal;

  if (enviado) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-1">🔧 Turno Service</h2>
        <div className="bg-green-500/20 rounded-2xl p-6 text-center border border-green-500/30 shadow-lg shadow-black/20 mt-4">
          <div className="text-5xl mb-3">✅</div>
          <h3 className="text-xl font-bold mb-2 tracking-tight">¡Solicitud Enviada!</h3>
          <p className="text-sm text-white/70 mb-4">Te contactaremos para confirmar</p>
          <button onClick={() => { setEnviado(false); setTurno(VACIO); }} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-all active:scale-95">Nueva Solicitud</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">🔧 Turno Service</h2>
      <p className="text-white/60 text-xs mb-4">Solicitá tu turno online</p>
      <div className="space-y-4">
        <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
          <h3 className="font-bold text-sm mb-3">👤 Datos</h3>
          <div className="space-y-2">
            <input placeholder="Nombre *" value={turno.nombre} onChange={(e) => set({ nombre: e.target.value })} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
            <input placeholder="Teléfono *" value={turno.telefono} onChange={(e) => set({ telefono: e.target.value })} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
          </div>
        </div>
        <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
          <h3 className="font-bold text-sm mb-3">🚗 Vehículo</h3>
          <div className="grid grid-cols-2 gap-2">
            <select value={turno.modelo} onChange={(e) => set({ modelo: e.target.value })} className="p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm">
              <option value="">Modelo *</option>
              {(marca.modelosService || []).map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <input placeholder="Patente *" value={turno.patente} onChange={(e) => set({ patente: e.target.value.toUpperCase() })} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm uppercase" />
            <input placeholder="Kilometraje *" value={turno.km} onChange={(e) => set({ km: e.target.value })} className="col-span-2 p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
          </div>
        </div>
        <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
          <h3 className="font-bold text-sm mb-3">🔧 Servicio</h3>
          <div className="grid grid-cols-2 gap-2">
            {(marca.servicios || []).map((s) => (
              <button key={s.id} onClick={() => set({ servicio: s.nombre })} className={`p-2.5 rounded-xl text-left text-xs border transition-all duration-200 active:scale-95 ${turno.servicio === s.nombre ? 'bg-brand text-on-brand border-transparent shadow-md shadow-black/20' : 'bg-white/5 border-white/10 hover:bg-white/[0.09]'}`}>
                <div className="font-bold">{s.nombre}</div>
                <div className="opacity-70 text-[10px]">⏱️ {s.duracion}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
          <h3 className="font-bold text-sm mb-3">📅 Fecha</h3>
          <Calendario fechaSeleccionada={turno.fecha} onSeleccionar={(fecha) => set({ fecha })} />
          {turno.fecha && (
            <div className="mt-3">
              <p className="text-xs text-white/60 mb-2">Horario:</p>
              <div className="grid grid-cols-4 gap-1">
                {horarios.map((h) => (<button key={h} onClick={() => set({ horario: h })} className={`p-1.5 rounded-lg text-[10px] font-medium tabular-nums transition-all duration-200 active:scale-95 ${turno.horario === h ? 'bg-brand text-on-brand shadow-md shadow-black/20' : 'bg-white/10 hover:bg-white/[0.16]'}`}>{h}</button>))}
              </div>
            </div>
          )}
        </div>
        <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
          <h3 className="font-bold text-sm mb-3">📍 Sucursal</h3>
          <div className="grid grid-cols-2 gap-2">
            {sucursales.map((suc) => (
              <button key={suc.ciudad} onClick={() => set({ sucursal: suc.ciudad })} className={`p-3 rounded-xl text-left border transition-all duration-200 active:scale-95 ${turno.sucursal === suc.ciudad ? 'bg-brand text-on-brand border-transparent shadow-md shadow-black/20' : 'bg-white/5 border-white/10 hover:bg-white/[0.09]'}`}>
                <div className="font-bold text-sm">{suc.ciudad}</div>
                <div className="text-[10px] opacity-70">{suc.service || suc.dir || ''}</div>
              </button>
            ))}
          </div>
        </div>
        <button onClick={enviar} disabled={!completo}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${completo ? 'bg-gradient-to-r from-green-600 to-green-700 shadow-lg shadow-green-900/30 active:scale-[0.98]' : 'bg-white/20 text-white/50'}`}>
          📱 Enviar por WhatsApp
        </button>
      </div>
    </div>
  );
}
