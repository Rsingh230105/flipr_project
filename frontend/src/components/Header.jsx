import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">Flipr Studio</Link>
        <nav>
          <Link to="/" className="text-sm mr-4 hover:underline">Home</Link>
          <a href="#projects" className="text-sm mr-4 hover:underline">Projects</a>
          <a href="#clients" className="text-sm mr-4 hover:underline">Clients</a>
          <Link to="/admin" className="text-sm px-3 py-1 bg-blue-600 text-white rounded">Admin</Link>
        </nav>
      </div>
    </header>
  )
}
