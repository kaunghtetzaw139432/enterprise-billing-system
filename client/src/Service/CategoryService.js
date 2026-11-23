import axios from "axios";


const API_URL = "http://localhost:3000/api/v1.0/admin/categories";
const getToken = () => {
    return localStorage.getItem("token");
};
export const addCategory = async (category) => {
    try {
        const formData = new FormData();

        formData.append("name", category.name);
        formData.append("description", category.description);
        formData.append("bgColor", category.bgColor);

        if (category.image) {
            formData.append("images", category.image);
        }

        const response = await axios.post(API_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${getToken()}`
            }
        });

        return response.data;

    } catch (error) {
        console.error("Error adding category:", error);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                "Authorization": `Bearer ${getToken()}` 
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching all categories:", error);
        throw error;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        const response = await axios.delete(`${API_URL}/${categoryId}`, {
            headers: {
                "Authorization": `Bearer ${getToken()}` 
            }
        });
        return response.data; 
    } catch (error) {
        console.error("Error deleting category with ID:", categoryId, error);
        throw error;
    }
};