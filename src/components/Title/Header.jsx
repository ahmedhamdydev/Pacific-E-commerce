import React from 'react'
import styles from './header.module.css'
const Header = ({title , details , imgPath}) => {
  return (
    <div className={styles.header} style={{backgroundImage: `url(${imgPath})`}}>
      <div className={styles.headerContent}>
        <h3>{title}</h3>
        <p>{details}</p>
      </div>
    </div>
  )
}

export default Header
