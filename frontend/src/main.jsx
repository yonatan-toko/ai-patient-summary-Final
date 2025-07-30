import React from 'react'
import ReactDOM from 'react-dom/client'
import VisitForm from './VisitForm'

const App = () => {
  const handleVisitSubmit = async (formData) => {
    console.log('Sending:', formData)
    const res = await fetch('http://127.0.0.1:8000/api/visits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
    })
    console.log('Response status:', res.status)
    const data = await res.json()
    console.log('Response data:', data)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Patient Visit Form</h1>
      <VisitForm onSubmit={handleVisitSubmit} />
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
