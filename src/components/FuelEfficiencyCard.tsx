import { MoreVertical } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useTheme } from '../contexts/ThemeContext'
import { fuelEfficiencyData } from '../data/mockData'

export default function FuelEfficiencyCard() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const card  = isDark ? 'bg-[#0c1220] border-slate-800/60' : 'bg-white border-slate-200'
  const title = isDark ? 'text-slate-200' : 'text-slate-800'
  const sub   = isDark ? 'text-slate-500' : 'text-slate-400'
  const axis  = isDark ? '#475569' : '#94a3b8'

  return (
    <div className={`rounded-xl border p-4 ${card}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className={`text-sm font-semibold ${title}`}>Fuel Efficiency Trend</h3>
          <p className={`text-[11px] ${sub}`}>Past Month</p>
        </div>
        <button className={`${sub} hover:text-slate-300 transition-colors`}>
          <MoreVertical size={15} />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={110}>
        <BarChart data={fuelEfficiencyData} barSize={16} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="month"
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: axis, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 90]}
            ticks={[0, 20, 40, 60, 80]}
          />
          <Tooltip
            contentStyle={{
              background: isDark ? '#0f1729' : '#ffffff',
              border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
              borderRadius: '8px',
              color: isDark ? '#e2e8f0' : '#0f172a',
              fontSize: '11px',
            }}
            cursor={{ fill: 'rgba(239,68,68,0.05)' }}
          />
          <Bar dataKey="value" fill="#ef4444" radius={[2, 2, 0, 0]} name="Fuel Efficiency" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-1.5 justify-end mt-1">
        <span className="w-2.5 h-2.5 rounded-sm bg-red-600" />
        <span className={`text-[10px] ${sub}`}>Fuel Efficiency</span>
      </div>
    </div>
  )
}
