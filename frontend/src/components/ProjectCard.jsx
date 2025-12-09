import React from 'react'

export default function ProjectCard({ project }) {
  const imgSrc = project.thumbnail || project.cover_image || ''
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow">
      {imgSrc ? (
        <img src={imgSrc} alt={project.title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">No image</div>
      )}
      <div className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="text-sm mt-2 line-clamp-3">{project.description}</p>
        <div className="mt-3">
          {project.live_url && <a href={project.live_url} className="text-indigo-600 hover:underline">View live</a>}
        </div>
      </div>
    </article>
  )
}
