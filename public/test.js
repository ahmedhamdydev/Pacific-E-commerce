// import React, { useEffect, useState } from "react";
// import { Col, Row, Button } from "react-bootstrap";
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProducts } from '../../redux/productSlice';
// import axios from "axios";

// // const { products } = useSelector((state) => state.allproducts);

// const ProductDetails = () => {
//     const [quantity, setQuantity] = useState(1); // Initialize quantity state
//     const { id } = useParams();
//     const dispatch = useDispatch();

//     // Get products and status from the Redux store
//     const products = useSelector((state) => state.products.items);
//     const productStatus = useSelector((state) => state.products.status);
//     const product = products.find((prod) => prod.id === parseInt(id)); // Find product by dynamic id

//     // Fetch products on mount if the status is idle
//     useEffect(() => {
//         if (productStatus === 'idle') {
//             dispatch(fetchProducts());
//         }
//     }, [dispatch, productStatus]);

//     // Increment quantity
//     const increment = () => {
//         setQuantity(quantity + 1);
//     };

//     // Decrement quantity, ensuring it doesn't go below 1
//     const decrement = () => {
//         if (quantity > 1) {
//             setQuantity(quantity - 1);
//         }
//     };

//     // Show loading message if products are still being fetched
//     if (productStatus === 'loading') {
//         return <p>Loading...</p>;
//     }

//     // Show error message if fetching products failed
//     if (productStatus === 'failed') {
//         return <p>Failed to load products.</p>;
//     }

//     // If no products or product with this id not found
//     if (!product) {
//         return <p>Product not found.</p>;
//     }
//     return (
//         <Row className="product-details mt-4 ">



//             // ده كان تعديل كويس من شات
//             <Col md={2}>
//                 <div className="product-gallery col-md-9" style={{ maxWidth: "90%", padding: "1px" }}>
//                     {product.images && product.images.map((img, index) => (
//                         <div className="mb-1" key={index}>
//                             <img
//                                 src={img}
//                                 alt={product.title}
//                                 className="img-fluid"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             </Col>



//             <Col md={2}>
//                 <div
//                     className="product-gallery col-md-9"
//                     style={{ maxWidth: "90%", padding: "1px" }}
//                 >
//                     <div className=" mb-1">
//                         <img
//                             src={products[1].images}
//                             alt={products[1].title}
//                             className="img-fluid "
//                         />
//                     </div>
//                     <div className=" mb-1">
//                         <img
//                             src={products[1].images}
//                             alt={products[1].title}
//                             className="img-fluid "
//                         />
//                     </div>
//                     <div className=" mb-1">
//                         <img
//                             src={products[1].images}
//                             alt={products[1].title}
//                             className="img-fluid"
//                         />
//                     </div>
//                     <div className=" mb-1">
//                         <img
//                             src={products[1].images}
//                             alt={products[1].title}
//                             className="img-fluid"
//                         />
//                     </div>
//                 </div>
//             </Col>
//             <Col md={5}>
//                 <div>
//                     {product ? (
//                         <img
//                             src={product.imageCover}
//                             alt={product.title}
//                             className="img-fluid"
//                         />
//                     ) : (
//                         <p>Product not found</p>
//                     )}
//                 </div>
//             </Col>
//             <Col md={5}>
//                 <div className="product-details-content">
//                     <h2>
//                         {products[1].title}
//                         <span
//                             className="badge ms-3 text-dark"
//                             style={{
//                                 backgroundColor: "#EF9E86",
//                                 borderRadius: "0",
//                             }}
//                         >
//                             {products[1].availability}
//                         </span>
//                     </h2>

//                     <Row>
//                         <Col md={4}>
//                             <div className="mb-3">
//                                 <h5>Price</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>Color</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>Size</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>Quantity</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>Availability</h5>
//                             </div>
//                         </Col>
//                         <Col md={2}>
//                             <div className="mb-3">
//                                 <h5>:</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>:</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>:</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>:</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>:</h5>
//                             </div>
//                         </Col>
//                         <Col md={6}>
//                             <div>
//                                 <h5>
//                                     ${products[1].price}
//                                     <span className="ms-1" style={{ color: "#EF9E86" }}>
//                                         {products[0].discount} Off
//                                     </span>
//                                 </h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>{products[1].colors}</h5>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>
//                                     <span className="ms-3">{products[1].size}</span>{" "}
//                                 </h5>
//                             </div>
//                             <div className="mb-3">
//                                 <p>
//                                     <button className="btn btn-light mx-1" onClick={decrement}>
//                                         -
//                                     </button>
//                                     {quantity.toString().padStart(2, "0")}
//                                     <button className="btn btn-light mx-2" onClick={increment}>
//                                         +
//                                     </button>
//                                 </p>
//                             </div>
//                             <div className="mb-3">
//                                 <h5>
//                                     <span style={{ color: "#EF9E86" }}>
//                                         {products[1].stock}  items in stock
//                                     </span>
//                                 </h5>
//                             </div>
//                         </Col>
//                     </Row>

//                     <div className="product-actions mt-4 ">
//                         <button
//                             className="btn btn-lg me-3 shadow"
//                             style={{
//                                 backgroundColor: "#EF9E86",
//                                 borderRadius: "5px",
//                             }}
//                         >
//                             Buy Now
//                         </button>
//                         <button
//                             className="btn btn-outline-secondary btn-lg shadow"
//                             style={{
//                                 borderRadius: "5px",
//                             }}
//                         >
//                             Add to Cart
//                         </button>
//                     </div>
//                 </div>
//             </Col>
//         </Row>
//     );
// };

// export default ProductDetails;




// ////////////////////////////////////////////////////////




// import React, { useEffect, useState } from "react";
// import styles from "./productCategory.module.css";
// import Header from "../../components/Title/Header";
// import ProductCard from "../../components/productCard/ProductCard";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import productCat from "../../assets/productCat.avif";
// import toast from "react-hot-toast";

// const ProductCategory = () => {
//     const [products, setProducts] = useState([]);
//     const fetchProducts = async () => {
//         const response = await axios.get("http://localhost:3000/api/v1/products");
//         const data = await response.data.data.documents;
//         // console.log(response.data.data.documents);
//         setProducts(data);
//         console.log(products);


//         const handleAddToWishlist = async (productToAdd) => {

//             console.log(productToAdd)
//             try {
//                 // Send the product to the server
//                 const response = await axios.post(
//                     "http://localhost:3000/api/v1/wishlist",
//                     productToAdd, // Send the product details to the server
//                     { withCredentials: true }
//                 );
//                 // console.log(response)
//                 // Update the Redux store only after successfully adding to the server
//                 Dispatch(addToWishlist(productToAdd));
//                 console.log("Product added to caWishlistrt on server and Redux:", productToAdd);
//                 toast.success("Product added to Wishlist")


//                 console.log("Product added to Wishlist on server:", response.data)
//                 return response.data;
//             } catch (error) {
//                 console.error("Error adding product to Wishlist:", error);
//                 throw error; // Ensure error is handled by mutation
//             }
//         };

//     };
//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     return (
//         <div>
//             <Header
//                 title={"Product"}
//                 details={"Home > Product"}
//                 imgPath={productCat}
//             />

//             <div className="container mt-4">
                // <div className="row">
                //     {/* Sidebar */}
                //     <div className="col-md-3">
                //         <div className="card">
                //             <div className="card-body">
                //                 <h5>Category</h5>
                //                 <ul className="list-unstyled">
                //                     <li>Dress</li>
                //                     <li>Accessories</li>
                //                     <li>Baby & Kids</li>
                //                     <li>Shoes</li>
                //                     <li>Jewelry</li>
                //                 </ul>
                //                 <h5>Price</h5>
                //                 <ul className="list-unstyled">
                //                     <li>
                //                         <input type="radio" name="price" /> Under $20
                //                     </li>
                //                     <li>
                //                         <input type="radio" name="price" /> $50-100
                //                     </li>
                //                     <li>
                //                         <input type="radio" name="price" /> $55-110
                //                     </li>
                //                     <li>
                //                         <input type="radio" name="price" /> $60-100
                //                     </li>
                //                     <li>
                //                         <input type="radio" name="price" /> $60-120
                //                     </li>
                //                 </ul>
                //                 <h5>Color</h5>
                //                 <div>
                //                     <span className="badge bg-danger me-1">&nbsp;</span>
                //                     <span className="badge bg-secondary me-1">&nbsp;</span>
                //                     <span className="badge bg-warning me-1">&nbsp;</span>
                //                 </div>
                //                 <h5 className="mt-4">Size</h5>
                //                 <ul className="list-unstyled ">
                //                     <li>
                //                         <input type="checkbox" /> M
                //                     </li>
                //                     <li>
                //                         <input type="checkbox" /> S
                //                     </li>
                //                     <li>
                //                         <input type="checkbox" /> L
                //                     </li>
                //                     <li>
                //                         <input type="checkbox" /> XL
                //                     </li>
                //                 </ul>
                //             </div>
                //         </div>
                //     </div>

                //     {/* Product Grid */}
                //     <div className="col-md-9">
                //         <div className="row">
                //             <form className="d-flex">
                //                 <input
                //                     type="text"
                //                     className="form-control me-2"
                //                     id="search"
                //                     placeholder="Product.."
                //                 />
                //                 <button
                //                     type="submit"
                //                     className="btn  text-white"
                //                     style={{
                //                         backgroundColor: "#EF9E86",
                //                         borderRadius: "5px",
                //                     }}
                //                 >
                //                     Search
                //                 </button>
//                             </form>
//                         </div>

//                         <div className="row">
//                             <div className={`container ${styles.productsCollection}`}>
//                                 {products.map(
//                                     (product, i) =>
//                                         i < 8 && (
//                                             <div className={styles.productSellerContainer}>
//                                                 <ProductCard
//                                                     key={product._id}
//                                                     _id={product._id}
//                                                     className={styles.product}
//                                                     title={product.title}
//                                                     price={Math.round(product.price)}
//                                                     rate={Math.round(product.rating)}
//                                                     img={product.imageCover}
//                                                     priceAfterDisc={product.priceAfterDisc}
//                                                 />
//                                             </div>

//                                         )
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="row text-center ">
//                         <div className="col-2">
//                             <img
//                                 src={require("../../assets/Nike-Logo.jpg")}
//                                 alt="Adidas"
//                                 className={`img-fluid ${styles.fixedSizeImg}`}
//                             />
//                         </div>
//                         <div className="col-2">
//                             <img src={require('../../assets/puma-logo-9869295F1B-seeklogo.com.png')} alt="Givenchy" className={`img-fluid ${styles.fixedSizeImg}`} />
//                         </div>
//                         <div className="col-2">
//                             <img
//                                 src={require("../../assets/Dior_Logo.svg.png")}
//                                 alt="Dior"
//                                 className={`img-fluid ${styles.fixedSizeImg}`}
//                             />
//                         </div>
//                         <div className="col-2">
//                             <img
//                                 src={require("../../assets/Gucci-Logo.png")}
//                                 alt="Gucci"
//                                 className={`img-fluid ${styles.fixedSizeImg}`}
//                             />
//                         </div>
//                         <div className="col-2">
//                             <img
//                                 src={require("../../assets/Givenchy_logo.jpg")}
//                                 alt="Givenchy"
//                                 className={`img-fluid ${styles.fixedSizeImg}`}
//                             />
//                         </div>
//                         <div className="col-2">
//                             <img
//                                 src={require("../../assets/town-team-logo.avif")}
//                                 alt="Givenchy"
//                                 className={`img-fluid ${styles.fixedSizeImg}`}
//                             />
//                         </div>
//                     </div>

//                     <div className="row text-center">
//                         <div className={`container ${styles.productsCollection}`}>
//                             {products.map(
//                                 (product, i) =>
//                                     i < 4 && (
//                                         <div key={product.id}>
//                                             <img
//                                                 src={product.imageCover}
//                                                 alt={product.title}
//                                                 className={`img-fluid ${styles.fixedSizeImg}`}
//                                             />
//                                         </div>
//                                     )
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCategory;





