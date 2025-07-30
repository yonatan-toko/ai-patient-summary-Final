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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Patient Name" required />
      <input name="visitDate" value={form.visitDate} onChange={handleChange} placeholder="Visit Date" required />
      <input name="doctorName" value={form.doctorName} onChange={handleChange} placeholder="Doctor Name" required />
      <textarea name="visitSummary" value={form.visitSummary} onChange={handleChange} placeholder="Visit Summary" required />
      <input name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Diagnosis" required />
      <button type="submit">Submit Visit</button>
    </form>
  )
}

export default VisitForm
