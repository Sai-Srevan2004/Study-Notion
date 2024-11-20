import React from 'react';
import ContactUsForm from '../../ContactPage/ContactUsForm';
import './AboutPage.css';

const ContactFormSection = () => {
    return (
        <div className="contact-form-section">
            <h1 className="contact-form-title">Get in Touch</h1>
            <p className="contact-form-description">
                We'd love to hear from you. Please fill out this form.
            </p>
            <div className="contact-form-container">
                <ContactUsForm />
            </div>
        </div>
    );
};

export default ContactFormSection;
