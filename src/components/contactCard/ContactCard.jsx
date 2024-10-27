import React from 'react'
import styles from './contactCard.module.css'
const ContactCard = ({icon, title , details} ) => {
  return (
    <div className={styles.contactCard}>
      <i className={icon}></i>
      <div>
        <h6 >{title}</h6>
        <p>{details}</p>
      </div>
    </div>
  )
}

export default ContactCard
