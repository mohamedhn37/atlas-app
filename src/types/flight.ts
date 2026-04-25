export type AircraftType = 'Boeing 737' | 'Boeing 737 MAX' | 'Boeing 787' | 'ATR 72' | 'ATR 42'
export type FileFormat = 'QAR' | 'FDR' | 'CPL'
export type ExceedanceSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface FlightRecord {
  id: string
  flightNumber: string
  aircraft: AircraftType
  registration: string
  date: string
  origin: string
  destination: string
  duration: number
  fileFormat: FileFormat
  status: 'NORMAL' | 'EXCEEDANCE' | 'CRITICAL'
}

export interface Exceedance {
  id: string
  flightId: string
  parameter: string
  value: number
  limit: number
  unit: string
  timestamp: string
  severity: ExceedanceSeverity
  phase: string
}

export interface FlightParameter {
  time: number
  altitude: number
  airspeed: number
  verticalSpeed: number
  n1Left: number
  n1Right: number
  pitch: number
  roll: number
  heading: number
}

export interface MaintenanceAlert {
  id: string
  aircraft: string
  system: string
  description: string
  priority: 'ROUTINE' | 'URGENT' | 'AOG'
  dueDate: string
  flightHours: number
}

export interface FleetStats {
  totalFlights: number
  totalExceedances: number
  criticalEvents: number
  avgFlightDuration: number
  fleetUtilization: number
  onTimePerformance: number
}
