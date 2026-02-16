import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

function Meditation() {
    const [isActive, setIsActive] = useState(false);
    const [duration, setDuration] = useState(300); // Default 5 mins
    const [timeLeft, setTimeLeft] = useState(300);
    const [breathPhase, setBreathPhase] = useState('resting'); // inhale, hold, exhale, pause

    useEffect(() => {
        let timer;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    useEffect(() => {
        let breathTimer;
        if (isActive) {
            const phases = [
                { name: 'inhale', duration: 4000 },
                { name: 'hold', duration: 4000 },
                { name: 'exhale', duration: 4000 },
                { name: 'pause', duration: 4000 },
            ];

            let currentIdx = 0;
            const cycle = () => {
                setBreathPhase(phases[currentIdx].name);
                breathTimer = setTimeout(() => {
                    currentIdx = (currentIdx + 1) % phases.length;
                    cycle();
                }, phases[currentIdx].duration);
            };

            cycle();
        } else {
            setBreathPhase('resting');
        }
        return () => clearTimeout(breathTimer);
    }, [isActive]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleStart = () => setIsActive(true);
    const handlePause = () => setIsActive(false);
    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(duration);
    };

    const selectDuration = (secs) => {
        setDuration(secs);
        setTimeLeft(secs);
        setIsActive(false);
    };

    return (
        <motion.div
            className="page meditation-page"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
        >
            <div className="page-header">
                <h1 className="page-title" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <span className="title-icon">🧘</span>
                    Mindful Space
                </h1>
                <p className="page-subtitle">Quiet the mind and the soul will speak</p>
            </div>

            <div className="meditation-container">
                <motion.div
                    className="glass-card main-meditation-card"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    style={{ padding: "4rem 2rem" }}
                >
                    <motion.div
                        className="breath-visualizer"
                        animate={{
                            scale: breathPhase === 'inhale' ? 1.3 : breathPhase === 'exhale' ? 0.9 : 1.1,
                            boxShadow: breathPhase === 'inhale' ? "0 0 50px rgba(255, 215, 0, 0.4)" : "0 0 20px rgba(255, 215, 0, 0.1)"
                        }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        style={{
                            width: "200px",
                            height: "200px",
                            margin: "0 auto 3rem",
                            borderRadius: "50%",
                            border: "2px solid #ffd700",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)"
                        }}
                    >
                        <span className="breath-instruction" style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#ffd700",
                            fontSize: "1.2rem",
                            letterSpacing: "4px"
                        }}>
                            {isActive ? breathPhase.toUpperCase() : 'READY'}
                        </span>
                    </motion.div>

                    <div className="timer-display" style={{
                        fontSize: "5rem",
                        fontFamily: "'Playfair Display', serif",
                        color: "#ffd700",
                        marginBottom: "2rem"
                    }}>
                        {formatTime(timeLeft)}
                    </div>

                    <div className="duration-selector" style={{ marginBottom: "3rem" }}>
                        <p className="selector-label" style={{ color: "rgba(253, 245, 230, 0.6)", marginBottom: "1rem" }}>
                            Select Session Duration
                        </p>
                        <div className="duration-buttons" style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
                            {[60, 300, 600, 900].map((s) => (
                                <button
                                    key={s}
                                    className={`duration-btn ${duration === s ? 'active' : ''}`}
                                    onClick={() => selectDuration(s)}
                                    style={{
                                        padding: "0.5rem 1.5rem",
                                        borderRadius: "50px",
                                        border: "1px solid rgba(255, 215, 0, 0.3)",
                                        background: duration === s ? "#ffd700" : "transparent",
                                        color: duration === s ? "#1a0f0f" : "#fdf5e6",
                                        transition: "all 0.3s ease"
                                    }}
                                >
                                    {s / 60}m
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="meditation-controls" style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
                        {!isActive ? (
                            <button
                                className="control-btn start-btn"
                                onClick={handleStart}
                                style={{
                                    background: "#ffd700",
                                    color: "#1a0f0f",
                                    padding: "1rem 2.5rem",
                                    borderRadius: "50px",
                                    fontWeight: "bold",
                                    border: "none"
                                }}
                            >
                                <span>▶</span> Start Practice
                            </button>
                        ) : (
                            <button
                                className="control-btn pause-btn"
                                onClick={handlePause}
                                style={{
                                    background: "rgba(255, 255, 255, 0.1)",
                                    color: "#fdf5e6",
                                    padding: "1rem 2.5rem",
                                    borderRadius: "50px",
                                    border: "1px solid rgba(255, 255, 255, 0.2)"
                                }}
                            >
                                <span>⏸</span> Pause
                            </button>
                        )}
                        <button
                            className="control-btn reset-btn"
                            onClick={handleReset}
                            style={{
                                background: "transparent",
                                color: "rgba(253, 245, 230, 0.6)",
                                padding: "1rem 2rem",
                                borderRadius: "50px",
                                border: "1px solid rgba(255, 255, 255, 0.1)"
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </motion.div>

                <motion.div
                    className="glass-card tips-card"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ marginTop: "2rem", padding: "2.5rem" }}
                >
                    <h3 className="tips-title" style={{ color: "#ffd700", marginBottom: "1.5rem" }}>Meditation Tips</h3>
                    <ul className="tips-list" style={{ listStyle: "none", padding: 0, textAlign: "left" }}>
                        <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem", color: "rgba(253, 245, 230, 0.8)" }}>
                            <span>🧘</span> Find a comfortable, upright position to allow free energy flow.
                        </li>
                        <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem", color: "rgba(253, 245, 230, 0.8)" }}>
                            <span>🌬️</span> Focus on the natural rhythm of your breath as it enters and leaves.
                        </li>
                        <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem", color: "rgba(253, 245, 230, 0.8)" }}>
                            <span>🍃</span> When thoughts arise, acknowledge them like clouds passing in the sky.
                        </li>
                        <li style={{ display: "flex", gap: "1rem", color: "rgba(253, 245, 230, 0.8)" }}>
                            <span>✨</span> Return gently to the present moment without any judgment.
                        </li>
                    </ul>
                </motion.div>
            </div >
        </motion.div >
    );
}

export default Meditation;
