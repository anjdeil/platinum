import CategoryType from "@/types/pages/shop/categories";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
  categories: CategoryType[];
  loading: boolean | undefined;
}

const initialState: CategoriesState = {
  loading: undefined,
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<CategoryType[]>) {
      state.categories = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setCategories, setLoading } = categoriesSlice.actions;
export default categoriesSlice;
