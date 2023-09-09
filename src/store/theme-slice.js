import { createSlice } from "@reduxjs/toolkit";


const initialThemeState = {
    isDark : JSON.parse(localStorage.getItem('darkMode')) || false
}
const themeSlice = createSlice({
    name: 'darkMode',
    initialState: initialThemeState,
    reducers: {
        toggleTheme : (state)=>{
            state.isDark = !state.isDark;
            localStorage.setItem('darkMode',JSON.stringify(state.isDark))
        }
    }
})

export default themeSlice.reducer;
export const themeActions = themeSlice.actions;