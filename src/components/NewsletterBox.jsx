import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { summaryApi } from '../common';
import video from '../assets/videos/newsletter.mp4'

function NewsletterBox() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()



  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
  
    try {
      const response = await fetch(summaryApi.newsletterSubcription.url, {
        method: summaryApi.newsletterSubcription.method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }
  
      setMessage(data.message);
      setEmail(''); // Clear input after successful subscription
    } catch (error) {
      setMessage(error.message || 'Subscription failed');
    } finally {
      setIsLoading(false);
    }
  }

  const handleUnsubscribe = () => {
    navigate('/unsubscribe')
  }
  return (
    <div className="relative h-72 flex flex-col justify-center items-center px-4">
      {/* Background video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
        <video
          className="w-full h-full object-cover"
          src={video}
          type="video/mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 text-center text-white w-full max-w-3xl">
        <p className="text-3xl sm:text-4xl font-bold mb-4">Subscribe now & get 20% off</p>
        <p className="text-sm sm:text-base text-gray-300 mb-6">
          This offer applies to men's, women's, and kid's collections, across multiple categories,
          including new arrivals, seasonal trends, and popular brands. Terms and conditions apply.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="w-full sm:w-3/4 flex flex-col sm:flex-row items-center gap-4 mx-auto mb-4"
        >
          <input
            className="w-full flex-1 outline-none px-4 py-3 bg-white text-black rounded-md"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white text-sm px-6 py-3 rounded-md hover:bg-[#fd3da1] transition duration-300"
          >
            {isLoading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
          </button>
        </form>
        <h3>
          Click to{' '}
          <span
            className="text-red-500 font-semibold cursor-pointer"
            onClick={handleUnsubscribe}
          >
            unsubscribe
          </span>
        </h3>
        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes('successfully') ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default NewsletterBox;
