import { useEffect, useRef } from 'react'
import { MapContainer, Marker, Polyline, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useTheme } from '../contexts/ThemeContext'
import { mockAircraftPositions, mockFlightRoutes } from '../data/mockData'
import type { AircraftPosition } from '../types/flight'

// Fix Leaflet's broken default icon paths in Vite
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function createPlaneIcon(heading: number, status: AircraftPosition['status']) {
  const color = status === 'critical' ? '#ef4444' : status === 'warning' ? '#f97316' : '#ffffff'
  const glow  = status === 'critical'
    ? 'drop-shadow(0 0 5px rgba(239,68,68,0.9))'
    : status === 'warning'
      ? 'drop-shadow(0 0 4px rgba(249,115,22,0.7))'
      : 'drop-shadow(0 0 3px rgba(255,255,255,0.4))'

  return L.divIcon({
    html: `
      <div style="
        transform: rotate(${heading}deg);
        filter: ${glow};
        display: flex; align-items: center; justify-content: center;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>`,
    className: '',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

// Switches tile layer URL when theme changes
function ThemeTileLayer() {
  const { theme } = useTheme()
  const map = useMap()
  const layerRef = useRef<L.TileLayer | null>(null)

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current)
    }
    const url = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'

    const layer = L.tileLayer(url, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    })
    layer.addTo(map)
    layerRef.current = layer

    return () => { if (layerRef.current) map.removeLayer(layerRef.current) }
  }, [theme, map])

  return null
}

export default function FleetMapPanel() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Morocco center
  const center: [number, number] = [32.0, -3.0]

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden"
      style={{ border: `1px solid ${isDark ? 'rgba(30,41,59,0.7)' : 'rgba(203,213,225,0.8)'}` }}
    >
      <MapContainer
        center={center}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        attributionControl={false}
      >
        <ThemeTileLayer />

        {/* Flight routes */}
        {mockFlightRoutes.map((route, i) => (
          <Polyline
            key={i}
            positions={[route.from, route.to]}
            pathOptions={{
              color: '#ef4444',
              weight: 1.2,
              opacity: 0.65,
              dashArray: '6, 5',
            }}
          />
        ))}

        {/* Aircraft markers */}
        {mockAircraftPositions.map(ac => (
          <Marker
            key={ac.id}
            position={[ac.lat, ac.lon]}
            icon={createPlaneIcon(ac.heading, ac.status)}
          >
            <Popup className="atlas-popup">
              <div style={{
                background: isDark ? '#0f1729' : '#ffffff',
                color: isDark ? '#e2e8f0' : '#0f172a',
                padding: '8px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                minWidth: '160px',
              }}>
                <p style={{ fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                  {ac.flightNumber} · {ac.registration}
                </p>
                <p>{ac.origin} → {ac.destination}</p>
                <p>Alt: {ac.altitude.toLocaleString()} ft</p>
                <p>Spd: {ac.speed} kt</p>
                <p style={{ color: ac.status === 'critical' ? '#ef4444' : ac.status === 'warning' ? '#f97316' : '#22c55e', fontWeight: 600, marginTop: '4px', textTransform: 'uppercase', fontSize: '11px' }}>
                  {ac.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend overlay */}
      <div
        className="absolute bottom-3 right-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
        style={{
          background: isDark ? 'rgba(10,14,26,0.85)' : 'rgba(255,255,255,0.9)',
          border: `1px solid ${isDark ? 'rgba(51,65,85,0.6)' : 'rgba(203,213,225,0.8)'}`,
          color: isDark ? '#94a3b8' : '#475569',
          backdropFilter: 'blur(4px)',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill={isDark ? '#ffffff' : '#475569'}>
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
        Aircraft Positions
      </div>

      {/* Map controls: zoom already built-in */}
    </div>
  )
}
