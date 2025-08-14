import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import VisitForm from './VisitForm'
import VisitList from './VisitList'
import './index.css'

const App = () => {
  const [visits, setVisits] = useState([])
  const [toast, setToast] = useState(null)

  const fetchVisits = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/visits')
    const data = await res.json()
    setVisits(data)
  }

  useEffect(() => {
    fetchVisits()
  }, [])

  const handleVisitSubmit = async (formData) => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.detail || 'Submit failed')
      }
      // ✅ auto-refresh list
      await fetchVisits()
      // inline toast (nice UX)
      setToast({ type: 'success', msg: 'Visit submitted' })
      setTimeout(() => setToast(null), 1500)
    } catch (err) {
      console.error(err)
      setToast({ type: 'error', msg: String(err.message || err) })
      setTimeout(() => setToast(null), 2500)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
          <div className="text-lg font-semibold">🩺 Patient Visit Assistant</div>
          <div className="text-sm text-gray-500">v1.0</div>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className="fixed inset-x-0 top-14 z-20">
          <div className="mx-auto max-w-3xl px-4">
            <div
              className={`rounded-lg px-4 py-2 shadow-md text-sm text-white ${
                toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
              }`}
            >
              {toast.msg}
            </div>
          </div>
        </div>
      )}

      {/* Page content */}
      <main className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        <h1 className="sr-only">Patient Visit Assistant</h1>

        <VisitForm onSubmit={handleVisitSubmit} />
        <VisitList visits={visits} />
      </main>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
