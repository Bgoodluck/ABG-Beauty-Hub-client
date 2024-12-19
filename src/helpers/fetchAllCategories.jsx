import { summaryApi } from "../common";



const fetchAllCategories = async(staffCategory)=>{
    try {
        const response = await fetch(summaryApi.allStaffCategories.url,{
            method: summaryApi.allStaffCategories.method,
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                staffCategory: staffCategory  // Changed to match backend expectation
            })
        });

        const responseData = await response.json();

        // Check if the request was successful
        if (responseData.success) {
            return responseData;  // Return the full response object
        } else {
            throw new Error(responseData.message || "Failed to fetch categories");
        }
    } catch (error) {
        console.error("Error in fetchAllCategories:", error);
        throw error;
    }
}

export default fetchAllCategories;