import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, updateTotalCartPrice } from "../../redux/cartSlice";
import axios from "axios";
import toast from "react-hot-toast";
import CartList from "./CartList";

const CartItem = ({ item, DeleteProduct }) => {
    const { product, color, price, quantity } = item;
    const dispatch = useDispatch();
    const [newQuantity, setNewQuantity] = useState(quantity); 
    const [newPrice, setNewPrice] = useState(price); 

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10); 
        if (value > 0) {
            setNewQuantity(value);
            setNewPrice(value * price);
        }
    };

    const UpdateProductQuantity = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/v1/cart/${item._id}`,
                { quantity: newQuantity },  
                { withCredentials: true }
            );
            console.log("Product updated successfully.");
            toast.success("Product updated successfully.");
            // getTotalCartPrice();
            dispatch(updateQuantity({ id: item._id, quantity: newQuantity, price: newPrice }));

            
            
            // Dispatch action to update the totalCartPrice
            const updatedTotalCartPrice = await getTotalCartPrice();
            dispatch(updateTotalCartPrice(updatedTotalCartPrice)); // Ensure this action updates the total price
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const getTotalCartPrice = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/cart", {
                withCredentials: true,
            });
            return response.data.data.totalCartPrice;
        } catch (error) {
            console.error("Error fetching cart total:", error);
            return 0;
        }
    };

    return (
        <tr className="align-middle">
            <td>
                <img
                    src={product?.imageCover || "default.jpg"} 
                    alt={product?.title || "Product"}
                    style={{ width: "50px" }}
                />
                <span>{product?.title || "Product Title"}</span>
            </td>
            <td>${price}</td>
            {/* <td>
                <div
                    className="w-25 rounded-circle"
                    style={{ backgroundColor: product.color, height: "20px" }}
                ></div>
            </td> */}
            <td>
                <input
                    type="number"
                    value={newQuantity}
                    onChange={handleQuantityChange}
                    className="form-control"
                    style={{ width: "60px" }}
                />
            </td>
            <td>${newQuantity * price}</td>
            <td>
                <button
                    onClick={UpdateProductQuantity}
                    className="btn rounded-circle"
                    style={{ backgroundColor: "#EF9E86" }}
                >
                    <i className="fa fa-refresh"></i> 
                </button>
            </td>
            <td>
                <button
                    onClick={() => DeleteProduct(item._id)}
                    className="btn rounded-circle"
                    style={{ backgroundColor: "#EF9E86" }}
                >
                    <i className="fa fa-trash"></i>
                </button>
            </td>
            
        </tr>
    );
};

export default CartItem;
