import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewStudent } from '../client';

const inputBottom = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottom};

const AddStudentForm = (props) => (
                <Formik
                initialValues={{ email: '', firstName: '', lastName: '', gender: '' }}
                validate={values => {
                    const errors = {};

                    if(!values.firstName){
                        errors.firstName = "First Name Required";
                    }

                    if(!values.lastName){
                        errors.lastName = "Last Name Required";
                    }

                    if(!values.gender){
                        errors.gender = "Gender Required";
                    }

                    if (!values.email) {
                    errors.email = 'Email Required';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }

                    return errors;
                }}
                onSubmit={(student, { setSubmitting }) => {
                    addNewStudent(student).then(() => {
                        props.onSuccess();
                        setSubmitting(false);
                    });
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    submitForm,
                    isValid,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Input
                            style={inputBottom}
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            placeholder='First Name'
                        />
                        {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}

                        <Input
                            style={inputBottom}
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            placeholder='Last Name'
                        />
                        {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}

                        <Input
                            style={inputBottom}
                            name="email"
                            type="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email'
                        />
                        {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}

                        <Input
                            style={inputBottom}
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.gender}
                            placeholder='Gender'
                        />
                        {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
                        <br />
                            <Button onClick={() => submitForm()} 
                                    type="submit" 
                                    disabled={isSubmitting | (touched && !isValid)}>
                            Submit
                        </Button>
                    </form>
                )}
                </Formik>
);


export default AddStudentForm;