import { createSlice } from "@reduxjs/toolkit";

interface MenuCatState {
    isOpen: boolean;
    CategoryActiveHover: number | null;
}

const initialState: MenuCatState = {
    isOpen: false,
    CategoryActiveHover: null,
}

export const MenuCategoriesSlice = createSlice({
    name: 'MenuCategories',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.CategoryActiveHover = action.payload;
        },
        setMenuOpen: (state, action) => {
            state.isOpen = action.payload;
        }
    },
})

export default MenuCategoriesSlice;