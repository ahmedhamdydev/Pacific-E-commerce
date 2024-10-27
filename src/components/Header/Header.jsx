import React from "react";
import styles from "./header.module.css";
const Header = ({ title, details, bgImage }) => {
  return (
    <div
      className={
        (bgImage === "aboutHeader" ? styles.aboutHeader : styles.contactHeader)
      }
    >
      <div className={styles.headerContent}>
        <h3>{title}</h3>
        <p>{details}</p>
      </div>
    </div>
  );
};

export default Header;
