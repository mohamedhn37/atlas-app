import { AlertTriangle, AlertOctagon, AlertCircle, Info } from 'lucide-react'
import { mockExceedances } from '../data/mockData'
import type { ExceedanceSeverity } from '../types/flight'

const severityConfig: Record<ExceedanceSeverity, { icon: typeof AlertTriangle; color: string; bg: string }> = {
  CRITICAL: { icon: AlertOctagon, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
  HIGH: { icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
  MEDIUM: { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  LOW: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
}

export default function ExceedancePanel() {
  return (
    <div className="bg-[#0d1424] border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-white font-semibold">Active Exceedances</h2>
        <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium px-2 py-0.5 rounded-full">
          {mockExceedances.length} events
        </span>
      </div>
      <div className="divide-y divide-slate-800/50 max-h-80 overflow-y-auto scrollbar-thin">
        {mockExceedances.map(ex => {
          const { icon: Icon, color, bg } = severityConfig[ex.severity]
          const pct = Math.min(((ex.value - ex.limit) / ex.limit) * 100, 100)
          return (
            <div key={ex.id} className={`p-4 border-l-2 ${bg} hover:bg-slate-800/20 transition-colors`}>
              <div className="flex items-start gap-3">
                <Icon size={16} className={`${color} mt-0.5 shrink-0`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-slate-200 text-sm font-medium truncate">{ex.parameter}</p>
                    <span className={`text-xs font-bold shrink-0 ${color}`}>{ex.severity}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                    <span>Flight {ex.flightId}</span>
                    <span>{ex.phase}</span>
                    <span>{ex.timestamp}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${ex.severity === 'CRITICAL' ? 'bg-red-500' : ex.severity === 'HIGH' ? 'bg-orange-500' : ex.severity === 'MEDIUM' ? 'bg-amber-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, 50 + pct)}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">
                      {ex.value} / {ex.limit} {ex.unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
