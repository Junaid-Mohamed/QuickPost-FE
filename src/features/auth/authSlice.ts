import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
}

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
        
    }
})

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;