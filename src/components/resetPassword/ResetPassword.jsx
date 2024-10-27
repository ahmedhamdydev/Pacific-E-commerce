import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import FormController from '../formConteoller/formController'
import styles from '../../pages/Login/login.module.css'
import style from './resetPassword.module.css'
import resetPasswordImg from "../../assets/Reset password-bro.svg"
import axios from 'axios'
import { withTheme } from 'styled-components'
import { useMutation, useQuery } from 'react-query'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import bcrypt from "bcryptjs-react";
const ResetPassword = () => {
    const navigate = useNavigate()
    const initialValues = {
        currentPassword: '',
        password: '',
        passwordConfirm: '',
    }
    const validationSchema = Yup.object({
        currentPassword: Yup.string()
            .required("required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "invalid password"
            ),
        password: Yup.string()
            .required("required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "invalid password"
            ),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Required')
    })
    const onSubmit = async (values) => {
        
            const match = await bcrypt.compare(values.currentPassword, userDataFetchPassword); // Assuming userDataFetch contains the hashed password
            if(match){

                mutation.mutate(values)
            }else{
                toast.error("Old password is not correct")
            }

    }
    const getUser = async () => {
        const response = await axios.get("http://localhost:3000/api/v1/users/getMe", {
            withCredentials: true
        }
        )
        return response.data
    }
    const [userDataFetchPassword, setUserDataFetch] = useState(null);

     useQuery('get-user', getUser, {
        onSuccess: (res) => {
            setUserDataFetch(res.data.password)
        },
        onError: (err) => {
            navigate("/login")
            toast.error("Please Login First ")
        }
    });
    const updatePassword = async (password) => {
        const response = await axios.put("http://localhost:3000/api/v1/users/changeMyPassword", password, {
            withCredentials: true
        })
        return response.data
    }
    const mutation = useMutation(updatePassword,{
        onSuccess:()=>{
            toast.success("password Updated successfully")
            navigate("/login")
        },
        onError:(err)=>{
            toast.error("there is some thing wrong , please try again")
            console.log(err)
        }
    })
    return (
        <div className={styles.formContainer}>
            <img src={resetPasswordImg} className={style.resetPasswordImg} alt='reset password' />
            <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                className={style.resetPassword}
            >
                {
                    formik => {
                        return (
                            <Form className={styles.loginForm}>
                                <FormController
                                    control="input"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="currentPassword"
                                    className={styles.input}
                                    divStyle={styles.formControl}
                                />
                                <FormController
                                    control="input"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    className={styles.input}
                                    divStyle={styles.formControl}
                                />
                                <FormController
                                    control="input"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="passwordConfirm"
                                    className={styles.input}
                                    divStyle={styles.formControl}
                                />
                                <button type="submit" className={styles.submit} disabled={!formik.isValid}>update password</button>

                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default ResetPassword
