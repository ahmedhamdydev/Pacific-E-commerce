import React, { useId, useState } from 'react'
import styles from './checkoutCart.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
const CheckoutCart = ({ shippingCost, totalPriceDiscount, onCartIdChange, order, cartProduct }) => {
    
    const [cart, setCart] = useState([])
    const [sellerTotalRevenue, setTotalRevenue] = useState(0)
    
    const getCart = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/cart/', {
            withCredentials: true
        })
        return response.data
    }
    useQuery('get cart items', getCart, {
        enabled: !order,
        onSuccess: (res) => {
            setCart(res.data)
            cartProduct(res.data.cartItems)
            onCartIdChange(res.data._id)
            console.log("carttt", res.data._id)
        },
        onError: (error) => {
            console.log(error)
        }
    })

    // order 
    const { orderId } = useParams()
    const getOrderDetails = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/orders/${orderId}`, {
            withCredentials: true
        })
        return response.data
    }
    const seller = Cookies.get('role')
    useQuery('get order details', getOrderDetails, {
        enabled: !!order,
        onSuccess: (res) => {
            if (!seller) {
                setCart(res.data)
            } else {
                const userId = Cookies.get('userId')

                const filterCartItem = res.data.cartItems.filter(item =>
                    item.product && item.product.sellerId && item.product.sellerId._id === userId)
                const sellerOrder = {
                    ...res.data,
                    cartItems: filterCartItem
                }
                let sellerRevenue = 0
                filterCartItem.forEach(item => {
                    sellerRevenue += item.price
                })
                setTotalRevenue(sellerRevenue)
                console.log(sellerOrder, "fillter")
                setCart(sellerOrder)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })


    return (
        <>
            {
                cart ? (
                    <div className={styles.shippingCart} >
                        <table>
                            <tbody>
                                {cart.cartItems?.map((item, index) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>
                                                <img src={item.product.imageCover} alt='product' />
                                            </td>
                                            <td>
                                                <p>{item.product.title}</p>
                                            </td>
                                            <td>
                                                <p>{item.quantity}</p>
                                            </td>
                                            <td>
                                                <p>{item.price} $</p>
                                            </td>
                                        </tr>

                                    )
                                })}
                            </tbody>
                        </table>

                        {
                            !seller ? (

                                <div className={styles.pricesContainer}>
                                    <div className={styles.cartCheckoutprice}>
                                        <p>subtotal</p>
                                        <p>{cart.totalCartPrice || cart.totalOrderPrice - cart.shippingPrice} $</p>
                                    </div>

                                    <div className={styles.cartCheckoutprice}>
                                        <p>shipping</p>
                                        <p>{shippingCost || cart.shippingPrice}$</p>
                                    </div>
                                    <div className={styles.cartCheckoutprice}>
                                        <p>total</p>
                                        <p>{cart.totalCartPrice + shippingCost || cart.totalOrderPrice} $</p>
                                    </div>
                                    {
                                        totalPriceDiscount && (
                                            (<div className={styles.cartCheckoutprice} style={{ border: 'none' }}>
                                                <p>total After discount</p>
                                                <p>{totalPriceDiscount + shippingCost} $</p>
                                            </div>)
                                        )
                                    }

                                </div>)
                                : (<div className={`${styles.cartCheckoutprice} ${styles.CheckoutCartSeller}`} >
                                    <p>total</p>
                                    <p>{sellerTotalRevenue || 0} $</p>
                                </div>)
                        }

                    </div >
                ) : ('')
            }
        </>
    )
}

export default CheckoutCart
