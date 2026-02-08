import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
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
            className="text-6xl md:text-8xl font-bold font-inter tracking-tight"
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

// Loading Fallback
function Loader() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="text-white text-xl font-inter">Loading Zen...</div>
        </div>
    );
}

export default function HeroSection() {
    return (
        <div className="hero-container">
            {/* Gradient Background */}
            <div className="hero-background" />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 2, 8], fov: 50 }}
                className="hero-canvas"
            >
                <Suspense fallback={null}>
                    <Scene3D />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
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
                    <DecryptedText text="Zen Oasis" delay={0.5} />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        className="text-lg md:text-2xl text-gray-300 mt-6 font-inter font-light tracking-wide"
                    >
                        A Digital Journey to Inner Peace
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2 }}
                        className="mt-12"
                    >
                        <button className="hero-cta">
                            <span className="relative z-10">Explore Garden</span>
                        </button>
                    </motion.div>
                </motion.div>

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
                    <p className="text-sm text-gray-400 mt-2 font-inter">Scroll to explore</p>
                </motion.div>
            </div>
        </div>
    );
}
