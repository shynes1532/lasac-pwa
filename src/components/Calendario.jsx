import React, { useState } from 'react';

// Calendario de turnos. El día seleccionado usa el color de la marca (.bg-brand).
const Calendario = ({ fechaSeleccionada, onSeleccionar }) => {
  const hoy = new Date();
  const [mesActual, setMesActual] = useState(new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const diasSemana = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const primerDia = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
  const ultimoDia = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0);
  const dias = [];
  for (let i = 0; i < primerDia.getDay(); i++) dias.push(null);
  for (let d = 1; d <= ultimoDia.getDate(); d++) dias.push(new Date(mesActual.getFullYear(), mesActual.getMonth(), d));
  const esHabil = (f) => f && f.getDay() !== 0;
  const esPasado = (f) => f && f < hoy && f.toDateString() !== hoy.toDateString();
  const esSeleccionado = (f) => f && fechaSeleccionada && f.toDateString() === fechaSeleccionada.toDateString();

  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
      <div className="flex justify-between items-center mb-3">
        <button onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() - 1, 1))} className="p-2 hover:bg-white/10 rounded-lg text-lg">←</button>
        <span className="font-bold text-sm">{meses[mesActual.getMonth()]} {mesActual.getFullYear()}</span>
        <button onClick={() => setMesActual(new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 1))} className="p-2 hover:bg-white/10 rounded-lg text-lg">→</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
        {diasSemana.map((d, i) => <div key={i} className="text-white/50 py-1 font-bold">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dias.map((fecha, i) => (
          <button key={i} disabled={!fecha || !esHabil(fecha) || esPasado(fecha)}
            onClick={() => fecha && esHabil(fecha) && !esPasado(fecha) && onSeleccionar(fecha)}
            className={`aspect-square rounded-lg text-xs flex items-center justify-center transition-all
              ${!fecha ? 'invisible' : ''} ${fecha && !esHabil(fecha) ? 'text-white/20' : ''}
              ${fecha && esPasado(fecha) && esHabil(fecha) ? 'text-white/30' : ''}
              ${fecha && esHabil(fecha) && !esPasado(fecha) ? 'hover:bg-white/20 active:scale-95' : ''}
              ${esSeleccionado(fecha) ? 'bg-brand text-white font-bold' : ''}`}>
            {fecha?.getDate()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
