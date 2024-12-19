import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';



function Verify() {


    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams()


    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async ()=>{

        try {
            if (!token) {
                return null;
            }

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', {success, orderId}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.data.success) {
                setCartItems([])
                navigate('/orders')
                toast.success('Payment successful')
            }else{
                toast.error(response.data.message)
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

     
    // const verifyFlutter = async ()=>{

    //     try {
    //         if (!token) {
    //             return null;
    //         }

    //         const response = await axios.post(backendUrl + '/api/order/verifyFlutterwave', {success, orderId}, {
    //             headers: {token}
    //         })
    //         if (response.data.success) {
    //             setCartItems([])
    //             navigate('/orders')
    //             toast.success('Payment successful')
    //         }else{
    //             toast.error(response.data.message)
    //             navigate('/cart')
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error(error.message)
    //     }

    // }

    useEffect(()=>{
        verifyPayment()
        // verifyFlutter()
    },[token])

  return (
    <div>
       
    </div>
  )
}

export default Verify
