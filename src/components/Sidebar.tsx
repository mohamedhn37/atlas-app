import {
  LayoutDashboard, Plane, AlertTriangle,
  Upload, BarChart3, ChevronRight,
  Users, Activity,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',          id: 'dashboard' },
  { icon: Plane,           label: 'Flight List',        id: 'flights' },
  { icon: Activity,        label: 'Analysis Tool',      id: 'analysis' },
  { icon: AlertTriangle,   label: 'Events Management',  id: 'events' },
  { icon: BarChart3,       label: 'Statistics',         id: 'statistics' },
  { icon: Users,           label: 'Administration',     id: 'administration' },
  { icon: Upload,          label: 'Import Data',        id: 'import' },
]

interface SidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
  currentFleet?: string
}

export default function Sidebar({ activeSection, onNavigate, currentFleet }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0a0f1e] border-r border-slate-800/60 flex flex-col z-20">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
              <circle cx="20" cy="20" r="17" stroke="#dc2626" strokeWidth="1.5" />
              <ellipse cx="20" cy="20" rx="7" ry="17" stroke="#dc2626" strokeWidth="1.2" />
              <line x1="3" y1="20" x2="37" y2="20" stroke="#dc2626" strokeWidth="1.2" />
              <line x1="5" y1="12" x2="35" y2="12" stroke="#dc2626" strokeWidth="0.8" />
              <line x1="5" y1="28" x2="35" y2="28" stroke="#dc2626" strokeWidth="0.8" />
              <path d="M28 15 L17 21 L11 19 L13 21 L11 23 L17 21 L28 27 L30 21 Z" fill="#dc2626" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none tracking-wide">ATLAS FDM</h1>
            <p className="text-slate-500 text-[10px] mt-0.5 tracking-wider">Moroccan FDM System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
              ${activeSection === id
                ? 'bg-red-700/85 text-white'
                : 'text-slate-400 hover:bg-slate-800/55 hover:text-white'
              }`}
          >
            <Icon size={16} />
            <span className="flex-1 text-left">{label}</span>
            {activeSection === id && <ChevronRight size={13} />}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800/60 space-y-2.5">
        {currentFleet && (
          <div className="bg-slate-800/30 rounded-lg px-3 py-2">
            <p className="text-[10px] text-slate-600 uppercase tracking-wider">Active Fleet</p>
            <p className="text-xs text-red-400 font-medium mt-0.5 truncate">{currentFleet}</p>
          </div>
        )}

        <div className="bg-slate-800/30 rounded-lg px-3 py-2">
          <p className="text-[10px] text-slate-600 uppercase tracking-wider">Fleet Status</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400 font-medium">12 Aircraft Active</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-1 pt-1">
          <span className="text-sm">🇲🇦</span>
          <span className="text-[10px] text-slate-600 tracking-wider">Made in Morocco</span>
        </div>
      </div>
    </aside>
  )
}
