import React, { useEffect, useState } from 'react'

const VisitList = () => {
  const [visits, setVisits] = useState([])
  const [generatingId, setGeneratingId] = useState(null)
  const [recommendations, setRecommendations] = useState({})

useEffect(() => {
  const fetchVisits = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/visits')
    const data = await res.json()
    setVisits(data)
  }

  fetchVisits()
}, [])

const generateForVisit = async (visit) => {
    const visitId = visit._id
  setGeneratingId(visitId)
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/visits/${visitId}/recommendations`, {
      method: 'POST'
    })
    const data = await res.json()
    setRecommendations(prev => ({ ...prev, [visitId]: data.recommendations }))
  } catch (error) {
    console.error('LLM Error:', error)
    alert('Failed to get recommendations.')
  } finally {
    setGeneratingId(null)
  }
}

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Previous Visits</h2>
      {visits.length === 0 ? (
        <p>No visits yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {visits.map((visit) => (
            <div key={visit._id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                <strong>{visit.patientName}</strong> – {visit.visitDate}<br />
                <em>{visit.doctorName}</em><br />
                <p>{visit.visitSummary}</p>
                <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                <button onClick={() => generateForVisit(visit)} disabled={generatingId === visit.id}>
                    {generatingId === visit.id ? 'Generating...' : '🧠 Magic Recommendations'}
                </button>

              {recommendations[visit._id] && (
                <div style={{ marginTop: '0.5rem', background: '#f3f3f3', padding: '0.5rem', borderRadius: '6px' }}>
                    <strong>AI Recommendations:</strong>
                    <p style={{ whiteSpace: 'pre-line' }}>{recommendations[visit._id]}</p>
                </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
  )
}

export default VisitList
