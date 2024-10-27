import React from 'react'
import styles from './offersCard.module.css'
import { useNavigate } from 'react-router-dom'
const OffersCard = ({ offerMonth, offer, offerTime, img }) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/ProductCategory')
    }

    return (

        <div className={styles.offerCard}>
            <div className={styles.offerText}>
                <p >{offerMonth} </p>
                <h2>{offer}</h2>
                <button onClick={handleNavigate}>view more <i class="fa-solid fa-arrow-right"></i></button>
                
            </div>
            <img src={img} alt='img' />
        </div>
    )
}

export default OffersCard
