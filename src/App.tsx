import { useState } from 'react'
import { Plane, AlertTriangle, TrendingDown, Activity, Clock, BarChart3 } from 'lucide-react'
import { useTheme } from './contexts/ThemeContext'
import LoginPage from './components/LoginPage'
import TopNavBar from './components/TopNavBar'
import FleetMapPanel from './components/FleetMapPanel'
import FleetOverviewCard from './components/FleetOverviewCard'
import FuelEfficiencyCard from './components/FuelEfficiencyCard'
import MaintenanceStatusCard from './components/MaintenanceStatusCard'
import PilotPerformanceCard from './components/PilotPerformanceCard'
import AlertsFeed from './components/AlertsFeed'
import StatCard from './components/StatCard'
import FlightTable from './components/FlightTable'
import ExceedancePanel from './components/ExceedancePanel'
import ImportPanel from './components/ImportPanel'
import { FlightProfileChart, ExceedanceTrendChart, ExceedancePieChart } from './components/Charts'
import { mockFleetStats } from './data/mockData'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentFleet, setCurrentFleet] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
  const { theme } = useTheme()

  const isDark = theme === 'dark'
  const pageBg  = isDark ? 'bg-[#060a12]' : 'bg-[#f0f4f8]'
  const textPri = isDark ? 'text-white'   : 'text-slate-900'
  const textSub = isDark ? 'text-slate-400' : 'text-slate-500'

  const stats = mockFleetStats

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={fleet => {
          setCurrentFleet(fleet)
          setIsAuthenticated(true)
        }}
      />
    )
  }

  return (
    <div className={`min-h-screen ${pageBg}`}>
      <TopNavBar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        currentFleet={currentFleet}
        notificationCount={3}
      />

      {/* Page content — offset below fixed nav */}
      <div className="pt-14">
        {/* ── DASHBOARD ── */}
        {activeSection === 'dashboard' && (
          <div className="flex flex-col h-[calc(100vh-56px)]">
            {/* Map + Cards row */}
            <div className="flex gap-3 flex-1 min-h-0 p-3">
              {/* Map (left, 60%) */}
              <div className="flex-1 min-w-0">
                <FleetMapPanel />
              </div>

              {/* Right cards column (40%) */}
              <div className="w-80 flex flex-col gap-3 overflow-y-auto scrollbar-thin flex-shrink-0">
                <FleetOverviewCard />
                <FuelEfficiencyCard />
                <MaintenanceStatusCard />
                <PilotPerformanceCard />
              </div>
            </div>

            {/* Alerts feed (bottom, full width) */}
            <div className="px-3 pb-3 flex-shrink-0 max-h-60 overflow-y-auto scrollbar-thin">
              <AlertsFeed />
            </div>
          </div>
        )}

        {/* ── FLIGHTS ── */}
        {activeSection === 'flights' && (
          <div className="p-6">
            <div className="mb-4">
              <h2 className={`text-lg font-semibold ${textPri}`}>Flight List</h2>
              <p className={`text-sm ${textSub}`}>All imported flights — Royal Air Maroc fleet</p>
            </div>
            <FlightTable />
          </div>
        )}

        {/* ── ANALYSIS ── */}
        {activeSection === 'analysis' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className={`text-lg font-semibold ${textPri}`}>Analysis Tool</h2>
              <p className={`text-sm ${textSub}`}>Flight profile visualisation — altitude, speed, engine parameters</p>
            </div>
            <FlightProfileChart />
            <FlightTable />
          </div>
        )}

        {/* ── EVENTS ── */}
        {activeSection === 'events' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className={`text-lg font-semibold ${textPri}`}>Events Management</h2>
              <p className={`text-sm ${textSub}`}>Exceedance analysis and threshold management</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <ExceedanceTrendChart />
              <ExceedancePieChart />
            </div>
            <ExceedancePanel />
          </div>
        )}

        {/* ── STATISTICS ── */}
        {activeSection === 'statistics' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className={`text-lg font-semibold ${textPri}`}>Statistics & Reporting</h2>
              <p className={`text-sm ${textSub}`}>Monthly fleet performance overview</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <StatCard title="Total Flights"       value={stats.totalFlights}                  subtitle="Last 7 days"           icon={Plane}       color="blue"   trend={{ value: 12, positive: true }}  />
              <StatCard title="Exceedances"         value={stats.totalExceedances}              subtitle="Requires review"       icon={AlertTriangle} color="amber" trend={{ value: 25, positive: false }} />
              <StatCard title="Critical Events"     value={stats.criticalEvents}                subtitle="Immediate action"      icon={TrendingDown} color="red"   />
              <StatCard title="Fleet Utilization"   value={`${stats.fleetUtilization}%`}        subtitle="Aircraft availability" icon={Activity}    color="green"  />
              <StatCard title="Avg Flight Time"     value={`${stats.avgFlightDuration} min`}    subtitle="All routes"            icon={Clock}       color="purple" />
              <StatCard title="On-Time Performance" value={`${stats.onTimePerformance}%`}       subtitle="Departures & arrivals" icon={BarChart3}   color="cyan"   trend={{ value: 3, positive: true }}   />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <ExceedanceTrendChart />
              <ExceedancePieChart />
            </div>
          </div>
        )}

        {/* ── ADMINISTRATION ── */}
        {activeSection === 'administration' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${textPri}`}>Administration</h2>
              <p className={`text-sm ${textSub}`}>User management, fleet configuration, alert thresholds</p>
            </div>
            <div className={`max-w-lg rounded-xl border p-6 space-y-4 text-sm ${isDark ? 'bg-[#0c1220] border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-slate-800/40' : 'bg-slate-50'}`}>
                <span className={textSub}>Active Fleet</span>
                <span className="text-red-400 font-medium text-xs">{currentFleet}</span>
              </div>
              <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-slate-800/40' : 'bg-slate-50'}`}>
                <span className={textSub}>Session</span>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── IMPORT ── */}
        {activeSection === 'import' && (
          <div className="p-6">
            <div className="mb-6">
              <h2 className={`text-lg font-semibold ${textPri}`}>Import Flight Data</h2>
              <p className={`text-sm ${textSub}`}>Upload QAR / FDR / CPL files from Boeing 737/787 or ATR 72 aircraft</p>
            </div>
            <div className="max-w-2xl">
              <ImportPanel />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
