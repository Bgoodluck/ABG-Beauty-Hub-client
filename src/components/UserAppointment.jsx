import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

function UserAppointments() {
  const { backendUrl, token, navigate } = useContext(ShopContext);
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/appointments/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setAppointments(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch appointments');
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/appointments/${appointmentId}/status`, 
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        toast.success('Appointment updated successfully');
        fetchAppointments();
        setEditingAppointment(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update appointment');
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await updateAppointmentStatus(appointmentId, 'Cancelled');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAppointments();
    } else {
      navigate('/login');
    }
  }, [token]);

  return (
    <div className='flex flex-col justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[680px] mx-auto'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'MY'} text2={'APPOINTMENTS'} />
        </div>

        {appointments.length === 0 ? (
          <div className='text-center text-gray-500'>
            No appointments found. Book your first appointment now!
          </div>
        ) : (
          appointments.map((appointment) => (
            <div 
              key={appointment._id} 
              className='border border-gray-300 rounded p-4 flex flex-col gap-3'
            >
              <div className='flex justify-between items-center'>
                <div>
                  <p className='font-bold'>
                    {new Date(appointment.requestDate).toLocaleDateString()} 
                    {' '}at{' '}
                    {appointment.requestTime}
                  </p>
                  <p className='text-sm text-gray-600'>
                    {appointment.stylistName ? 
                      `With ${appointment.stylistName}` : 
                      'No specific stylist selected'}
                  </p>
                </div>
                <span 
                  className={`px-3 py-1 rounded text-sm ${
                    appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className='text-sm'>
                <p><strong>Services:</strong> {appointment.services || 'No services specified'}</p>
                <p><strong>Location:</strong> {appointment.salonLocation}</p>
              </div>

              {appointment.status !== 'Cancelled' && (
                <div className='flex gap-3 mt-2'>
                  <button 
                    onClick={() => navigate(`/book-appointments?edit=${appointment._id}`)}
                    className='flex-1 border border-black text-black py-2 text-sm hover:bg-gray-100'
                  >
                    Modify
                  </button>
                  <button 
                    onClick={() => cancelAppointment(appointment._id)}
                    className='flex-1 bg-red-500 text-white py-2 text-sm hover:bg-red-600'
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        <div className='w-full text-end mt-8'>
          <button 
            onClick={() => navigate('/booking')}
            className='bg-black text-white px-16 py-3 text-sm active:bg-[#f08bc1]'
          >
            BOOK NEW APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserAppointments;