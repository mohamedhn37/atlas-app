import { mockFlights } from '../data/mockData'

const statusStyle = {
  NORMAL: 'bg-green-500/10 text-green-400 border border-green-500/20',
  EXCEEDANCE: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  CRITICAL: 'bg-red-500/10 text-red-400 border border-red-500/20',
}

export default function FlightTable() {
  return (
    <div className="bg-[#0d1424] border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-white font-semibold">Recent Flights</h2>
        <span className="text-xs text-slate-500">{mockFlights.length} records</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              {['Flight', 'Aircraft', 'Reg.', 'Route', 'Date', 'Duration', 'Format', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockFlights.map(f => (
              <tr key={f.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer">
                <td className="px-4 py-3 text-blue-400 font-mono font-medium">{f.flightNumber}</td>
                <td className="px-4 py-3 text-slate-300">{f.aircraft}</td>
                <td className="px-4 py-3 text-slate-400 font-mono">{f.registration}</td>
                <td className="px-4 py-3 text-slate-300">
                  <span className="font-medium">{f.origin}</span>
                  <span className="text-slate-600 mx-1">→</span>
                  <span className="font-medium">{f.destination}</span>
                </td>
                <td className="px-4 py-3 text-slate-400">{f.date}</td>
                <td className="px-4 py-3 text-slate-400">{f.duration} min</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{f.fileFormat}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle[f.status]}`}>{f.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
