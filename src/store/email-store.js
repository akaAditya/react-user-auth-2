import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name: 'email',
    initialState: '',
    reducers: {
        addEmail(state, action) {
            state.email = action.payload;
        }
    }
})
export default emailSlice.reducer;
export const emailActions = emailSlice.actions;