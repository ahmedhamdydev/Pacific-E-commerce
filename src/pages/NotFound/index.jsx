import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './notfound.module.css'
const NotFound = () => {
  return (
    <div className={`container ${styles.notFoundContainer}`}>
      <img src={require('../../assets/404 Error Page not Found with people connecting a plug-bro.png') }/>
      <h5>return  <NavLink to='/'> home</NavLink></h5>
    </div>
  )
}

export default NotFound
