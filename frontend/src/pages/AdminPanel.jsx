import React, { useState, useEffect } from 'react'
import api from '../services/api'

export default function AdminPanel() {
  const [tab, setTab] = useState('dashboard')
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [contacts, setContacts] = useState([])
  const [subscribers, setSubscribers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [authRequired, setAuthRequired] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projRes, clientRes, contRes, subRes] = await Promise.all([
        api.get('/projects/'),
        api.get('/clients/'),
        api.get('/contacts/').catch(() => ({ data: [] })),
        api.get('/subscribers/').catch(() => ({ data: [] })),
      ])

      const projects = Array.isArray(projRes.data) ? projRes.data : (projRes.data.results || projRes.data.value || [])
      const clients = Array.isArray(clientRes.data) ? clientRes.data : (clientRes.data.results || clientRes.data.value || [])
      const contacts = Array.isArray(contRes.data) ? contRes.data : (contRes.data.results || contRes.data.value || [])
      const subscribers = Array.isArray(subRes.data) ? subRes.data : (subRes.data.results || subRes.data.value || [])

      setProjects(projects)
      setClients(clients)
      setContacts(contacts)
      setSubscribers(subscribers)

      // Check if we're authenticated by testing a protected endpoint
      if (contacts.length === 0 && contRes.status === 403) {
        setAuthRequired(true)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8">Loading admin panel...</div>

  if (authRequired) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-4">Admin Authentication Required</h1>
          <p className="mb-4 text-gray-700">Please log in to Django admin first:</p>
          <a href="http://localhost:8000/admin/" target="_blank" rel="noreferrer" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go to Django Admin
          </a>
          <p className="mt-4 text-sm text-gray-500">After logging in, return here to view admin panel.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex gap-2 flex-wrap">
          {['dashboard', 'projects', 'clients', 'contacts', 'subscribers'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded font-medium transition ${
                tab === t ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard */}
        {tab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-green-600">{clients.length}</div>
              <div className="text-gray-600">Clients</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-purple-600">{contacts.length}</div>
              <div className="text-gray-600">Contact Forms</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl font-bold text-orange-600">{subscribers.length}</div>
              <div className="text-gray-600">Newsletter Subs</div>
            </div>
          </div>
        )}

        {/* Projects Table */}
        {tab === 'projects' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Featured</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{p.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{p.description}</td>
                    <td className="px-6 py-4 text-sm">{p.featured ? '✓' : '−'}</td>
                    <td className="px-6 py-4 text-sm">
                      <a href={`http://localhost:8000/admin/core/project/${p.id}/change/`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Clients Table */}
        {tab === 'clients' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Position</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{c.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.company || '−'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.position || '−'}</td>
                    <td className="px-6 py-4 text-sm">
                      <a href={`http://localhost:8000/admin/core/client/${c.id}/change/`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Contacts Table */}
        {tab === 'contacts' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Message</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? contacts.map((c) => (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{c.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{c.message}</td>
                    <td className="px-6 py-4 text-sm">{new Date(c.created_at).toLocaleDateString()}</td>
                  </tr>
                )) : <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No contact submissions yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* Subscribers Table */}
        {tab === 'subscribers' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.length > 0 ? subscribers.map((s) => (
                  <tr key={s.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{s.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{s.name || '−'}</td>
                    <td className="px-6 py-4 text-sm">{new Date(s.subscribed_at).toLocaleDateString()}</td>
                  </tr>
                )) : <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No subscribers yet</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
