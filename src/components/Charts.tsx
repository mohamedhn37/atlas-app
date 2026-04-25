import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { mockFlightParameters, exceedancesByType, exceedancesByMonth } from '../data/mockData'

const RADIAN = Math.PI / 180
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return percent > 0.08 ? (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null
}

export function FlightProfileChart() {
  return (
    <div className="bg-[#0d1424] border border-slate-800 rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Flight Profile — AT101</h2>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={mockFlightParameters} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="altGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="spdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${v}min`} />
          <YAxis yAxisId="alt" tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
          <YAxis yAxisId="spd" orientation="right" tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `${v}kt`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0d1424', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
            labelFormatter={v => `T+${v} min`}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
          <Area yAxisId="alt" type="monotone" dataKey="altitude" stroke="#3b82f6" fill="url(#altGrad)" strokeWidth={2} name="Altitude (ft)" dot={false} />
          <Area yAxisId="spd" type="monotone" dataKey="airspeed" stroke="#06b6d4" fill="url(#spdGrad)" strokeWidth={2} name="Airspeed (kt)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ExceedanceTrendChart() {
  return (
    <div className="bg-[#0d1424] border border-slate-800 rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Exceedances — 6-Month Trend</h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={exceedancesByMonth} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} />
          <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
          <Tooltip contentStyle={{ backgroundColor: '#0d1424', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
          <Bar dataKey="total" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Total Events" />
          <Bar dataKey="critical" fill="#ef4444" radius={[3, 3, 0, 0]} name="Critical" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ExceedancePieChart() {
  return (
    <div className="bg-[#0d1424] border border-slate-800 rounded-xl p-5">
      <h2 className="text-white font-semibold mb-4">Exceedances by Type</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={exceedancesByType}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={90}
            innerRadius={40}
            dataKey="value"
          >
            {exceedancesByType.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#0d1424', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
