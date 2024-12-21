import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../config/constants";
import { Post } from "../Posts/postSlice";
// import { User } from "../User/userSlice";

export interface CurrentUser{
    id: string;
    email: string;
    firstName: string;
    lastName?:string;
    profileImageURL: string;
    bio?: string;
    followings: [],
    bookmarkedPosts: Post[]
}

// Define the initial state interface
interface AuthState {
    isAuthenticated: boolean;
    user: CurrentUser | null;
    status: "idle" | "loading" | "success" | "error";
    error: string | null;
  }
  
  // Initial state
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    status: "idle",
    error: null,
  };

export const fetchUser = createAsyncThunk<CurrentUser, string, {rejectValue:string}>(
    "user/getCurrentUser",
    async (token, {rejectWithValue})=>{
        try{
            const response = await axios.get(`${baseURL}/api/users/`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data as CurrentUser;
        }catch(error){
            if (error instanceof Error) {
                return rejectWithValue(error.message);
              }
              return rejectWithValue("An unknown error occurred");
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action){
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        clearUser(state){
            state.isAuthenticated = false;
            localStorage.removeItem("QP-authToken")
        }
        
    }, 
    extraReducers: (builder) =>{
        builder
        .addCase(fetchUser.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.status = "success";
          state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });
    }
})

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;