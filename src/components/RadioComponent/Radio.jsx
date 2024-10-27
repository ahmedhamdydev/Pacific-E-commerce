import { ErrorMessage, Field } from 'formik'
import React from 'react'

import ErroeText from '../Error/ErroeText';

function Radio(props) {
    const { label, name,divStyle ,options, ...rest } = props;
    return (
        <div className={divStyle}>
            
            <Field name={name} id={name} {...rest}>
                {
                    ({ field }) => {
                        return (
                            options.map((option) => {
                                return (
                                    <div key={option.key}  >
                                        <input type='radio' 
                                        id={option.value} {...field} 
                                        value={option.value} 
                                        checked={field.value === option.value
                                            
                                        }   />
                                        <label htmlFor={option.value} style={{
                                            display:'inline-block',
                                            marginLeft:'10px',
                                            marginBottom:'20px',
                                            textTransform:'capitalize'
                                        }} >{option.key}</label>
                                    </div>
                                )
                            })
                        )
                    }
                }
            </Field>
            <ErrorMessage name={name} component={ErroeText} />
        </div>
    )
}

export default Radio
