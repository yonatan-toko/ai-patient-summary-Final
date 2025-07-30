import React from 'react'
import ReactDOM from 'react-dom/client'
import VisitForm from './VisitForm'
import VisitList from './VisitList'

const App = () => {
  const handleVisitSubmit = async (formData) => {
    const res = await fetch('http://127.0.0.1:8000/api/visits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
    })
    const data = await res.json()
    alert('Visit submitted successfully!')
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>Patient Visit Form</h1>
      <VisitForm onSubmit={handleVisitSubmit} />
      <VisitList />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
