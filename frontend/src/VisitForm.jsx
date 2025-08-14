import React, { useState } from 'react'

const VisitForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    patientName: '',
    visitDate: '',
    doctorName: '',
    visitSummary: '',
    diagnosis: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(form)
    setForm({ patientName: '', visitDate: '', doctorName: '', visitSummary: '', diagnosis: '' })
  }

  const inputCls =
    'w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-2xl p-5 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Patient Name</span>
          <input
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="e.g., Alex Smith"
            required
            className={inputCls}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Doctor Name</span>
          <input
            name="doctorName"
            value={form.doctorName}
            onChange={handleChange}
            placeholder="e.g., Dr. Grey"
            required
            className={inputCls}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Visit Date</span>
          <input
            type="date"
            name="visitDate"
            value={form.visitDate}
            onChange={handleChange}
            required
            className={inputCls}
          />
        </label>

        <label className="space-y-1">
          <span className="text-sm font-medium text-gray-700">Diagnosis</span>
          <input
            name="diagnosis"
            value={form.diagnosis}
            onChange={handleChange}
            placeholder="e.g., Common cold"
            required
            className={inputCls}
          />
        </label>
      </div>

      <label className="space-y-1 block">
        <span className="text-sm font-medium text-gray-700">Visit Summary</span>
        <textarea
          name="visitSummary"
          value={form.visitSummary}
          onChange={handleChange}
          placeholder="Chief complaint, key findings, plan…"
          rows={4}
          required
          className={`${inputCls} resize-y`}
        />
        <span className="text-xs text-gray-500">Keep it concise but informative.</span>
      </label>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 text-white px-4 py-2 font-medium shadow-sm hover:shadow transition hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
        >
          <span>Submit Visit</span>
          <span aria-hidden>↩︎</span>
        </button>
      </div>
    </form>
  )
}

export default VisitForm
