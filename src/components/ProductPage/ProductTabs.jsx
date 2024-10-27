import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';

const ProductTabs = () => {
    const { id } = useParams(); 
    const [activeTab, setActiveTab] = useState('description');
    const [product, setProduct] = useState(null); 
    const [reviews, setReviews] = useState([]); 
    const [loading, setLoading] = useState([]); 


    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/products/${id}`);
            const data = response.data.data; 
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/products/${id}/reviews`);
            const data = response.data; // Assuming reviews data is directly in data
            console.log("reviews", data);
            setReviews(data);
        } catch (error) {
            console.error('Error fetching reviews', error);
        }
    };

    const addReviews = async (reviewData) => {
        try {
            // Send review data in the POST request
            const response = await axios.post(
                `http://localhost:3000/api/v1/products/${id}/reviews`,
                reviewData, 
                { withCredentials: true } 
            );
            const newReview = response.data; 
            console.log("Added review:", newReview);

            setReviews((prevReviews) => [...prevReviews, newReview]);
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); 
            await fetchProduct();
            await fetchReviews();
            setLoading(false); 
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <p>Loading product and review details...</p>;
    }

    return (
        <div className="product-tabs mt-4">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link shadow ${activeTab === 'description' ? ' text-white' : 'bg-light text-dark'}
                        ${activeTab === 'description' ? 'active' : ''}`}
                        onClick={() => setActiveTab('description')}
                        style={{
                            borderRadius: "5px",
                            backgroundColor: "#EF9E86",
                        }}
                    >
                        Product Description
                    </button>
                </li>

                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'reviews' ? ' text-white active' : 'bg-light text-dark'}`}
                        onClick={() => setActiveTab('reviews')}
                        style={{
                            borderRadius: "5px",
                            marginLeft: "20px",
                            backgroundColor: "#EF9E86",
                        }}
                    >
                        Product Reviews
                    </button>
                </li>


                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'addReview' ? ' text-white active' : 'bg-light text-dark'}`}
                        onClick={() => setActiveTab('addReview')}
                        style={{
                            borderRadius: "5px",
                            marginLeft: "20px",
                            backgroundColor: "#EF9E86",
                        }}
                    >
                        Add Review
                    </button>
                </li>

            </ul>

            <div className="tab-content mt-3">
                {/* Product Description Tab */}
                {activeTab === 'description' && (
                    <div id="description" className="tab-pane fade show active">
                        <p>{product.description || "No description available."}</p>
                    </div>
                )}

                {/* Product Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div id="reviews" className="tab-pane fade show active">
                        <div>
                            {Array.isArray(reviews) && reviews.length > 0 ? (
                                <ul className="list-group">
                                    {reviews.map((review, index) => (
                                        <li key={index} className="list-group-item">
                                            <div className="d-flex w-100 justify-content-between">
                                                <div>
                                                    <img src={review.user_id.profilePicture} alt="avatar"
                                                        className="rounded-circle img-thumbnail"
                                                        style={{ width: "40px", height: "40px" }}
                                                    ></img>
                                                    <h5 className="mb-1">{review.user_id.username}</h5>
                                                </div>
                                                <small className="d-flex align-items-center" style={{ fontSize: "16px", color: "#555", fontWeight: "600" }}>
                                                    <div className="d-flex align-items-center">
                                                        {Array.from({ length: 5 }).map((_, index) => (
                                                            <i
                                                                key={index}
                                                                className={`fa-solid fa-star ${review.rating > index ? "text-warning" : "text-muted"}`}
                                                                style={{ fontSize: "18px", marginRight: "5px" }}
                                                            ></i>
                                                        ))}
                                                    </div>
                                                    <span className="ms-2">{review.rating}/5</span>
                                                </small>
                                            </div>
                                            <p className="mb-1">{review.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className='d-flex justify-content-center flex-column align-items-center'>
                                    <p>There are no reviews yet bet the first to add one.</p>
                                    <img src={require('../../assets/no_available_reviews.png')} alt="There are no reviews"></img>
                                </div>
                            )}
                        </div>
                    </div>
                )}



                {/* Add Review Tab */}
                {activeTab === 'addReview' && (
                    <div id="addReview" className="tab-pane fade show active">
                        <div>
                            <ReviewForm
                                onSubmit={addReviews}
                            />
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProductTabs;
