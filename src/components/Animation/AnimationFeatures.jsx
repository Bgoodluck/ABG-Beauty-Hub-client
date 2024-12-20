import React, { useEffect } from 'react'
import BentoCard from './BentoCard'
import { TiLocationArrow } from 'react-icons/ti'
import BentoTilt from './BentoTilt'

function AnimationFeatures() {





  useEffect(() => {
    const handleVideoPlayback = () => {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            video.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        });
    };

    handleVideoPlayback();
    document.addEventListener('touchstart', handleVideoPlayback, { once: true });

    return () => {
        document.removeEventListener('touchstart', handleVideoPlayback);
    };
}, [])



  return (
    <section className='bg-black pb-52'>
         <div className='container mx-auto px-3 md:px-10'>
             <div className='px-5 py-32'>
                <p className='font-circular-web text-lg text-blue-50'>
                ABG Beauty Lounge - Where Style Meets Sophistication
                </p>
                <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>               

ABG Beauty Lounge is your ultimate destination for elegance, self-care, and fashion. Combining a luxurious hair salon, a premium nail studio, and a chic boutique, ABG offers a seamless blend of beauty and style services under one roof.
                </p>
             </div> 
             <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                  <BentoCard
                    src="videos/feature-1.mp4"
                    title={<>h<b>a</b>ir s<b>a</b>lon</>}
                    description="From trendy cuts to vibrant color transformations and nourishing treatments, our expert stylists craft looks that make a statement."
                    playsInline
                    controls={false}
                  />
             </BentoTilt>

             <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
                 <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                     <BentoCard
                       src="videos/feature-2.mp4"
                       title={<>b<b>o</b>uti<b>q</b>ue</>}
                       description="Discover a curated collection of unisex clothing, beauty products, and accessories designed to reflect your unique style"
                       playsInline
                       controls={false}
                     /> 
                 </BentoTilt>
                 <BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                     <BentoCard
                        src="videos/feature-3.mp4"
                        title={<>n<b>a</b>il studi<b>o</b></>}
                        description="Indulge in perfect manicures, artistic nail designs, and relaxing pedicures, all tailored to elevate your confidence."
                        playsInline
                        controls={false}
                     /> 
                 </BentoTilt>
                 <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
                     <BentoCard
                        src="videos/feature-4.mp4"
                        title={<>bea<b>u</b>ty pr<b>o</b>ducts</>}
                        description="Whether it's redefining your look, rejuvenating your spirit and skin, or enhancing your appearance, ABG is here to make you shine inside and out.."  
                        playsInline
                        controls={false}                    
                     /> 
                 </BentoTilt>

                 <BentoTilt className='bento-tilt_2'>
                      <div className='flex size-full flex-col justify-between bg-[#e9b0cd] p-5'>
                          <h1 className='bento-title special-font max-w-64 text-black'>
                            <b>O</b>ur l<b>a</b>test c<b>o</b>llecti<b>o</b>ns
                          </h1>
                          <TiLocationArrow
                              className='m-5 scale-[5] self-end'
                          />
                      </div>
                 </BentoTilt>

                 <BentoTilt className='bento-tilt_2'>
                      <video
                         src='videos/feature-5.mp4'
                         loop
                         muted
                         autoPlay
                         className='size-full object-cover object-center' 
                         playsInline
                         controls={false}
                      />
                 </BentoTilt>
             </div>
         </div>
    </section>
  )
}

export default AnimationFeatures