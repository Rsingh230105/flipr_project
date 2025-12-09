import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function ClientsCarousel() {
  const [clients, setClients] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    api.get('/clients/')
      .then((res) => setClients(res.data))
      .catch((err) => setError(api.handleError(err)))
  }, [])

  if (error) return <div className="text-red-600">Failed to load clients</div>
  if (!clients.length) return <div className="text-gray-500">No clients yet</div>

  return (
    <div id="clients" className="flex overflow-x-auto gap-6 py-4">
      {clients.map((c) => (
        <div key={c.id} className="min-w-[180px] bg-white p-4 rounded shadow flex-shrink-0">
          {c.logo ? <img src={c.logo} alt={c.name} className="h-12 object-contain mb-2" /> : null}
          <div className="font-semibold text-sm">{c.name}</div>
          {c.company && <div className="text-xs text-gray-500">{c.company}</div>}
        </div>
      ))}
    </div>
  )
}
