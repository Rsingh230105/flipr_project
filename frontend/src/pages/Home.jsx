import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ProjectsGrid from '../components/ProjectsGrid'
import ClientsCarousel from '../components/ClientsCarousel'
import ContactForm from '../components/ContactForm'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Our Projects</h2>
          <ProjectsGrid />
        </section>

        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">Happy Clients</h2>
            <ClientsCarousel />
          </div>
        </section>

        <section className="py-12 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ContactForm />
            <Newsletter />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
