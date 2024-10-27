import React from "react";
import styles from "./aboutComponent.module.css";

const AboutComponents = ({ head, paragraph ,image}) => {
  return (
    <div className={` col-6  col-md-3 `}>
      <div className={` d-flex align-items-center `}>
      <img
        src={require(`./../../assets/${image}`)}
        alt={head}
        className={`${styles.imgs} me-2`}
      />
      <div className={styles.texts} >
        <h6>{head}</h6>
        <p>{paragraph}</p>
      </div>
      </div>
    </div>
  );
};

export default AboutComponents;
