import { createSlice } from "@reduxjs/toolkit";


const initialThemeState = {
    isDark : false
}
const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeState,
    reducer: {
        toggleTheme : (state)=>{
            state.isDark = !state.isDark;
        }
    }
})

export default themeSlice.reducer;
export const themeActions = themeSlice.actions