import React from 'react'
import * as Yup from 'yup'
import styles from "../../pages/Login/login.module.css"
import resetPasswordImg from "../../assets/Reset password-bro.svg"
import { Form, Formik } from 'formik'
import FormController from '../formConteoller/formController'
import { Link, useNavigate } from 'react-router-dom'
import style from './resetPassword.module.css'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import axios from 'axios'
const ResetPasswordForgetted = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        newPassword: "",
        confirmPassword: '',
        otp: ["", "", "", "", "", ""],
    };
    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("required"),
        newPassword: Yup.string()
            .required("required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "invalid password"
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match')
            .required('Required'),
        otp: Yup.array().of(
            Yup.string()
                .length(1, "Each digit must be 1 character")
                .matches(/^[0-9]$/, "Must be a number")
                .required("Required")
        ).length(6, "Must be exactly 6 digits"),

    });
    const onSubmit = (values) => {
        
        const otpString = values.otp.join('');
        const { confirmPassword, ...updatedValues } = values;
        updatedValues.otp = otpString; 
        mutation.mutate(updatedValues);
    };
    const sendOtp = async (data) => {
        const reponse = await axios.post("http://localhost:3000/api/v1/auth/reset-password", data)
        return reponse.data
    }
    const mutation = useMutation(sendOtp, {
        onSuccess: (res) => {
            toast.success("password Updated successfully")
            console.log(res)
            navigate("/login")

        },
        onError: (err) => {
            toast.error("there is some thing wrong")
        },
    })

    return (
        <div className={`container my-5  ${styles.formContainer}`}>

            <img src={resetPasswordImg} alt="login" />
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
                                    name="newPassword"
                                    className={styles.input}
                                    divStyle={styles.formControl}
                                />
                                <FormController
                                    control="input"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="confirmPassword"
                                    className={styles.input}
                                    divStyle={styles.formControl}
                                />
                                <label htmlFor="otp1" className={style.label}>otp</label>
                                <div className={style.otp}>
                                    {
                                        initialValues.otp.map((value, index) => (
                                            <FormController
                                                control="input"
                                                type="text"
                                                id="otp1"
                                                name={`otp[${index}]`}
                                                className={styles.input}
                                                divStyle={styles.formControl}
                                            />
                                        ))}
                                </div>
                                <div className={styles.submitContainer}>
                                    <button type="submit" className={styles.submit} disabled={!formik.isValid}>change password</button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>

            </div>
        </div>
    )
}

export default ResetPasswordForgetted

