import { createSlice } from "@reduxjs/toolkit";


const initialAuthState = {
    isAuthenticated : false,
    token: '',
}
const authSlice = createSlice({
    name: 'authorization',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;   
            state.token = action.payload;
            localStorage.setItem('token-redux', state.token)      
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem('token-redux')
        }
    }
});

export default authSlice.reducer;
export const authActions = authSlice.actions;