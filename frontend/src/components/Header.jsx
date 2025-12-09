import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">Flipr Studio</Link>
        <div className="sm:hidden">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="px-4 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <nav className={`${open ? 'block' : 'hidden'} sm:flex items-center gap-3`}>
          <Link to="/" className="text-sm mr-2 hover:underline px-2 py-1 rounded">Home</Link>
          <a href="#projects" className="text-sm mr-2 hover:underline px-2 py-1 rounded">Projects</a>
          <a href="#clients" className="text-sm mr-2 hover:underline px-2 py-1 rounded">Clients</a>
          <Link to="/admin" className="text-sm px-3 py-2 bg-blue-600 text-white rounded">Admin</Link>
        </nav>
      </div>
    </header>
  )
}
