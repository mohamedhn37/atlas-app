import { useState } from 'react'
import { Plane, AlertTriangle, TrendingDown, Activity, Clock, BarChart3 } from 'lucide-react'
import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import FlightTable from './components/FlightTable'
import ExceedancePanel from './components/ExceedancePanel'
import MaintenancePanel from './components/MaintenancePanel'
import ImportPanel from './components/ImportPanel'
import LoginPage from './components/LoginPage'
import { FlightProfileChart, ExceedanceTrendChart, ExceedancePieChart } from './components/Charts'
import { mockFleetStats } from './data/mockData'

const sectionTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  flights: 'Flight List',
  analysis: 'Analysis Tool',
  events: 'Events Management',
  statistics: 'Statistics & Reporting',
  administration: 'Administration',
  import: 'Import Flight Data',
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentFleet, setCurrentFleet] = useState('')
  const [activeSection, setActiveSection] = useState('dashboard')
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
    <div className="flex h-screen overflow-hidden bg-[#070b14]">
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} currentFleet={currentFleet} />

      <main className="flex-1 ml-64 overflow-y-auto scrollbar-thin">
        <header className="sticky top-0 z-10 bg-[#070b14]/90 backdrop-blur border-b border-slate-800 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-semibold text-lg">{sectionTitles[activeSection]}</h1>
            <p className="text-slate-500 text-xs">Royal Air Maroc · Fleet Operations Center</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">April 25, 2026 — 08:34 UTC</span>
            <div className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-white text-[10px] font-bold">
              RAM
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {activeSection === 'dashboard' && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <StatCard title="Total Flights" value={stats.totalFlights} subtitle="Last 7 days" icon={Plane} color="blue" trend={{ value: 12, positive: true }} />
                <StatCard title="Exceedances" value={stats.totalExceedances} subtitle="Requires review" icon={AlertTriangle} color="amber" trend={{ value: 25, positive: false }} />
                <StatCard title="Critical Events" value={stats.criticalEvents} subtitle="Immediate action" icon={TrendingDown} color="red" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <StatCard title="Fleet Utilization" value={`${stats.fleetUtilization}%`} subtitle="Aircraft availability" icon={Activity} color="green" />
                <StatCard title="Avg Flight Time" value={`${stats.avgFlightDuration} min`} subtitle="All routes" icon={Clock} color="purple" />
                <StatCard title="On-Time Performance" value={`${stats.onTimePerformance}%`} subtitle="Departures & arrivals" icon={BarChart3} color="cyan" trend={{ value: 3, positive: true }} />
              </div>
              <FlightProfileChart />
              <div className="grid grid-cols-2 gap-6">
                <ExceedanceTrendChart />
                <ExceedancePieChart />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <ExceedancePanel />
                <MaintenancePanel />
              </div>
            </>
          )}

          {activeSection === 'import' && (
            <div className="max-w-2xl">
              <p className="text-slate-400 text-sm mb-6">
                Upload raw flight data files (QAR, FDR, CPL) from Boeing 737/787 or ATR 72 aircraft.
                The system will automatically decode and extract flight parameters for analysis.
              </p>
              <ImportPanel />
            </div>
          )}

          {activeSection === 'flights' && <FlightTable />}

          {activeSection === 'events' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <ExceedanceTrendChart />
                <ExceedancePieChart />
              </div>
              <ExceedancePanel />
            </div>
          )}

          {activeSection === 'analysis' && (
            <div className="space-y-6">
              <FlightProfileChart />
              <FlightTable />
            </div>
          )}

          {activeSection === 'statistics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <StatCard title="Total Flights" value={stats.totalFlights} subtitle="Last 7 days" icon={Plane} color="blue" />
                <StatCard title="Exceedances" value={stats.totalExceedances} subtitle="Requires review" icon={AlertTriangle} color="amber" />
                <StatCard title="On-Time Performance" value={`${stats.onTimePerformance}%`} subtitle="Departures & arrivals" icon={BarChart3} color="cyan" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <ExceedanceTrendChart />
                <ExceedancePieChart />
              </div>
            </div>
          )}

          {activeSection === 'administration' && (
            <div className="max-w-lg bg-[#0d1424] border border-slate-800 rounded-xl p-6 text-slate-400 text-sm space-y-4">
              <p className="text-white font-medium">Administration</p>
              <p>User management, fleet configuration, and alert thresholds are configurable here.</p>
              <div className="space-y-3 mt-2">
                <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-300">Active Fleet</span>
                  <span className="text-red-400 font-medium text-xs">{currentFleet}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-300">Session</span>
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="text-red-500 hover:text-red-400 text-sm transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
