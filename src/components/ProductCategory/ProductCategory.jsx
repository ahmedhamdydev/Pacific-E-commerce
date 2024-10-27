// import React, { useEffect, useState } from "react";
// import styles from "./productCategory.module.css";
// import Header from "../../components/Title/Header";
// import ProductCard from "../../components/productCard/ProductCard";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import productCat from "../../assets/productCat.avif";

// const ProductCategory = () => {
//     const [products, setProducts] = useState([]);
//     const fetchProducts = async () => {
//         const response = await axios.get("https://dummyjson.com/products");
//         const data = await response.data.products;
//         setProducts(data);
//         console.log(products);
//     };
//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     return (
//         <div>
//             <Header title={"Product"} details={"Home > Product"} imgPath={productCat} />

//             <div className="container mt-4">
//                 <div className="row">
//                     {/* Sidebar */}
//                     <div className="col-md-3">
//                         <div className="card">
//                             <div className="card-body">
//                                 <h5>Category</h5>
//                                 <ul className="list-unstyled">
//                                     <li>Dress</li>
//                                     <li>Accessories</li>
//                                     <li>Baby & Kids</li>
//                                     <li>Shoes</li>
//                                     <li>Jewelry</li>
//                                 </ul>
//                                 <h5>Price</h5>
//                                 <ul className="list-unstyled">
//                                     <li>
//                                         <input type="radio" name="price" /> Under $20
//                                     </li>
//                                     <li>
//                                         <input type="radio" name="price" /> $50-100
//                                     </li>
//                                     <li>
//                                         <input type="radio" name="price" /> $55-110
//                                     </li>
//                                     <li>
//                                         <input type="radio" name="price" /> $60-100
//                                     </li>
//                                     <li>
//                                         <input type="radio" name="price" /> $60-120
//                                     </li>
//                                 </ul>
//                                 <h5>Color</h5>
//                                 <div>
//                                     <span className="badge bg-danger me-1">&nbsp;</span>
//                                     <span className="badge bg-secondary me-1">&nbsp;</span>
//                                     <span className="badge bg-warning me-1">&nbsp;</span>
//                                 </div>
//                                 <h5 className="mt-4">Size</h5>
//                                 <ul className="list-unstyled ">
//                                     <li>
//                                         <input type="checkbox" /> M
//                                     </li>
//                                     <li>
//                                         <input type="checkbox" /> S
//                                     </li>
//                                     <li>
//                                         <input type="checkbox" /> L
//                                     </li>
//                                     <li>
//                                         <input type="checkbox" /> XL
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Product Grid */}
//                     <div className="col-md-9">
//                         <div className="row">
//                             <form className="d-flex">
//                                 <input
//                                     type="text"
//                                     className="form-control me-2"
//                                     id="search"
//                                     placeholder="Product.."
//                                 />
//                                 <button
//                                     type="submit"
//                                     className="btn  text-white"
//                                     style={{
//                                         backgroundColor: "#EF9E86",
//                                         borderRadius: "5px",
//                                     }}
//                                 >
//                                     Search
//                                 </button>
//                             </form>
//                         </div>

//                         <div className="row">
//                             <div className={`container ${styles.productsCollection}`}>
//                                 {products.map(
//                                     (product, i) =>
//                                         i < 12 && (
//                                             <ProductCard
//                                                 key={product.id}
//                                                 id={product.id}
//                                                 className={styles.product}
//                                                 title={product.title}
//                                                 price={Math.round(product.price)}
//                                                 rate={Math.round(product.rating)}
//                                                 img={product.thumbnail}
//                                             />
//                                         )
//                                 )}
//                             </div>
//                         </div>


//                     </div>

//                     <div className="row text-center ">
//                         <div className="col-2">
//                             <img src={require('../../assets/Nike-Logo.jpg')} alt="Adidas" className={`img-fluid ${styles.fixedSizeImg}`} />
//                         </div>
//                         <div className="col-2">
//                             <img src={require('../../assets/Dior_Logo.svg.png')} alt="Dior" className={`img-fluid ${styles.fixedSizeImg}`} />
//                         </div>
//                         <div className="col-2">
//                             <img src={require('../../assets/Gucci-Logo.png')} alt="Gucci" className={`img-fluid ${styles.fixedSizeImg}`} />
//                         </div>
//                         <div className="col-2">
//                             <img src={require('../../assets/Givenchy_logo.jpg')} alt="Givenchy" className={`img-fluid ${styles.fixedSizeImg}`} />
//                         </div>
//                         <div className="col-2">
//                             <img src={require('../../assets/town-team-logo.avif')} alt="Givenchy" className={`img-fluid ${styles.fixedSizeImg}`} />
//                         </div>
//                         <div className="col-2">
//                             <img src={require('../../assets/Nike-Logo.jpg')} alt="Givenchy" className={`img-fluid ${styles.fixedSizeImg}`} />
//                         </div>


//                     </div>

//                     <div className="row">
//                         <div className={`container ${styles.productsCollection}`}>
//                             {products.map((product, i) =>
//                                 i < 4 && (
//                                     <div key={product.id}>
//                                         <img src={product.thumbnail} alt={product.title} className="img-fluid" />
//                                     </div>
//                                 )
//                             )}
//                         </div>
//                     </div>


//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCategory;
