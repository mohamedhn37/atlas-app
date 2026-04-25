import { Bell, HelpCircle, Moon, Sun, LayoutGrid, ChevronDown } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const navLinks = [
  { label: 'Dashboard',      id: 'dashboard' },
  { label: 'Flights',        id: 'flights' },
  { label: 'Analysis',       id: 'analysis' },
  { label: 'Events',         id: 'events' },
  { label: 'Statistics',     id: 'statistics' },
  { label: 'Administration', id: 'administration' },
  { label: 'Import',         id: 'import' },
]

interface TopNavBarProps {
  activeSection: string
  onNavigate: (id: string) => void
  currentFleet: string
  notificationCount?: number
}

export default function TopNavBar({
  activeSection,
  onNavigate,
  currentFleet,
  notificationCount = 3,
}: TopNavBarProps) {
  const { theme, toggleTheme } = useTheme()

  const isDark = theme === 'dark'
  const bg      = isDark ? 'bg-[#0a0f1e]  border-slate-800/70' : 'bg-white border-slate-200'
  const text    = isDark ? 'text-slate-300' : 'text-slate-600'
  const active  = isDark ? 'text-white bg-red-700/80' : 'text-white bg-red-600'
  const hover   = isDark ? 'hover:text-white hover:bg-slate-800/60' : 'hover:text-slate-900 hover:bg-slate-100'
  const iconBtn = isDark
    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 h-14 border-b flex items-center px-4 gap-4 ${bg}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0 mr-2">
        <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
          <circle cx="20" cy="20" r="17" stroke="#dc2626" strokeWidth="1.5" />
          <ellipse cx="20" cy="20" rx="7" ry="17" stroke="#dc2626" strokeWidth="1.2" />
          <line x1="3"  y1="20" x2="37" y2="20" stroke="#dc2626" strokeWidth="1.2" />
          <line x1="5"  y1="12" x2="35" y2="12" stroke="#dc2626" strokeWidth="0.8" />
          <line x1="5"  y1="28" x2="35" y2="28" stroke="#dc2626" strokeWidth="0.8" />
          <path d="M28 15 L17 21 L11 19 L13 21 L11 23 L17 21 L28 27 L30 21 Z" fill="#dc2626" />
        </svg>
        <div>
          <p className={`font-bold text-sm leading-none tracking-wide ${isDark ? 'text-white' : 'text-slate-900'}`}>
            ATLAS FDM
          </p>
          <p className="text-[9px] text-slate-500 tracking-wider leading-none mt-0.5">
            Moroccan Flight Data Monitoring · Native Sovereignty
          </p>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto scrollbar-thin">
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap
              ${activeSection === link.id ? active : `${text} ${hover}`}`}
          >
            {link.label}
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className={`p-2 rounded-lg transition-all ${iconBtn}`}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Help */}
        <button className={`p-2 rounded-lg transition-all ${iconBtn}`}>
          <HelpCircle size={16} />
        </button>

        {/* Notifications */}
        <button className={`relative p-2 rounded-lg transition-all ${iconBtn}`}>
          <Bell size={16} />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 rounded-full text-white text-[9px] font-bold flex items-center justify-center leading-none">
              {notificationCount}
            </span>
          )}
        </button>

        {/* User / fleet */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-slate-100 hover:bg-slate-200'}`}>
          <div className="w-6 h-6 rounded-full bg-red-700 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
            RAM
          </div>
          <span className={`text-xs font-medium max-w-28 truncate ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
            {currentFleet || 'Royal Air Maroc'}
          </span>
          <ChevronDown size={13} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
        </div>

        {/* Grid / apps */}
        <button className={`p-2 rounded-lg transition-all ${iconBtn}`}>
          <LayoutGrid size={16} />
        </button>
      </div>
    </header>
  )
}
