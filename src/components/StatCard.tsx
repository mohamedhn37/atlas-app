import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color: 'blue' | 'amber' | 'red' | 'green' | 'purple' | 'cyan'
  trend?: { value: number; positive: boolean }
}

const colorMap = {
  blue: { bg: 'bg-blue-500/10', icon: 'text-blue-400', border: 'border-blue-500/20' },
  amber: { bg: 'bg-amber-500/10', icon: 'text-amber-400', border: 'border-amber-500/20' },
  red: { bg: 'bg-red-500/10', icon: 'text-red-400', border: 'border-red-500/20' },
  green: { bg: 'bg-green-500/10', icon: 'text-green-400', border: 'border-green-500/20' },
  purple: { bg: 'bg-purple-500/10', icon: 'text-purple-400', border: 'border-purple-500/20' },
  cyan: { bg: 'bg-cyan-500/10', icon: 'text-cyan-400', border: 'border-cyan-500/20' },
}

export default function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
  const c = colorMap[color]
  return (
    <div className={`bg-[#0d1424] border ${c.border} rounded-xl p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">{title}</p>
          <p className="text-white text-3xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-slate-500 text-xs mt-1">{subtitle}</p>}
          {trend && (
            <p className={`text-xs mt-1 font-medium ${trend.positive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.positive ? '▲' : '▼'} {Math.abs(trend.value)}% vs last month
            </p>
          )}
        </div>
        <div className={`${c.bg} ${c.icon} p-2.5 rounded-lg`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}
