// import React from 'react'
// import ImageClipBox from './ImageClipBox'
// import Button from './Button'

// function Contact({onNavigate}) {
//   return (
//     <div 
//       id='contact'
//       className='my-20 min-h-96 w-screen px-10'
//     >
//         <div className='relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden'>
//              <div className='absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96'>
//                 <ImageClipBox
//                    clipClass="contact-clip-path-1"
//                    src="img/contact-1.jpg"
//                    alt="image"
//                 />   
//                 <ImageClipBox
//                    clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
//                    src="img/contact-2.jpg"
//                    alt="image2"
//                 />   
//              </div>

//              <div className='absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80'>
//                 <ImageClipBox
//                    clipClass="absolute md:scale-125 "
//                    src="img/swordman-partial.jpg"
//                    alt="image3"
//                 /> 
//                 <ImageClipBox
//                    clipClass="sword-man-clip-path md:scale-125"
//                    src="img/swordman.jpg"
//                    alt="image4"
//                 />                 
//              </div>

//              <div className='flex flex-col items-center text-center'>
//                  <p className='font-general text-[10px] uppercase'>
//                     Contact Us
//                  </p> 
//                  <p className='special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem] '>
//                     Let's c<b>a</b>ter for <br/> your h<b>a</b>ir and <br/> fashi<b>o</b>n needs
//                  </p>
//                  <Button
//                    title="contact us"
//                    containerClass="mt-10 cursor-pointer" 
//                    onClick={()=>onNavigate("/contact")}                  
//                  />
//              </div>
//         </div>
//     </div>
//   )
// }

// export default Contact


import React from 'react';
import ImageClipBox from './ImageClipBox';
import Button from './Button';

function Contact({ onNavigate }) {
  return (
    <div 
      id="contact" 
      className="my-20 min-h-96 w-screen px-10"
    >
      <div 
        className="relative rounded-lg py-24 text-blue-50 sm:overflow-hidden"
        style={{
          backgroundImage: "url('/img/swordman.jpg')", // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for text visibility */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Image elements */}
        {/* <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            clipClass="contact-clip-path-1"
            src="img/contact-1.jpg"
            alt="image"
          />
          <ImageClipBox
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            src="img/contact-2.jpg"
            alt="image2"
          />
        </div> */}

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            clipClass="absolute md:scale-125"
            src="img/swordman-partial.jpg"
            alt="image3"
          />
          <ImageClipBox
            clipClass="sword-man-clip-path md:scale-125"
            src="img/swordman.jpg"
            alt="image4"
          />
        </div>

        {/* Text and Button */}
        <div className="relative flex flex-col items-center text-center">
          <p className="font-general text-[10px] uppercase">
            Contact Us
          </p>
          <p className="special-font mt-10 w-full font-zentry text-5xl leading-[0.9] md:text-[6rem]">
            Let's c<b>a</b>ter for <br /> your h<b>a</b>ir and <br /> fashi<b>o</b>n needs
          </p>
          <Button
            title="contact us"
            containerClass="mt-10 cursor-pointer bg-[#f3b4d4] hover:bg-[#fd3da1] hover:text-blue-50"
            onClick={() => onNavigate('/contact')}
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
