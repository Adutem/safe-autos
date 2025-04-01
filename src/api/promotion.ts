import {
  BASE_URL,
  toastError,
  toastSuccess,
  useGlobalContext,
} from "../contexts/GlobalContext";
import axios from "axios";



const token = localStorage?.getItem('accessToken');
console.log(token);

export const getAllPromotions = async (limit: number = 20, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog`, {
      params: { limit, page }
    });
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const getPromotion = async (blogId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/${blogId}`);
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const createPromotion = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/blog/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }
    });
    toastSuccess("Promotion created successfully");
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const updatePromotion = async (blogId: string, data: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/blog/blog-content/${blogId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }
    });
    toastSuccess("Promotion updated successfully");
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const deletePromotion = async (blogId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/blogs/${blogId}`);
    toastSuccess("Promotion deleted successfully");
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const trackPromotionView = async (blogId: string) => {
  try {
    await axios.post(`${BASE_URL}/blog/add-view/${blogId}`);
  } catch (error) {
    console.error("Error tracking blog view:", error);
    throw error;
  }
};
