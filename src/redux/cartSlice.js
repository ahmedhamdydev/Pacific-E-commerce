import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], 
    totalCartPrice: 0, 
    shippingCost: 120, 
    total: 0, 
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(
                (cartItem) => cartItem._id === item._id
            );

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.items.push({ ...item });
            }

            state.totalCartPrice = state.items.reduce(
                (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
                0
            );
            state.total = state.totalCartPrice + state.shippingCost;
        },

        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item._id === id);
            if (item) {
                item.quantity = quantity;

                state.totalCartPrice = state.items.reduce(
                    (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
                    0
                );
                state.total = state.totalCartPrice + state.shippingCost;
            }
        },

        updateTotalCartPrice: (state, action) => {
            state.totalCartPrice = action.payload;
            state.total = state.totalCartPrice + state.shippingCost;
        },

        updateShippingCost(state, action) {
            state.shippingCost = action.payload;
            state.total = state.totalCartPrice + state.shippingCost;
        },

        deletePro: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload); 
        },

        clearCart(state) {
            state.items = [];
            state.totalCartPrice = 0;
            state.total = state.shippingCost; 
        }
    },
});

export const updateTotalCartPrice = (price) => ({
    type: 'cart/updateTotalCartPrice',
    payload: price,
});

export const { addToCart, updateQuantity, updateShippingCost, deletePro, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
