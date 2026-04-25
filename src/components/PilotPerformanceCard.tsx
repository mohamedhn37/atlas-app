import { MoreVertical, Users } from 'lucide-react'
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts'
import { useTheme } from '../contexts/ThemeContext'
import { pilotPerformanceData } from '../data/mockData'

export default function PilotPerformanceCard() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const card  = isDark ? 'bg-[#0c1220] border-slate-800/60' : 'bg-white border-slate-200'
  const title = isDark ? 'text-slate-200' : 'text-slate-800'
  const sub   = isDark ? 'text-slate-500' : 'text-slate-400'
  const num   = isDark ? 'text-white' : 'text-slate-900'
  const axis  = isDark ? '#475569' : '#94a3b8'

  return (
    <div className={`rounded-xl border p-4 ${card}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-semibold ${title}`}>Pilot Performance Indicators</h3>
        <button className={`${sub} hover:text-slate-300 transition-colors`}>
          <MoreVertical size={15} />
        </button>
      </div>

      <div className="flex items-end gap-4">
        {/* Summary stat */}
        <div className="flex-shrink-0">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-1 ${isDark ? 'bg-slate-800/60' : 'bg-slate-100'}`}>
            <Users size={22} className="text-red-500" />
          </div>
          <p className={`text-[11px] ${sub}`}>Summary</p>
          <p className={`text-2xl font-bold ${num}`}>{pilotPerformanceData.summary}</p>
        </div>

        {/* Mini bar chart */}
        <div className="flex-1">
          <p className={`text-[11px] ${sub} mb-1`}>Pilot positions</p>
          <ResponsiveContainer width="100%" height={60}>
            <BarChart data={pilotPerformanceData.positions} barSize={10} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="label" tick={{ fill: axis, fontSize: 9 }} axisLine={false} tickLine={false} />
              <Bar dataKey="value" fill="#ef4444" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
