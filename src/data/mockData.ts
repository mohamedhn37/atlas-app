import type {
  FlightRecord, Exceedance, FlightParameter, MaintenanceAlert,
  FleetStats, AircraftPosition, FlightRoute, AlertEntry,
  FuelDataPoint, PilotStats,
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

// Live aircraft positions on the map
export const mockAircraftPositions: AircraftPosition[] = [
  { id: 'a1', registration: 'CN-ROB', flightNumber: 'AT706', lat: 36.8, lon: -3.2, heading: 42, altitude: 35000, speed: 462, status: 'normal', origin: 'CMN', destination: 'CDG' },
  { id: 'a2', registration: 'CN-ROC', flightNumber: 'AT602', lat: 31.6, lon: -8.0, heading: 358, altitude: 2200, speed: 145, status: 'warning', origin: 'CMN', destination: 'RAK' },
  { id: 'a3', registration: 'CN-RGB', flightNumber: 'AT208', lat: 28.5, lon: 18.5, heading: 80, altitude: 37000, speed: 488, status: 'normal', origin: 'CMN', destination: 'DXB' },
  { id: 'a4', registration: 'CN-RGA', flightNumber: 'AT100', lat: 35.2, lon: -25.4, heading: 300, altitude: 36000, speed: 475, status: 'normal', origin: 'CMN', destination: 'JFK' },
  { id: 'a5', registration: 'CN-COA', flightNumber: 'AT501', lat: 34.05, lon: -6.8, heading: 170, altitude: 8000, speed: 210, status: 'critical', origin: 'RBA', destination: 'CMN' },
  { id: 'a6', registration: 'CN-ROD', flightNumber: 'AT834', lat: 35.5, lon: -5.5, heading: 30, altitude: 24000, speed: 390, status: 'normal', origin: 'CMN', destination: 'MAD' },
  { id: 'a7', registration: 'CN-COB', flightNumber: 'AT503', lat: 32.4, lon: -7.5, heading: 340, altitude: 12000, speed: 240, status: 'normal', origin: 'RAK', destination: 'CMN' },
  { id: 'a8', registration: 'CN-RGC', flightNumber: 'AT900', lat: 39.5, lon: -9.2, heading: 355, altitude: 36000, speed: 480, status: 'warning', origin: 'CMN', destination: 'LHR' },
  { id: 'a9', registration: 'CN-ROE', flightNumber: 'AT712', lat: 33.5, lon: -3.8, heading: 90, altitude: 31000, speed: 445, status: 'normal', origin: 'CMN', destination: 'TUN' },
  { id: 'a10', registration: 'CN-ROF', flightNumber: 'AT520', lat: 30.2, lon: -9.8, heading: 200, altitude: 18000, speed: 310, status: 'normal', origin: 'CMN', destination: 'AGA' },
  { id: 'a11', registration: 'CN-COC', flightNumber: 'AT614', lat: 35.0, lon: -1.8, heading: 60, altitude: 28000, speed: 420, status: 'normal', origin: 'CMN', destination: 'ALG' },
  { id: 'a12', registration: 'CN-ROG', flightNumber: 'AT810', lat: 42.5, lon: 1.5, heading: 15, altitude: 37000, speed: 470, status: 'normal', origin: 'CMN', destination: 'BCN' },
]

// Route polylines: [lat, lon] pairs
export const mockFlightRoutes: FlightRoute[] = [
  { from: [33.37, -7.59], to: [49.01, 2.55],   flightNumber: 'AT706' }, // CMN → CDG
  { from: [33.37, -7.59], to: [51.48, -0.45],  flightNumber: 'AT900' }, // CMN → LHR
  { from: [33.37, -7.59], to: [40.47, -3.56],  flightNumber: 'AT834' }, // CMN → MAD
  { from: [33.37, -7.59], to: [25.25, 55.36],  flightNumber: 'AT208' }, // CMN → DXB
  { from: [33.37, -7.59], to: [40.64, -73.78], flightNumber: 'AT100' }, // CMN → JFK
  { from: [33.37, -7.59], to: [36.85, 10.23],  flightNumber: 'AT712' }, // CMN → TUN
  { from: [31.61, -8.04], to: [49.01, 2.55],   flightNumber: 'AT503' }, // RAK → CDG
  { from: [31.61, -8.04], to: [40.47, -3.56],  flightNumber: 'AT503' }, // RAK → MAD
  { from: [34.05, -6.75], to: [33.37, -7.59],  flightNumber: 'AT501' }, // RBA → CMN
]

// Alerts feed
export const mockAlertsFeed: AlertEntry[] = [
  { id: 1,  time: '10:33:55', aircraft: '990', flightId: 'AT701',     severity: 'CRITICAL', message: 'High Sink Rate below 1000ft (AT701)' },
  { id: 2,  time: '10:33:18', aircraft: 'A98', flightId: 'B738-CN-RGB', severity: 'WARNING', message: 'Unstable Approach (Speed High) (B738-CN-RGB)' },
  { id: 3,  time: '10:33:05', aircraft: '996', flightId: 'B738-CN-0GB', severity: 'WARNING', message: 'Unstable Approach (Speed High) (B738-CN-0GB)' },
  { id: 4,  time: '10:33:04', aircraft: 'A56', flightId: 'B738-CN-ROB', severity: 'WARNING', message: 'Unstable Approach (Speed High) (B738-CN-ROB)' },
  { id: 5,  time: '10:33:02', aircraft: '053', flightId: 'AT701',     severity: 'CRITICAL', message: 'High Sink Rate below 1000ft (AT701)' },
  { id: 6,  time: '10:32:48', aircraft: 'A63', flightId: 'B738-CN-0GB', severity: 'WARNING', message: 'Unstable Approach (Speed High) (B738-CN-0GB)' },
  { id: 7,  time: '10:31:12', aircraft: 'B21', flightId: 'AT501',     severity: 'CRITICAL', message: 'Excessive Bank Angle in Approach (AT501-CN-COA)' },
  { id: 8,  time: '10:28:55', aircraft: 'C04', flightId: 'AT900',     severity: 'WARNING',  message: 'Turbulence Load Factor Exceedance (AT900-CN-RGC)' },
  { id: 9,  time: '10:25:30', aircraft: 'D77', flightId: 'AT208',     severity: 'WARNING',  message: 'N1 Overtravel on Takeoff (AT208-CN-RGB)' },
  { id: 10, time: '10:19:44', aircraft: 'E12', flightId: 'AT706',     severity: 'WARNING',  message: 'Flap Overspeed — Vfe Exceeded (AT706-CN-ROB)' },
]

// Fuel efficiency trend (past 8 months)
export const fuelEfficiencyData: FuelDataPoint[] = [
  { month: 'Jan', value: 78 },
  { month: 'Feb', value: 64 },
  { month: 'Mar', value: 68 },
  { month: 'Apr', value: 55 },
  { month: 'May', value: 52 },
  { month: 'Jun', value: 48 },
  { month: 'Jul', value: 44 },
  { month: 'Aug', value: 22 },
]

// Maintenance donut data
export const maintenanceStatusData = [
  { name: 'Critical', value: 3, color: '#ef4444' },
  { name: 'Warning',  value: 7, color: '#f97316' },
  { name: 'Response', value: 12, color: '#475569' },
]

// Pilot performance
export const pilotPerformanceData: PilotStats = {
  summary: 7,
  positions: [
    { label: 'Jan', value: 4 },
    { label: 'Feb', value: 6 },
    { label: 'Mar', value: 3 },
    { label: 'Apr', value: 7 },
    { label: 'May', value: 5 },
    { label: 'Jun', value: 8 },
  ],
}
