import React from 'react';
// import Button from './Button';
import Video from '../assets/videos/travel2.mp4';
import Title from '../components/Title';

function SalonHeroPage() {
  return (
    <div className="relative bg-black text-white flex justify-center items-center h-screen px-4 rounded-lg">
      <Title text1={'Trust Us'} text2={'With Your Beauty'} />
      
      {/* Background video */}
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full overflow-hidden">
        <video className="w-full h-full object-cover" src={Video} type="video/mp4" autoPlay loop muted playsInline />
      </div>

      {/* Overlay with gradient effect */}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-black opacity-60 z-2"></div>

      {/* Content Section */}
      <div className="relative z-10 h-full max-h-full w-full flex justify-start items-start text-left px-4 md:px-8 lg:px-16 pt-16">
        <div className="flex flex-col justify-start items-start text-left max-w-xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-wide mb-4">
            Indulge in elegance and redefine your beauty at ABG Beauty Lounge where luxury meets style!
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-normal mb-6">
            We Will Exceed Your Expectations
          </p>
          <button className="bg-tomato text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out">
            Explore Collections
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalonHeroPage;
