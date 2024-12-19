// import React, { useRef } from 'react'
// import gsap from 'gsap';
// import Animated from './Animated';
// import RoundedCorners from './RoundedCorners';
// import Button from './Button';


// function Story() {

//     const frameRef = useRef(null);
//     // const [frameStyle, setFrameStyle] = useState({});



//     const handleMouseLeave = ()=>{
//         const element = frameRef.current;


//         gsap.to(element, {
//             rotationX: 0,
//             rotationY: 0,
//             ease: 'power1.inOut',
//             duration: 0.3
//         })

//     }



//     const handleMouseMove = (e)=>{
//         const {clientX, clientY} = e;
//         const element = frameRef.current;

//         if(!element) return;

//         const rect = element.getBoundingClientRect();
//         const x = clientX - rect.left;
//         const y = clientY - rect.top;

//         const centerX = rect.width / 2;
//         const centerY = rect.height / 2;

//         const rotateX = ((y - centerY) / centerY) * -10;
//         const rotateY = ((x - centerX) / centerX) * 10;


//         gsap.to(element, {
//             rotationX: rotateX,
//             rotationY: rotateY,
//             transformPerspective: 500,
//             ease: 'power1.inOut',
//             duration: 0.3
//         })


//     }





//   return (
//     <section 
//        id='story'
//        className='min-h-dvh w-screen bg-black text-blue-50'
//     >
//       <div className='flex size-full flex-col items-center py-10 pb-24'>
//           <p className="font-general text-sm uppercase md:text-[10px]">
//             In the heart of Elysian Dynasty.
//           </p>

//           <div className='relative size-full'>
//               <Animated
//                   title="The w<b>o</b>rld of <br/> be<b>a</b>uty and perfecti<b>o</b>n"
//                   sectionId="#story"
//                   containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
//               />

//               <div className="story-img-container">
//                   <div className="story-img-mask">
//                      <div className="story-img-content">
//                         <img 
//                            ref={frameRef}
//                            onMouseLeave={handleMouseLeave}
//                            onMouseUp={handleMouseLeave}
//                            onMouseEnter={handleMouseLeave}
//                            onMouseMove={handleMouseMove}
//                            src="/img/entrance.webp" 
//                            alt="entrance"
//                            className='object-contain'
//                         />
//                      </div>
//                   </div>
//                   <RoundedCorners/>
//               </div>
//           </div>

//           <div className='-mt-32 lg:-mt-64 flex w-full justify-center md:-mt-24 md:me-44 md:justify-end'>
//              <div className='flex h-full w-fit flex-col items-center md:items-start'>
//                  <p className='mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start md:mt-7'>
//                     At ABG Beauty Lounge Our mission is to create a thriving, inclusive, and environmentally responsible business environment that fosters innovation, growth, and sustainability.
//                  </p>
//                  <Button
//                    id='realm-button'
//                    title="Welcome Guest"
//                    containerClass="mt-5"
//                  />
//              </div>
//           </div>
//       </div>       
//     </section>
//   )
// }

// export default Story


import React, { useRef } from 'react'
import gsap from 'gsap';
import Animated from './Animated';
import RoundedCorners from './RoundedCorners';
import Button from './Button';

function Story({onNavigate}) {
    const frameRef = useRef(null);

    const handleMouseLeave = ()=>{
        const element = frameRef.current;
        gsap.to(element, {
            rotationX: 0,
            rotationY: 0,
            ease: 'power1.inOut',
            duration: 0.3
        })
    }

    const handleMouseMove = (e)=>{
        const {clientX, clientY} = e;
        const element = frameRef.current;

        if(!element) return;

        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformPerspective: 500,
            ease: 'power1.inOut',
            duration: 0.3
        })
    }

    return (
        <section 
           id='story'
           className='min-h-dvh w-screen bg-black text-blue-50 p-4' // Added padding to ensure visibility
        >
            {/* Debug text to check if component is rendering
            <div className='text-white'>Debug: Story Component Rendered</div> */}

            <div className='flex flex-col items-center py-10 pb-24'>
                <p className="font-general text-sm text-white uppercase md:text-[10px]">
                Step into ABG Beauty Lounge—where beauty begins, confidence grows, and style is always in season.
                </p>

                <div className='relative w-full'>
                    <Animated
                        title="The w<b>o</b>rld of <br/> be<b>a</b>uty and perfecti<b>o</b>n"
                        sectionId="#story"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />

                    <div className="story-img-container">
                        <div className="story-img-mask">
                           <div className="story-img-content">
                              <img 
                                 ref={frameRef}
                                 onMouseLeave={handleMouseLeave}
                                 onMouseUp={handleMouseLeave}
                                 onMouseEnter={handleMouseLeave}
                                 onMouseMove={handleMouseMove}
                                 src="/img/entrance.jpg" 
                                 alt="entrance"
                                 className='object-contain w-full' // Added w-full to ensure image visibility
                              />
                           </div>
                        </div>
                        <RoundedCorners/>
                    </div>
                </div>

                <div className='-mt-32 lg:-mt-64 flex w-full justify-center md:-mt-24 md:me-44 md:justify-end'>
                   <div className='flex h-full w-fit flex-col items-center md:items-start'>
                       <p className='mt-3 max-w-sm text-center text-white font-circular-web md:text-start md:mt-7'>
                       At ABG Beauty Lounge, we are dedicated to creating a sanctuary where every client feels empowered, pampered, and stylish. Whether it's redefining your look, rejuvenating your spirit, or enhancing your wardrobe, ABG is here to make you shine inside and out.
                       </p>
                       <Button
                         id='realm-button'
                         title="Welcome Guest"
                         containerClass="mt-5 cursor-pointer bg-[#f3b4d4] hover:bg-[#fd3da1] hover:text-blue-50"
                         onClick={()=>onNavigate("/salonpage")}
                       />
                   </div>
                </div>
            </div>       
        </section>
    )
}

export default Story