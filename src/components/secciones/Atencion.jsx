import React, { useState } from 'react';
import { tiposAtencion, areasAtencion } from '../../data/grupo.js';

const FORM_VACIO = { nombre: '', telefono: '', email: '', area: '', modelo: '', patente: '', mensaje: '' };

export default function Atencion({ marca }) {
  const [tipo, setTipo] = useState(null);
  const [form, setForm] = useState(FORM_VACIO);
  const [sucursal, setSucursal] = useState(null);
  const [enviado, setEnviado] = useState(false);

  const tipoActual = tiposAtencion.find((t) => t.id === tipo);
  const sucursales = marca.contacto.sucursales || [];
  const set = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const reset = () => { setTipo(null); setForm(FORM_VACIO); setSucursal(null); setEnviado(false); };

  const enviar = () => {
    if (!tipo || !form.nombre || !form.telefono || !form.mensaje || !sucursal) {
      alert('Completá los campos obligatorios (*)');
      return;
    }
    const t = tipoActual;
    const wa = marca.contacto.whatsapp.atencion || marca.contacto.whatsapp.ventas;
    const msg = `${t.icon} *ATENCIÓN AL CLIENTE ${marca.nombre.toUpperCase()} - ${t.titulo.toUpperCase()}*%0A%0A` +
      `👤 *Datos*%0ANombre: ${form.nombre}%0ATel: ${form.telefono}%0AEmail: ${form.email || 'No indicado'}%0A%0A` +
      `🏢 Área: ${form.area || 'General'}%0A📍 Sucursal: ${sucursal}%0A` +
      (form.modelo || form.patente ? `🚗 Vehículo: ${form.modelo} ${form.patente}%0A%0A` : '%0A') +
      `✍️ *Mensaje:*%0A${form.mensaje}`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
    setEnviado(true);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">💬 Atención al Cliente</h2>
      <p className="text-white/60 text-xs mb-5">Seleccioná el motivo de tu contacto</p>

      {enviado ? (
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">✅</div>
          <h3 className="text-xl font-bold">¡Mensaje enviado!</h3>
          <p className="text-white/60 text-sm">Tu {tipoActual?.titulo.toLowerCase()} fue derivada al equipo de atención</p>
          <button onClick={reset} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all active:scale-95">Enviar otra consulta</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {tiposAtencion.map((t) => {
              const sel = tipo === t.id;
              return (
                <button key={t.id} onClick={() => setTipo(t.id)}
                  className={`relative p-4 rounded-2xl text-left transition-all duration-300 border-2 ${sel ? `${t.bg} ${t.border} scale-[1.02] shadow-lg` : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                  {sel && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">✓</span>
                    </div>
                  )}
                  <div className="text-2xl mb-2">{t.icon}</div>
                  <div className="font-bold text-sm">{t.titulo}</div>
                  <div className="text-[10px] text-white/50 mt-0.5">{t.desc}</div>
                </button>
              );
            })}
          </div>

          {tipo && tipoActual && (
            <div className="space-y-4">
              <div className={`bg-gradient-to-r ${tipoActual.color} rounded-xl p-3 flex items-center gap-3`}>
                <span className="text-2xl">{tipoActual.icon}</span>
                <div>
                  <div className="font-bold text-sm">{tipoActual.titulo}</div>
                  <div className="text-[10px] opacity-80">Completá los datos para enviar</div>
                </div>
              </div>

              <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20 space-y-2">
                <h3 className="font-bold text-sm mb-3">👤 Tus Datos</h3>
                <input placeholder="Nombre completo *" value={form.nombre} onChange={(e) => set('nombre', e.target.value)} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                <input placeholder="Teléfono *" type="tel" value={form.telefono} onChange={(e) => set('telefono', e.target.value)} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                <input placeholder="Email (opcional)" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
              </div>

              <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
                <h3 className="font-bold text-sm mb-3">🏢 Área Relacionada</h3>
                <div className="grid grid-cols-2 gap-2">
                  {areasAtencion.map((a) => (
                    <button key={a} onClick={() => set('area', a)}
                      className={`p-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 ${form.area === a ? 'bg-brand text-on-brand shadow-md shadow-black/20' : 'bg-white/5 border border-white/20 text-white/70 hover:bg-white/[0.09]'}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20 ${tipo === 'reclamo' ? 'ring-1 ring-red-400/30' : ''}`}>
                <h3 className="font-bold text-sm mb-1">🚗 Vehículo {tipo === 'reclamo' ? '' : '(opcional)'}</h3>
                {tipo === 'reclamo' && <p className="text-[10px] text-red-300 mb-3">Completá estos datos para agilizar tu reclamo</p>}
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="Modelo" value={form.modelo} onChange={(e) => set('modelo', e.target.value)} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
                  <input placeholder="Patente" value={form.patente} onChange={(e) => set('patente', e.target.value.toUpperCase())} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm uppercase" />
                </div>
              </div>

              <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
                <h3 className="font-bold text-sm mb-3">✍️ Tu Mensaje *</h3>
                <textarea
                  placeholder={
                    tipo === 'consulta' ? '¿Cuál es tu consulta?' :
                    tipo === 'reclamo' ? 'Describí el problema con el mayor detalle posible...' :
                    tipo === 'sugerencia' ? 'Contanos tu idea o sugerencia...' :
                    '¡Contanos tu experiencia positiva!'
                  }
                  value={form.mensaje} onChange={(e) => set('mensaje', e.target.value)}
                  rows={4} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm resize-none" />
              </div>

              <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
                <h3 className="font-bold text-sm mb-3">📍 Sucursal *</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sucursales.map((s) => (
                    <button key={s.ciudad} onClick={() => setSucursal(s.ciudad)}
                      className={`p-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 ${sucursal === s.ciudad ? 'bg-brand text-on-brand shadow-md shadow-black/20' : 'bg-white/5 border border-white/20 hover:bg-white/[0.09]'}`}>
                      {s.ciudad}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={enviar}
                className={`w-full p-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r ${tipoActual.color} active:scale-95 transition-all`}>
                <span>📲</span> Enviar {tipoActual.titulo} por WhatsApp
              </button>

              <div className="bg-white/[0.06] rounded-2xl p-4 border border-white/10 shadow-lg shadow-black/20">
                <p className="text-sm text-center text-white/70 mb-3">También podés contactarnos directamente:</p>
                <div className="flex gap-2 justify-center">
                  <a href={`tel:+${marca.contacto.whatsapp.atencion || marca.contacto.whatsapp.ventas}`} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-full text-sm font-bold shadow-md shadow-black/20 transition-all active:scale-95">📞 Llamar</a>
                  <a href="mailto:atencion@lasac.com.ar" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-sm font-bold shadow-md shadow-black/20 transition-all active:scale-95">✉️ Email</a>
                </div>
              </div>
            </div>
          )}

          {!tipo && (
            <div className="text-center py-8 text-white/30">
              <div className="text-4xl mb-3">👆</div>
              <p className="text-sm">Seleccioná una opción para continuar</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
