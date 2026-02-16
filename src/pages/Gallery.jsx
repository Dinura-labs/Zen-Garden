import { motion } from 'framer-motion';
import { useState } from 'react';
import './styles.css';

function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryItems = [
        {
            id: 1,
            title: 'Buddha Statue',
            description: 'Ancient stone Buddha in meditation',
            category: 'Statues',
        },
        {
            id: 2,
            title: 'Zen Garden',
            description: 'Traditional Japanese rock garden',
            category: 'Gardens',
        },
        {
            id: 3,
            title: 'Lotus Flower',
            description: 'Symbol of purity and enlightenment',
            category: 'Nature',
        },
        {
            id: 4,
            title: 'Temple Bells',
            description: 'Sacred bells of mindfulness',
            category: 'Architecture',
        },
        {
            id: 5,
            title: 'Meditation Hall',
            description: 'Peaceful sanctuary for practice',
            category: 'Architecture',
        },
        {
            id: 6,
            title: 'Bodhi Tree',
            description: 'Tree of enlightenment',
            category: 'Nature',
        },
        {
            id: 7,
            title: 'Prayer Wheels',
            description: 'Spinning wheels of wisdom',
            category: 'Sacred Objects',
        },
        {
            id: 8,
            title: 'Incense Burner',
            description: 'Aromatic offerings of devotion',
            category: 'Sacred Objects',
        },
    ];

    return (
        <div className="page gallery-page">
            <div className="page-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="page-title"
                >
                    <span className="dharma-icon">🖼️</span>
                    Sacred Gallery
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="page-subtitle"
                >
                    A collection of Buddhist art, architecture, and natural beauty
                </motion.p>
            </div>

            <div className="gallery-grid">
                {galleryItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="gallery-card"
                        onClick={() => setSelectedImage(item)}
                    >
                        <div className="gallery-card-image">
                            <div className="placeholder-image">
                                <span className="placeholder-icon">
                                    {item.category === 'Statues' && '🗿'}
                                    {item.category === 'Gardens' && '🏯'}
                                    {item.category === 'Nature' && '🌸'}
                                    {item.category === 'Architecture' && '⛩️'}
                                    {item.category === 'Sacred Objects' && '☸'}
                                </span>
                            </div>
                        </div>
                        <div className="gallery-card-content">
                            <div className="gallery-category">{item.category}</div>
                            <h3 className="gallery-title">{item.title}</h3>
                            <p className="gallery-description">{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {selectedImage && (
                <motion.div
                    className="lightbox"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                            ✕
                        </button>
                        <div className="lightbox-image">
                            <span className="lightbox-icon">
                                {selectedImage.category === 'Statues' && '🗿'}
                                {selectedImage.category === 'Gardens' && '🏯'}
                                {selectedImage.category === 'Nature' && '🌸'}
                                {selectedImage.category === 'Architecture' && '⛩️'}
                                {selectedImage.category === 'Sacred Objects' && '☸'}
                            </span>
                        </div>
                        <div className="lightbox-info">
                            <div className="lightbox-category">{selectedImage.category}</div>
                            <h2 className="lightbox-title">{selectedImage.title}</h2>
                            <p className="lightbox-description">{selectedImage.description}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

export default Gallery;
