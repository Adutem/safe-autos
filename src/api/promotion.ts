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
    const response = await axios.get(`${BASE_URL}/promotion/all`, {
      params: { limit, page }
    });
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const getPromotion = async (promotionId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/promotion/${promotionId}`);
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const createPromotion = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/promotion/create`, data, {
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

export const updatePromotion = async (promotionId: string, data: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/promotion/${promotionId}`, data, {
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

export const deletePromotion = async (promotionId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/promotions/${promotionId}`);
    toastSuccess("Promotion deleted successfully");
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const trackPromotionView = async (promotionId: string) => {
  try {
    await axios.post(`${BASE_URL}/promotion/add-view/${promotionId}`);
  } catch (error) {
    console.error("Error tracking promotion view:", error);
    throw error;
  }
};
