import { useState } from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import MeditationBackground from './components/MeditationBackground'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <MeditationBackground />
      <Footer />
    </>
  )
}

export default App

