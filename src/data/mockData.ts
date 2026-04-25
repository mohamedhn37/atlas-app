import type {
  FlightRecord, Exceedance, FlightParameter,
  MaintenanceAlert, FleetStats
} from '../types/flight'

export const mockFlights: FlightRecord[] = [
  { id: 'FL001', flightNumber: 'AT706', aircraft: 'Boeing 737', registration: 'CN-ROB', date: '2026-04-24', origin: 'CMN', destination: 'CDG', duration: 195, fileFormat: 'QAR', status: 'NORMAL' },
  { id: 'FL002', flightNumber: 'AT602', aircraft: 'Boeing 737', registration: 'CN-ROC', date: '2026-04-24', origin: 'CMN', destination: 'RAK', duration: 45, fileFormat: 'QAR', status: 'EXCEEDANCE' },
  { id: 'FL003', flightNumber: 'AT208', aircraft: 'Boeing 787', registration: 'CN-RGB', date: '2026-04-23', origin: 'CMN', destination: 'DXB', duration: 360, fileFormat: 'FDR', status: 'EXCEEDANCE' },
  { id: 'FL004', flightNumber: 'AT100', aircraft: 'Boeing 787', registration: 'CN-RGA', date: '2026-04-23', origin: 'CMN', destination: 'JFK', duration: 540, fileFormat: 'FDR', status: 'NORMAL' },
  { id: 'FL005', flightNumber: 'AT501', aircraft: 'ATR 72', registration: 'CN-COA', date: '2026-04-22', origin: 'RBA', destination: 'CMN', duration: 30, fileFormat: 'CPL', status: 'CRITICAL' },
  { id: 'FL006', flightNumber: 'AT834', aircraft: 'Boeing 737', registration: 'CN-ROD', date: '2026-04-22', origin: 'CMN', destination: 'MAD', duration: 110, fileFormat: 'QAR', status: 'NORMAL' },
  { id: 'FL007', flightNumber: 'AT503', aircraft: 'ATR 72', registration: 'CN-COB', date: '2026-04-21', origin: 'RAK', destination: 'CMN', duration: 50, fileFormat: 'QAR', status: 'NORMAL' },
  { id: 'FL008', flightNumber: 'AT900', aircraft: 'Boeing 787', registration: 'CN-RGC', date: '2026-04-21', origin: 'CMN', destination: 'LHR', duration: 235, fileFormat: 'FDR', status: 'EXCEEDANCE' },
]

export const mockExceedances: Exceedance[] = [
  { id: 'EX001', flightId: 'FL002', parameter: 'Vertical Speed (Landing)', value: -980, limit: -600, unit: 'ft/min', timestamp: '08:42:15', severity: 'HIGH', phase: 'LANDING' },
  { id: 'EX002', flightId: 'FL003', parameter: 'N1 Left Engine', value: 97.4, limit: 95.0, unit: '%', timestamp: '11:15:30', severity: 'MEDIUM', phase: 'TAKEOFF' },
  { id: 'EX003', flightId: 'FL003', parameter: 'Pitch Attitude (Rotation)', value: 18.2, limit: 15.0, unit: 'deg', timestamp: '11:15:45', severity: 'LOW', phase: 'TAKEOFF' },
  { id: 'EX004', flightId: 'FL005', parameter: 'Bank Angle', value: 38.5, limit: 30.0, unit: 'deg', timestamp: '07:22:10', severity: 'CRITICAL', phase: 'APPROACH' },
  { id: 'EX005', flightId: 'FL005', parameter: 'Speed (Vfe)', value: 215, limit: 200, unit: 'kt', timestamp: '07:19:55', severity: 'HIGH', phase: 'APPROACH' },
  { id: 'EX006', flightId: 'FL008', parameter: 'Turbulence Load Factor', value: 1.82, limit: 1.50, unit: 'g', timestamp: '14:33:20', severity: 'MEDIUM', phase: 'CRUISE' },
]

export const mockFlightParameters: FlightParameter[] = Array.from({ length: 60 }, (_, i) => {
  const t = i * 2
  const isClimb = i < 15
  const isCruise = i >= 15 && i < 45
  const alt = isClimb ? i * 2400 : isCruise ? 36000 : 36000 - (i - 45) * 3000
  return {
    time: t,
    altitude: Math.max(0, alt + (Math.random() - 0.5) * 200),
    airspeed: isClimb ? 200 + i * 4 : isCruise ? 460 + (Math.random() - 0.5) * 10 : 460 - (i - 45) * 12,
    verticalSpeed: isClimb ? 1800 + (Math.random() - 0.5) * 200 : isCruise ? (Math.random() - 0.5) * 50 : -1500 + (Math.random() - 0.5) * 200,
    n1Left: isClimb ? 92 + Math.random() * 3 : isCruise ? 82 + Math.random() * 2 : 45 + Math.random() * 5,
    n1Right: isClimb ? 91 + Math.random() * 3 : isCruise ? 81 + Math.random() * 2 : 44 + Math.random() * 5,
    pitch: isClimb ? 8 + Math.random() * 2 : isCruise ? 2 + Math.random() : -2 + Math.random(),
    roll: (Math.random() - 0.5) * 6,
    heading: 85 + (Math.random() - 0.5) * 4,
  }
})

export const mockMaintenanceAlerts: MaintenanceAlert[] = [
  { id: 'MA001', aircraft: 'CN-ROB', system: 'Hydraulic System', description: 'Hydraulic fluid level check required', priority: 'ROUTINE', dueDate: '2026-04-30', flightHours: 2 },
  { id: 'MA002', aircraft: 'CN-ROC', system: 'Landing Gear', description: 'Hard landing inspection — FL002 exceedance', priority: 'URGENT', dueDate: '2026-04-26', flightHours: 0 },
  { id: 'MA003', aircraft: 'CN-COA', system: 'Flight Controls', description: 'Control surface inspection after multiple exceedances', priority: 'AOG', dueDate: '2026-04-25', flightHours: 0 },
  { id: 'MA004', aircraft: 'CN-RGB', system: 'Engine (GEnx)', description: 'Borescope inspection — N1 overtravel', priority: 'URGENT', dueDate: '2026-04-27', flightHours: 0 },
  { id: 'MA005', aircraft: 'CN-RGC', system: 'Airframe', description: 'Structural inspection after turbulence event', priority: 'ROUTINE', dueDate: '2026-05-02', flightHours: 5 },
]

export const mockFleetStats: FleetStats = {
  totalFlights: 8,
  totalExceedances: 6,
  criticalEvents: 1,
  avgFlightDuration: 195,
  fleetUtilization: 76.8,
  onTimePerformance: 88.5,
}

export const exceedancesByType = [
  { name: 'Vertical Speed', value: 2, fill: '#f59e0b' },
  { name: 'Pitch/Roll',     value: 2, fill: '#ef4444' },
  { name: 'Engine N1',      value: 1, fill: '#8b5cf6' },
  { name: 'Turbulence',     value: 1, fill: '#06b6d4' },
]

export const exceedancesByMonth = [
  { month: 'Nov', total: 14, critical: 2 },
  { month: 'Dec', total: 9,  critical: 1 },
  { month: 'Jan', total: 17, critical: 3 },
  { month: 'Feb', total: 11, critical: 1 },
  { month: 'Mar', total: 8,  critical: 0 },
  { month: 'Apr', total: 6,  critical: 1 },
]
