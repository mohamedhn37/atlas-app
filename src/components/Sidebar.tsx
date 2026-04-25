import {
  LayoutDashboard, Plane, AlertTriangle,
  Wrench, Upload, BarChart3, Settings, ChevronRight
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard', active: true },
  { icon: Upload, label: 'Import Data', id: 'import' },
  { icon: Plane, label: 'Flight Records', id: 'flights' },
  { icon: AlertTriangle, label: 'Exceedances', id: 'exceedances' },
  { icon: BarChart3, label: 'Analysis', id: 'analysis' },
  { icon: Wrench, label: 'Maintenance', id: 'maintenance' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

interface SidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0d1424] border-r border-slate-800 flex flex-col z-20">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <Plane size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">ATLAS</h1>
            <p className="text-slate-500 text-xs mt-0.5">Flight Data Analysis</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group
              ${activeSection === id
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
          >
            <Icon size={17} />
            <span className="flex-1 text-left">{label}</span>
            {activeSection === id && <ChevronRight size={14} />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <p className="text-xs text-slate-400">Fleet Status</p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-green-400 font-medium">8 Aircraft Active</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
