import React, {  useState } from 'react'
import styles from './orderDetails.module.css'
import Cookies from 'js-cookie'
import CheckoutCart from '../checkoutCart/CheckoutCart'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from 'react-query'
const OrderDetails = () => {
    const role = Cookies.get('role')
    const [order, setorder]=useState(null)
    const { orderId } = useParams()
    const getOrderDetails = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/orders/${orderId}`, {
            withCredentials: true
        })
        return response.data
    }
    useQuery('get order details', getOrderDetails, {
        
        onSuccess: (res) => {
            setorder(res.data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
    const changeDate = (dateToChange) => {
        const date = new Date(dateToChange);

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate
    }
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return '#ED7A56';
            case 'delivered':
                return 'green';
            default:
                return 'red'; 
        }
    };
    return (
        <div className={`container ${styles.orderDetailsContainer} `} >

            <h2>Order Details</h2>
            { order && (

            <div className={`${role === 'seller' ? styles.sellerOrder : styles.userOrder}`}>
                {(role === 'seller' ) && 
                <div className={styles.orderDetails}>
                    <span class={`badge ${order.isPaid?'bg-success ':'bg-danger'}`} style={{marginBottom:"15px"}}>{order.isPaid? "Paid" :'Not Paid'}</span>
                    <div>
                        <div><p>user name  </p><p> {order.user.username}</p> </div>
                        <div><p> email  </p><p> {order.user.email} </p> </div>
                        <div><p> phone  </p><p> {order.shippingAddress.phone} </p> </div>
                    </div>
                    <div>
                        <div><p> Order ID </p><p> {order._id}</p> </div>
                        <div><p> Order Date </p><p>{changeDate(order.createdAt)} </p> </div>
                        <div><p> Order Status </p><p style={{ color: getStatusColor(!order.isCanceled && !order.isDelivered ? 'pending' : order.isCanceled ? 'canceled ' :'delivered') }}> {!order.isCanceled && !order.isDelivered ? 'pending' : order.isCanceled ? 'canceled ' :'delivered' } </p> </div>
                    </div>
                    <div>
                        <div><p> details </p><p> {order.shippingAddress.details}</p> </div>
                        <div><p> City </p><p> {order.shippingAddress.city}</p> </div>
                        <div><p> Zip </p><p> {order.shippingAddress.postalCode }</p> </div>
                    </div>
                </div>}

                <CheckoutCart  order={true} />
            </div>
            )}

        </div>
    )
}

export default OrderDetails
