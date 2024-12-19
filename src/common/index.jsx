const backendURL = "https://abg-beauty-hub-server.onrender.com"


export const summaryApi = {
    newsletterSubcription:{
        url: `${backendURL}/api/newsletter/register`,
        method: "POST",
        data: {
            email: String
        }
    },

    getNewsletterSubcription:{
        url: `${backendURL}/api/newsletter/list`,
        method: "GET",
        data: {
            email: String
        }
    },

    sendNewsletterSubcription:{
        url: `${backendURL}/api/newsletter/send`,
        method: "POST",
        data: {
            email: String,
            status: Boolean
        }
    },

    unSubscribeNewsletter: {
        url: `${backendURL}/api/newsletter/unsubscribe`,
        method: "POST",
        data: {
            email: String
        }
    },

    deleteSubscription:{
        url: `${backendURL}/api/newsletter/delete/:email`,
        method: "DELETE",
        data: {
            email: String
        }
    },

    updateSubscriberStatus: {
        url: `${backendURL}/api/newsletter/status/:email`,
        method: "POST",
        data: {
            email: String,
            isActive: Boolean
        }
    },

    addToCart: {
        url: `${backendURL}/api/cart/add`,
        method: "POST",
        data: {
            userId: String,
            itemId: String,
            size: Number
        }
    },

    uploadStaff: {
        url: `${backendURL}/api/staff/upload-staff`,
        method: "POST"        
    },

    allStaffs: {
        url: `${backendURL}/api/staff/get-staffs`,
        method: "GET"
    },

    updateStaff: {
        url: `${backendURL}/api/staff/update-staff`,
        method: "POST",
        data: {
            staffId: String,
            staffName: String,
            staffPrice: Number,
            staffDescription: String,
            staffCategory: String,
            staffBrand: String,
            staffImage: [],
            staffDiscount: Number            
        }
    },

    categoryStaff: {
        url: `${backendURL}/api/staff/list-category`,
        method: "GET",
        data: {
            staffCategory: String
        }
    },

    allStaffCategories: {
        url: `${backendURL}/api/staff/all-categories`,
        method: "POST"
    },

    staffDetails: {
        url: `${backendURL}/api/staff/staff-details`,
        method: "GET",
        data: {            
            staffName: String,
            staffPrice: Number,
            staffDescription: String,
            staffCategory: String,
            staffBrand: String,
            staffImage: [],
            staffDiscount: Number            
        }        
    },

    staffReviewCreate:{
        url: `${backendURL}/api/staff/review/post-review/:staffId`,
        method: "POST",
        data: {
            userId: String,
            staffId: String,
            staffReview: String,
            staffRating: Number
        }
    },

    staffReviewList:{
        url: `${backendURL}/api/staff/review/get-review/:staffId`,
        method: "GET",
        data: {
            staffId: String
        }
    },

    staffReviewDelete:{
        url: `${backendURL}/api/staff/review/delete-review/:reviewId`,
        method: "DELETE",
        data: {
            reviewId: String
        }
    },

    staffReviewUpdate:{
        url: `${backendURL}/api/staff/review/update-review/:reviewId`,
        method: "POST",
        data: {
            reviewId: String,
            staffReview: String,
            staffRating: Number
        }
    },

    getStaffReviewByUser: {
        url: `${backendURL}/api/staff/review/review-user/:userId`,
        method: "GET",
        data: {
            userId: String
        }
    },

    getAllStaffsReview: {
        url: `${backendURL}/api/staff/review/all`,
        method: "GET"
    },

    searchStaff: {
        url: `${backendURL}/api/staff/review/search`,
        method: "GET",
        data: {
            keyword: String
        }
    },

    staffFilter: {
        url: `${backendURL}/api/staff/review/filter`,
        method: "GET",
        data: {
            minPrice: Number,
            maxPrice: Number,
            staffCategory: String
        }
    },

    productReview:{
        url: `${backendURL}/api/product/review/post-review/:productId`,
        method: "POST",
        data: {
            userId: String,
            productId: String,
            productReview: String,
            productRating: Number
        }
    },

    productReviewList:{
        url: `${backendURL}/api/product/review/get-review/:productId`,
        method: "GET",
        data: {
            productId: String
        }
    },

    productReviewDelete:{
        url: `${backendURL}/api/product/review/delete-review/:reviewId`,
        method: "DELETE",
        data: {
            reviewId: String
        }
    },

    productReviewUpdate:{
        url: `${backendURL}/api/product/review/update-review/:reviewId`,
        method: "POST",
        data: {
            reviewId: String,
            productReview: String,
            productRating: Number
        }
    },

    searchProduct: {
        url: `${backendURL}/api/product/review/search`,
        method: "GET",
        data: {
            keyword: String
        }
    },

    productFilter: {
        url: `${backendURL}/api/product/review/filter`,
        method: "GET",
        data: {
            minPrice: Number,
            maxPrice: Number,
            productCategory: String
        }
    },

    signUp : {
        url: `${backendURL}/api/user/register`,
        method: "POST",
        data: {
            name: String,
            email: String,
            password: String,
            profilePic: String,
            role: String
        }
    },

    signIn :{
        url: `${backendURL}/api/user/login`,
        method: "POST",
        data: {
            email: String,
            password: String
        }
    },

    current_user :{
        url: `${backendURL}/api/user/user-details`,
        method: "GET"
    },

    logout: {
        url: `${backendURL}/api/user/logout`,
        method: "GET"
    },

    allUser: {
        url: `${backendURL}/api/user/admin/users`,
        method: "GET"
    },

    updateUser: {
        url: `${backendURL}/api/user/update-user`,
        method: "POST",
        data: {
            userId: String,
            name: String,
            email: String,            
            role: String
        }
    },

    getUserDetailsId: {
        url: `${backendURL}/api/user/admin/user-details/:userId`,
        method: "GET",
        // data: {
        //     userId: String
        // }
    },

    getUser: {
        url: `${backendURL}/api/user/user/:id`,
        method: "GET"
    },

    adminAuthIn: {
        url: `${backendURL}/api/user/admin-login`,
        method: "POST",
        data: {
            email: String,
            password: String
        }
    }





}