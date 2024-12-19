import React from 'react'
import AnimationHero from './AnimationHero'
import AnimationNavbar from './AnimationNavbar'
import AnimationAbout from './AnimationAbout'
import AnimationFeatures from './AnimationFeatures'
import Story from './Story'
import Contact from './Contact'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'

function Animation() {

    const navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path)
      }

  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
        <AnimationNavbar onNavigate={handleNavigation}/>
        <AnimationHero onNavigate={handleNavigation}/>
        <AnimationAbout/>
        <AnimationFeatures/>
        <Story onNavigate={handleNavigation}/>
        <Contact onNavigate={handleNavigation}/>
        <Footer/>
    </main>
  )
}

export default Animation