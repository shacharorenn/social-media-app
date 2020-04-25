import React, {useState} from 'react';
import { Button, Form, Input } from 'formik-semantic-ui';
import * as Yup from 'yup';
import '../css/Register.css';
import axios from 'axios';
//import UserServices from '../services/user.service'

export default ({token})=>{
    const [errorText ,setError] = useState(null);
    const RegisterSchema = Yup.object().shape(
        {
            email: Yup.string(),//.required('required').email('invalid mail'),
            password: Yup.string(),//.required('required'),
            firstName: Yup.string(),//.required('required'),
            lastName: Yup.string()//.required('required')
        }
    )

    const handleSubmit = async (values,formikApi) => {
            formikApi.setSubmitting(false);
            axios.post('http://localhost:5000/users/create', values)
            .then((res) => {
                console.log("res.data is: ", res)
            }).catch((error) => {
                console.log("register failed")
                console.log(error)
            });
    };

    return (
        <>
            {!token ? 
            (
                <Form initialValues={{firstName:'',lastName:'', email:'', password:''}} onSubmit = {handleSubmit} validationSchema = {RegisterSchema}>
                        <h2 className="ui header">
                            <i className="e-icons"></i>
                            <span className="e-icons e-search" ></span>
                            <div className="content">
                                Register
                                <div className="sub header">please enter your details</div>
                            </div>
                        </h2>
                        <div className="ui grid">
                            <div className="five wide field">
                                <Input label="Email" name="email" />
                                <Input label="First Name" name="firstName" />
                                <Input label="Last Name" name="lastName" />
                                <Input label="Password" name="password" />
                                <Button.Submit>Submit</Button.Submit>
                                <Button.Reset>Reset</Button.Reset>
                            </div>  
                        </div>
                        {
                        errorText && (
                            <>
                                <div className="sub header">
                                    <div className="error-from-server">
                                        <i className="e-icons"></i>
                                        <span className="e-icons e-search-error" ></span>
                                        {errorText}
                                    </div>
                                </div>
                            </>
                        )
                        }   
                </Form>
                ):(
                    <h1>You are logged in already</h1>
                    )
                }
        </>
    )
    
}