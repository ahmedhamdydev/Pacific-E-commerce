import React from 'react'
import styles from './errorText.module.css'
const ErroeText = (props) => {
  return (
    <div className={styles.error}>
      {props.children}
    </div>
  )
}

export default ErroeText
