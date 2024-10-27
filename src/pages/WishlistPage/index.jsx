import React, { useState, useEffect } from 'react';
import Header from "../../components/Title/Header";
import wishlistBanner from "../../assets/cart_banner.png";
import ProductCard from '../../components/productCard/ProductCard';
import axios from "axios";
import styles from './wishlistPage.module.css';
import { useDispatch } from "react-redux"; 
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { addToWishlist } from "../../redux/wishlistSlice"; 
import { useQueryClient } from 'react-query';

const WishlistPage = () => {
    const [products, setProducts] = useState([]); 
    const dispatch = useDispatch(); 

    const queryClient = useQueryClient();
    const fetchWishlist = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/wishlist", {
                withCredentials: true
            });
            const fetchedProducts = response?.data?.data || []; 
            setProducts(fetchedProducts);
            queryClient.refetchQueries("wish length");
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const handleRemoveFromWishlist = async (productId) => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/wishlist/${productId}`, {
                withCredentials: true
            });

            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));

            toast.success("Product removed from Wishlist");
        } catch (error) {
            console.error("Error removing product from Wishlist:", error);
            toast.error("Failed to remove product. Please try again.");
        }
    };

    const handleAddToWishlist = async (productToAdd) => {
        try {
            await axios.post(
                "http://localhost:3000/api/v1/wishlist",
                { productId: productToAdd }, 
                { withCredentials: true }
            );

            dispatch(addToWishlist(productToAdd));
            toast.success("Product added to Wishlist");
        } catch (error) {
            console.error("Error adding product to Wishlist:", error);
            toast.error("Please login first");
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    return (
        <div>
            <Header
                title={"Wishlist"}
                details={"Home > Wishlist"}
                imgPath={wishlistBanner}
            />
            <div className="container mt-4">
                <h2>Total Wishlist Items: {products.length}</h2>
                <div className="row">
                    {Array.isArray(products) && products.length > 0 ? (
                        products?.map((product) => (
                            <div key={product._id} className={`col-md-3 ${styles.productSellerContainer}`}>
                                <ProductCard
                                    id={product._id}
                                    className={styles.product}
                                    title={product.title}
                                    price={Math.round(product.price)}
                                    rate={product.ratingsAverage}
                                    img={product.imageCover}
                                    color={product.colors?.[0] || ""}
                                    priceAfterDisc={product.priceAfterDisc}
                                    onAddToWishlist={() => handleAddToWishlist(product)}
                                    onRemoveFromWishlist={() => handleRemoveFromWishlist(product._id)}
                                />
                                <button 
                                    className="btn mt-2 mb-5" 
                                    onClick={() => handleRemoveFromWishlist(product._id)}
                                    style={{
                                        backgroundColor: "#EF9E86",
                                        borderRadius: "5px",
                                    }}
                                >
                                    Remove from Wishlist
                                </button>
                            </div>
                        ))
                    ) : (
                        <div>
                            <img src={require('../../assets/wishlist-empty.png')} alt="Your wishlist is empty."
                                className={styles.fixedSizeImg} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;
