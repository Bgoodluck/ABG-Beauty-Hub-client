import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'


function About() {
  return (

    <div>
      <div className='text-2xl text-center pt-8 border-t'>
       <Title text1={'ABOUT'} text2={'US'}/>
    </div>
    <div className='my-10 flex flex-col md:flex-row gap-16'>
       <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" /> 
       <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Welcome to <span className='text-[#fd3da1]'>ABG</span> Shopping Stores – your ultimate destination for fashion-forward clothing for men, women, and kids!

            At <span className='text-[#fd3da1]'>ABG</span> Shopping Stores, we believe that style should be accessible to everyone. 
          </p>
          <p>
            At <span className='text-[#fd3da1]'>ABG</span> Shopping Stores, we are passionate about providing an exceptional shopping experience. Our user-friendly online platform makes it easy to browse our extensive collection and find exactly what you’re looking for. Plus, our dedicated customer service team is always here to assist you with any questions or concerns.

            Join us in redefining fashion and experience the joy of shopping at <span className='text-[#fd3da1]'>ABG</span> Shopping Stores. Discover your next favorite outfit today! <br />

            <span className='text-[#fd3da1]'>ABG</span> Shopping Stores – <span className='text-sm'>Where Style Meets Quality.</span>
          </p>
          <b className=' text-gray-800'>Our Mission</b>
          <p>
          At <span className='text-[#fd3da1]'>ABG</span> Shopping Stores, our mission is to provide a diverse and stylish selection of clothing for men, women, and children, making fashion accessible to all. We are committed to curating high-quality, trendy apparel and designer items at affordable prices, ensuring every customer finds pieces that reflect their unique style. Through exceptional customer service and a seamless shopping experience, we aim to inspire confidence and elevate fashion for families everywhere.
          </p>
       </div>
    </div>
    <div className=' text-xl py-4'>
        <Title text1={'WHY'} text2={'SHOP WITH US'}/>
    </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Quality Assurance:</b>
              <p className=' text-gray-600'>
              At <span className='text-[#fd3da1]'>ABG</span>, we pride ourselves on our unique sourcing approach, ensuring that each piece in our collection reflects the latest trends while maintaining quality and affordability. Our team of fashion enthusiasts scours the market to bring you the best styles, whether it’s timeless classics or the hottest new trends.
              </p>
          </div>
          <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Convenience:</b>
              <p className=' text-gray-600'>
              At <span className='text-[#fd3da1]'>ABG</span> Shopping Stores, we also prioritize flexible delivery options, ensuring your purchases arrive at your doorstep when you need them. Our hassle-free return policy means you can shop with confidence, knowing that if something doesn’t work out, it’s easy to make a return.
              
              </p>
          </div>
          <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
              <b>Exceptional Customer Service:</b>
              <p className=' text-gray-600'>
              At <span className='text-[#fd3da1]'>ABG</span> Shopping Stores, exceptional customer service is not just a promise—it's a core value that drives everything we do. We understand that our customers are the heart of our business, and we are dedicated to providing a shopping experience that exceeds your expectations.
              </p>
          </div>
      </div>

        <NewsletterBox />

    </div>
  )
}

export default About
