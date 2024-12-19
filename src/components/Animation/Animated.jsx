import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';



function Animated({
    title,
    containerClass
}) {

    const containerRef = useRef(null);

    useEffect(()=>{
      const contx = gsap.context(()=>{
        const titleAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: '100 bottom',
                end: 'center bottom',
                toggleActions: 'play none none reverse'
            }
        });
        titleAnimation.to('.animated-word', {
            opacity: 1,
            transform: 'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)',
            ease: 'power2.inOut',
            stagger: 0.02,
        })
      }, containerRef)

      return ()=> contx.revert()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])



  return (
    <div 
    ref={containerRef}
      className={`animated-tile ${containerClass}`}>
        {title.split("<br/>").map((line, index)=>(
              <div 
                 key={index}
                 className='flex-center max-w-full flex-wrap gap-2 text-3xl px-10 md:gap-3' 
               >
                  {line.split(' ').map((word, i) =>(
                     <span key={i} className='animated-word' dangerouslySetInnerHTML={{__html: word}}/>
                       
                  ))}
              </div>
        ))}
    </div>
  )
}

export default Animated