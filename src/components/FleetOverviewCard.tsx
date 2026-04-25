import { MoreVertical, AlertTriangle } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function FleetOverviewCard() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const card   = isDark ? 'bg-[#0c1220] border-slate-800/60' : 'bg-white border-slate-200'
  const title  = isDark ? 'text-slate-200' : 'text-slate-800'
  const sub    = isDark ? 'text-slate-500' : 'text-slate-400'
  const num    = isDark ? 'text-white' : 'text-slate-900'
  const divider = isDark ? 'border-slate-800/60' : 'border-slate-100'

  return (
    <div className={`rounded-xl border p-4 ${card}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-semibold ${title}`}>Fleet Overview</h3>
        <button className={`${sub} hover:text-slate-300 transition-colors`}>
          <MoreVertical size={15} />
        </button>
      </div>

      <div className={`grid grid-cols-3 divide-x ${divider}`}>
        {/* Active Flights */}
        <div className="pr-3">
          <p className={`text-[11px] ${sub} mb-0.5`}>Active Flights</p>
          <p className={`text-3xl font-bold ${num}`}>31</p>
        </div>

        {/* Aircraft Recorded */}
        <div className="px-3">
          <p className={`text-[11px] ${sub} mb-0.5`}>Aircraft Recorded</p>
          <p className={`text-3xl font-bold ${num}`}>450<span className="text-xl">+</span></p>
        </div>

        {/* Events */}
        <div className="pl-3">
          <p className={`text-[11px] ${sub} mb-0.5`}>Events (Past 24h)</p>
          <p className="text-3xl font-bold text-red-500">15</p>
          <div className="flex items-center gap-1 mt-0.5">
            <AlertTriangle size={10} className="text-red-500" />
            <p className="text-[11px] text-red-500 font-medium">Critical: 3</p>
          </div>
          <p className={`text-[11px] ${sub}`}>Warning: 12</p>
        </div>
      </div>
    </div>
  )
}
