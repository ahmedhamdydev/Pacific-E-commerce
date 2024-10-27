import React from 'react'
import { Field, ErrorMessage } from 'formik'
import ErroeText from '../Error/ErroeText'

const Input = (props) => {
    const { name ,divStyle, ...rest} = props
    
  return (
    <div className={divStyle}>
        <Field id={name} name={name}  className={props.className} {...rest} />
        <ErrorMessage name={name} component={ErroeText} />
    </div>
  )
}

export default Input
