import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

// Import premium assets
import buddhaImg from '../assets/buddha_statue_premium_v2_1771263963579.png';
import bellImg from '../assets/temple_bell_premium_v2_1771264009551.png';
import hallImg from '../assets/meditation_hall_premium_v2_1771264039485.png';
import treeImg from '../assets/bodhi_tree_premium_v2_1771264056233.png';
import wheelsImg from '../assets/prayer_wheels_premium_v2_1771264089351.png';
import incenseImg from '../assets/incense_burner_premium_v2_1771264110917.png';
import gardenImg from '../assets/zen_garden_premium_final_1771264149017.png';
import lotusImg from '../assets/lotus_flower_premium_final_1771264185767.png';

const galleryItems = [
    { id: 1, title: 'Ancient Wisdom', category: 'Statues', description: 'Hand-carved stone Buddha in deep dhyana mudra, reflecting eternal peace.', image: buddhaImg },
    { id: 2, title: 'Stone Sanctuary', category: 'Gardens', description: 'A perfectly raked Zen garden representing the stillness of the mind.', image: gardenImg },
    { id: 3, title: 'Radiant Lotus', category: 'Nature', description: 'The sacred lotus blooming in purity, untouched by the surrounding waters.', image: lotusImg },
    { id: 4, title: 'Silent Hall', category: 'Architecture', description: 'A traditional meditation hall where thousands have found their inner light.', image: hallImg },
    { id: 5, title: 'Morning Chime', category: 'Sacred Objects', description: 'The resonant sound of the temple bell marks the beginning of mindfulness.', image: bellImg },
    { id: 6, title: 'Bodhi Shade', category: 'Nature', description: 'The venerable tree under which enlightenment was realized.', image: treeImg },
    { id: 7, title: 'Spinning Devotion', category: 'Sacred Objects', description: 'Prayer wheels containing thousands of mantras for world peace.', image: wheelsImg },
    { id: 8, title: 'Pure Offering', category: 'Sacred Objects', description: 'Sandalwood incense drifting upwards, symbolizing the spread of dharma.', image: incenseImg },
];

function Gallery() {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <motion.div
            className="page gallery-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="page-header">
                <h1 className="page-title">
                    <span className="title-icon">🎨</span>
                    Sacred Gallery
                </h1>
                <p className="page-subtitle">Visual reflections of the enlightened path</p>
            </div>

            <div className="gallery-grid">
                {galleryItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="gallery-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedItem(item)}
                        whileHover={{ y: -10 }}
                    >
                        <div className="gallery-card-image">
                            <img src={item.image} alt={item.title} loading="lazy" />
                            <div className="card-overlay">
                                <span className="view-text">View Details</span>
                            </div>
                        </div>
                        <div className="gallery-card-content">
                            <span className="gallery-category">{item.category}</span>
                            <h3 className="gallery-title">{item.title}</h3>
                            <p className="gallery-description">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        className="lightbox"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            className="lightbox-content"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="lightbox-close" onClick={() => setSelectedItem(null)}>
                                ✕
                            </button>
                            <div className="lightbox-image-container">
                                <img src={selectedItem.image} alt={selectedItem.title} />
                            </div>
                            <div className="lightbox-info">
                                <span className="gallery-category">{selectedItem.category}</span>
                                <h2 className="lightbox-title-text" style={{
                                    fontFamily: "'Playfair Display', serif",
                                    color: "#ffd700",
                                    fontSize: "2rem",
                                    margin: "0 0 1rem 0"
                                }}>
                                    {selectedItem.title}
                                </h2>
                                <p className="section-text">{selectedItem.description}</p>
                                <div className="wisdom-quote" style={{ marginTop: '2rem', textAlign: 'left' }}>
                                    <p className="quote-text" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                        "Peace comes from within. Do not seek it without."
                                    </p>
                                    <span className="quote-author" style={{ color: "#ffd700" }}>— The Buddha</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default Gallery;
