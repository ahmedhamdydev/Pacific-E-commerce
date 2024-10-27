import { configureStore, createSlice } from "@reduxjs/toolkit";
import cartReducer from "../redux/cartSlice"
import productReducer from "../redux/cartSlice"
import wishlistReducer from "../redux/wishlistSlice";


const userSlice= createSlice({
    name: "user",
    initialState: {
        userData:{},
        userId: null,
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
})

export const { setUserId , setUserData} = userSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        products: productReducer,
        cart: cartReducer, 
        wishlist: wishlistReducer,
    },
});


export default store;