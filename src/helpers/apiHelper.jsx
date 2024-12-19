// apiHelper.js
 const getAuthHeader = (token) => {
    if (!token) return {};
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };
  
   const handleApiError = (error, defaultMessage = "An error occurred") => {
    console.error("API Error:", error);
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    return error.message || defaultMessage;
  };
  
   const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = getAuthHeader(token);
    
    const response = await fetch(url, {
        ...options,
        headers: {
            ...headers,
            ...options.headers
        }
    });
    console.log("📜 Fetch Headers:", response.headers);
    
  
    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Session expired. Please login again.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };


  export {
    getAuthHeader,
    handleApiError,
    fetchWithAuth,
  }