import {
  BASE_URL,
  toastError,
  toastSuccess,
  useGlobalContext,
} from "../contexts/GlobalContext";
import axios from "axios";



const token = localStorage?.getItem('accessToken');
console.log(token);

export const getAllBlogs = async (limit: number = 20, page: number = 1) => {
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

export const getBlog = async (blogId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/blog/${blogId}`);
    return response.data;
  } catch (error) {
    toastError(error.message);
    throw error;
  }
};

export const createBlog = async (data: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/blog/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
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
    const response = await axios.put(`${BASE_URL}/blog/blog-content/${blogId}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      }
    });
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
