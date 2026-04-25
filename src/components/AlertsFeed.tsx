import { MoreVertical, AlertTriangle } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { mockAlertsFeed } from '../data/mockData'

export default function AlertsFeed() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const card   = isDark ? 'bg-[#0c1220] border-slate-800/60' : 'bg-white border-slate-200'
  const title  = isDark ? 'text-slate-200' : 'text-slate-800'
  const sub    = isDark ? 'text-slate-500' : 'text-slate-400'
  const rowBase = isDark ? 'border-slate-800/40' : 'border-slate-100'
  const timeCol = isDark ? 'text-slate-400' : 'text-slate-500'
  const acCol   = isDark ? 'text-slate-300' : 'text-slate-600'
  const msgCol  = isDark ? 'text-slate-200' : 'text-slate-700'

  return (
    <div className={`rounded-xl border ${card}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: isDark ? 'rgba(30,41,59,0.6)' : 'rgba(226,232,240,0.8)' }}>
        <h3 className={`text-sm font-semibold ${title}`}>Recent Activities &amp; Alerts</h3>
        <button className={`${sub} hover:text-slate-300 transition-colors`}>
          <MoreVertical size={15} />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <tbody>
            {mockAlertsFeed.map((alert, idx) => {
              const isCritical = alert.severity === 'CRITICAL'
              const rowBg = isCritical && idx === 0
                ? isDark ? 'bg-red-950/40' : 'bg-red-50'
                : ''

              return (
                <tr
                  key={alert.id}
                  className={`border-b transition-colors ${rowBase} ${rowBg} ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}
                >
                  {/* Time */}
                  <td className={`px-4 py-2.5 font-mono whitespace-nowrap ${timeCol}`}>
                    {alert.time}
                  </td>

                  {/* Aircraft */}
                  <td className={`px-2 py-2.5 font-mono whitespace-nowrap ${acCol}`}>
                    {alert.aircraft}
                  </td>

                  {/* Severity icon */}
                  <td className="px-2 py-2.5">
                    <AlertTriangle
                      size={13}
                      className={isCritical ? 'text-red-500' : 'text-amber-400'}
                    />
                  </td>

                  {/* Message */}
                  <td className={`px-2 py-2.5 ${msgCol}`}>
                    {alert.message}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
