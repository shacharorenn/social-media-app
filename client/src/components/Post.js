import React from 'react';
import { Button, Form, Input } from 'formik-semantic-ui';
import * as Yup from 'yup';
import '../css/Post.css';

//import UserServices from '../services/user.service'

export default ()=>{
    const PostSchema = Yup.object().shape(
        {post: Yup.string().required('required')}
    )

    const handleSubmit = (values,formikApi) => {
        debugger;
        formikApi.setSubmitting(false);
        console.log(values);
    
    };

    return (
        <Form initialValues={{post:''}} onSubmit = {handleSubmit} validationSchema = {PostSchema}>
            <h2 className="ui header">
                <i className="e-icons"></i>
                <span className="e-icons e-search-post" ></span>
                <div className="content">
                    Post
                    <div className="sub header">write here you post</div>
                </div>
            </h2>
            <div className="ui grid">
                <div className="five wide field ">
                    <Input label="post" name="post" />
                    <Button.Submit>Submit</Button.Submit>
                    <Button.Reset>Reset</Button.Reset>
                </div>  
            </div>
        </Form>
    )
}