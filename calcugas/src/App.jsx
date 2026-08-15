import { useEffect, useState } from 'react'
import CalculoTab from './components/CalculoTab.jsx'
import AccesoriosTab from './components/AccesoriosTab.jsx'
import EquivalenciasTab from './components/EquivalenciasTab.jsx'
import InfoTab from './components/InfoTab.jsx'

const TABS = [
  { id: 'calculo', nombre: 'Cálculo', icon: '📐' },
  { id: 'accesorios', nombre: 'Accesorios', icon: '🔩' },
  { id: 'equivalencias', nombre: 'Unidades', icon: '🔁' },
  { id: 'info', nombre: 'Info', icon: '📖' },
]

export default function App() {
  const [tab, setTab] = useState(() => localStorage.getItem('cg.tab') || 'calculo')
  useEffect(() => localStorage.setItem('cg.tab', tab), [tab])

  return (
    <div className="mx-auto max-w-xl min-h-screen flex flex-col">
      <header className="px-4 pt-5 pb-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-flame-500 to-flame-700 flex items-center justify-center text-xl shadow-lg shadow-flame-900/50">
          🔥
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight">CalcuGas</h1>
          <p className="text-xs text-slate-400 leading-tight">
            Cañerías de gas · NAG-200 · Termofusión
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 pb-28">
        {tab === 'calculo' && <CalculoTab />}
        {tab === 'accesorios' && <AccesoriosTab />}
        {tab === 'equivalencias' && <EquivalenciasTab />}
        {tab === 'info' && <InfoTab />}
      </main>

      <nav className="fixed bottom-0 inset-x-0 z-20 bg-slate-900/95 backdrop-blur border-t border-slate-800">
        <div className="mx-auto max-w-xl grid grid-cols-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex flex-col items-center gap-0.5 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] text-[11px] font-medium transition ${
                tab === t.id ? 'text-flame-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="text-lg leading-none">{t.icon}</span>
              {t.nombre}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
