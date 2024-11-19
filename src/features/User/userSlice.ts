// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import { baseURL } from "../../config/constants";

// // define the post type
// interface UserPost {
//     id: string,
//     content: string,
//     imageUrl: string | null,
//     likes: number,
//     author: {
//         imageurl: string | null
//     }
//     createdAt: string;
//     updatedAt: string;
// }

// type ThunkAPI = {
//     rejectValue: string;
//   };

// export const fetchUserPosts = createAsyncThunk<UserPost[], string, ThunkAPI>(
//     "user/getPosts",
//     async (token, { rejectWithValue }) => {
//       try {
//         const response = await axios.get(`${baseURL}/api/users/posts`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data as UserPost[];
//       } catch (error) {
//         console.log(error);
//         if (error instanceof Error) {
//           return rejectWithValue(error.message);
//         }
//         return rejectWithValue("An unknown error occurred");
//       }
//     }
// )


// export const userSlice = createSlice({
//     name:"user",
//     initialState: {
//         posts: [] as UserPost[],
//         status: "idle",
//         error: null as string | null
//     },
//     reducers: {},
//     extraReducers: (builder) => {

//         //  for user posts
//         builder
//             .addCase(fetchUserPosts.pending, (state) => {
//                 state.status = "loading..";
//             })
//             .addCase(fetchUserPosts.fulfilled, (state, action) => {
//                 state.status = "success";
//                 state.posts = action.payload;
//             })
//             .addCase(fetchUserPosts.rejected, (state, action) => {
//                 state.status = "error";
//                 state.error = action.payload || "Failed to fetch posts";
//             });

//     }

// })

// export default userSlice.reducer;