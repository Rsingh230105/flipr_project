import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            We build thoughtful digital products
          </h1>
          <p className="mt-4 text-lg max-w-2xl opacity-90">
            Design-forward development for startups and enterprises. We ship fast and support long term growth.
          </p>
          <div className="mt-6 flex gap-4">
            <a href="#contact" className="px-5 py-3 bg-white text-indigo-700 rounded font-medium">Contact Us</a>
            <Link to="#projects" className="px-5 py-3 border border-white rounded font-medium">Our Work</Link>
          </div>
        </div>

        <div className="w-full md:w-96 bg-white text-gray-900 rounded-lg p-6 shadow-lg">
          <h3 className="font-semibold mb-2">Quick Contact</h3>
          <p className="text-sm mb-3">Drop a message and we'll reply within 48 hours.</p>
          <a href="#contact" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded">Send Message</a>
        </div>
      </div>
    </section>
  )
}
