import React from "react";
import { Form, Formik } from "formik";
import FormController from "../../components/formConteoller/formController";
import * as Yup from "yup";
import styles from '../Login/login.module.css'
import ForgetPasswordImg from '../../assets/Forgot password-bro.svg'
import axios from "axios";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate('')
    const initialValues = {
        email: "",
    };
    const validationSchema = Yup.object({
        email: Yup.string()
            .required("required")
            .email("invalid email"),
    });
    const onSubmit = (values) => {
        mutation.mutate(values)
        console.log(values);
    };
    const sendEmail=async(email)=>{
        const reponse= await axios.post("http://localhost:3000/api/v1/auth/send-otp", email)
        return reponse.data
    }
    const mutation = useMutation(sendEmail,{
        onSuccess:()=>{
            toast.success("Please Ckeck your gmail ")
            navigate("/forget-password-reset")
            
        },
        onError:(err)=>{
            toast.error("Please Enter a Valid Email")
        },
    })

    return (
        <div className={`container my-5  ${styles.formContainer}`}>
            <img src={ForgetPasswordImg} alt="login" />
            <div className={styles.login}>
                <h1>forget password </h1>
            
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
                            
                            <div className={styles.submitContainer}>
                                <button type="submit" className={styles.submit} disabled={!formik.isValid}>send to email</button>
                               
                            </div>
                            
                        </Form>
                    );
                }}
            </Formik>
            </div>
        </div>
    );
};

export default ForgetPassword;
