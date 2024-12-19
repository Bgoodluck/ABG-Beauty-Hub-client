import { useGSAP } from '@gsap/react'
import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Animated from './Animated'


function AnimationAbout() {

    gsap.registerPlugin(ScrollTrigger)


    useGSAP(()=>{
        const clipAnimation = gsap.timeline( {
            scrollTrigger: {
                trigger: '#clip',
                start: 'center center',
                end: '+=800 center',
                scrub: 0.5,
                pin: true,
                pinSpacing: true
            }
        })
        clipAnimation.to('.mask-clip-path',{
               width: '100vw',
               height: '100vh',
               borderRadius: 0
        })
    })


  return (
    <div id='about' className='min-h-screen w-screen'>
         <div className='relative mb-8 mt-36 flex flex-col items-center gap-5'>
             <h2 className='font-general text-sm uppercase md:text-[10px]'>
                Welcome to ABG Beauty Lounge
             </h2> 
             <Animated
              title="Gl<b>o</b>w and Fl<b>o</b>w <br/> Where Be<b>a</b>uty Grows, <br/>we are M<b>o</b>re Than Just Style, We Bring Smiles!"
              containerClass="mt-5 !text-black text-center"
             />

             <div className='about-subtext'>
                <p className='-mb-20'>
                   At ABG Beauty Lounge, we pride ourselves on delivering high-quality products and services with unmatched attention to detail with our team of skilled professionals.  
                </p> 
                
             </div>
         </div>
         <div className='h-dvh w-screen' id='clip'>
             <div className='mask-clip-path about-image'>
                  <img 
                    src="img/about.jpg" 
                    alt="Background" 
                    className='absolute left-0 top-0 size-full object-cover'
                    />
             </div>
         </div>
    </div>
  )
}

export default AnimationAbout