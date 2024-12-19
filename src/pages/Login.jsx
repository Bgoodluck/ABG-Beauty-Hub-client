import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { summaryApi } from '../common';
import { fetchWithAuth } from '../helpers/apiHelper';
// import { fetchWithAuth } from './apiHelper';

function Login() {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: null   
  });

  const fetchUserDetails = async (authToken) => {
    try {
      const response = await fetchWithAuth(`${backendUrl}/api/user/user-details`, authToken);
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch user details');
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Clear authentication state on error
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      throw error;
    }
  };


  const handleLogin = async (responseData) => {
    const newToken = responseData.userData.token;
    
    // Set token in localStorage and context
    localStorage.setItem('token', newToken);
    setToken(newToken);
    
    // Wait a brief moment for state to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Fetch user details
    try {
      await fetchUserDetails(newToken);
      toast.success(responseData.message || "Login successful");
      navigate("/");
    } catch (error) {
      toast.error("Error loading user details. Please try logging in again.");
      navigate("/login");
    }
  };



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadPic = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, and GIF images are allowed");
      return;
    }

    setData((prev) => ({
      ...prev,
      profilePic: file,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === 'Sign Up') {
        if (!data.name.trim()) {
          toast.error("Name is required");
          return;
        }

        if (!data.email.trim()) {
          toast.error("Email is required");
          return;
        }

        if (data.password.length < 8) {
          toast.error("Password must be at least 8 characters long");
          return;
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);
        if (data.profilePic) {
          formData.append('picture', data.profilePic);
        }
        
        const response = await fetch(summaryApi.signUp.url, {
          method: summaryApi.signUp.method,
          body: formData
        });

        const userData = await response.json();
        if (userData.success) {
          toast.success(userData.message);
          setCurrentState('Login');
        } else {
          toast.error(userData.message);
        }
      } else {
        // Login logic
        const response = await fetch(summaryApi.signIn.url, {
          method: summaryApi.signIn.method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        });

        const responseData = await response.json();

        if (responseData.success) {
          await handleLogin(responseData);
        } else {
          toast.error(responseData.message);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    }
  };



  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-[#fd3da1]' />
      </div>
      
      {currentState === 'Sign Up' && (
        <input 
          name="name"
          onChange={handleOnChange} 
          value={data.name} 
          type="text" 
          className='w-full px-3 py-2 border border-gray-800' 
          placeholder='Name' 
          required
        />
      )}
      
      <input 
        name="email"
        onChange={handleOnChange} 
        value={data.email} 
        type="email" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Email' 
        required
      />
      
      <input 
        name="password"
        onChange={handleOnChange} 
        value={data.password} 
        type="password" 
        className='w-full px-3 py-2 border border-gray-800' 
        placeholder='Password' 
        required
      />

      {currentState === 'Sign Up' && (
        <input
          name='picture' 
          type="file" 
          onChange={handleUploadPic} 
          className='w-full px-3 py-2 border border-gray-800'
        />
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState === 'Login' 
          ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p> 
          : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      
      <button className='bg-black text-white font-light px-8 py-2 mt-4 active:bg-[#f08bc1]'>
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}

export default Login