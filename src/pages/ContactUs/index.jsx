import React from 'react'
import styles from './contactUs.module.css'
import style from '../Login/login.module.css'
import Header from '../../components/Header/Header'
import ContactCard from '../../components/contactCard/ContactCard'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormController from '../../components/formConteoller/formController'
const ContactUs = () => {
  // const initialValues = {
  //   userName: '',
  //   email: '',
  //   phone: '',
  //   message: ''
  // }
  // const validationSchema = Yup.object({
  //   userName: Yup.string().required('Required'),
  //   email: Yup.string().email('Invalid email format').required('Required'),
  //   phone: Yup.string().matches(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}?\)?)[-.\s]?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})$/, 'Invalid phone number').required('Required'),
  //   message: Yup.string().required('Required').min(5, "please enter a message")
  // })
  // const onSubmit = (values) => {
  //   console.log(values)
  // }
  return (
    <div>
      <Header title={"contact us"} details={"home > contactus"} bgImage={"contactHeader"} />
      <div className='container'>
        <div className={` ${styles.contactContiner} `}>
          <div className={styles.contactInfo}>
            <h2>let's get on touch</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore assumenda ipsam ab optio error quibusdam dolorum! Dolore est temporibus asperiores aut qui dicta, modi totam vero dolorem cupiditate fugit id!</p>
            <div className={styles.contactInfoCard}>
              <ContactCard icon={"fa-solid fa-location-pin"} title={"location"} details={"mansoura"} />
              <ContactCard icon={"fa-solid fa-square-phone"} title={"call"} details={"01001865858"} />
              <ContactCard icon={"fa-solid fa-envelopes-bulk"} title={"mail"} details={"shop@gmail.com"} />
            </div>
          </div>
          <img src={require("../../assets/contact2.jpg")} alt="contact" />
          {/* <div className={styles.formContainer}>
            <h2>let's take with us</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              {
                formik => {
                  return (
                    <Form>
                      <FormController
                        control="input"
                        type="text"
                        placeholder="Enter your name"
                        divStyle={style.formControl}
                        name="userName"
                        className={style.input}
                      />
                      <FormController
                        control="input"
                        type="email"
                        placeholder="Enter your email"
                        divStyle={style.formControl}
                        name="email"
                        className={style.input}
                      />
                      <FormController
                        control="input"
                        type="text"
                        placeholder="Enter your phone Number "
                        divStyle={style.formControl}
                        name="phone"
                        className={style.input}
                      />
                      <FormController
                        control="textarea"
                        placeholder="Enter your message "
                        name="message"
                        className={style.textArea}
                        divStyle={style.formControl}
                      />
                      <button type="submit" className={style.submit} disabled={!formik.isValid}>send message</button>
                    </Form>
                  )
                }
              }
            </Formik>
          </div> */}
        </div>
      </div>
      
      <div className={`${styles.map} container`}>
        <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3418.4854802727855!2d31.35185677543119!3d31.040581774437253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f79db2a4a552a1%3A0x7acb65869f42f8f3!2sITI%20Mansoura%20Branch%20(New%20Building)!5e0!3m2!1sen!2seg!4v1727658560609!5m2!1sen!2seg" width="100%" height="450" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </div>

  )
}

export default ContactUs
