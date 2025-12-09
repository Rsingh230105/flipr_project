import React, { useEffect, useState } from 'react'
import api from '../services/api'
import ProjectCard from './ProjectCard'

export default function ProjectsGrid() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    api.get('/projects/')
      .then((res) => {
        if (mounted) {
          // Handle both direct array response and paginated response {results: [...]}
          const data = Array.isArray(res.data) ? res.data : (res.data.results || res.data.value || [])
          setProjects(data)
        }
      })
      .catch((err) => setError(api.handleError(err)))
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) {
    // show several skeleton cards for perceived performance on mobile
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1,2,3].map((i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-600">Failed to load projects</div>
  }

  return (
    <div id="projects" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
    </div>
  )
}
