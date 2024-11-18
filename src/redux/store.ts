import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import { postSlice } from "../features/Posts/postSlice";
// import authReducer from "../features/auth/AuthSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        posts: postSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;