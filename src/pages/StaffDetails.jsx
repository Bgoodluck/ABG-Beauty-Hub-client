import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import { displayNGNCurrency } from '../helpers/displayCurrency'
import { FaStar, FaStarHalfAlt, FaRegStar, FaTrash, FaEdit } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { toast } from 'react-toastify';
import CategoryStaffDisplay from '../components/CategoryStaffDisplay';
import { ShopContext } from '../context/ShopContext';
import { summaryApi } from '../common';
import Title from '../components/Title';

function StaffDetails() {
  const [dataDetails, setDataDetails] = useState({
    staffName: "",
    staffPrice: "",
    staffCategory: "",
    staffDescription: "",
    staffImage: [],
    staffBrand: "",
    staffDiscount: ""
  })

  const params = useParams()
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("")
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false)
  const [zoomImage, setZoomImage] = useState({
    x: 0,
    y: 0
  })

  const {token, backendUrl} = useContext(ShopContext)

  const navigate = useNavigate()

  const staffImageListLoading = new Array(4).fill(null)

  const fetchCurrentUser = async () => {
    try {
        // Get token from local storage
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            console.log("No token found in localStorage");
            return;
        }

        const response = await fetch(`${backendUrl}/api/user/user-details`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized access - clear invalid token
                localStorage.removeItem('token');
                setToken('');
                throw new Error('Session expired. Please login again.');
            }
            throw new Error('Failed to fetch user');
        }
        
        const data = await response.json();
        
        if (data?.data) {
            setCurrentUser(data.data);
            console.log("Current User:", data.data);
        } else {
            console.warn("No user data received");
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        toast.error(error.message || "Unable to fetch user details");
    }
};




  const fetchStaffDetails = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${summaryApi.staffDetails.url}/${params?.id}`, {
        method: summaryApi.staffDetails.method,
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch staff details');
      }
      
      const responseData = await response.json()
      setDataDetails(responseData.data)
      setActiveImage(responseData?.data?.staffImage[0])
    } catch (error) {
      console.error("Error fetching staff details:", error);
      toast.error("Unable to load staff details");
    } finally {
      setLoading(false)
    }
  }

  // Fetch reviews for the Staff
  const fetchStaffReviews = async () => {
    try {
      const response = await fetch(
        summaryApi.staffReviewList.url.replace(':staffId', params?.id), 
        {
          method: summaryApi.staffReviewList.method,
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const data = await response.json();
      
      // Ensure data and data.data exist
      const reviewsData = data.data || [];
  
      // Use Promise.allSettled to handle potential errors for individual user fetches
      const reviewsWithUserDetails = await Promise.allSettled(
        reviewsData.map(async (review) => {
          try {
            const userResponse = await fetch(`${summaryApi.getStaffReviewByUser.url}${review.user}`, {
              method: summaryApi.getStaffReviewByUser.method,
              credentials: 'include',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
            
            if (!userResponse.ok) {
              console.warn(`Failed to fetch user details for review ${review._id}`);
              return {
                ...review,
                userName: 'Unknown User',
                userProfilePic: null
              };
            }
            
            const userData = await userResponse.json();
            
            return {
              ...review,
              userName: userData.data?.name || 
                        (userData.data?.firstName && userData.data?.lastName 
                          ? `${userData.data.firstName} ${userData.data.lastName}`.trim() 
                          : 'Unknown User'),
              userProfilePic: userData.data?.profilePic || null
            };
          } catch (error) {
            console.error(`Error processing review ${review._id}:`, error);
            return {
              ...review,
              userName: 'Unknown User',
              userProfilePic: null
            };
          }
        })
      );
  
      // Filter out rejected promises and extract values
      const successfulReviews = reviewsWithUserDetails
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
  
      setReviews(successfulReviews);
    } catch (error) {
      console.error("Detailed error fetching reviews:", error);
      toast.error(`Failed to fetch reviews: ${error.message}`);
    }
  };




  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (review.trim() && rating > 0) {
      try {
        const reviewData = {
          userId: currentUser._id,
          staffId: params?.id,
          comment: review,
          rating: rating
        };
     
        const response = await fetch(
          summaryApi.staffReviewCreate.url.replace(':staffId', params?.id), 
          {
            method: summaryApi.staffReviewCreate.method,
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
          }
        );
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
  
        const data = await response.json();
        
        if (data.success) {
          fetchStaffReviews();
          setReview("");
          setRating(0);
          toast.success(data.message);
        } else {
          toast.error(data.message || "Failed to post review");
        }
      } catch (error) {
        console.error("Error posting review:", error);
        toast.error(`Failed to submit review: ${error.message}`);
      }
    }
  };
  
  const handleUpdateReview = async (e) => {
    e.preventDefault();
    if (review.trim() && rating > 0) {
      try {
        const updateData = {
          reviewId: editingReview._id,
          comment: review,
          rating: rating
        };
  
        const response = await fetch(
          summaryApi.staffReviewUpdate.url.replace(':reviewId', editingReview._id), 
          {
            method: summaryApi.staffReviewUpdate.method,
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData)
          }
        );
  
        const data = await response.json();
        if (data.success) {
          fetchStaffReviews();
          setReview("");
          setRating(0);
          setEditingReview(null);
          toast.success(data.message);
        } else {
          toast.error(data.message || "Failed to update review");
        }
      } catch (error) {
        console.error("Error updating review:", error);
        toast.error(`Failed to update review: ${error.message}`);
      }
    }
  };
  
  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        summaryApi.staffReviewDelete.url.replace(':reviewId', reviewId), 
        {
          method: summaryApi.staffReviewDelete.method,
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
  
      const data = await response.json();
      if (data.success) {
        fetchStaffReviews();
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(`Failed to delete review: ${error.message}`);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            // Always fetch staff details as it's public
            await fetchStaffDetails();
            
            // Only fetch user and reviews if logged in
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                await fetchCurrentUser();
                await fetchStaffReviews();
            }
        } catch (error) {
            console.error("Error in data fetching:", error);
            toast.error("Error loading page data");
        }
    };
    fetchData();
}, [params.id]);



  const handleImageHover = (image) => {
    setActiveImage(image)
  }

  // Start editing a review
  const startEditReview = (review) => {
    setEditingReview(review);
    setReview(review.comment);
    setRating(review.rating);
  }

  const renderStarRating = (currentRating, setRatingFunc) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => setRatingFunc(star)}
        className="cursor-pointer text-yellow-500 text-xl"
      >
        {star <= currentRating ? <FaStar /> : <FaRegStar />}
      </span>
    ));
  }

  const handleZoomEnter = () => {
    setZoomOpen(true);
    setIsZoomed(true);
  };
  
  const handleZoomLeave = () => {
    setZoomOpen(false);
    setIsZoomed(false);
    setZoomImage({ x: 0, y: 0 });
  };
  
  const handleImageClick = () => {
    // Toggle zoom on click
    setZoomOpen(prev => !prev);
  };

  const handleZoomImage = useCallback((e) => {
    if (!isZoomed) return;

    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomImage({
      x,
      y
    });
  }, [isZoomed]);

  const handleBookWithMe = () => {
    navigate("/booking", { 
      state: { 
        stylistName: dataDetails?.staffName 
      } 
    });
  }

  const handleBuyNow = async (e) => {  
    navigate("/cart");
  }

  const handleImageZoomOut = () => {
    setZoomOpen(true)
  }
  return (
    <div className='container mx-auto p-4'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/* staff image section */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
          <div className='relative h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 flex items-center justify-center'>
            {loading ? (
              <div className='animate-pulse bg-slate-300 h-full w-full'></div>
            ) : (
              <img
                src={activeImage}
                alt={dataDetails?.staffName}
                className='h-full w-full object-scale-down mix-blend-multiply'
                onMouseEnter={handleZoomEnter}
                onMouseLeave={handleZoomLeave}
                onMouseMove={handleZoomImage}
                onClick={handleImageClick}
              />
            )}
            {
              zoomOpen && (
                <div
                  className={`hidden lg:block absolute min-w-[400px] min-h-[400px] overflow-hidden bg-slate-300 p-1 -right-[510px] top-0 ${isZoomed ? 'block' : 'hidden'}`}
                >
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: `${zoomImage.x}% ${zoomImage.y}%`,
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                  </div>
                </div>
              )
            }
          </div>

          <div className='h-full'>
            {loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {staffImageListLoading.map((_, index) => (
                  <div
                    key={index}
                    className='h-20 w-20 bg-slate-200 rounded animate-pulse'
                  ></div>
                ))}
              </div>
            ) : (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                {dataDetails?.staffImage?.map((item, index) => (
                  <div
                    key={index}
                    className='h-20 w-20 bg-slate-200 rounded p-1'
                  >
                    <img
                      src={item}
                      alt={dataDetails?.staffName}
                      onMouseEnter={() => handleImageHover(item)}
                      onClick={() => handleImageHover(item)}
                      className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* staff details section */}
        {loading ? (
          <div className='flex flex-col gap-4 w-full'>
            <div className='h-8 w-1/2 bg-slate-200 animate-pulse rounded'></div>
            <div className='h-10 w-full bg-slate-200 animate-pulse rounded'></div>
            <div className='h-6 w-3/4 bg-slate-200 animate-pulse rounded'></div>
            <div className='h-6 w-1/2 bg-slate-200 animate-pulse rounded'></div>
            <div className='h-20 w-full bg-slate-200 animate-pulse rounded'></div>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-semibold'>{dataDetails?.staffName}</h2>
            <p className='capitalize text-slate-500'>
              Department: {dataDetails?.staffCategory}
            </p>
            <div className='flex items-center gap-4'>
              {/* Additional details can be added here if needed */}
            </div>
            <p className='font-medium'>
              <span className='text-xl font-bold mr-3'>Area of Specialization:</span>
              {dataDetails?.staffDescription}
            </p>

            <div className='flex items-center gap-4 my-2'>
              <div className='flex text-yellow-500'>
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
              </div>
              <span className='text-gray-500'>(4.5/5)</span>
            </div>

            <div className='flex flex-wrap gap-4'>
              <button
                onClick={handleBookWithMe}                 
                className='px-6 py-2 rounded bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90 transition-all'>
                Book With Me
              </button>
              <b>Or</b>
              <button                 
                onClick={()=> navigate("/booking")} 
                className='px-6 py-2 rounded border-2 border-violet-600 text-violet-600 hover:bg-violet-100 transition-all'>
                Book With Team
              </button>
            </div>
          </div>
        )}
      </div>

      {
        dataDetails?.staffCategory && (
          <CategoryStaffDisplay staffCategory={dataDetails?.staffCategory} heading={<Title text1={"Alternative"} text2={"Stylists"}/>}/>
        )
      }

      {/* Review Section */}
      
      <div className='mt-8 bg-gray-50 p-6 rounded-lg'>
        <h3 className='text-2xl font-bold mb-4 flex items-center gap-2'>
          <MdOutlineRateReview /> Reviews ({reviews.length})
        </h3>

        {/* Review Form */}
        <form onSubmit={editingReview ? handleUpdateReview : handleSubmitReview} className='mb-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <span className='font-medium'>Your Rating:</span>
              <div className='flex'>
                {renderStarRating(rating, setRating)}
              </div>
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder='Write your review here...'
              className='w-full p-3 border rounded-lg focus:outline-violet-500'
              rows={4}
            ></textarea>
            <button
              type='submit'
              className='self-start px-6 py-2 bg-violet-600 text-white rounded hover:bg-violet-700 transition-all'
            >
              {editingReview ? 'Update Review' : 'Submit Review'}
            </button>
            {editingReview && (
              <button
                type='button'
                onClick={() => {
                  setEditingReview(null);
                  setReview('');
                  setRating(0);
                }}
                className='self-start px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all'
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Review List */}
        {reviews.length > 0 && (
          <div>
            {reviews.map(reviewItem => (
              <div
                key={reviewItem._id}
                className='bg-white p-4 rounded-lg shadow-sm mb-4 relative'
              >
                <div className='flex justify-between items-center mb-2'>
                  <div className='flex items-center gap-2'>
                    <div className='flex text-yellow-500'>
                      {[...Array(reviewItem.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <div className='flex items-center gap-2'>
                      {reviewItem.userProfilePic && (
                        <img
                          src={reviewItem.userProfilePic}
                          alt={reviewItem.userName}
                          className='w-8 h-8 rounded-full object-cover'
                        />
                      )}
                      <span className='text-sm text-gray-700'>
                        {reviewItem.userName}
                      </span>
                    </div>
                  </div>
                  <span className='text-slate-900 text-sm'>
                    {new Date(reviewItem.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p>{reviewItem.comment}</p>

                {/* User-specific review actions */}
                {currentUser && (currentUser._id === reviewItem.userId) && (
                  <div className='absolute top-2 right-2 flex gap-2'>
                    <button
                      onClick={() => startEditReview(reviewItem)}
                      className='text-blue-500 hover:text-blue-700'
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(reviewItem._id)}
                      className='text-red-500 hover:text-red-700'
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StaffDetails;

