/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode"

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const initialState = {
    blogs: [],
    responseStatus: "",
    responseMessage: "",
};

export const createBlog = createAsyncThunk(
    "blogs/createBlog",
    async (blog, { rejectWithValue }) => {
        try {
            const token = Cookies.get("converselyLoggedInUserToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.post(`${baseURL}/blog`, blog, {
                headers: {
                    "x-authorization": `Bearer ${user_id}`,
                    "Content-Type": "application/json"
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getBlogs = createAsyncThunk(
    "blogs/getBlogs",
    async () => {
        try {
            const token = Cookies.get("converselyLoggedInUserToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.get(`${baseURL}/blog`, {
                headers: {
                    "x-authorization": `Bearer ${user_id}`,
                    "Content-Type": "application/json"
                },
            });
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const getBlog = createAsyncThunk(
    "blogs/getBlog",
    async (blogId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("converselyLoggedInUserToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.get(
                `${baseURL}/blog/${blogId}`, {
                headers: {
                    "x-authorization": `Bearer ${user_id}`,
                    "Content-Type": "application/json"
                },
            });
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);

export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async (blog, { rejectWithValue }) => {
        try {
            const token = Cookies.get("converselyLoggedInUserToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.put(
                `${baseURL}/blog/${blog?.updateId}`,
                blog,
                {
                    headers: {
                        "x-authorization": `Bearer ${user_id}`,
                        "Content-Type": "application/json"
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (blogId, { rejectWithValue }) => {
        try {
            const token = Cookies.get("converselyLoggedInUserToken");
            const decodedData = jwtDecode(token);
            const user_id = decodedData?.id;

            const response = await axios.delete(
                `${baseURL}/blog/${blogId}`, {
                headers: {
                    "x-authorization": `Bearer ${user_id}`,
                    "Content-Type": "application/json"
                },
            });
            return response.data;
        } catch (error) {
            return error.response.data.message;
        }
    }
);


const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        resetBlogState: (state) => initialState,
    },
    extraReducers: (builder) => {
        // create reducers
        builder
        .addCase(createBlog.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(createBlog.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Blog Added Successfully";
        })
        .addCase(createBlog.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action?.error?.message;
        });

        // get all reducers
        builder
        .addCase(getBlogs.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
            state.blogs = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get All";
        })
        .addCase(getBlogs.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // get reducers
        builder
        .addCase(getBlog.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(getBlog.fulfilled, (state, action) => {
            state.blogs = action.payload;
            state.responseStatus = "success";
            state.responseMessage = "Get Single";
        })
        .addCase(getBlog.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

        // update reducers
        builder
        .addCase(updateBlog.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(updateBlog.fulfilled, (state, action) => {
            if (Array.isArray(state.blogs)) {
            state.blogs = state.blogs.map((blog) =>
                blog.id === action.payload._id ? action.payload : blog
            );
            } else {
            state.blogs = action.payload;
            }
            state.responseStatus = "success";
            state.responseMessage = "Blog Updated Successfully";
        })
        .addCase(updateBlog.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });

         // delete reducers
        builder
        .addCase(deleteBlog.pending, (state) => {
            state.responseStatus = "pending";
        })
        .addCase(deleteBlog.fulfilled, (state) => {
            state.responseStatus = "success";
            state.responseMessage = "Blog Deleted Successfully";
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            state.responseStatus = "rejected";
            state.responseMessage = action.payload;
        });
    },
});

export const { resetBlogState } = blogsSlice.actions;
export default blogsSlice.reducer;
