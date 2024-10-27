// import React from 'react'
// import styles from './sideBar.module.css'
// import { NavLink, useLocation, useNavigate } from 'react-router-dom'
// import Cookies from 'js-cookie'
// import axios from 'axios'
// import { useMutation } from 'react-query'
// import toast from 'react-hot-toast'
// const SideBar = () => {
//     const location = useLocation();
//     const userId = Cookies.get('userId')
//     const userRole = Cookies.get('role')
//     const loggedWith = Cookies.get('logedWith')
//     console.log(userId)
//     const profileSubPaths = [`/profile/${userId}/reset-password`, `/profile/${userId}/add-product`,`/profile/${userId}/update-product`, `/profile/${userId}/seller-products`,`/profile/${userId}/orders`,`/profile/${userId}/seller-dashboard`];
//     const isOnProfileSubPath = profileSubPaths.some(subPath => location.pathname.includes(subPath));
//     const navigate = useNavigate()
//     const logOutUser = async () => {
//         const response = await axios.get("http://localhost:3000/api/v1/auth/sign-out", {
//             withCredentials: true
//         })
//         return response.data
//     }
//     const mutation = useMutation(logOutUser, {
//         onSuccess: (res) => {
//             toast.success("log out successfully!");
//             Cookies.remove('userId')
//             Cookies.remove('access_token');
//             Cookies.remove('logedWith');
//             Cookies.remove('role');
//             navigate("/login")
//             console.log(res)

//         },
//         onError: (error) => {
//             toast.error("There is some thing wrong. Please try again.");
//             console.error(error.message);
//         }
//     });
//     const handlelogOut = () => {
//         mutation.mutate();
//         console.log("gggggggggggggggg")
//         // window.location.reload()
//     }
//     return (
//         <div className={styles.sideBar}>
//             <ul>
//                 <li>
//                     <NavLink className={({ isActive }) => `${isActive && !isOnProfileSubPath ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/`}> <i class="fa-solid fa-house"></i> home</NavLink>
//                 </li>
//                 <li>
//                     <NavLink className={({ isActive }) => `${isActive && !isOnProfileSubPath ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}`}> <i class="fa-solid fa-user"></i> my accounts</NavLink>
//                 </li>
//                 {
//                     !loggedWith && (

//                         <li>
//                             <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/reset-password`}> <i class="fa-solid fa-lock"></i> reset password</NavLink>
//                         </li>
//                     )
//                 }
//                 <li>
//                     <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/orders`}><i class="fa-solid fa-truck-fast"></i> orders</NavLink>
//                 </li>
//                 {userRole ? (
//                     <>
//                         <li>
//                             <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/seller-dashboard`}><i class="fa-solid fa-chart-line"></i> dashboard  </NavLink>
//                         </li>
//                         <li>
//                             <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/add-product`}><i class="fa-solid fa-plus"></i> add products</NavLink>
//                         </li>
//                         <li>
//                             <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/seller-products`}><i class="fa-solid fa-cube"></i> products</NavLink>
//                         </li>
//                     </>
//                 ) : ""}
//                 <li>
//                     <NavLink className={`${styles.navLink}`} onClick={handlelogOut}><i class="fa-solid fa-arrow-right-from-bracket"></i> logout</NavLink>

//                 </li>
//             </ul>
//         </div>
//     )
// }

// export default SideBar
import React, { useState } from 'react';
import styles from './sideBar.module.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

const SideBar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
    const location = useLocation();
    const userId = Cookies.get('userId');
    const userRole = Cookies.get('role');
    const loggedWith = Cookies.get('logedWith');
    
    const profileSubPaths = [
        `/profile/${userId}/reset-password`, 
        `/profile/${userId}/add-product`,
        `/profile/${userId}/update-product`, 
        `/profile/${userId}/seller-products`,
        `/profile/${userId}/orders`,
        `/profile/${userId}/seller-dashboard`
    ];
    
    const isOnProfileSubPath = profileSubPaths.some(subPath => location.pathname.includes(subPath));
    const navigate = useNavigate();

    const logOutUser = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/auth/sign-out", {
            withCredentials: true
        });
        return response.data;
    };

    const mutation = useMutation(logOutUser, {
        onSuccess: (res) => {
            toast.success("Logged out successfully!");
            Cookies.remove('userId');
            Cookies.remove('access_token');
            Cookies.remove('logedWith');
            Cookies.remove('role');
            navigate("/login");
        },
        onError: (error) => {
            toast.error("There is something wrong. Please try again.");
            console.error(error.message);
        }
    });

    const handleLogOut = () => {
        mutation.mutate();
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className={styles.sideBar}>

            <button onClick={toggleSidebar} className={styles.sidebarToggle}>
                <i className="fa-solid fa-bars"></i> Menu
            </button>

            
            <div className={`${styles.sidebarContent} ${isSidebarOpen ? styles.open : ''}`}>
                <ul>
                    <li>
                        <NavLink className={({ isActive }) => `${isActive && !isOnProfileSubPath ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/`}>
                            <i className="fa-solid fa-house"></i> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => `${isActive && !isOnProfileSubPath ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}`}>
                            <i className="fa-solid fa-user"></i> My Account
                        </NavLink>
                    </li>
                    {!loggedWith && (
                        <li>
                            <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/reset-password`}>
                                <i className="fa-solid fa-lock"></i> Reset Password
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/orders`}>
                            <i className="fa-solid fa-truck-fast"></i> Orders
                        </NavLink>
                    </li>
                    {userRole && (
                        <>
                            <li>
                                <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/seller-dashboard`}>
                                    <i className="fa-solid fa-chart-line"></i> Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/add-product`}>
                                    <i className="fa-solid fa-plus"></i> Add Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className={({ isActive }) => `${isActive ? styles.navLinkActive : ''} ${styles.navLink}`} to={`/profile/${userId}/seller-products`}>
                                    <i className="fa-solid fa-cube"></i> Products
                                </NavLink>
                            </li>
                        </>
                    )}
                    <li>
                        <NavLink className={styles.navLink} onClick={handleLogOut}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
