import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import API from './api';
import { IProduct } from '../types/productTypes';

type ProductData = {
  success: boolean;
  products: IProduct[];
  productsCount: number;
  resultPerPage: number;
  filteredProductsCount: number;
};
export interface IProductState {
  product_data: ProductData;
  status: string;
  errorMessage: string;
}
const initialState: IProductState = {
  product_data: {
    success: false,
    products: [],
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
  },
  status: 'READY',
  errorMessage: '',
};

export const fetchProduct = createAsyncThunk('product/fetch', async () => {
  const result = await API.get('products');
  return result.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<ProductData>) => {
        state.product_data = action.payload;
        state.status = 'READY';
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'ERROR';
        state.errorMessage = action.error.message || '';
      });
  },
});
export default productSlice.reducer;
