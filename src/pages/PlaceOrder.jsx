import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';


function PlaceOrder() {

  const [method, setMethod] = useState('');
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async(event)=>{
        event.preventDefault();
        console.log('Selected Payment Method:', method);
        try {
            
            let orderItems = []

            for(const items in cartItems){
                for(const item in cartItems[items]){
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                           itemInfo.size = item
                           itemInfo.quantity = cartItems[items][item]
                           orderItems.push(itemInfo)
                        }
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                paymentMethod: method
            }

            let user = {firstName:formData.firstName,lastName:formData.lastName}

            let flutterData = {
                address: {
                    street: formData.street,
                    landmark: formData.landmark,
                    city: formData.city,
                    state: formData.state,
                    country: formData.country,
                    phone: formData.phone,
                },
                email: formData.email, 
                phone: formData.phone,
                amount: getCartAmount() + delivery_fee, 
                items: orderItems,
                userId: user,
                paymentMethod: method
            };


            switch (method) {
                // API calls for cash on delivery method (COD)
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    console.log(response.data)
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else{
                        toast.error(response.data.message)
                    }
                    break;

                    // {API call for stripe method}
                    case 'stripe':
                        const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData,{
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if (responseStripe.data.success) {
                            const {session_url} = responseStripe.data
                            window.location.replace(session_url)
                        } else{
                            toast.error(response.data.message)
                        }

                    break;

                    // {API call for flutterwave method}
                    case 'flutterwave':
                        const responseFlutterwave = await axios.post(backendUrl + '/api/order/flw', flutterData, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        console.log("Response from backend:", responseFlutterwave.data);
                        if (responseFlutterwave.data.success) {
                            console.log("Redirecting to:", responseFlutterwave.data.data.link);
                            toast.success('Redirecting to payment...');
                            setTimeout(() => {
                                window.location.href = responseFlutterwave.data.data.link; 
                            }, 1000);
                            
                          } else {
                            toast.error(responseFlutterwave.data.message || 'Failed to initiate payment');
                          }

                    break;
            
                default:
                    break;
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
  }

  
  return (
    <form onSubmit={onSubmitHandler} className=' flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* -----------------left side------------ */}
      <div className=' flex flex-col gap-4 w-full sm:max-w-[480px]'>
          <div className=' text-xl sm:text-2xl my-3'>
             <Title text1={'DELIVERY'}text2={'INFORMATION'} />
          </div>
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name'/>
              <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name'/>
          </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address'/>
          <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street'/>
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='landmark' value={formData.landmark} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Landmark'/>
              <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
          </div>
          <div className='flex gap-3'>
              <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
              <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country'/>
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone Number'/>
      </div>

      {/* -----------------Right side----------- */}
      <div className='mt-8'>
         <div className=' mt-8 min-w-80'>
             <CartTotal />
         </div>
         <div className=' mt-12'>
             <Title text1={'PAYMENT'}text2={'METHOD'}/>

             {/* --------payment method selection-------- */}
             <div className=' flex gap-3 flex-col lg:flex-row'>
                <div onClick={()=>setMethod('stripe')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
                    <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                </div>
                <div onClick={()=>setMethod('flutterwave')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'flutterwave' ? 'bg-green-500' : ''}`}></p>
                    <img className='h-5 mx-4' src={assets.blue_logo} alt="" />
                </div>
                <div onClick={()=>setMethod('cod')} className=' flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                    <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
                    <p className=' text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
             </div>
              
              <div className=' w-full text-end mt-8'>
                  <button type='submit' className='bg-black text-white px-16 py-3 text-sm active:bg-[#f08bc1]'>PLACE ORDER</button>
              </div>
         </div>
      </div>
    </form>
  )
}

export default PlaceOrder
