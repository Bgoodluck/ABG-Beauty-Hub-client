import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import ShopContextProvider from './context/ShopContext.jsx'
import Animation from './components/Animation/Animation.jsx'


createRoot(document.getElementById('root')).render(
  <Router>
    {/* <ShopContextProvider> */}
    <Routes>
  
    <Route path='/intro' element={<Animation/>}/>

    <Route path='/*' element={<App />}/>       
    
  </Routes>  
  {/* </ShopContextProvider> */}
  </Router>
)
