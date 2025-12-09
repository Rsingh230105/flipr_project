import React from 'react'

export default function ProjectCard({ project }) {
  const imgSrc = project.thumbnail || project.cover_image || ''
  return (
    <article className="bg-white rounded-lg overflow-hidden shadow">
      {imgSrc ? (
        <img loading="lazy" src={imgSrc} alt={project.title} className="w-full h-48 md:h-56 object-cover" />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">No image</div>
      )}
        <div className="p-4">
        <h3 className="font-semibold">{project.title}</h3>
        <p className="text-sm mt-2 line-clamp-3">{project.description}</p>
        <div className="mt-3">
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noreferrer" className="inline-block px-3 py-2 bg-indigo-50 text-indigo-700 rounded hover:bg-indigo-100 transition">
              View live
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
