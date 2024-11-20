import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import './Contact.css'
const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        console.log('Logging Data', data);
        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = { status: 'OK' };
            console.log('Logging response', response);
            setLoading(false);
        } catch (error) {
            console.log('Error:', error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: '',
                firstname: '',
                lastname: '',
                message: '',
                phoneNo: '',
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className="contact-us-form">
            <div className="form-container">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstname">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            placeholder="Enter first name"
                            {...register('firstname', { required: true })}
                        />
                        {errors.firstname && <span>Please enter your name</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            type="text"
                            id="lastname"
                            placeholder="Enter last name"
                            {...register('lastname')}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email address"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <span>Please enter your email address</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="phonenumber">Phone Number</label>
                    <div className="phone-input">
                        <select
                            id="dropdown"
                            {...register('countrycode', { required: true })}
                        >
                            {CountryCode.map((element, index) => (
                                <option key={index} value={element.code}>
                                    {element.code} - {element.country}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            id="phonenumber"
                            placeholder="12345 67890"
                            {...register('phoneNo', {
                                required: { value: true, message: 'Please enter phone number' },
                                maxLength: { value: 10, message: 'Invalid phone number' },
                                minLength: { value: 8, message: 'Invalid phone number' },
                            })}
                        />
                    </div>
                    {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        rows="7"
                        placeholder="Enter your message here"
                        {...register('message', { required: true })}
                    />
                    {errors.message && <span>Please enter your message.</span>}
                </div>
                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </div>
        </form>
    );
};

export default ContactUsForm;
