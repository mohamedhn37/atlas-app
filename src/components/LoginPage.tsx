import { useState } from 'react'
import { Eye, EyeOff, ChevronDown, Shield } from 'lucide-react'

const fleets = [
  { id: 'ram', label: 'Royal Air Maroc (RAM)' },
  { id: 'ramexpress', label: 'RAM Express' },
  { id: 'ramcargo', label: 'RAM Cargo' },
  { id: 'royalairmorocco', label: 'Royal Air Morocco' },
]

interface LoginPageProps {
  onLogin: (fleet: string) => void
}

function MoroccoMapBackground() {
  const airports = [
    { code: 'RBA', name: 'Rabat', x: 270, y: 380 },
    { code: 'RAK', name: 'Marrakech', x: 335, y: 432 },
  ]

  const rightAirports = [
    { code: 'RBA', name: '', x: 1155, y: 330 },
    { code: 'CMN', name: 'Casablanca', x: 1000, y: 365 },
    { code: 'RAK', name: 'Marrakech', x: 1110, y: 430 },
  ]

  const routes = [
    { x1: 270, y1: 380, x2: 1155, y2: 330 },
    { x1: 270, y1: 380, x2: 1000, y2: 365 },
    { x1: 335, y1: 432, x2: 1110, y2: 430 },
    { x1: 335, y1: 432, x2: 1000, y2: 365 },
    { x1: 270, y1: 380, x2: 1110, y2: 430 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#060a12" />
            <stop offset="50%" stopColor="#080d18" />
            <stop offset="100%" stopColor="#060a12" />
          </linearGradient>
          <radialGradient id="moroccoGlow" cx="50%" cy="50%" r="40%">
            <stop offset="0%" stopColor="#166534" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#060a12" stopOpacity="0" />
          </radialGradient>
          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="lineGlow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#bgGrad)" />
        <rect width="1440" height="900" fill="url(#moroccoGlow)" />

        {/* Subtle grid */}
        {[...Array(11)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 90} x2="1440" y2={i * 90}
            stroke="#1e3a5f" strokeWidth="0.35" opacity="0.35" />
        ))}
        {[...Array(17)].map((_, i) => (
          <line key={`v${i}`} x1={i * 90} y1="0" x2={i * 90} y2="900"
            stroke="#1e3a5f" strokeWidth="0.35" opacity="0.35" />
        ))}

        {/* Morocco country outline (simplified) */}
        <path
          d="M 320,215 L 395,222 L 445,265 L 455,335 L 420,430 L 375,515 L 295,580 L 195,565 L 145,482 L 115,415 L 140,350 L 175,285 L 230,248 Z"
          fill="#15803d" fillOpacity="0.07"
          stroke="#22c55e" strokeWidth="0.7" strokeOpacity="0.18"
        />

        {/* Route lines */}
        {routes.map((r, i) => (
          <line
            key={i}
            x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke="#22d3ee" strokeWidth="0.9" opacity="0.5"
            strokeDasharray="7,5"
            filter="url(#lineGlow)"
          />
        ))}

        {/* Left airport markers */}
        {airports.map(ap => (
          <g key={ap.code} filter="url(#dotGlow)">
            <circle cx={ap.x} cy={ap.y} r="16" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.2" />
            <circle cx={ap.x} cy={ap.y} r="8" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.35" />
            <circle cx={ap.x} cy={ap.y} r="3.5" fill="#22d3ee" opacity="0.95" />
            <text x={ap.x - 12} y={ap.y - 20} fill="#94a3b8" fontSize="11"
              fontFamily="'Courier New', monospace" textAnchor="middle">
              {ap.name} ({ap.code})
            </text>
          </g>
        ))}

        {/* Right airport markers */}
        {rightAirports.map((ap, i) => (
          <g key={i} filter="url(#dotGlow)">
            <circle cx={ap.x} cy={ap.y} r="16" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.2" />
            <circle cx={ap.x} cy={ap.y} r="8" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.35" />
            <circle cx={ap.x} cy={ap.y} r="3.5" fill="#22d3ee" opacity="0.95" />
            <text x={ap.x + 20} y={ap.y + 4} fill="#94a3b8" fontSize="11" fontFamily="'Courier New', monospace">
              {ap.name ? `${ap.name} (${ap.code})` : `(${ap.code})`}
            </text>
          </g>
        ))}
      </svg>

      {/* Bottom-right decorative star */}
      <div className="absolute bottom-5 right-5">
        <svg viewBox="0 0 24 24" className="w-6 h-6 opacity-35" fill="#475569">
          <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8Z" />
        </svg>
      </div>
    </div>
  )
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedFleet, setSelectedFleet] = useState(fleets[0])
  const [showFleetDropdown, setShowFleetDropdown] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin(selectedFleet.label)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#060a12] flex items-center justify-center relative overflow-hidden">
      <MoroccoMapBackground />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div
          className="rounded-2xl p-8 backdrop-blur-sm"
          style={{
            background: 'rgba(7, 11, 22, 0.93)',
            border: '1px solid rgba(220, 38, 38, 0.32)',
            boxShadow:
              '0 0 45px rgba(220, 38, 38, 0.1), 0 0 90px rgba(220, 38, 38, 0.05), 0 25px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-2">
              <svg viewBox="0 0 52 52" fill="none" className="w-12 h-12 flex-shrink-0">
                <circle cx="26" cy="26" r="22" stroke="#dc2626" strokeWidth="1.8" />
                <ellipse cx="26" cy="26" rx="9" ry="22" stroke="#dc2626" strokeWidth="1.4" />
                <line x1="4" y1="26" x2="48" y2="26" stroke="#dc2626" strokeWidth="1.4" />
                <line x1="7" y1="15" x2="45" y2="15" stroke="#dc2626" strokeWidth="0.9" />
                <line x1="7" y1="37" x2="45" y2="37" stroke="#dc2626" strokeWidth="0.9" />
                <path d="M36 20 L22 27 L14 25 L17 27 L14 29 L22 27 L36 34 L39 27 Z" fill="#dc2626" />
              </svg>
              <h1 className="text-4xl font-bold text-white tracking-[0.06em]">ATLAS FDM</h1>
            </div>
            <p className="text-slate-500 text-[11px] tracking-[0.12em] uppercase text-center">
              Moroccan Flight Data Monitoring · Native Sovereignty
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
                Username / Email
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700/70 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-700/60 transition-colors"
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700/70 text-white rounded-lg px-4 py-3 pr-12 text-sm focus:outline-none focus:border-red-700/60 transition-colors"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Fleet selector */}
            <div className="relative">
              <label className="block text-[11px] text-slate-500 mb-1.5 tracking-wide">
                Select Fleet / Company
              </label>
              <button
                type="button"
                onClick={() => setShowFleetDropdown(p => !p)}
                className="w-full bg-slate-900/50 border border-slate-700/70 text-white rounded-lg px-4 py-3 text-sm flex items-center justify-between focus:outline-none focus:border-red-700/60 transition-colors"
              >
                <span>{selectedFleet.label}</span>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] text-red-500 font-bold border border-red-900/50 rounded px-1.5 py-0.5">
                    RAM
                  </span>
                  <ChevronDown
                    size={15}
                    className={`text-slate-400 transition-transform duration-200 ${showFleetDropdown ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              {showFleetDropdown && (
                <div
                  className="absolute top-full left-0 right-0 mt-1 rounded-lg overflow-hidden z-50"
                  style={{
                    background: 'rgba(7, 11, 22, 0.98)',
                    border: '1px solid rgba(51, 65, 85, 0.7)',
                    boxShadow: '0 12px 35px rgba(0,0,0,0.6)',
                  }}
                >
                  {fleets.map(fleet => (
                    <button
                      key={fleet.id}
                      type="button"
                      onClick={() => { setSelectedFleet(fleet); setShowFleetDropdown(false) }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors
                        ${selectedFleet.id === fleet.id
                          ? 'bg-slate-800/60 text-white'
                          : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                        }`}
                    >
                      {fleet.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg text-sm font-bold tracking-[0.18em] uppercase text-white transition-all mt-2 disabled:opacity-70"
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                boxShadow: '0 4px 20px rgba(220, 38, 38, 0.28)',
              }}
            >
              {isLoading ? 'CONNEXION...' : 'SE CONNECTER'}
            </button>
          </form>

          {/* Links */}
          <div className="text-center mt-5 space-y-1">
            <p className="text-xs text-slate-500 cursor-pointer hover:text-slate-400 transition-colors">
              Mot de passe oublié ?
            </p>
            <p className="text-xs text-slate-600">
              Pas de compte ? Contactez l'administrateur.
            </p>
          </div>

          {/* 2FA notice */}
          <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-slate-800/50">
            <Shield size={12} className="text-slate-600" />
            <span className="text-[11px] text-slate-600">
              Authentification à deux facteurs (2FA) requise
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
