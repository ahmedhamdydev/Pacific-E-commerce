import React from "react";
import { Form, Formik } from "formik";
import FormController from "../../components/formConteoller/formController";
import * as Yup from "yup";
import styles from './login.module.css'
import LoginImage from '../../assets/Login-bro.svg';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

import { getAuth, signInWithPopup ,GoogleAuthProvider} from "firebase/auth";

import { app } from "../../lib/FireBase";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserId } from "../../store/store";
// import { useMutation, useQueryClient } from "react-query";
import Cookies from 'js-cookie';
const Login = () => {

    const initialValues = {
        email: "",
        password: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("required"),
        password: Yup.string()
            .required("required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "invalid password"
            ),
    });

    const userLogin = async (user) => {
        const response = await axios.post("http://localhost:3000/api/v1/auth/login", user, {
            withCredentials: true, 
        });
        return response.data;
        
    };
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const mutation = useMutation(userLogin, {
        onSuccess: (data) => {
            console.log("Login successful:", data);
            // dispatch(setUserId(data._id)) // remove redux Rawan if error appear
            // dispatch(setUserData(data))
            if(data.role ==="seller"){
                Cookies.set("role","seller",
                    {
                        expires: 4,
                        path: '/'
                    }
                )
            }
            Cookies.set("userId", data._id, {
                expires: 4,
                path: '/'})
            navigate("/")
            toast.success("Login Successfully")
        },
        onError: (error) => {
            toast.error("Invalid Email or Password Please Try Again")
        },
    });
   

    const onSubmit = (values) => {
        mutation.mutate(values);
    };

    // sign in with Google
    const auth = getAuth(app)
    const googleProvider = new GoogleAuthProvider()
    const userLoginWithGoogle = async (user) => {
        const response = await axios.post("http://localhost:3000/api/v1/auth/auth/google", user,{
            withCredentials: true, 
        })
        return response.data
    }
    const mutationSignUpWithGoogle = useMutation(userLoginWithGoogle, {
        onSuccess: (data) => {
            navigate("/")
            console.log("Login successful:", data);
            console.log(data)
            // dispatch(setUserId(data._id))
            // dispatch(setUserData(data))
            
            Cookies.set("userId", data._id, {
                expires: 4,
                path: '/'})
                Cookies.set("logedWith","google",{
                    expires: 4,
                    path: '/'
                })
                
            toast.success("Login Successfully")
        },
        onError: (error) => {
            toast.error("There Is Some Thing Wrong ,Please Try Again")
        },
    });

    const signInwithGoogle = () => {
        signInWithPopup(auth, googleProvider).then((result) => {
            const userFromGoogle = {
                email: result.user.email,
                username: result.user.displayName,
                profilePicture: result.user.photoURL,
            }
            console.log(result)
            mutationSignUpWithGoogle.mutate(userFromGoogle)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className={`container my-5  ${styles.formContainer}`}>

            <img src={LoginImage} alt="login" />
            <div className={styles.login}>
                <h1>log in to exculsive </h1>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}

                >
                    {(formik) => {
                        return (
                            <Form className={styles.loginForm}>
                                <FormController
                                    control="input"
                                    type="email"
                                    placeholder="Enter your email"
                                    divStyle={styles.formControl}
                                    name="email"
                                    className={styles.input}
                                />
                                <FormController
                                    control="input"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    className={styles.input}
                                    divStyle={styles.formControl}
                                />
                                <div className={styles.submitContainer}>
                                    <button type="submit" className={styles.submit} disabled={!formik.isValid}>login</button>
                                    <Link to={'/forget-password'} className={styles.forgetPassw}> forget password</Link>
                                </div>
                                <p>already haven't an account? <Link to={'/signup'}>sign up</Link> </p>
                            </Form>
                        );
                    }}
                </Formik>
                <div className={styles.googleloginContainer}>
                    <button onClick={signInwithGoogle} className={styles.googlelogin}><img src={require("../../assets/search.png")}/> sign in with google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
