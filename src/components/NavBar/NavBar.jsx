import React, { useEffect, useState } from 'react'
import styles from './navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import CategoryNav from '../categoeyNav/CategoryNav';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from "react-router-dom";
import toast from 'react-hot-toast';
const NavBar = () => {
    const userId = Cookies.get('userId')
    const [searchValue, setSearchValue] = useState('')
    const [cartLength, setCartLength] = useState('')
    const [wishlistLength, setWishListLength] = useState('')
    const handleSearchChange = (e) => {
        setSearchValue(e.target.value); 
    };
    const navigate = useNavigate()
    const handleSearch = () => {
        navigate('/ProductCategory', { state: { subcategoryId: null, searchValue } });
    }
    const getUserCart = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/cart/', {
            withCredentials: true,
        })
        return response.data
    }
    const { refetch } = useQuery("cart length", getUserCart, {
        refetchOnWindowFocus: true,
        retry: false,
        // refetchInterval: 1000,  

        onSuccess: (res) => {
            setCartLength(res.data.cartItems.length)
        },
        onError: (err) => {
            setCartLength(0)
            console.log(err)
        }
    })
    const getWishList = async () => {
        const response = await axios.get('http://localhost:3000/api/v1/wishlist/', {
            withCredentials: true,
        })
        return response.data
    }
    const { refetch: wishListRefetch } = useQuery("wish length", getWishList, {
        refetchOnWindowFocus: true,
        retry: false,
        // refetchInterval: 1000,  
        onSuccess: (res) => {
            setWishListLength(res.data.length)
            
        },
        onError: (err) => {
            setCartLength(0)
            
        }
    })
    useEffect(() => {
        refetch();
        wishListRefetch()
    }, [cartLength, wishlistLength]);
    const role = Cookies.get('role')
    const logOutUser = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/auth/sign-out", {
            withCredentials: true
        })
        return response.data
    }
    const mutation = useMutation(logOutUser, {
        onSuccess: (res) => {
            toast.success("log out successfully!");
            Cookies.remove('userId')
            Cookies.remove('access_token');
            Cookies.remove('logedWith');
            Cookies.remove('role');
            navigate("/login")
            

        },
        onError: (error) => {
            toast.error("There is some thing wrong. Please try again.");
            console.error(error.message);
        }
    });
    const handleLogoOut = () => {
        mutation.mutate();
    }
    return (
        <div className={styles.nav}>
            <div className={styles.firstNav}>
                <div className={`container ${styles.firstNavContainer} ${styles.flexContainer}`}>
                    <p>new offers this month only to get 20% free</p>
                    {userId ?<i class="fa-solid fa-arrow-right-from-bracket" style={{fontSize:'18px', cursor:'pointer'}} onClick={handleLogoOut}></i> : ""}
                </div>
            </div>

            {/* second nav */}
            <div className={styles.secondNav}>
                <div className={`container ${styles.secondNavContainer} ${styles.flexContainer}`}>
                    {/* <img src={require("../../assets/logo e.PNG")} alt="" /> */}
                    <h5>PACIFIC</h5>
                    {/* <div className={styles.flexContainer}> */}
                    <div className={styles.flexContainer}>
                        <div className={styles.search}>
                            <input type="text" name="search" id="search" placeholder='search your product' onChange={handleSearchChange} />
                        </div>
                        <button onClick={handleSearch}>search</button>
                    </div>
                    {userId ?
                        (<div className={`${styles.flexContainer} ${styles.navIcon}`}>
                            <div><NavLink to={`/profile/${userId}`}> <i className="fa-regular fa-user"></i> </NavLink></div>
                            {role !== 'seller' ? (
                                <div className={`${styles.flexContainer}`}>
                                    <NavLink to={"/WishlistPage"}>
                                        <div className="position-relative">
                                            <i className="fa-regular fa-heart"></i>
                                            <span className="position-absolute top-0 translate-middle bg-danger  rounded-circle">
                                                <span>{wishlistLength || 0}</span>
                                            </span>
                                        </div>
                                    </NavLink>
                                    <NavLink to={"/CartPage"}>
                                        <div className="position-relative">
                                            <i className="fa-solid fa-shopping-cart "></i>
                                            <span className="position-absolute top-0  translate-middle bg-danger  rounded-circle">
                                                <span>{cartLength || 0}</span>
                                            </span>
                                        </div>
                                    </NavLink>
                                </div>
                            ) : ''}
                        </div>) :
                        (<div className={`${styles.flexContainer} ${styles.navIcon}`}>
                            <div><NavLink to={`/login`} className={styles.loginBtns}> login </NavLink></div>
                            <div><NavLink to={`/signUp`} className={styles.loginBtns}> sign up </NavLink></div>
                        </div>
                        )
                    }
                    {/* </div> */}
                </div>
            </div>
            {/* last nav */}
            <nav className={`navbar navbar-expand-lg py-0  ${styles.thirdNav}`}>
                <div className={`container ${styles.flexContainer}`}>
                    <div className={styles.selectCategories}>
                        <div className={`${styles.categoryDropdown}`}>
                            <CategoryNav />
                        </div>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse  ${styles.navLink}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `${isActive ? styles.activeLink : ''} ${styles.navLinkColor}`} to="/">Home</NavLink>                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `${isActive ? styles.activeLink : ''} ${styles.navLinkColor}`} to="/about">about us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => `${isActive ? styles.activeLink : ''} ${styles.navLinkColor}`} to="/ProductCategory">shop</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className={({ isActive }) =>
                                        `${isActive ? styles.activeLink : ''} ${styles.navLinkColor}`
                                    }
                                    to="/contact-us"
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </ul>
                        <div className={`${styles.call} ${styles.flexContainer}`}>
                            <i class="fa-solid fa-phone"></i>
                            <div className={styles.callText}>
                                <p>call now</p>
                                <p>01001865858</p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>


        </div>
    )
}

export default NavBar
