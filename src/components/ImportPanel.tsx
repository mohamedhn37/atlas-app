import { useState, useCallback } from 'react'
import { Upload, FileText, CheckCircle, X } from 'lucide-react'

interface UploadedFile {
  name: string
  size: number
  format: string
  status: 'pending' | 'processing' | 'done' | 'error'
}

export default function ImportPanel() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragging, setDragging] = useState(false)

  const detectFormat = (name: string) => {
    if (name.endsWith('.qar') || name.toLowerCase().includes('qar')) return 'QAR'
    if (name.endsWith('.fdr') || name.toLowerCase().includes('fdr')) return 'FDR'
    if (name.endsWith('.cpl') || name.toLowerCase().includes('cpl')) return 'CPL'
    return 'UNKNOWN'
  }

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    const newFiles: UploadedFile[] = Array.from(fileList).map(f => ({
      name: f.name,
      size: f.size,
      format: detectFormat(f.name),
      status: 'pending',
    }))
    setFiles(prev => [...prev, ...newFiles])
    newFiles.forEach((_, i) => {
      setTimeout(() => {
        setFiles(prev => prev.map((f, idx) =>
          idx === prev.length - newFiles.length + i ? { ...f, status: 'processing' } : f
        ))
        setTimeout(() => {
          setFiles(prev => prev.map((f, idx) =>
            idx === prev.length - newFiles.length + i ? { ...f, status: 'done' } : f
          ))
        }, 1500)
      }, i * 300)
    })
  }, [])

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer
          ${dragging ? 'border-blue-500 bg-blue-500/5' : 'border-slate-700 hover:border-slate-600'}`}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files) }}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept=".qar,.fdr,.cpl,.dat,.bin"
          className="hidden"
          onChange={e => addFiles(e.target.files)}
        />
        <Upload size={36} className="mx-auto text-slate-500 mb-4" />
        <p className="text-white font-medium text-lg">Drop flight data files here</p>
        <p className="text-slate-500 text-sm mt-2">Supports QAR, FDR, CPL formats — Boeing and ATR</p>
        <button className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors">
          Browse Files
        </button>
      </div>

      {files.length > 0 && (
        <div className="bg-[#0d1424] border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-white font-medium">Upload Queue</h3>
            <button onClick={() => setFiles([])} className="text-slate-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
          <div className="divide-y divide-slate-800/50">
            {files.map((f, i) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3">
                <FileText size={16} className="text-slate-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm truncate">{f.name}</p>
                  <p className="text-slate-500 text-xs">{(f.size / 1024).toFixed(1)} KB · {f.format}</p>
                </div>
                {f.status === 'pending' && <span className="text-xs text-slate-500">Pending</span>}
                {f.status === 'processing' && (
                  <span className="text-xs text-blue-400 flex items-center gap-1">
                    <div className="w-3 h-3 border border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Decoding…
                  </span>
                )}
                {f.status === 'done' && <CheckCircle size={16} className="text-green-400 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
