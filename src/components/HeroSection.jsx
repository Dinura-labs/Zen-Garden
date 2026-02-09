import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import Scene3D from './Scene3D';
import './HeroSection.css';

// Decrypted Text Animation Component
function DecryptedText({ text, delay = 0 }) {
    const [displayText, setDisplayText] = useState('');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        if (char === ' ') return ' ';
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 50);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay }}
            className="text-6xl md:text-8xl font-bold font-space tracking-tight"
            style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #646cff 50%, #00ffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}
        >
            {displayText}
        </motion.h1>
    );
}

// Zen Quote Overlay
function QuoteOverlay({ quote }) {
    if (!quote) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4 }}
                className="quote-overlay"
            >
                <div className="quote-content">
                    <div className="quote-category">{quote.category}</div>
                    <p className="quote-text">{quote.text}</p>
                    <div className="quote-author">— {quote.author}</div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

// Loading Fallback
function Loader() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="text-white text-xl font-space">Loading AI Zen Garden...</div>
        </div>
    );
}

export default function HeroSection() {
    const [antiGravity, setAntiGravity] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(null);
    const [showQuote, setShowQuote] = useState(false);

    const handleQuoteHover = (quote) => {
        setCurrentQuote(quote);
        setShowQuote(true);

        // Hide quote after 5 seconds
        setTimeout(() => {
            setShowQuote(false);
        }, 5000);
    };

    const toggleAntiGravity = () => {
        setAntiGravity(!antiGravity);
    };

    return (
        <div className="hero-container">
            {/* Gradient Background */}
            <div className="hero-background" />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 2, 8], fov: 50 }}
                className="hero-canvas"
                shadows
            >
                <Suspense fallback={null}>
                    <Scene3D antiGravity={antiGravity} onQuoteHover={handleQuoteHover} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        autoRotate={false}
                    />
                </Suspense>
            </Canvas>

            {/* UI Overlay */}
            <div className="hero-overlay">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="text-center z-10"
                >
                    <DecryptedText text="AI Zen Garden" delay={0.5} />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="text-lg md:text-2xl text-gray-300 mt-6 font-inter font-light tracking-wide"
                    >
                        Where Ancient Wisdom Meets Digital Consciousness
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2 }}
                        className="mt-12 flex gap-4 justify-center items-center flex-wrap"
                    >
                        <button className="hero-cta">
                            <span className="relative z-10">Enter the Garden</span>
                        </button>

                        {/* Anti-Gravity Toggle */}
                        <button
                            className={`anti-gravity-toggle ${antiGravity ? 'active' : ''}`}
                            onClick={toggleAntiGravity}
                        >
                            <span className="toggle-icon">{antiGravity ? '🌌' : '⚡'}</span>
                            <span className="toggle-text">
                                {antiGravity ? 'Gravity: OFF' : 'Anti-Gravity'}
                            </span>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Zen Quote Overlay */}
                {showQuote && currentQuote && <QuoteOverlay quote={currentQuote} />}

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2.5 }}
                    className="scroll-indicator"
                >
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2 font-inter">Explore the oasis</p>
                </motion.div>
            </div>

            {/* Instructions overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
                className="instructions"
            >
                <p className="text-xs text-gray-500 font-inter">
                    Hover over crystals for wisdom • Toggle anti-gravity • Move mouse on sand
                </p>
            </motion.div>
        </div>
    );
}
