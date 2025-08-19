import React, { useState } from 'react'
import * as amplitude from '@amplitude/analytics-browser'



const VisitList = ({ visits }) => {
  const [generatingId, setGeneratingId] = useState(null)
  const [recommendations, setRecommendations] = useState({})

  const generateForVisit = async (visit) => {
    const visitId = visit.id || visit._id
    setGeneratingId(visitId)
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/visits/${visitId}/recommendations`, {
        method: 'POST',
      })

      const data = await res.json()
      setRecommendations((prev) => ({ ...prev, [visitId]: data.recommendations }))
    } catch (error) {
      console.error('LLM Error:', error)
      alert('Failed to get recommendations.')
    } finally {
      setGeneratingId(null)
    }

    amplitude.track('reccomendation_generated', {doctorName: visit.doctorName})
  }


  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Previous Visits</h2>
      {visits.length === 0 ? (
        <p className="text-gray-600">No visits yet.</p>
      ) : (
        <div className="space-y-4">
          {visits.map((visit) => {
            const key = visit.id || visit._id
            return (
              <div
                key={key}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 transition hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold">{visit.patientName}</div>
                    <div className="text-sm text-gray-600">
                      <span className="inline-flex items-center gap-1">
                        <span aria-hidden>👩‍⚕️</span>
                        {visit.doctorName}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="inline-flex items-center gap-1">
                        <span aria-hidden>📅</span>
                        {visit.visitDate}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => generateForVisit(visit)}
                    disabled={generatingId === key}
                    className={`inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-3 py-1.5 text-sm font-medium hover:bg-emerald-700 disabled:opacity-60 ${
                      generatingId === key ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <span aria-hidden>🧠</span>
                    {generatingId === key ? 'Generating…' : 'Magic Recommendations'}
                  </button>
                </div>

                <div className="my-4 h-px bg-gray-100" />

                <p className="text-gray-800">{visit.visitSummary}</p>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Diagnosis:</span> {visit.diagnosis}
                </p>

                {recommendations[key] && (
                  <div className="mt-4 rounded-xl bg-gray-50 border border-gray-200 p-4">
                    <div className="font-semibold mb-1 flex items-center gap-2">
                      <span aria-hidden></span>AI Recommendations
                    </div>
                    <pre className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">
                      {recommendations[key]}
                    </pre>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default VisitList
