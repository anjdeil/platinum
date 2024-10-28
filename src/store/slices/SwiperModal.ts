import { ProductImageType } from "@/types/components/shop/product/products";
import { createSlice } from "@reduxjs/toolkit";

export interface SwiperModalState {
    data: ProductImageType[],
    currentSlide: number,
}

const initialState: SwiperModalState = {
    data: [],
    currentSlide: 0,
};

const SwiperModal = createSlice({
    name: 'swiperModal',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setCurrentSlide: (state, action) => {
            state.currentSlide = action.payload;
        },
    },
})

export const { setData, setCurrentSlide } = SwiperModal.actions;
export default SwiperModal.reducer;