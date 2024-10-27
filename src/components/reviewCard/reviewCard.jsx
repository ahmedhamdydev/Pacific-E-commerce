import React from "react";
import styles from "./reviewCard.module.css";
const ReviewCard = ({ img, name, rate, comment }) => {
  return (
    <div className={styles.reviewCard}>
      <i className="fa-solid fa-quote-left"></i>
      <p>{comment}</p>
      <div className={`${styles.customer} row  align-items-center `}>
        <div className="col-12">
          <img src={img} alt="name" />
          <div>
            <p>{name}</p>
            <p>customer</p>
            <div className={`${styles.productRate}  `}>
              <i
                className={`fa-solid fa-star ${rate >= 1 ? styles.active : ""}`}
              ></i>
              <i
                className={`fa-solid fa-star ${rate >= 2 ? styles.active : ""}`}
              ></i>
              <i
                className={`fa-solid fa-star ${rate >= 3 ? styles.active : ""}`}
              ></i>
              <i
                className={`fa-solid fa-star ${rate >= 4 ? styles.active : ""}`}
              ></i>
              <i
                className={`fa-solid fa-star ${rate >= 5 ? styles.active : ""}`}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
