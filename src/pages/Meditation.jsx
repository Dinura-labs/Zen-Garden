import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import './styles.css';

function Meditation() {
    const [isActive, setIsActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes in seconds
    const [selectedDuration, setSelectedDuration] = useState(10);
    const [breathPhase, setBreathPhase] = useState('inhale'); // inhale, hold, exhale, pause
    const intervalRef = useRef(null);
    const breathIntervalRef = useRef(null);

    const durations = [5, 10, 15, 20, 30];

    useEffect(() => {
        if (isActive && timeRemaining > 0) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prev) => prev - 1);
            }, 1000);
        } else if (timeRemaining === 0) {
            setIsActive(false);
        }

        return () => clearInterval(intervalRef.current);
    }, [isActive, timeRemaining]);

    useEffect(() => {
        if (isActive) {
            const breathCycle = () => {
                setBreathPhase('inhale');
                setTimeout(() => setBreathPhase('hold'), 4000);
                setTimeout(() => setBreathPhase('exhale'), 8000);
                setTimeout(() => setBreathPhase('pause'), 14000);
            };

            breathCycle();
            breathIntervalRef.current = setInterval(breathCycle, 16000);
        } else {
            clearInterval(breathIntervalRef.current);
            setBreathPhase('inhale');
        }

        return () => clearInterval(breathIntervalRef.current);
    }, [isActive]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startMeditation = () => {
        setIsActive(true);
    };

    const pauseMeditation = () => {
        setIsActive(false);
    };

    const resetMeditation = () => {
        setIsActive(false);
        setTimeRemaining(selectedDuration * 60);
    };

    const handleDurationChange = (duration) => {
        setSelectedDuration(duration);
        setTimeRemaining(duration * 60);
        setIsActive(false);
    };

    const getBreathInstruction = () => {
        switch (breathPhase) {
            case 'inhale':
                return 'Breathe In';
            case 'hold':
                return 'Hold';
            case 'exhale':
                return 'Breathe Out';
            case 'pause':
                return 'Pause';
            default:
                return 'Breathe';
        }
    };

    const getBreathScale = () => {
        switch (breathPhase) {
            case 'inhale':
                return 1.4;
            case 'hold':
                return 1.4;
            case 'exhale':
                return 1;
            case 'pause':
                return 1;
            default:
                return 1;
        }
    };

    return (
        <div className="page meditation-page">
            <div className="page-header">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="page-title"
                >
                    <span className="dharma-icon">🧘</span>
                    Guided Meditation
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="page-subtitle"
                >
                    Find inner peace through mindful practice
                </motion.p>
            </div>

            <div className="meditation-container">
                <motion.div
                    className="breath-visualizer"
                    animate={{
                        scale: getBreathScale(),
                    }}
                    transition={{
                        duration: breathPhase === 'inhale' ? 4 : breathPhase === 'exhale' ? 6 : 0.5,
                        ease: 'easeInOut',
                    }}
                >
                    <div className="breath-circle">
                        <span className="breath-instruction">{getBreathInstruction()}</span>
                    </div>
                </motion.div>

                <div className="timer-display">
                    <div className="time-remaining">{formatTime(timeRemaining)}</div>
                </div>

                <div className="duration-selector">
                    <p className="selector-label">Select Duration</p>
                    <div className="duration-buttons">
                        {durations.map((duration) => (
                            <button
                                key={duration}
                                className={`duration-btn ${selectedDuration === duration ? 'active' : ''}`}
                                onClick={() => handleDurationChange(duration)}
                                disabled={isActive}
                            >
                                {duration} min
                            </button>
                        ))}
                    </div>
                </div>

                <div className="meditation-controls">
                    {!isActive ? (
                        <button className="control-btn start-btn" onClick={startMeditation}>
                            <span className="btn-icon">▶</span>
                            Begin Meditation
                        </button>
                    ) : (
                        <button className="control-btn pause-btn" onClick={pauseMeditation}>
                            <span className="btn-icon">⏸</span>
                            Pause
                        </button>
                    )}
                    <button className="control-btn reset-btn" onClick={resetMeditation}>
                        <span className="btn-icon">↻</span>
                        Reset
                    </button>
                </div>

                <div className="meditation-tips glass-card">
                    <h3 className="tips-title">Meditation Tips</h3>
                    <ul className="tips-list">
                        <li>Find a quiet, comfortable space</li>
                        <li>Sit with your back straight and shoulders relaxed</li>
                        <li>Close your eyes or maintain a soft gaze</li>
                        <li>Follow the breathing guide naturally</li>
                        <li>If your mind wanders, gently return focus to your breath</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Meditation;
