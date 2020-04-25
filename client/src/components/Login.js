import React, {useState} from 'react';
import { Button, Form, Input } from 'formik-semantic-ui';
import * as Yup from 'yup';
import '../css/Login.css';
import UserServices from '../services/user.service'
import axios from 'axios';

export default ({tokenCb,token})=>{
    const [errorText ,setError] = useState(null);

    const LoginSchema = Yup.object().shape(
        {
            email: Yup.string(),//.required('required').email('invalid mail'),
            password: Yup.string()//.required('required'),
        }
    )
    const handleLogin = async (values,formikApi) => {
            formikApi.setSubmitting(false);
            axios.post('http://localhost:5000/users/login', values)
            .then((res) => {
                tokenCb(res.data.token);
            }).catch((error) => {
                console.log(error)
            });
            // try {
            //     const token = await UserServices.login(values);
            //     tokenCb(token);
            // }
            // catch(err){
            //     const {error} = await err.response.json();
            //     setError(error);
            // }
    };

    return (
        <>
        {!token ?
        (
            <Form initialValues={{email:'', password:''}} onSubmit = {handleLogin} validationSchema = {LoginSchema}>
                    <h2 className="ui header">
                        <i className="e-icons"></i>
                        <span className="e-icons e-search-login" ></span>
                        <div className="content">
                            Login
                            <div className="sub header">please enter you details</div>
                        </div>
                    </h2>
                    <div className="ui grid">
                        <div className="five wide field">
                            <Input label="Email" name="email" />
                            <Input label="Password" name="password" />
                            <Button.Submit>Login</Button.Submit>
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
                <h1>Login Success!</h1>
                )
            }
    </>
    )
}