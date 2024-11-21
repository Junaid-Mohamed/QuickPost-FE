import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "../../config/constants";
import { CurrentUser } from "../Auth/authSlice";
import { Post, ThunkAPI } from "../Posts/postSlice";



export interface User{
    id: string;
    firstName: string;
    lastName?: string;
    email:string;
    bio?:string;
    profileImageURL?: string;
    bookmarkedPosts: Post[]
}



export const fetchBookmarkedPost = createAsyncThunk<User[], {token: string},ThunkAPI>(
    "users/fetchBookmarkedPosts", 
    async ({token}, {rejectWithValue} )=>{
        try{
            const response = await axios.get(`${baseURL}/api/users/posts/bookmark`,
                {
                headers:{
                    Authorization: `Bearer ${token}`}
                })
            return response.data as User[];
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred"); 
        }
    }
)


export const updateBookmarkedPost = createAsyncThunk<User[], {postId:string, isBookmarked:boolean, token: string},ThunkAPI>(
    "users/updateBookmarkedPosts", 
    async ({postId, isBookmarked, token}, {rejectWithValue} )=>{
        try{
            const response = await axios.put(`${baseURL}/api/users/posts/bookmark`,
                {
                    postId,isBookmarked
                },
                {
                headers:{
                    Authorization: `Bearer ${token}`}
                })
            return response.data as User[];
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred"); 
        }
    }
)

//  to update user profile

export const updateUserProfile = createAsyncThunk<CurrentUser, {profileImage: string, bio: string,token:string}, ThunkAPI>(
    "users/updateUserProfile",
    async ({profileImage, bio, token}, {rejectWithValue})=>{
        try{
            console.log("inside user slice", profileImage, bio)
            const response = await axios.put(`${baseURL}/api/users/profile/userprofile`,
                {profileImage,bio},
                {headers: { Authorization: `Bearer ${token}`}}
            )
            return response.data as CurrentUser;
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred"); 
        }
    }
)

export const userSlice = createSlice({
    name:"user",
    initialState: {
        user: null,
        bookmarkPosts: [] as Post[],
        status: "idle",
        error: null as string | null
    },
    reducers: {},
    extraReducers: (builder) => {

        // to update user bookmark posts
        builder
        .addCase(updateBookmarkedPost.pending, (state) => {
          state.status = "loading..";
        })
        .addCase(updateBookmarkedPost.fulfilled, (state, action) => {
          state.status = "success";
          state.bookmarkPosts = action.payload.bookmarkedPosts;
          toast.success(`bookmark updated successfully`)
        })
        .addCase(updateBookmarkedPost.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        //  to fetch user bookmarked posts
        builder
        .addCase(fetchBookmarkedPost.pending, (state) => {
          state.status = "loading..";
        })
        .addCase(fetchBookmarkedPost.fulfilled, (state, action) => {
          state.status = "success";
        //    this state update should not be like this, it should be like add when bookmarked and filter when removed bookmark
          state.bookmarkPosts = action.payload.bookmarkedPosts;
        })
        .addCase(fetchBookmarkedPost.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        builder
        .addCase(updateUserProfile.pending, (state) => {
          state.status = "loading..";
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
          state.status = "success";
          state.user = action.payload;
          toast.success("User profile updated successfully.")
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });


    }

})

export default userSlice.reducer;