import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

function BookAppointment() {
  const { state } = useLocation();
  const { navigate, backendUrl, token } = useContext(ShopContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cellNumber: '',
    email: '',
    salonLocation: '',
    firstTimeClient: '',
    requestDate: '',
    requestTime: '',
    stylistName: state?.stylistName || '',
    services: '',
    keepUpdated: false
  });

  const onChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/api/appointments/book`, 
        formData, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Appointment booked successfully!');
        navigate('/appointments');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to book appointment');
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side: Appointment Details */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'BOOK'} text2={'APPOINTMENT'} />
        </div>
        
        {/* Name Fields */}
        <div className='flex gap-3'>
          <input 
            required 
            name='firstName' 
            value={formData.firstName} 
            onChange={onChangeHandler} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='First Name'
          />
          <input 
            required 
            name='lastName' 
            value={formData.lastName} 
            onChange={onChangeHandler} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="text" 
            placeholder='Last Name'
          />
        </div>

        {/* Contact Information */}
        <input 
          required 
          name='cellNumber' 
          value={formData.cellNumber} 
          onChange={onChangeHandler} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="tel" 
          placeholder='Cell Number'
        />
        <input 
          required 
          name='email' 
          value={formData.email} 
          onChange={onChangeHandler} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="email" 
          placeholder='Email Address'
        />

        {/* Salon Location */}
        <input 
          required 
          name='salonLocation' 
          value={formData.salonLocation} 
          onChange={onChangeHandler} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" 
          placeholder='Salon Location'
        />

        {/* First Time Client */}
        <div className='flex gap-3'>
          <label className='flex items-center'>
            <input 
              type="radio" 
              name='firstTimeClient' 
              value='yes' 
              checked={formData.firstTimeClient === 'yes'}
              onChange={onChangeHandler}
              className='mr-2'
            />
            First Time Client
          </label>
          <label className='flex items-center'>
            <input 
              type="radio" 
              name='firstTimeClient' 
              value='no' 
              checked={formData.firstTimeClient === 'no'}
              onChange={onChangeHandler}
              className='mr-2'
            />
            Returning Client
          </label>
        </div>

        {/* Date and Time */}
        <div className='flex gap-3'>
          <input 
            required 
            name='requestDate' 
            value={formData.requestDate} 
            onChange={onChangeHandler} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="date" 
            placeholder='Request Date'
          />
          <input 
            required 
            name='requestTime' 
            value={formData.requestTime} 
            onChange={onChangeHandler} 
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
            type="time" 
            placeholder='Request Time'
          />
        </div>

        {/* Stylist Name */}
        <input 
          name='stylistName' 
          value={formData.stylistName} 
          onChange={onChangeHandler} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
          type="text" 
          placeholder='Stylist Name (Optional)'
        />

        {/* Services and Notes */}
        <textarea 
          name='services' 
          value={formData.services} 
          onChange={onChangeHandler} 
          className='border border-gray-300 rounded py-1.5 px-3.5 w-full h-24' 
          placeholder='Requested Services, Comments and Notes'
        />

        {/* Keep Updated Checkbox */}
        <label className='flex items-center'>
          <input 
            type="checkbox" 
            name='keepUpdated' 
            checked={formData.keepUpdated}
            onChange={onChangeHandler}
            className='mr-2'
          />
          Keep Me Updated
        </label>

        {/* Submit Button */}
        <div className='w-full text-end mt-8'>
          <button 
            type='submit' 
            className='bg-black text-white px-16 py-3 text-sm active:bg-[#f08bc1]'
          >
            BOOK APPOINTMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default BookAppointment;