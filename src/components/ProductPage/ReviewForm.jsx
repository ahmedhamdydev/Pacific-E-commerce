import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1); // Default rating set to 1

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Ensure comment and rating are valid before submitting
        if (!comment || rating < 1 || rating > 5) {
            alert('Please provide a valid comment and rating between 1 and 5');
            return;
        }

        // Call the onSubmit function (i.e., addReviews function) with the form data
        onSubmit({ comment, rating });
        
        // Reset form after submission
        setComment('');
        setRating(1);
    };

    return (
        <form onSubmit={handleSubmit} className="review-form mt-3">
            <div className="form-group mb-3">
                <label htmlFor="comment">Your Comment</label>
                <textarea
                    id="comment"
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment"
                    required
                ></textarea>
            </div>

            <div className="form-group mb-3">
                <label htmlFor="rating">Rating</label>
                <select
                    id="rating"
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                >
                    <option value={1}>1 - Bad</option>
                    <option value={2}>2 - Meh</option>
                    <option value={3}>3 - Good</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={5}>5 - Excellent</option>
                </select>
            </div>

            <button type="submit" 
            style={{
                backgroundColor: "#EF9E86",
                borderRadius: "5px",
            }}
            className="btn ">
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
