import { BlogInterface, BlogPost } from "../../blog/type";

export interface ApiResponse {
  success: boolean;
  status: number;
  message: string;
}


export interface BlogState {
  isFetchingBlogs: boolean;
  blogsFetched: boolean;
  fetchError: string;
  blogs: Array<BlogInterface> | null;
  isCreatingBlog: boolean;
  blogCreated: boolean;
  createError: string;
  isUpdatingBlog: boolean;
  blogUpdated: boolean;
  updateError: string;
  isDeletingBlog: boolean;
  blogDeleted: boolean;
  deleteError: string;
}

export interface BlogApiResponse extends ApiResponse {
  blog: BlogInterface;
}

export interface AllBlogsApiResponse extends ApiResponse {
  blogs: Array<BlogInterface>;
}
