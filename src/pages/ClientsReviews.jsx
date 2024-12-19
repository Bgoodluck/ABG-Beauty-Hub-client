import React, { useEffect, useState } from 'react';
import { FaStar, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { summaryApi } from '../common';
import { toast } from 'react-toastify';

const ClientsReviews = ({ heading }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 9,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Build query parameters
      const queryParams = new URLSearchParams({
        page: pagination.currentPage,
        limit: pagination.limit,
        sortBy: sortConfig.sortBy,
        sortOrder: sortConfig.sortOrder
      });
      
      // Use the correct endpoint for fetching all staff reviews
      const url = `${summaryApi.getAllStaffsReview.url}?${queryParams}`;
      
      const response = await fetch(url, {
        method: summaryApi.getAllStaffsReview.method,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch reviews');
      }

      const { data } = await response.json();
      setReviews(data.reviews);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error(`Failed to fetch reviews: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [pagination.currentPage, sortConfig]);

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const handleSortChange = (field) => {
    setSortConfig(prev => ({
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const renderSortIcon = (field) => {
    if (sortConfig.sortBy !== field) return <FaSort />;
    return sortConfig.sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={index < rating ? 'text-yellow-500' : 'text-gray-300'}
      />
    ));
  };

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <h2 className='text-2xl font-bold mb-4 py-4'>{heading}</h2>
      
      {reviews.length > 0 ? (
        <>
          <div className="mb-4 flex justify-end gap-4">
            <button
              onClick={() => handleSortChange('createdAt')}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-violet-600"
            >
              Date {renderSortIcon('createdAt')}
            </button>
            <button
              onClick={() => handleSortChange('rating')}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-violet-600"
            >
              Rating {renderSortIcon('rating')}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white rounded-lg shadow-lg p-6 transition-all hover:shadow-xl">
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(review.rating)}
                </div>
                
                <p className="text-sm text-violet-600 mb-2">
                  Review for: {review.staff?.staffName || 'General'}
                </p>
                
                <p className="text-gray-600 mb-4 line-clamp-4">
                  "{review.comment}"
                </p>
                
                <div className="flex items-center gap-3">
                  {review.user?.profilePic ? (
                    <img
                      src={review.user.profilePic}
                      alt={review.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                      <span className="text-violet-600 font-semibold">
                        {(review.user?.name || 'Anonymous').charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{review.user?.name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.hasPrevPage}
              className="px-4 py-2 text-sm text-violet-600 border border-violet-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.hasNextPage}
              className="px-4 py-2 text-sm text-violet-600 border border-violet-600 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ClientsReviews;
