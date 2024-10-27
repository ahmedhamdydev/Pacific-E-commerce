import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [], // Initial empty array to store wishlist items
    },
    reducers: {
        addToWishlist: (state, action) => {
            // Check if the product is already in the wishlist
            const exists = state.items.some((item) => item._id === action.payload._id);
            if (!exists) {
                state.items.push(action.payload); // Add product to wishlist if it doesn't exist
            }
        },
        removeFromWishlist: (state, action) => {
            // Remove product from the wishlist
            state.items = state.items.filter((item) => item._id !== action.payload);
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
