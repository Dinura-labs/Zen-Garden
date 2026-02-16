import { motion } from 'framer-motion';
import './styles.css';

const principles = [
    { title: 'Mindfulness', description: 'Present moment awareness with non-judgmental acceptance.', icon: '👁️' },
    { title: 'Compassion', description: 'Love and kindness extended to all sentient beings.', icon: '❤️' },
    { title: 'Wisdom', description: 'Deep insight into the true nature of reality.', icon: '✨' },
    { title: 'Balance', description: 'Walking the middle path in everything we do.', icon: '⚖️' },
];

function About() {
    return (
        <motion.div
            className="page about-page"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
        >
            <div className="page-header">
                <h1 className="page-title">
                    <span className="title-icon">🏔️</span>
                    About the Oasis
                </h1>
                <p className="page-subtitle">Our journey towards collective enlightenment</p>
            </div>

            <div className="about-container">
                <motion.div
                    className="glass-card about-section"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: "2rem" }}
                >
                    <h2 className="section-heading">Our Mission</h2>
                    <p className="section-text">
                        Buddhist Oasis was born from a vision to create a digital sanctuary in an
                        increasingly loud and distracted world. Our mission is to provide
                        accessible paths to mindfulness through the marriage of ancient wisdom
                        and modern technology.
                    </p>
                    <p className="section-text">
                        We believe that every individual has the seed of peace within them.
                        Our platform serves as the fertile soil for that seed to sprout
                        and blossom into full realization.
                    </p>
                </motion.div>

                <motion.div
                    className="glass-card about-section"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: "2rem" }}
                >
                    <h2 className="section-heading">Core Principles</h2>
                    <div className="principles-grid">
                        {principles.map((p, i) => (
                            <motion.div
                                key={p.title}
                                className="principle-card"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="principle-icon" style={{ fontSize: "3rem", marginBottom: "1rem" }}>{p.icon}</div>
                                <h3 className="gallery-title" style={{ color: "#ffd700", marginBottom: "0.5rem" }}>{p.title}</h3>
                                <p className="gallery-description">{p.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="glass-card about-section wisdom-quote"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center" }}
                >
                    <p className="quote-text" style={{
                        fontStyle: "italic",
                        fontSize: "1.5rem",
                        color: "#ffd700",
                        marginBottom: "1rem"
                    }}>
                        "Thousands of candles can be lighted from a single candle,
                        and the life of the candle will not be shortened.
                        Happiness never decreases by being shared."
                    </p>
                    <span className="quote-author" style={{ opacity: 0.8 }}>— Gautama Buddha</span>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default About;
