import React, { useEffect, useState } from "react";
import styles from "./productCategory.module.css";
import Header from "../../components/Title/Header";
import ProductCard from "../../components/productCard/ProductCard";
import { useDispatch } from "react-redux";
import axios from "axios";
import productCat from "../../assets/productCat.avif";
import toast from "react-hot-toast";
import { addToWishlist } from "../../redux/wishlistSlice";
import Sidebar from "../../components/ProductCategory/Sidebar";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "react-query";

const ProductCategory = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [disableNext, setDisableNext] = useState(false);
    const dispatch = useDispatch();

    const location = useLocation(); 
    const selectedSubcategoryId = location.state?.subcategoryId;
    const search = location.state?.searchValue


    const fetchProducts = async (page) => {
        try {
            let url;

            if (selectedSubcategoryId) {
                url = `http://localhost:3000/api/v1/subcategories/${selectedSubcategoryId}/products/subcategory?page=${page}&limit=9`;
            } else if (search) {
                url = `http://localhost:3000/api/v1/products?keyword=${search}&page=${page}&limit=9`;
            } else {
                url = `http://localhost:3000/api/v1/products?page=${page}&limit=9`;
            }
            const response = await axios.get(
                `${url}`,
            );
            const data = response.data.data.documents;
            console.log("data is", data);
            console.log("resultss is", response.data.results);


            setDisableNext (response.data.results / 9)


            setProducts(data);
            setTotalPages(response.data.paginateResult.NumOfPages || 1);
            console.log("setTotalPages is", response.data.paginateResult.NumOfPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    

    const queryClient = useQueryClient();
    const handleAddToWishlist = async (productToAdd) => {
        try {
            await axios.post(
                "http://localhost:3000/api/v1/wishlist",
                { productId: productToAdd._id },
                { withCredentials: true }
            );
            dispatch(addToWishlist(productToAdd));
            queryClient.refetchQueries("wish length");
            toast.success("Product added to Wishlist");
        } catch (error) {
            console.error("Error adding product to Wishlist:", error);
            toast.error("Failed to add product to Wishlist");
        }
    };


    const handleProductsFetch = (filteredProducts) => {
        setFilteredProducts(filteredProducts);
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        fetchProducts(selectedSubcategoryId); 
    }, [selectedSubcategoryId,search]);

    return (
        <div>
            {/* Page header */}
            <Header
                title={"Product"}
                details={"Home > Product"}
                imgPath={productCat}
            />

            <div className="container mt-4">
                <div className="row">
                    {/* Sidebar Component */}
                    <div className="col-md-3">
                        <Sidebar onProductsFetch={handleProductsFetch} />
                    </div>

                    {/* Product display */}
                    <div className="col-md-9">
                        <div className="row">
                            <div className={`container ${styles.productsCollection}`}>
                                {(filteredProducts.length > 0 ? filteredProducts : products).map(
                                    (product) => (
                                        <div
                                            key={product._id}
                                            className={styles.productSellerContainer}
                                        >
                                            <ProductCard
                                                id={product._id}
                                                className={styles.product}
                                                title={product.title}
                                                price={Math.round(product.price)}
                                                rate={Math.round(product.ratingsAverage)}
                                                img={product.imageCover}
                                                priceAfterDisc={product.priceAfterDisc}
                                                onAddToWishlist={() => handleAddToWishlist(product)}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>


                        {/* Pagination controls */}
                        <div className="row mt-4">
                            <div className="col-12 d-flex justify-content-between">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>

                                    {/* <span>
                                        Page {currentPage} of {totalPages}
                                    </span> */}

                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || disableNext < 1}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brands Section */}
                <div className="row text-center mt-5">
                    <div className="col-2">
                        <img
                            src={require("../../assets/Nike-Logo.jpg")}
                            alt="Nike"
                            className={`img-fluid ${styles.fixedSizeImg}`}
                        />
                    </div>
                    <div className="col-2">
                        <img
                            src={require("../../assets/puma-logo-9869295F1B-seeklogo.com.png")}
                            alt="Puma"
                            className={`img-fluid ${styles.fixedSizeImg}`}
                        />
                    </div>
                    <div className="col-2">
                        <img
                            src={require("../../assets/Dior_Logo.svg.png")}
                            alt="Dior"
                            className={`img-fluid ${styles.fixedSizeImg}`}
                        />
                    </div>
                    <div className="col-2">
                        <img
                            src={require("../../assets/Gucci-Logo.png")}
                            alt="Gucci"
                            className={`img-fluid ${styles.fixedSizeImg}`}
                        />
                    </div>
                    <div className="col-2">
                        <img
                            src={require("../../assets/Givenchy_logo.jpg")}
                            alt="Givenchy"
                            className={`img-fluid ${styles.fixedSizeImg}`}
                        />
                    </div>
                    <div className="col-2">
                        <img
                            src={require("../../assets/town-team-logo.avif")}
                            alt="Town Team"
                            className={`img-fluid ${styles.fixedSizeImg}`}
                        />
                    </div>
                </div>

                {/* Additional Products Section */}
                <div className="row text-center mt-5">
                    <div className={`container ${styles.productsCollection}`}>
                        {products.slice(0, 3).map((product) => (
                            <div key={product._id}>
                                <img
                                    src={product.imageCover}
                                    alt={product.title}
                                    className={`img-fluid mb-5 ${styles.fixedSizePic}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;
