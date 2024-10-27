import React from 'react'
import styles from '../Login/login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import FormController from '../../components/formConteoller/formController';
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import SignUpImg from '../../assets/Sign up-bro.svg'
import axios from 'axios';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';
const SignUp = () => {
    const egyptGovernorates = [
        { key: "choose your governorate", value: "" },
        { key: "Cairo", value: "Cairo" },
        { key: "Alexandria", value: "Alexandria" },
        { key: "Giza", value: "Giza" },
        { key: "Qalyubia", value: "Qalyubia" },
        { key: "Dakahlia", value: "Dakahlia" },
        { key: "Sharqia", value: "Sharqia" },
        { key: "Gharbia", value: "Gharbia" },
        { key: "Monufia", value: "Monufia" },
        { key: "Beheira", value: "Beheira" },
        { key: "Kafr El Sheikh", value: "Kafr El Sheikh" },
        { key: "Damietta", value: "Damietta" },
        { key: "Port Said", value: "Port Said" },
        { key: "Ismailia", value: "Ismailia" },
        { key: "Suez", value: "Suez" },
        { key: "South Sinai", value: "South Sinai" },
        { key: "North Sinai", value: "North Sinai" },
        { key: "Faiyum", value: "Faiyum" },
        { key: "Beni Suef", value: "Beni Suef" },
        { key: "Minya", value: "Minya" },
        { key: "Asyut", value: "Asyut" },
        { key: "Sohag", value: "Sohag" },
        { key: "Qena", value: "Qena" },
        { key: "Luxor", value: "Luxor" },
        { key: "Aswan", value: "Aswan" },
        { key: "Red Sea", value: "Red Sea" },
        { key: "New Valley", value: "New Valley" },
        { key: "Matrouh", value: "Matrouh" },
    ];
    const roleOtion = [
        { key: "user", value: "user" },
        { key: "seller", value: "seller" },
    ]
    const initialValues = {
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
        addresses: [{
            country: 'Egypt',
            city: '',
            street: '',
            zipcode: ''
        }],
        role: "user"
    };
    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("required"),
        username: Yup.string().required("required").min(3, " invalid user name").matches(/^[a-zA-Z0-9]([._]?[a-zA-Z0-9]+){2,19}$/, 'Invalid username.'),
        password: Yup.string()
            .required("required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                "invalid password"
            ),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), ''], 'Passwords must match')
            .required('Required'),
        // addresses:Yup.string().required("required"),
        addresses: Yup.array()
            .of(
                Yup.object({
                    country: Yup.string(),
                    city: Yup.string().required("required"),

                })
            )
        ,
        role: Yup.string().required("required").oneOf(["seller", "user"], "Role must be either 'admin' or 'user'")
    });
    const signUpUser = async (user) => {
        const response = await axios.post("http://localhost:3000/api/v1/auth/signup", user)
        return response.data
    }
    const navigate = useNavigate()
    const mutation = useMutation(signUpUser, {
        onSuccess: () => {
            toast.success("Congratulation tou have been signup  successfully!")
            navigate("/login")
        },
        onError: (error) => {
            // alert(error.message)
            toast.error("Sorry" +error.response.data.errors[0].msg)
            // console.log("error")
        }
    })
    const onSubmit = (values) => {
        // console.log(values); 
        // const { passwordConfirm, ...dataToSubmit } = values;
        // mutation.mutate(dataToSubmit);
        const { addresses, ...rest } = values; // Destructure addresses and the rest of the properties
        const newValues = {
            ...rest,
            address: addresses[0], // Set address to the first address
        };
        // console.log(values);
        mutation.mutate(newValues);
    };

    return (
        <div className={`container my-5  ${styles.formContainer}`}>

            <img src={SignUpImg} alt="login" />
            <div className={styles.login}>
                <h1>create an account </h1>

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
                                    type="text"
                                    placeholder="Enter your name"
                                    divStyle={styles.formControl}
                                    name="username"
                                    className={styles.input}
                                />
                                <FormController
                                    name="role"
                                    control="select"
                                    options={roleOtion}
                                    selectClass={styles.select}
                                    optionClass={styles.option}
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
                                    placeholder="confirm Password"
                                    name="passwordConfirm"
                                    className={styles.input}
                                    divStyle={styles.formControl}
                                />
                                <FormController
                                    control="select"
                                    options={egyptGovernorates}
                                    name="addresses[0].city"
                                    selectClass={styles.select}
                                    optionClass={styles.option}
                                    divStyle={styles.formControl}
                                />
                                <div className={styles.submitContainer}>
                                    <button type="submit" className={styles.submit} disabled={!formik.isValid }>sign up</button>

                                </div>
                                <p>already have an account? <Link to={'/login'}>login</Link> </p>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default SignUp
