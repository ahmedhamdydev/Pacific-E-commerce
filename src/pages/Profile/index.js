import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import styles from './profile.module.css'
const Profile = () => {
  return (
    <div className={styles.profile}>
      <SideBar/>
      <main className={styles.profileContent}>
        <Outlet/>
      </main>
    </div>
  )
}

export default Profile
