import React from 'react'
import styles from './productCategoryType1.module.css'
import { useNavigate } from 'react-router-dom'
const ProductCategoryType1 = ({ img, title }) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/ProductCategory')
    }

    return (
        <div className={styles.productCategoryType1}>
            <img src={img} alt={title} />
            <h4>{title}</h4>
            <button onClick={handleNavigate}>view more <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    )
}

export default ProductCategoryType1
