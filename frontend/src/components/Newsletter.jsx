import React, { useState } from 'react'
import api from '../services/api'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg(null)
    try {
      await api.post('/subscribers/', { email })
      setMsg({ type: 'success', text: 'Subscribed! Check your inbox.' })
      setEmail('')
    } catch (err) {
      const errData = api.handleError(err)
      setMsg({ type: 'error', text: errData.detail || 'Failed to subscribe' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form aria-label="Newsletter form" onSubmit={handleSubscribe} className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
      <p className="text-sm mb-3">Join our newsletter for product updates.</p>
      <input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border px-3 py-2 mb-3"
        aria-label="Email for newsletter"
      />
      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
        {msg && <div className={msg.type === 'success' ? 'text-green-600' : 'text-red-600'}>{msg.text}</div>}
      </div>
    </form>
  )
}
