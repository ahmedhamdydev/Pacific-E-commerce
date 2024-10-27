import { ErrorMessage, Field } from 'formik'
import React from 'react'
import ErroeText from '../Error/ErroeText'

function TextArea(props) {
    const { name, divStyle, ...rest } = props
    return (
        <div className={divStyle} >
            <Field as='textarea' id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={ErroeText} />
        </div>
    )
}

export default TextArea

