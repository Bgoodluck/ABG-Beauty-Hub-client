import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import SalonPage from './pages/SalonPage'
import UnsubscribeForm from './components/NewsletterUnsubscribe'
import StaffDetails from './pages/StaffDetails'
import BookAppointment from './pages/BookAppointment'
import UserAppointments from './components/UserAppointment'
import ModifyAppointment from './components/ModifyUserAppointment'
import ShopContextProvider from './context/ShopContext'
import ProfilePage from './pages/ProfilePage'


function App() {
  return (
    <div className=' px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ShopContextProvider>
      <ToastContainer />
       <Navbar/>
       <SearchBar/>
       <Routes>
          <Route path='/salonpage' element={<SalonPage/>}/>
          <Route path='/staff/:id' element={<StaffDetails/>}/>
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/place-order' element={<PlaceOrder/>}/>
          <Route path='/booking' element={<BookAppointment/>}/>
          <Route path='/book-appointments' element={<ModifyAppointment/>}/>
          <Route path='/appointments' element={<UserAppointments/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/unsubscribe' element={<UnsubscribeForm/>}/>          
       </Routes>
       <Footer/>
       </ShopContextProvider>
    </div>
  )
}

export default App
