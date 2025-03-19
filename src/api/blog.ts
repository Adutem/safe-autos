import {
  BASE_URL,
  toastError,
  toastSuccess,
  useGlobalContext,
} from "../contexts/GlobalContext";
import axios from "axios";

export const getAllBlogs = async (limit: number = 20, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const getBlog = async (blogId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const createBlog = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/blogs`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    toastSuccess("Blog created successfully");
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const updateBlog = async (blogId: string, data: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/blogs/${blogId}`, data);
    toastSuccess("Blog updated successfully");
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const deleteBlog = async (blogId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/blogs/${blogId}`);
    toastSuccess("Blog deleted successfully");
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};
