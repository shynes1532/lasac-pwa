import React, { useState } from 'react';
import { aseguradoras, tiposSiniestro } from '../../data/grupo.js';

const VACIO = {
  nombre: '', dni: '', telefono: '', email: '',
  marcaVeh: '', modelo: '', anio: '', patente: '', color: '', km: '',
  aseguradora: '', poliza: '', numSiniestro: '',
  fecha: '', tipo: '', descripcion: '', sucursal: '',
};

export default function Siniestros({ marca }) {
  const [f, setF] = useState({ ...VACIO, marcaVeh: marca.nombre });
  const set = (k, v) => setF((prev) => ({ ...prev, [k]: v }));
  const sucursales = marca.contacto.sucursales || [];

  const enviar = () => {
    const sucObj = sucursales.find((s) => s.ciudad === f.sucursal);
    const wa = sucObj?.waService || marca.contacto.whatsapp.ventas;
    const msg = `🛡️ *ATENCIÓN DE SINIESTRO - ${marca.nombre.toUpperCase()}*%0A%0A👤 *TITULAR*%0ANombre: ${f.nombre}%0ADNI: ${f.dni}%0ATel: ${f.telefono}%0A%0A🚗 *VEHÍCULO*%0A${f.marcaVeh} ${f.modelo} ${f.anio}%0APatente: ${f.patente}%0A%0A🏢 *SEGURO*%0AAseguradora: ${f.aseguradora}%0APóliza: ${f.poliza}%0AN° Siniestro: ${f.numSiniestro || 'Pendiente'}%0A%0A📋 *SINIESTRO*%0AFecha: ${f.fecha}%0ATipo: ${f.tipo}%0ADescripción: ${f.descripcion}%0A%0A📍 Sucursal: ${f.sucursal}`;
    window.open(`https://wa.me/${wa}?text=${msg}`, '_blank');
  };

  const inputCls = 'w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm';
  const selectCls = 'w-full p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm';

  return (
    <div>
      <h2 className="text-xl font-bold mb-1">🛡️ Atención de Siniestros</h2>
      <p className="text-white/60 text-xs mb-4">Gestión de reclamos por seguro</p>
      <div className="space-y-4">
        <div className="bg-amber-500/20 rounded-xl p-4 border border-amber-500/30">
          <p className="text-sm">⚠️ <strong>Importante:</strong> Completá todos los datos para agilizar la gestión de tu siniestro.</p>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-bold text-sm mb-3">👤 Datos del Titular</h3>
          <div className="space-y-2">
            <input placeholder="Nombre completo *" value={f.nombre} onChange={(e) => set('nombre', e.target.value)} className={inputCls} />
            <input placeholder="DNI *" value={f.dni} onChange={(e) => set('dni', e.target.value)} className={inputCls} />
            <input placeholder="Teléfono *" value={f.telefono} onChange={(e) => set('telefono', e.target.value)} className={inputCls} />
            <input placeholder="Email" type="email" value={f.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-bold text-sm mb-3">🚗 Datos del Vehículo</h3>
          <div className="grid grid-cols-2 gap-2">
            <select value={f.marcaVeh} onChange={(e) => set('marcaVeh', e.target.value)} className="p-2.5 rounded-lg bg-slate-800 border border-white/20 text-sm">
              <option value={marca.nombre}>{marca.nombre}</option>
              <option value="Otra">Otra marca</option>
            </select>
            <input placeholder="Modelo *" value={f.modelo} onChange={(e) => set('modelo', e.target.value)} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
            <input placeholder="Año *" value={f.anio} onChange={(e) => set('anio', e.target.value)} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
            <input placeholder="Patente *" value={f.patente} onChange={(e) => set('patente', e.target.value.toUpperCase())} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm uppercase" />
            <input placeholder="Color" value={f.color} onChange={(e) => set('color', e.target.value)} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
            <input placeholder="Kilometraje" value={f.km} onChange={(e) => set('km', e.target.value)} className="p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm" />
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-bold text-sm mb-3">🏢 Datos de la Aseguradora</h3>
          <div className="space-y-2">
            <select value={f.aseguradora} onChange={(e) => set('aseguradora', e.target.value)} className={selectCls}>
              <option value="">Compañía de Seguros *</option>
              {aseguradoras.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            <input placeholder="N° de Póliza *" value={f.poliza} onChange={(e) => set('poliza', e.target.value)} className={inputCls} />
            <input placeholder="N° de Siniestro (si lo tenés)" value={f.numSiniestro} onChange={(e) => set('numSiniestro', e.target.value)} className={inputCls} />
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-bold text-sm mb-3">📋 Datos del Siniestro</h3>
          <div className="space-y-2">
            <input placeholder="Fecha del siniestro *" type="date" value={f.fecha} onChange={(e) => set('fecha', e.target.value)} className={selectCls} />
            <select value={f.tipo} onChange={(e) => set('tipo', e.target.value)} className={selectCls}>
              <option value="">Tipo de siniestro *</option>
              {tiposSiniestro.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
            <textarea placeholder="Descripción del siniestro *" rows={3} value={f.descripcion} onChange={(e) => set('descripcion', e.target.value)} className="w-full p-2.5 rounded-lg bg-white/5 border border-white/20 text-sm resize-none" />
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-bold text-sm mb-3">📍 Sucursal de Atención</h3>
          <div className="grid grid-cols-2 gap-2">
            {sucursales.map((s) => (
              <button key={s.ciudad} type="button" onClick={() => set('sucursal', s.ciudad)}
                className={`p-3 rounded-lg text-left border border-white/10 ${f.sucursal === s.ciudad ? 'bg-brand' : 'bg-white/5'}`}>
                <div className="font-bold text-sm">{s.ciudad}</div>
                <div className="text-[10px] text-white/60">{s.service || s.dir || ''}</div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={enviar} disabled={!f.nombre || !f.telefono || !f.patente || !f.aseguradora || !f.poliza || !f.tipo || !f.descripcion || !f.sucursal}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all active:scale-95 ${f.nombre && f.telefono && f.patente && f.aseguradora && f.poliza && f.tipo && f.descripcion && f.sucursal ? 'bg-brand-gradient-x text-on-brand' : 'bg-white/20 text-white/50'}`}>
          📱 Enviar Solicitud por WhatsApp
        </button>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
          <p className="text-xs text-white/60 mb-2">¿Necesitás ayuda urgente?</p>
          <a href={`tel:+${marca.contacto.whatsapp.ventas}`} className="inline-block px-4 py-2 bg-green-600 rounded-full text-sm font-bold">📞 Llamar ahora</a>
        </div>
      </div>
    </div>
  );
}
