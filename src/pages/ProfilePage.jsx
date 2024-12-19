import { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Camera } from 'lucide-react';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

  // Form state
  const defaultFormData = {
    bio: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    birthday: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    interests: []
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [token, navigate]);


  useEffect(() => {
    // Update image preview when profile picture changes
    if (profile?.profilePicture) {
        setImagePreview(getImageUrl(profile.profilePicture));
    }
}, [profile?.profilePicture]);





  const getImageUrl = (path) => {
    if (!path) return null;
    // If the path already starts with http(s), return as is
    if (path.startsWith('http')) return path;
    // Otherwise, prepend the backend URL
    return `${backendUrl}${path}`;
  };



  const fetchProfile = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/profile/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      
      if (data.success) {
        const profileData = data.profile;
        setProfile(profileData);
        // Merge received data with default values for any missing fields
        setFormData({
          ...defaultFormData,
          ...profileData,
          address: {
            ...defaultFormData.address,
            ...(profileData.address || {})
          },
          socialLinks: {
            ...defaultFormData.socialLinks,
            ...(profileData.socialLinks || {})
          }
        });
      } else {
        throw new Error(data.message || 'Failed to fetch profile');
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch profile';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const toastId = toast.loading("Updating profile...");
    const formDataObj = new FormData();

    // Safely handle nested objects
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'object' && formData[key] !== null) {
        formDataObj.append(key, JSON.stringify(formData[key]));
      } else if (formData[key] !== undefined && formData[key] !== null) {
        formDataObj.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`${backendUrl}/api/profile/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataObj
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      
      if (data.success) {
        setProfile(data.profile);
        setFormData({
          ...defaultFormData,
          ...data.profile,
          address: {
            ...defaultFormData.address,
            ...(data.profile.address || {})
          },
          socialLinks: {
            ...defaultFormData.socialLinks,
            ...(data.profile.socialLinks || {})
          }
        });
        toast.update(toastId, {
          render: "Profile updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
        setIsEditing(false);
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Failed to update profile",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview URL for the selected image
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Upload the image
    handleImageUpload(file);
};




  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Uploading image...");
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await fetch(`${backendUrl}/api/profile/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      
      if (data.success) {
        setProfile(data.profile);
        toast.update(toastId, {
          render: "Profile picture updated successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });
      } else {
        throw new Error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      toast.update(toastId, {
        render: err.message || "Failed to upload image",
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
      setImagePreview(profile?.profilePicture ? getImageUrl(profile.profilePicture) : null);
    }
  };



  const handleCloseProfileDisplay = ()=>{
    
  }



  if (!token) {
    return null; // Or redirect to login
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-red-500 text-center p-4">{error}</div>
        <button 
          onClick={fetchProfile}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
            {imagePreview ? (
                                <img 
                                    src={imagePreview}
                                    alt="Profile" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        setImagePreview(null);
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Camera className="w-8 h-8 text-gray-400" />
                                </div>
                            )}
            </div>
            {!isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera className="w-4 h-4 text-white" />
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          
          <div>
            <h1 className="text-2xl font-bold">{profile?.user?.name}</h1>
            <p className="text-gray-600">{profile?.user?.email}</p>
          </div>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Street</label>
                <input
                  type="text"
                  value={formData.address.street}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: {...formData.address, street: e.target.value}
                  })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: {...formData.address, city: e.target.value}
                  })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">Bio</h3>
              <p className="text-gray-600">{profile?.bio || 'No bio added yet'}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Contact</h3>
              <p className="text-gray-600">{profile?.phone || 'No phone number added'}</p>
            </div>
            
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-gray-600">
                {profile?.address?.street && profile?.address?.city
                  ? `${profile?.address.street}, ${profile?.address.city}`
                  : 'No address added'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;