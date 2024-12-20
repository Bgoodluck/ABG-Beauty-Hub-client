import React, { useContext, useState, useRef, useEffect } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { FaMusic, FaVolumeMute } from 'react-icons/fa'
import { HiX } from 'react-icons/hi'

function Navbar() {
    const [visible, setVisible] = useState(false);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const location = useLocation();

    const audioElementRef = useRef(null);
    const menuRef = useRef(null);

    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = ()=>{       
        localStorage.removeItem('token')
        setToken('');
        setCartItems({})   
        navigate('/login')     
    }




    const handleProfileClick = (action) => {
        if (!token) {
            navigate('/login');
            return;
        }
        
        switch(action) {
            case 'profile':
                navigate('/profile'); // Add this route to your router
                break;
            case 'bookings':
                navigate('/appointments');
                break;
            case 'orders':
                navigate('/orders');
                break;
            case 'logout':
                logout();
                break;
            default:
                break;
        }
    };



    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev)
    }

    useEffect(() => {
       if (isAudioPlaying) {
        audioElementRef.current.play();        
       } else {
        audioElementRef.current.pause();
       }
    }, [isAudioPlaying])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && 
                !menuRef.current.contains(event.target) && 
                !event.target.closest('img[alt="menu"]')) {
                setVisible(false)
            }
        }

        if (visible) {
            document.addEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.body.style.overflow = 'unset'
        }
    }, [visible])



    const handleSearchClick = () => {
        if (location.pathname === '/' || location.pathname === '/salonpage') {
            navigate('/collection');
            setShowSearch(true);
        } else {
            setShowSearch(true);
        }
    };



    return (
    <div className='relative'>
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/intro'>
                <img src={assets.logo2} className='w-24 h-24 rounded-full' alt="logo" />
            </Link>

            {/* Desktop Navigation */}
            <ul className='hidden lg:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/intro' className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
                </NavLink>
                <NavLink to='/salonpage' className='flex flex-col items-center gap-1'>
                    <p>SALON</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
                </NavLink>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>STORES</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
                </NavLink>
                <NavLink to='/booking' className='flex flex-col items-center gap-1'>
                    <p>APPOINTMENT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-[#fd3da1] hidden' />
                </NavLink>
            </ul>

            {/* Right side icons */}
            <div className='flex items-center gap-6'>
                <div className='flex items-center space-x-2'>
                    <button 
                        className='flex items-center space-x-0.5'
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
                                className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
                                style={{
                                    animationDelay: `${bar * 0.1}s`                                      
                                }}
                            />                         
                        ))}  
                    </button>

                    <div 
                        className='flex items-center cursor-pointer text-xl'
                        onClick={() => setIsAudioPlaying((prev) => !prev)}
                    >
                        {isAudioPlaying ? <FaMusic className='text-[#fd3da1]'/> : <FaVolumeMute className='text-gray-500'/>}
                    </div>
                </div>

                <img 
                    onClick={handleSearchClick}  
                    src={assets.search_icon} 
                    className='w-5 cursor-pointer' 
                    alt="search" 
                />

                <div className='group relative'>
                    <img 
                        onClick={()=> token ? null : navigate('/login')} 
                        src={assets.profile_icon} 
                        className='w-5 cursor-pointer' 
                        alt="profile" 
                    />
                    {token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-20'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p 
                                onClick={() => handleProfileClick('profile')} 
                                className='cursor-pointer hover:text-[#fd3da1]'
                            >
                                My Profile
                            </p>
                            <p 
                                onClick={() => handleProfileClick('bookings')} 
                                className='cursor-pointer hover:text-[#fd3da1]'
                            >
                                My Bookings
                            </p>
                            <p 
                                onClick={() => handleProfileClick('orders')} 
                                className='cursor-pointer hover:text-[#fd3da1]'
                            >
                                Orders
                            </p>
                            <p 
                                onClick={() => handleProfileClick('logout')} 
                                className='cursor-pointer hover:text-[#fd3da1]'
                            >
                                Logout
                            </p>
                        </div>
                    </div>
                }
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </Link>

                <img 
                    onClick={()=> setVisible(true)} 
                    src={assets.menu_icon} 
                    className='w-5 cursor-pointer lg:hidden' 
                    alt="menu" 
                />
            </div>
        </div>

        {/* Mobile Menu (shows only on mobile) */}
        <div 
            className={`fixed top-0 right-0 bottom-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
                visible ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
            <div className='flex flex-col text-gray-600'>
                <div className='flex items-center justify-between p-4 border-b'>
                    <p className='font-semibold'>Menu</p>
                    <button 
                        onClick={() => setVisible(false)} 
                        className='text-2xl text-gray-500 hover:text-gray-700'
                    >
                        <HiX />
                    </button>
                </div>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className='py-3 px-6 border-b hover:bg-gray-50 hover:text-[#fd3da1]' 
                    to='/intro'
                >
                    HOME
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className='py-3 px-6 border-b hover:bg-gray-50 hover:text-[#fd3da1]' 
                    to='/salonpage'
                >
                    SALON
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className='py-3 px-6 border-b hover:bg-gray-50 hover:text-[#fd3da1]' 
                    to='/'
                >
                    STORES
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className='py-3 px-6 border-b hover:bg-gray-50 hover:text-[#fd3da1]' 
                    to='/booking'
                >
                    APPOINTMENT
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className='py-3 px-6 border-b hover:bg-gray-50 hover:text-[#fd3da1]' 
                    to='/collection'
                >
                    COLLECTION
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className='py-3 px-6 border-b hover:bg-gray-50 hover:text-[#fd3da1]' 
                    to='/about'
                >
                    ABOUT
                </NavLink>
                <NavLink 
                    onClick={() => setVisible(false)} 
                    className='py-3 px-6 border-b hover:bg-gray-50 hover:text-[#fd3da1]' 
                    to='/contact'
                >
                    CONTACT
                </NavLink>
            </div>
        </div>

        {/* Tablet Menu (horizontal dropdown) */}
        <div 
            ref={menuRef}
            className={`fixed left-0 right-0 bg-white/90 backdrop-blur-sm shadow-lg transform transition-all duration-300 ease-in-out z-50 hidden md:block lg:hidden ${
                visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
            }`}
            style={{
                top: '0',
                transformOrigin: 'top'
            }}
        >
            <div className='container mx-auto px-4 py-6'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-lg font-semibold text-gray-800'>Navigation</h2>
                    <button 
                        onClick={() => setVisible(false)}
                        className='text-2xl text-gray-500 hover:text-gray-700'
                    >
                        <HiX />
                    </button>
                </div>
                <div className='flex flex-wrap gap-8 justify-center'>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        to='/intro'
                        className='text-[#fd3da1] hover:text-[#ff69b4] transition-colors font-medium'
                    >
                        HOME
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        to='/salonpage'
                        className='text-[#fd3da1] hover:text-[#ff69b4] transition-colors font-medium'
                    >
                        SALON
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        to='/'
                        className='text-[#fd3da1] hover:text-[#ff69b4] transition-colors font-medium'
                    >
                        STORES
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        to='/booking'
                        className='text-[#fd3da1] hover:text-[#ff69b4] transition-colors font-medium'
                    >
                        APPOINTMENT
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        to='/collection'
                        className='text-[#fd3da1] hover:text-[#ff69b4] transition-colors font-medium'
                    >
                        COLLECTION
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        to='/about'
                        className='text-[#fd3da1] hover:text-[#ff69b4] transition-colors font-medium'
                    >
                        ABOUT
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        to='/contact'
                        className='text-[#fd3da1] hover:text-[#ff69b4] transition-colors font-medium'
                    >
                        CONTACT
                    </NavLink>
                </div>
            </div>
        </div>

        {/* Overlay */}
        {visible && (
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40" 
                onClick={() => setVisible(false)} 
            />
        )}
    </div>
    )
}

export default Navbar