import { motion } from 'framer-motion';
import { useState } from 'react';
import './styles.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Form is valid - simulate submission
            console.log('Form submitted:', formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    return (
        <div className="page contact-page">
            <div className="page-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="page-title"
                >
                    <span className="dharma-icon">📬</span>
                    Contact Us
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="page-subtitle"
                >
                    Connect with our community and share your journey
                </motion.p>
            </div>

            <div className="contact-container">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="glass-card contact-info"
                >
                    <h2 className="section-heading">Get in Touch</h2>
                    <p className="section-text">
                        We'd love to hear from you! Whether you have questions, feedback, or just want
                        to share your meditation experiences, feel free to reach out.
                    </p>

                    <div className="contact-methods">
                        <div className="contact-method">
                            <span className="method-icon">📧</span>
                            <div className="method-details">
                                <h3 className="method-title">Email</h3>
                                <p className="method-value">contact@buddhistoasis.com</p>
                            </div>
                        </div>

                        <div className="contact-method">
                            <span className="method-icon">💬</span>
                            <div className="method-details">
                                <h3 className="method-title">Community</h3>
                                <p className="method-value">Join our meditation community</p>
                            </div>
                        </div>

                        <div className="contact-method">
                            <span className="method-icon">🌐</span>
                            <div className="method-details">
                                <h3 className="method-title">Social Media</h3>
                                <p className="method-value">Follow us on social platforms</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="glass-card contact-form-container"
                >
                    <h2 className="section-heading">Send a Message</h2>

                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="success-message"
                        >
                            ✓ Thank you! Your message has been received. We'll respond soon.
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`form-input ${errors.name ? 'error' : ''}`}
                                placeholder="Your name"
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-input ${errors.email ? 'error' : ''}`}
                                placeholder="your.email@example.com"
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="message" className="form-label">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`form-textarea ${errors.message ? 'error' : ''}`}
                                placeholder="Share your thoughts..."
                                rows="6"
                            />
                            {errors.message && <span className="error-text">{errors.message}</span>}
                        </div>

                        <button type="submit" className="form-submit">
                            <span className="btn-icon">📤</span>
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

export default Contact;
