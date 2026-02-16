import { useState } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Please enter your name';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Valid email is required';
        }
        if (!formData.message) newErrors.message = 'Please share your thoughts';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            setSubmitted(true);
            // Reset form data after submission
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <motion.div
            className="page contact-page"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6 }}
        >
            <div className="page-header">
                <h1 className="page-title">
                    <span className="title-icon">✉️</span>
                    Connect With Us
                </h1>
                <p className="page-subtitle">We are here to support your path</p>
            </div>

            <div className="contact-container" style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "1fr 1.5fr",
                gap: "3rem",
                paddingBottom: "5rem"
            }}>
                <motion.div
                    className="glass-card contact-info"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="contact-method" style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem" }}>
                        <div className="method-icon" style={{
                            fontSize: "2rem",
                            background: "rgba(255, 215, 0, 0.1)",
                            width: "60px",
                            height: "60px",
                            borderRadius: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>📍</div>
                        <div>
                            <h4 className="method-title" style={{ color: "#ffd700", fontSize: "1.2rem", marginBottom: "0.25rem" }}>Global Community</h4>
                            <p className="method-value" style={{ opacity: 0.7 }}>Connecting spirits worldwide</p>
                        </div>
                    </div>
                    <div className="contact-method" style={{ display: "flex", gap: "1.5rem", marginBottom: "2.5rem" }}>
                        <div className="method-icon" style={{
                            fontSize: "2rem",
                            background: "rgba(255, 215, 0, 0.1)",
                            width: "60px",
                            height: "60px",
                            borderRadius: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>📧</div>
                        <div>
                            <h4 className="method-title" style={{ color: "#ffd700", fontSize: "1.2rem", marginBottom: "0.25rem" }}>Email Us</h4>
                            <p className="method-value" style={{ opacity: 0.7 }}>peace@buddhistoasis.com</p>
                        </div>
                    </div>
                    <div className="contact-method" style={{ display: "flex", gap: "1.5rem" }}>
                        <div className="method-icon" style={{
                            fontSize: "2rem",
                            background: "rgba(255, 215, 0, 0.1)",
                            width: "60px",
                            height: "60px",
                            borderRadius: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>📱</div>
                        <div>
                            <h4 className="method-title" style={{ color: "#ffd700", fontSize: "1.2rem", marginBottom: "0.25rem" }}>Sangha Support</h4>
                            <p className="method-value" style={{ opacity: 0.7 }}>Available for meditation guidance</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="glass-card contact-form-container"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    {submitted ? (
                        <motion.div
                            className="success-message"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ textAlign: "center", padding: "3rem" }}
                        >
                            <h3 style={{ color: "#ffd700", fontSize: "2rem", marginBottom: "1rem" }}>With Metta, thank you.</h3>
                            <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>Your reflection has been received with peace. We will respond in mindfulness soon.</p>
                            <button
                                className="duration-btn"
                                onClick={() => setSubmitted(false)}
                                style={{
                                    padding: "0.75rem 2rem",
                                    borderRadius: "50px",
                                    border: "1px solid #ffd700",
                                    background: "transparent",
                                    color: "#ffd700",
                                    cursor: "pointer"
                                }}
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <label className="form-label" style={{ opacity: 0.6, fontSize: "0.9rem" }}>Dharma Name / Full Name</label>
                                <input
                                    type="text"
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{
                                        padding: "1rem",
                                        borderRadius: "10px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: errors.name ? "1px solid #ff4444" : "1px solid rgba(255, 255, 255, 0.1)",
                                        color: "white"
                                    }}
                                />
                                {errors.name && <span className="error-text" style={{ color: "#ff4444", fontSize: "0.8rem" }}>{errors.name}</span>}
                            </div>
                            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <label className="form-label" style={{ opacity: 0.6, fontSize: "0.9rem" }}>Email Address</label>
                                <input
                                    type="email"
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{
                                        padding: "1rem",
                                        borderRadius: "10px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: errors.email ? "1px solid #ff4444" : "1px solid rgba(255, 255, 255, 0.1)",
                                        color: "white"
                                    }}
                                />
                                {errors.email && <span className="error-text" style={{ color: "#ff4444", fontSize: "0.8rem" }}>{errors.email}</span>}
                            </div>
                            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <label className="form-label" style={{ opacity: 0.6, fontSize: "0.9rem" }}>Your Reflection / Query</label>
                                <textarea
                                    className={`form-input form-textarea ${errors.message ? 'error' : ''}`}
                                    rows="5"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{
                                        padding: "1rem",
                                        borderRadius: "10px",
                                        background: "rgba(255, 255, 255, 0.05)",
                                        border: errors.message ? "1px solid #ff4444" : "1px solid rgba(255, 255, 255, 0.1)",
                                        color: "white",
                                        resize: "none"
                                    }}
                                />
                                {errors.message && <span className="error-text" style={{ color: "#ff4444", fontSize: "0.8rem" }}>{errors.message}</span>}
                            </div>
                            <button
                                type="submit"
                                className="form-submit"
                                style={{
                                    background: "#ffd700",
                                    color: "#1a0f0f",
                                    padding: "1rem",
                                    borderRadius: "50px",
                                    fontWeight: "bold",
                                    border: "none",
                                    cursor: "pointer",
                                    marginTop: "1rem"
                                }}
                            >
                                Submit Reflection
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}

export default Contact;
