import React from 'react'
import styles from '../productCard/productCard.module.css'
import style from './productCardSeller.module.css'
import axios from 'axios'
import { useMutation } from 'react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const ProductCardSeller = ({ imageCover, title, price, ratingsAverage, priceAfterDisc, id ,sellerId }) => {
    const navigate= useNavigate();
    const deleteProduct= async()=>{
        return axios.delete(`http://localhost:3000/api/v1/products/${id}`,{
            withCredentials: true
        })
    }
    const mutation=useMutation(deleteProduct,{
        onSuccess:()=>{
            toast.success("Product deleted successfully!");
            window.location.reload();
        },
        onError:(err)=>{
            toast.error("Failed to delete Product!")
            console.log(err)
        }
    })
    const handleDeleteProject = ()=>{
        mutation.mutate()
    }
    const handleNavigateToupdate=()=>{
        navigate(`/profile/${sellerId}/update-product/${id}`)
    }

    const handleViewProduct=()=>{
        navigate(`/ProductPage/${id}`)
    }
    return (
        <div>
            <div className={style.productCard}>
                <div className={style.productCardImg}>
                    <img src={imageCover} alt={title} />
                    <div className={style.productCardImgLayout}>
                        <div className={style.layout}></div>
                        
                        <div className={style.productsBtn}>
                            <button onClick={handleNavigateToupdate}>update Product  <i className="fa-solid fa-arrow-right"></i></button>
                            <button onClick={handleViewProduct}>view product <i className="fa-regular fa-eye"></i></button>
                            <button onClick={handleDeleteProject}>delet product <i className="fa-regular fa-eye"></i></button>
                        </div>
                    </div>
                </div>
                <div className={styles.productCardRate}>
                    <i className={`fa-solid fa-star ${ratingsAverage >= 1 ? styles.active : ''}`}></i>
                    <i className={`fa-solid fa-star ${ratingsAverage >= 2 ? styles.active : ''}`}></i>
                    <i className={`fa-solid fa-star ${ratingsAverage >= 3 ? styles.active : ''}`}></i>
                    <i className={`fa-solid fa-star ${ratingsAverage >= 4 ? styles.active : ''}`}></i>
                    <i className={`fa-solid fa-star ${ratingsAverage >= 5 ? styles.active : ''}`}></i>
                </div>
                <p className={styles.productTitle}>{title}</p>
                <div className={styles.productPrice}>
                    {/* {
                        (price !== priceAfterDisc) && (<p>{priceAfterDisc} $</p>)
                    } */}
                    
                    <p  style={{textDecoration: price == priceAfterDisc  || priceAfterDisc == 0 ? 'none' :'lineThrought',
                        color: price == priceAfterDisc || priceAfterDisc == 0 ? 'black' : '#656565'
                     }} >{price}$</p>
                    <p style={{display:price == priceAfterDisc  || priceAfterDisc == 0 ? 'none' :'inline-block' }}>{priceAfterDisc} $</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCardSeller
