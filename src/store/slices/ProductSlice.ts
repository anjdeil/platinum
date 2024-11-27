import { ProductType } from "@/types/pages/shop";
import { createSlice } from "@reduxjs/toolkit";

export interface ProductSliceState {
    data: ProductType | null,
}

const initialState: ProductSliceState = {
    data: null,
};

const ProductSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
})

export const { setData } = ProductSlice.actions;
export default ProductSlice.reducer;