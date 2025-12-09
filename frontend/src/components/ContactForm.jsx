import React, { useState } from 'react'
import api from '../services/api'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' })
  const [status, setStatus] = useState({ loading: false, success: null, error: null })

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ loading: true, success: null, error: null })
    try {
      await api.post('/contacts/', form)
      setStatus({ loading: false, success: 'Thank you — we will get back to you!', error: null })
      setForm({ name: '', email: '', mobile: '', message: '' })
    } catch (err) {
      const errData = api.handleError(err)
      setStatus({ loading: false, success: null, error: errData.detail || 'Submission failed' })
    }
  }

  return (
    <form id="contact" aria-label="Contact form" onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
      <label className="block mb-2">
        <span className="text-sm">Name</span>
        <input aria-label="Your name" name="name" value={form.name} onChange={handleChange} required className="mt-1 block w-full rounded border px-3 py-2" />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Email</span>
        <input aria-label="Your email" name="email" value={form.email} onChange={handleChange} type="email" required className="mt-1 block w-full rounded border px-3 py-2" />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Mobile (optional)</span>
        <input aria-label="Your mobile" name="mobile" value={form.mobile} onChange={handleChange} placeholder="+911234567890" className="mt-1 block w-full rounded border px-3 py-2" />
      </label>
      <label className="block mb-3">
        <span className="text-sm">Message</span>
        <textarea aria-label="Message" name="message" value={form.message} onChange={handleChange} required className="mt-1 block w-full rounded border px-3 py-2" rows="4" />
      </label>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={status.loading} className="px-4 py-2 bg-indigo-600 text-white rounded">
          {status.loading ? 'Sending...' : 'Send Message'}
        </button>
        {status.success && <div className="text-green-600">{status.success}</div>}
        {status.error && <div className="text-red-600">{status.error}</div>}
      </div>
    </form>
  )
}
