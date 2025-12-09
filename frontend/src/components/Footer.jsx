import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">© {new Date().getFullYear()} Flipr Studio. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white px-3 py-2">Privacy</a>
            <a href="#" className="hover:text-white px-3 py-2">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
