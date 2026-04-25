import { Wrench, Clock, AlertTriangle, Zap } from 'lucide-react'
import { mockMaintenanceAlerts } from '../data/mockData'
import type { MaintenanceAlert } from '../types/flight'

const priorityConfig: Record<MaintenanceAlert['priority'], { icon: typeof Wrench; color: string; bg: string; label: string }> = {
  ROUTINE: { icon: Clock, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', label: 'ROUTINE' },
  URGENT: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', label: 'URGENT' },
  AOG: { icon: Zap, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', label: 'AOG' },
}

export default function MaintenancePanel() {
  return (
    <div className="bg-[#0d1424] border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <Wrench size={16} className="text-slate-400" />
          Maintenance Alerts
        </h2>
        <span className="text-xs text-slate-500">{mockMaintenanceAlerts.length} open</span>
      </div>
      <div className="divide-y divide-slate-800/50">
        {mockMaintenanceAlerts.map(alert => {
          const { icon: Icon, color, bg, label } = priorityConfig[alert.priority]
          return (
            <div key={alert.id} className={`p-4 border-l-2 ${bg} hover:bg-slate-800/20 transition-colors`}>
              <div className="flex items-start gap-3">
                <Icon size={15} className={`${color} mt-0.5 shrink-0`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-slate-200 text-sm font-medium">{alert.aircraft} — {alert.system}</p>
                    <span className={`text-xs font-bold ${color}`}>{label}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">{alert.description}</p>
                  <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-600">
                    <span>Due: {alert.dueDate}</span>
                    {alert.flightHours > 0 && <span>{alert.flightHours}h remaining</span>}
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
