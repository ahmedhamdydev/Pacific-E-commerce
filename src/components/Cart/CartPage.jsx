import React from 'react'
import Header from '../../components/Title/Header';
import cartBanner from '../../assets/cart_banner.png';

const CartPage = () => {
    return (
        <div>
            <Header title={"Cart-Page"} details={"Home > Cart-Page"} imgPath={cartBanner} />

        </div>
    )
}

export default CartPage