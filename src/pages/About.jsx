import { motion } from 'framer-motion';
import './styles.css';

function About() {
    const principles = [
        {
            icon: '🪷',
            title: 'Mindfulness',
            description: 'Being present in each moment with full awareness and acceptance',
        },
        {
            icon: '☮️',
            title: 'Compassion',
            description: 'Cultivating loving-kindness towards all beings without exception',
        },
        {
            icon: '🕉️',
            title: 'Wisdom',
            description: 'Understanding the true nature of reality through insight',
        },
        {
            icon: '⚖️',
            title: 'Balance',
            description: 'Following the Middle Way, avoiding extremes in all things',
        },
    ];

    return (
        <div className="page about-page">
            <div className="page-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="page-title"
                >
                    <span className="dharma-icon">☸</span>
                    About Buddhist Oasis
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="page-subtitle"
                >
                    A digital sanctuary for spiritual growth and inner peace
                </motion.p>
            </div>

            <div className="about-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="glass-card about-section"
                >
                    <h2 className="section-heading">Our Mission</h2>
                    <p className="section-text">
                        Buddhist Oasis is a digital sanctuary designed to bring the timeless wisdom of
                        Buddhist teachings into the modern world. We believe that mindfulness, meditation,
                        and spiritual practice should be accessible to everyone, regardless of background
                        or experience level.
                    </p>
                    <p className="section-text">
                        Through interactive experiences, guided meditations, and beautiful visualizations,
                        we aim to help you cultivate inner peace, develop mindfulness, and walk the path
                        toward enlightenment in your own unique way.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="glass-card about-section"
                >
                    <h2 className="section-heading">Core Principles</h2>
                    <div className="principles-grid">
                        {principles.map((principle, index) => (
                            <motion.div
                                key={principle.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                                className="principle-card"
                            >
                                <div className="principle-icon">{principle.icon}</div>
                                <h3 className="principle-title">{principle.title}</h3>
                                <p className="principle-description">{principle.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="glass-card about-section"
                >
                    <h2 className="section-heading">The Journey</h2>
                    <p className="section-text">
                        Buddhist Oasis was created as a fusion of ancient wisdom and modern technology.
                        Our 3D interactive experiences combine traditional Buddhist symbolism with
                        cutting-edge web technologies to create an immersive environment for meditation
                        and reflection.
                    </p>
                    <p className="section-text">
                        Whether you're a seasoned practitioner or just beginning your spiritual journey,
                        Buddhist Oasis offers tools and resources to support your practice. From guided
                        meditations to interactive visualizations, each feature is designed to help you
                        connect with your inner self and find peace in the present moment.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                    className="glass-card quote-section"
                >
                    <blockquote className="wisdom-quote">
                        <p className="quote-text">
                            "Peace comes from within. Do not seek it without."
                        </p>
                        <footer className="quote-author">— Buddha</footer>
                    </blockquote>
                </motion.div>
            </div>
        </div>
    );
}

export default About;
