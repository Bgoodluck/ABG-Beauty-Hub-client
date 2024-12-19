import React, { useEffect, useRef, useState } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { FaMusic, FaVolumeMute } from 'react-icons/fa'
import { HiMenu, HiX } from 'react-icons/hi'
import { useWindowScroll } from 'react-use'
import gsap from 'gsap'
import { useNavigate } from 'react-router-dom'

const navItems = ['Salon', 'Stores', 'Appointment', 'About', 'Contact']
const links = [
    '/salonpage',
    '/collection',
    '/booking',
    '/about',
    '/contact'
]

function AnimationNavbar({ onNavigate }) {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [isIndicatorActive, setIsIndicatorActive] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const navContainerRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const audioElementRef = useRef(null)

    const navigate = useNavigate()

    const { y: currentScrollY } = useWindowScroll()

    useEffect(() => {
        if(currentScrollY === 0){
            setIsNavVisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')            
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')            
        }
        setLastScrollY(currentScrollY)
    },[currentScrollY, lastScrollY])

    useEffect(() => {
       gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2
       })
    },[isNavVisible])

    useEffect(() => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            })
            // Prevent body scrolling when menu is open
            document.body.style.overflow = 'hidden'
        } else {
            gsap.to(mobileMenuRef.current, {
                x: '100%',
                duration: 0.3,
                ease: 'power2.in'
            })
            // Restore body scrolling when menu is closed
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    // Handle clicks outside the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && 
                !mobileMenuRef.current.contains(event.target) && 
                !event.target.closest('button')) {
                setIsMobileMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev)
        setIsIndicatorActive((prev) => !prev)
    }

    const toggleMusicIcon = () => {
        setIsAudioPlaying((prev) => !prev)
    }

    const closeMenu = () => {
        setIsMobileMenuOpen(false)
    }

    useEffect(() => {
       if (isAudioPlaying) {
        audioElementRef.current.play()        
       } else {
        audioElementRef.current.pause()
       }
    }, [isAudioPlaying])

    const handleNavItemClick = (path) => {
        navigate(path)
        closeMenu()
    }

    return (
        <>
            <div 
                ref={navContainerRef}
                className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
            >
                <header className='absolute top-1/2 w-full -translate-y-1/2'>
                    <nav className='flex size-full items-center justify-between p-4'>
                        <div className='flex items-center gap-7'>
                            <img 
                                src="/img/logo2.png" 
                                alt="logo" 
                                className='w-10 h-10 rounded-full'
                            /> 

                            <Button
                                id="product-button"
                                title="Visit our stores"
                                rightIcon={<TiLocationArrow/>}
                                containerClass="bg-blue-50 lg:flex hidden items-center hover:bg-[#fd3da1] bg-[#f0a4cb] justify-center gap-1"
                                onClick={() => onNavigate('/collection')}
                            />                        
                        </div> 
                        <div className='flex h-full items-center'>
                            <div 
                                className='flex items-center mr-4 cursor-pointer text-xl'
                                onClick={toggleMusicIcon}
                            >
                                {isAudioPlaying ? <FaMusic className='text-[#fd3da1]'/> : <FaVolumeMute className='text-gray-500'/>}
                            </div>

                            <div className='hidden lg:block'>
                                {navItems.map((item, index) => (
                                    <a 
                                        key={index} 
                                        className='nav-hover-btn'
                                        onClick={() => onNavigate(links[index])}
                                    >
                                        {item}
                                    </a>
                                ))}   
                            </div> 

                            <button 
                                className='lg:hidden ml-4 text-2xl'
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <HiX /> : <HiMenu />}
                            </button>

                            <button 
                                className='ml-4 flex items-center space-x-0.5'
                                onClick={toggleAudioIndicator}
                            >
                                <audio 
                                    ref={audioElementRef}
                                    className='hidden'
                                    src="/audio/loop.mp3"
                                    loop
                                />
                                {[1, 2, 3, 4].map((bar, i) => (
                                    <div 
                                        key={i}
                                        className={`indicator-line ${isIndicatorActive ? 'active' : ''} pr-2`}
                                        style={{
                                            animationDelay: `${bar * 0.1}s`                                      
                                        }}
                                    />                         
                                ))}  
                            </button>
                        </div>
                    </nav>
                </header>  
            </div>

            {/* Overlay for mobile menu background */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile/Tablet Menu */}
            <div
                ref={mobileMenuRef}
                className='fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform translate-x-full transition-transform z-50 lg:hidden'
            >
                <button
                    className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
                    onClick={closeMenu}
                >
                    <HiX />
                </button>
                <div className='flex flex-col pt-20 px-4'>
                    {navItems.map((item, index) => (
                        <a
                            key={index}
                            className='py-3 text-gray-800 hover:text-[#fd3da1] transition-colors cursor-pointer'
                            onClick={() => handleNavItemClick(links[index])}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AnimationNavbar