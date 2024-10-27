import React from 'react'
import styles from './productCategoryType2.module.css'
import { useNavigate } from 'react-router-dom'
const ProductCategoryType2 = ({ title, description, img }) => {
    const navigate = useNavigate()
    const handleNavigate=()=>{
        navigate('/ProductCategory')
      }
      
    return (
        <div className={styles.productCategoryType2}>
            <img src={img} alt={title} />
            <div className={styles.ProductCategoryText}>
                <h5>{title}</h5>
                <p>{description}</p>
                <button onClick={handleNavigate}>view more <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>
    )
}

export default ProductCategoryType2
