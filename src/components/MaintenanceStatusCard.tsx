import { MoreVertical, Wrench, AlertTriangle } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { maintenanceStatusData } from '../data/mockData'

function CircularGauge({ value, total, color, icon: Icon }: {
  value: number; total: number; color: string; icon: React.ElementType
}) {
  const radius = 28
  const circ = 2 * Math.PI * radius
  const pct = value / total
  const dash = pct * circ

  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={radius} stroke="rgba(51,65,85,0.4)" strokeWidth="5" fill="none" />
        <circle
          cx="32" cy="32" r={radius}
          stroke={color}
          strokeWidth="5"
          fill="none"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <Icon size={20} style={{ color }} />
    </div>
  )
}

export default function MaintenanceStatusCard() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const card  = isDark ? 'bg-[#0c1220] border-slate-800/60' : 'bg-white border-slate-200'
  const title = isDark ? 'text-slate-200' : 'text-slate-800'
  const sub   = isDark ? 'text-slate-500' : 'text-slate-400'

  const total = maintenanceStatusData.reduce((s, d) => s + d.value, 0)
  const critical = maintenanceStatusData[0]
  const warning  = maintenanceStatusData[1]

  return (
    <div className={`rounded-xl border p-4 ${card}`}>
      <div className="flex items-center justify-between mb-1">
        <h3 className={`text-sm font-semibold ${title}`}>Maintenance Status</h3>
        <button className={`${sub} hover:text-slate-300 transition-colors`}>
          <MoreVertical size={15} />
        </button>
      </div>
      <p className={`text-[11px] ${sub} mb-3`}>Critical aircraft for immediate action</p>

      <div className="flex items-center justify-between">
        {/* Gauges */}
        <div className="flex gap-5">
          <CircularGauge value={critical.value} total={total} color={critical.color} icon={Wrench} />
          <CircularGauge value={warning.value}  total={total} color={warning.color}  icon={AlertTriangle} />
        </div>

        {/* Legend */}
        <div className="space-y-1.5">
          {maintenanceStatusData.map(d => (
            <div key={d.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className={`text-xs ${sub}`}>{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
