import React from 'react'
import styles from './blogCard.module.css'
const BlogCard = ({ img, time, date, blog }) => {
    return (
        <div className={styles.singleBlog}>
            <img src={img} alt="img blog" />
            <div className={styles.date}>
                <p>{date}</p>
                <p>{time}</p>
            </div>
            <h6>{blog}</h6>
            <button>read more</button>
        </div>
    )
}

export default BlogCard
