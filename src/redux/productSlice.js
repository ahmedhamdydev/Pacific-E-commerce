import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:3000/api/v1/products');
    console.log(response.data.data.documents);
    return response.data.data.documents; // Assuming the response structure
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle', // idle, loading, succeeded, failed
        error: null,

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export default productsSlice.reducer;
