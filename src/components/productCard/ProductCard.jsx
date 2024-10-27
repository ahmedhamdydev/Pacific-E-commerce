import React from "react";
import styles from "./productCard.module.css";
import style from "../productCardSeller/productCardSeller.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const ProductCard = ({ img, title, price, rate, priceAfterDisc, id, onAddToWishlist, color }) => {
    const productIem = {
        productId: id,
        color: color,
    };
    const queryClient = useQueryClient();
    const handleAddCartItem = async (product) => {
        const response = await axios.post(
            "http://localhost:3000/api/v1/cart/",
            product,
            {
                withCredentials: true,
            }
        );
        return response.data;
    };
    const mutation = useMutation(handleAddCartItem, {
        onSuccess: () => {
            toast.success("Product added to cart successfully!");
            queryClient.refetchQueries("cart length");
        },
        onError: (err) => {
            toast.error("Please Login First");
        },
    });
    const handleAddToCart = () => {
        mutation.mutate(productIem);
    };
    return (
        <div className={style.productCard}>
            <div className={style.productCardImg}>
                <img src={img} alt={title} />
                <div className={style.productCardImgLayout}>
                    <div className={style.layout}></div>
                    <button onClick={onAddToWishlist} className="btn ">
                        <i className={`fa-regular fa-heart ${styles.heart}`}></i>
                    </button>{" "}
                    <div className={styles.productsBtn}>
                        <button onClick={handleAddToCart}>
                            add to cart <i class="fa-solid fa-arrow-right"></i>
                        </button>
                        <Link to={`/ProductPage/${id}`}>
                            <button>
                                view product <i className="fa-regular fa-eye"></i>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.productCardRate}>
                <i className={`fa-solid fa-star ${rate >= 1 ? styles.active : ""}`}></i>
                <i className={`fa-solid fa-star ${rate >= 2 ? styles.active : ""}`}></i>
                <i className={`fa-solid fa-star ${rate >= 3 ? styles.active : ""}`}></i>
                <i className={`fa-solid fa-star ${rate >= 4 ? styles.active : ""}`}></i>
                <i className={`fa-solid fa-star ${rate >= 5 ? styles.active : ""}`}></i>
            </div>
            <p className={styles.productTitle}>{title}</p>
            <div className={styles.productPrice}>
                <p
                    style={{
                        textDecoration:
                            price === priceAfterDisc || priceAfterDisc === 0
                                ? "none"
                                : "lineThrought",
                        color:
                            price === priceAfterDisc || priceAfterDisc === 0
                                ? "black"
                                : "#656565",
                    }}
                >
                    {price} $
                </p>

                <p
                    style={{
                        display:
                            price === priceAfterDisc || priceAfterDisc === 0
                                ? "none"
                                : "inline-block",
                    }}
                >
                    {!priceAfterDisc ? price : priceAfterDisc} $
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
