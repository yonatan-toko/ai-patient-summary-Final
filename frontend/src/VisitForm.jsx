import React, { useState } from 'react'

const VisitForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    patientName: '',
    visitDate: '',
    doctorName: '',
    visitSummary: '',
    diagnosis: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
    setForm({
      patientName: '',
      visitDate: '',
      doctorName: '',
      visitSummary: '',
      diagnosis: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
      <input type='text' name="patientName" value={form.patientName} onChange={handleChange} placeholder="Patient Name" required />
      <input type='date' name="visitDate" value={form.visitDate} onChange={handleChange} placeholder="Visit Date (DD-MM-YYYY)" required />
      <input type='text' name="doctorName" value={form.doctorName} onChange={handleChange} placeholder="Doctor Name" required />
      <textarea name="visitSummary" value={form.visitSummary} onChange={handleChange} placeholder="Visit Summary" rows="3" required />
      <input type='text' name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Diagnosis" required />
      <button type="submit" style={{ background: '#007bff', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Submit Visit</button>
    </form>
  )
}

export default VisitForm
