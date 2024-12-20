import React, { useEffect, useState, useCallback } from 'react'
import image1 from "../assets/salonBanner1.png"
import image2 from "../assets/salonBanner2.png"
import image3 from "../assets/salonBeauyface1.jpg"
import image4 from "../assets/salonbeautyface2.jpg"
import image5 from "../assets/shop1.png"
import image1Mobile from "../assets/shop2.png"
import image2Mobile from "../assets/shop3.png"
import image3Mobile from "../assets/shop4.png"
import image4Mobile from "../assets/shop5.png"
import image5Mobile from "../assets/shop6.png"
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

function SalonBanner() {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1, image2, image3, image4, image5
    ]

    const mobileImages = [
        image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile
    ]

    const handleLeftClick = useCallback(() => {
        setCurrentImage(prev => 
            prev === 0 ? desktopImages.length - 1 : prev - 1
        )
    }, [desktopImages.length])

    const handleRightClick = useCallback(() => {
        setCurrentImage(prev => 
            prev === desktopImages.length - 1 ? 0 : prev + 1
        )
    }, [desktopImages.length])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => 
                prev === desktopImages.length - 1 ? 0 : prev + 1
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [desktopImages.length])
    
    return (
        <div className='container mx-auto px-4 rounded'>
            <div className='h-80 sm:h-96 md:h-[400px] lg:h-[500px] w-full bg-gradient-to-r from-violet-100 to-pink-100 relative overflow-hidden'>
                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full text-2xl'>
                        <button 
                            className='bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition-colors' 
                            onClick={handleLeftClick}
                        >
                            <FaAngleLeft />
                        </button>
                        <button 
                            className='bg-white shadow-md rounded-full p-1 hover:bg-gray-100 transition-colors' 
                            onClick={handleRightClick}
                        >
                            <FaAngleRight />
                        </button>
                    </div>                
                </div>
                {/* Desktop Images */}
                <div className='hidden md:flex h-full w-full overflow-hidden z-10'>
                    {desktopImages.map((imageUrl, index) => (
                        <div 
                            key={index} 
                            className="absolute w-full h-full transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(${(index - currentImage) * 100}%)`,
                                opacity: Math.abs(index - currentImage) < 1 ? 1 : 0
                            }}
                        >
                            <img 
                                className='w-full h-full object-cover' 
                                src={imageUrl} 
                                alt={`banner-image-${index + 1}`} 
                            /> 
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 opacity-15"></div>            
                        </div>
                    ))}
                </div>
                {/* Mobile Images */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {mobileImages.map((imageUrl, index) => (
                        <div 
                            key={index} 
                            className="absolute w-full h-full transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(${(index - currentImage) * 100}%)`,
                                opacity: Math.abs(index - currentImage) < 1 ? 1 : 0
                            }}
                        >
                            <img 
                                className='w-full h-full object-cover' 
                                src={imageUrl} 
                                alt={`banner-image-${index + 1}`} 
                            /> 
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 opacity-15"></div>            
                        </div>
                    ))}
                </div>
            </div>        
        </div>
    )
}

export default SalonBanner