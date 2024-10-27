
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import ProductCard from '../productCard/ProductCard';
import styles from './productSlider.module.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addToWishlist } from "../../redux/wishlistSlice";
import { useQueryClient } from 'react-query';
const ProductSlider = ({ products }) => {
    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    // Chunk products into groups of four
    const productChunks = chunkArray(products, 4);
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const handleAddToWishlist = async (productToAdd) => {
        try {
            
            await axios.post(
                "http://localhost:3000/api/v1/wishlist",
                { productId: productToAdd }, 
                { withCredentials: true }
            );

            // Dispatch the action to update the wishlist in Redux
            dispatch(addToWishlist(productToAdd));
            queryClient.refetchQueries("wish length");
            toast.success("Product added to Wishlist");
        } catch (error) {
            console.error("Error adding product to Wishlist:", error);
            toast.error("please Login First");
        }
    };
    return (
        <div >
            <div id="ProductCursol" className={`carousel carousel-dark slide ${styles.productSlider}`} data-bs-ride="carousel">
                <div className={`carousel-indicators ${styles.indecator}`}>
                    {productChunks.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#ProductCursol"
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {productChunks.map((chunk, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? 'active' : ''}`}
                            data-bs-interval="10000"
                        >
                            <div className={styles.sliderContent}>
                                {chunk.map(product => (
                                    <div className={styles.psroductSliderCardsContainer}>
                                    <ProductCard key={product._id} id={product._id} title={product.title} price={product.price} rate={product.ratingsAverage} img={product.imageCover} priceAfterDisc={product.priceAfterDisc} onAddToWishlist={() => handleAddToWishlist(product)} />
                                    </div>
                                    
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#ProductCursol"
                    data-bs-slide="prev"
                >

                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#ProductCursol"
                    data-bs-slide="next"
                >

                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default ProductSlider;
