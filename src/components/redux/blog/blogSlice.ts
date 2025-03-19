import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getBlog as getBlogApi,
  getAllBlogs as getAllBlogsApi,
  createBlog as createBlogApi,
  updateBlog as updateBlogApi,
  deleteBlog as deleteBlogApi,
} from "@/api/blog";
import { BlogState, BlogApiResponse, AllBlogsApiResponse } from "./interface";

// initial blog state
const INIT_STATE: BlogState = {
  isFetchingBlogs: false,
  blogsFetched: false,
  fetchError: "",
  blogs: null,
  isCreatingBlog: false,
  blogCreated: false,
  createError: "",
  isUpdatingBlog: false,
  blogUpdated: false,
  updateError: "",
  isDeletingBlog: false,
  blogDeleted: false,
  deleteError: "",
};

// Fetch blogs
export const fetchBlogs = createAsyncThunk(
  "fetchBlogs",
  async (data: void, thunkAPI) => {
    try {
      const blogsResponse: Awaited<Promise<AllBlogsApiResponse>> =
        (await getAllBlogsApi()) as unknown as AllBlogsApiResponse;
      return blogsResponse.blogs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Create blog
export const createBlog = createAsyncThunk(
  "createBlog",
  async (data: any, thunkAPI) => {
    try {
      const blogResponse: Awaited<Promise<BlogApiResponse>> =
        (await createBlogApi(data)) as unknown as BlogApiResponse;
      return blogResponse.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  "updateBlog",
  async ({ blogId, data }: any, thunkAPI) => {
    try {
      const blogResponse: Awaited<Promise<BlogApiResponse>> =
        (await updateBlogApi(blogId, data)) as unknown as BlogApiResponse;
      return blogResponse.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
  "deleteBlog",
  async (blogId: any, thunkAPI) => {
    try {
      const blogResponse: Awaited<Promise<BlogApiResponse>> =
        (await deleteBlogApi(blogId)) as unknown as BlogApiResponse;
      return blogResponse.blog;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const blogSlice = createSlice({
  name: "Blog",
  initialState: INIT_STATE,
  reducers: {
    resetFetchBlogs: (state) => {
      state.isFetchingBlogs = false;
      state.blogsFetched = false;
      state.fetchError = "";
    },

    resetCreateBlog: (state) => {
      state.isCreatingBlog = false;
      state.blogCreated = false;
      state.createError = "";
    },

    resetUpdateBlog: (state) => {
      state.isUpdatingBlog = false;
      state.blogUpdated = false;
      state.updateError = "";
    },

    resetDeleteBlog: (state) => {
      state.isDeletingBlog = false;
      state.blogDeleted = false;
      state.deleteError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.isFetchingBlogs = true;
        state.blogsFetched = false;
        state.fetchError = "";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isFetchingBlogs = false;
        state.blogsFetched = true;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isFetchingBlogs = false;
        state.blogsFetched = false;
        state.fetchError = action.payload as string;
      })
      .addCase(createBlog.pending, (state) => {
        state.isCreatingBlog = true;
        state.blogCreated = false;
        state.createError = "";
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isCreatingBlog = false;
        state.blogCreated = true;
        state.blogs
          ? state.blogs.push(action.payload)
          : (state.blogs = [action.payload]);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isCreatingBlog = false;
        state.createError = action.error.message || "";
      })
      .addCase(updateBlog.pending, (state) => {
        state.isUpdatingBlog = true;
        state.blogUpdated = false;
        state.updateError = "";
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isUpdatingBlog = false;
        state.blogUpdated = true;
        state.blogs = !state.blogs
          ? []
          : state.blogs.map((blog) => {
              if (blog._id === action.payload._id) {
                return action.payload;
              } else {
                return blog;
              }
            });
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isUpdatingBlog = false;
        state.updateError = action.error.message || "";
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isDeletingBlog = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isDeletingBlog = false;
        state.blogDeleted = true;
        state.blogs = !state.blogs
          ? []
          : state.blogs.filter((blog) => blog._id !== action.payload._id);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isDeletingBlog = false;
        state.deleteError = action.error.message || "";
      });
  },
});

export default blogSlice.reducer;
export const {
  resetCreateBlog,
  resetFetchBlogs,
  resetUpdateBlog,
  resetDeleteBlog,
} = blogSlice.actions;
