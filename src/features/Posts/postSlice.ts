import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../config/constants";

// define the post type

// interface Post{
//     id: string;
//     content: string;
//     imageUrl?:string;
//     author:{
//         id: string;
//         firstName: string;
//         lastName?: string;
//         email: string;
//         profileImageURL?: string;
//     };

//     createdAt: string;
//     updatedAt: string
// }

// //  define the state type
// interface PostState{
//     posts: Post[];
//     status: "idle" | "loading.." | "success" | "error";
//     error: string | null;
// }

// // Initial state
// const initialState: PostState = {
//     posts: [],
//     status: 'idle',
//     error: null
// }

// type ThunkAPI = {
//     rejectValue: string;
// }

// export const fetchPosts = createAsyncThunk<Post[], string, ThunkAPI>(
//     'posts/getPosts',
//     async(token,{rejectWithValue}): Post[] =>{
//     try{
//         const response = await axios.get(`${baseURL}/api/posts`,{
//             headers: {Authorization: `Bearer ${token}`}
//         });
//         return response.data as Post[];
//     }catch(error){
//         if(error instanceof Error){
//             return rejectWithValue(error.message)
//         }
        
//     }
// })

// export const postSlice = createSlice({
//     name:'posts',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         // fetchPosts
//         builder.addCase(fetchPosts.pending, (state)=>{
//             state.status="loading.."
//         })
//         builder.addCase(fetchPosts.fulfilled, (state,action)=>{
//             state.status="success";
//             state.posts = action.payload;
//         })
//         builder.addCase(fetchPosts.rejected, (state, action)=>{
//             state.status = "error";
//             state.error = typeof action.payload === "string"? action.payload : "Failed to fetch posts";
//     })
//     }
// })

// Define the Post type
export interface Post {
    id: string;
    content: string;
    imageUrl: string | null;
    likes: number;
    author: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      imageUrl: string | null;
    };
    createdAt: string;
    updatedAt: string;
  }
  
  // Define the return type of the thunk
  type ThunkAPI = {
    rejectValue: string;
  };
  
  export const fetchPosts = createAsyncThunk<Post[], string, ThunkAPI>(
    "posts/getPosts",
    async (token, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${baseURL}/api/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data as Post[];
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );

  export const createPost = createAsyncThunk<Post,{content:string; token:string}, ThunkAPI>(
    "posts/createPost",
    async ({content, token}, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${baseURL}/api/posts`, 
        {content},
        {
          headers: { Authorization: `Bearer ${token}` },
        });
        return response.data as Post;
      } catch (error) {
        if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return rejectWithValue("An unknown error occurred");
      }
    }
  );
  
  export const postSlice = createSlice({
    name: "posts",
    initialState: {
      posts: [] as Post[],
      status: "idle",
      error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        //  for fetchPosts
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = "loading..";
        //   state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = "success";
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });

        //  for createPosts
        builder
        .addCase(createPost.pending, (state) => {
          state.status = "loading..";
        //   state.error = null;
        })
        .addCase(createPost.fulfilled, (state, action) => {
          state.status = "success";
          console.log(action.payload);
          state.posts.unshift(action.payload);
        })
        .addCase(createPost.rejected, (state, action) => {
          state.status = "error";
          state.error = action.payload || "Failed to fetch posts";
        });
    },
  });
  
  export default postSlice.reducer;