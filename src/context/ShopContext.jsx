// import { createContext, useEffect, useState } from "react";
// // import { products } from "../assets/assets";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import { summaryApi } from "../common";




// export const ShopContext = createContext();

// const ShopContextProvider = (props) =>{

//     const currency = '₦';
//     const delivery_fee = 10;
//     const backendUrl = import.meta.env.VITE_BACKEND_URL
//     const [search, setSearch] = useState('');
//     const [showSearch, setShowSearch] = useState(false);
//     const [cartItems, setCartItems] = useState({});
//     const [products, setProducts] = useState([]);
//     const [token, setToken] = useState('')
//     const navigate = useNavigate();



//     const fetchUserDetails = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await fetch(`${summaryApi.current_user.url}`, {
//             method: summaryApi.current_user.method,
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}` // Ensure 'Bearer ' prefix
//             }
//           });
//           const responseData = await response.json();
//           if (responseData.success) {
//             localStorage.setItem("user", JSON.stringify(responseData.data));
//           }
//         } catch (error) {
//           console.error("Error fetching user details:", error);
//         }
//       };

//       useEffect(() => {
//         const token = localStorage.getItem('token');
//         fetchUserDetails();
//       }, []);



//     const addToCart = async (itemId,size)=>{
//         const token = localStorage.getItem('token'); 

//         if (!size) {
//             toast.error('Select product size');
//             return;
//         }
        
//         let cartData = structuredClone(cartItems);

//         if (cartData[itemId]) {
            
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1;
//             }
//             else{
//                 cartData[itemId][size] = 1
//             }
//         }
//         else{
//             cartData[itemId] = {}
//             cartData[itemId][size] = 1;
//         }
//         setCartItems(cartData)

//         if (token) {
//             try {
//                 await fetch(summaryApi.addToCart.url, {itemId, size},
//                     {
//                         method: summaryApi.addToCart.method,
//                         credentials: 'include',
//                         headers: {
//                             'Authorization': `Bearer ${token}`
//                         }
                        
//                     }
//             )
//                 toast.success('Item added to cart')
//             } catch (error) {
//                 console.log(error)
//                 toast.error('Failed to add item to cart')
//             }
//         }
//     }


//     const getCartCount = ()=>{

//          let totalCount = 0;
//          for(const items in cartItems){
//              for(const item in cartItems[items]){
//                  try {
//                     if (cartItems[items][item] > 0) {
//                         totalCount += cartItems[items][item];
//                     }
//                  } catch (error) {
                    
//                  }
//              }
//          }
//          return totalCount;
//     }


//     // useEffect(()=>{
//     //      console.log(cartItems)
//     // }, [cartItems])

//     const updateQuantity = async (itemId, size,quantity)=>{

//         let cartData = structuredClone(cartItems);

//         cartData[itemId][size] = quantity;

//         setCartItems(cartData);

//         if (token) {
//             try {
//                 await axios.post(backendUrl + '/api/cart/update', {itemId, size,quantity},{
//                     headers: {token}
//                 })
//                 toast.success('Item quantity updated')
//             } catch (error) {
//                 console.log(error)
//                 toast.error('Failed to add item to cart') 
//             }
//         }

//     }



//     const getCartAmount = () => {
         
//         let totalAmount = 0;
//         for(const items in cartItems){
//             let itemInfo = products.find((product)=> product._id === items);
//             for(const item in cartItems[items]){
//                  try {
//                     if (cartItems[items][item] > 0) {
//                         totalAmount += itemInfo.price * cartItems[items][item];
//                     }
//                  } catch (error) {
                    
//                  }
//             }
//         }
//         return totalAmount;
//     }

//     const getProductsData = async () => {
//         try {
            
//             const response = await axios.get(backendUrl + "/api/product/list")
//                 if (response.data.success) {
//                     setProducts(response.data.products)
//                 }
//                 else{
//                     toast.error(response.data.message)
//                 }

//         } catch (error) {
//             console.log(error)
//             toast(error.message)
//         }
//     }

//     const getUserCart = async ( token )=>{
//         try {
//             const response = await axios.post(backendUrl + '/api/cart/get', {},{
//                 headers: {token}
//             })
//             if (response.data.success) {
//                 setCartItems(response.data.cartData)
//             }
//         } catch (error) {
//             console.log(error)
//             toast(error.message)
//         }
//     }

//     useEffect(()=>{
//         if (!token && localStorage.getItem('token')) {
//             setToken(localStorage.getItem('token'))
//             getUserCart(localStorage.getItem('token'))
//         }
//     },[])


    
//     useEffect(()=>{
//         getProductsData();
//     },[])




//     const value = {
//         products,
//         currency,
//         delivery_fee,
//         search,
//         setSearch,
//         showSearch,
//         setShowSearch,
//         addToCart,
//         cartItems,
//         getCartCount,
//         updateQuantity,
//         getCartAmount,
//         navigate,
//         backendUrl,
//         setToken,
//         setCartItems,
//         token
//     }
//     return (
//         <ShopContext.Provider value={value}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;


import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { summaryApi } from "../common";
import { fetchWithAuth, handleApiError } from "../helpers/apiHelper";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₦';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')
    const [user, setUser] = useState(null);
    const navigate = useNavigate();




    // In ShopContext.jsx, modify fetchUserDetails:
    const fetchUserDetails = async () => {
        try {
            const data = await fetchWithAuth(`${backendUrl}/api/user/user-details`);
            if (data.success) {
                localStorage.setItem("user", JSON.stringify(data.data));
                setUser(data.data);
                return data.data;
            }
            return null;
        } catch (error) {
            console.error("Error fetching user details:", handleApiError(error));
            return null;
        }
    };



    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
                return response.data.cartData;
            }
            return {};
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            return {};
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            // Fetch user details and cart in sequence
            fetchUserDetails().then(() => {
                getUserCart(storedToken);
            });
        }
    }, []);

    useEffect(() => {
        getProductsData();
    }, []);

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast(error.message);
        }
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select product size');
            return;
        }
        
        const token = localStorage.getItem('token');
        let cartData = structuredClone(cartItems);

        // Update local cart state
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        // Send to backend if logged in
        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/add', 
                    { itemId, size }, 
                    {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }
                );
                
                if (response.data.success) {
                    toast.success('Item added to cart');
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to add item to cart');
            }
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        const token = localStorage.getItem('token');
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                const response = await axios.post(
                    backendUrl + '/api/cart/update', 
                    { itemId, size, quantity }, 
                    {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }
                );
                
                if (response.data.success) {
                    toast.success('Item quantity updated');
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to update item quantity');
            }
        }
    };

    // Rest of the methods remain the same...
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalAmount;
    };



    // In ShopContext.jsx
const handleAuthError = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    setCartItems({});
};


useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
        fetchUserDetails()
            .then((userData) => {
                if (userData) {
                    return getUserCart(storedToken);
                }
                handleAuthError();
            })
            .catch(() => handleAuthError());
    }
}, []);



    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        setCartItems,
        token,
        user,
        setUser
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;