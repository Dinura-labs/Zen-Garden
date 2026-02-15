import React, { useEffect, useState, useRef } from 'react';

export default function MeditationBackground() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioCtxRef = useRef(null);
    const gainNodeRef = useRef(null);
    const oscillatorsRef = useRef([]);

    const startMeditation = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            gainNodeRef.current = audioCtxRef.current.createGain();
            gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
            gainNodeRef.current.connect(audioCtxRef.current.destination);
        }

        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
        }

        // Create a rich drone using multiple oscillators
        const frequencies = [128.43, 192.64, 256.87, 385.31]; // Meditative frequencies

        frequencies.forEach((freq, i) => {
            const osc = audioCtxRef.current.createOscillator();
            const oscGain = audioCtxRef.current.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

            // Add subtle detuning for thickness
            osc.detune.setValueAtTime(Math.random() * 10 - 5, audioCtxRef.current.currentTime);

            oscGain.gain.setValueAtTime(0.1 / frequencies.length, audioCtxRef.current.currentTime);

            // Add slow modulation to the gain for a breathing effect
            const lfo = audioCtxRef.current.createOscillator();
            const lfoGain = audioCtxRef.current.createGain();
            lfo.type = 'sine';
            lfo.frequency.setValueAtTime(0.1 + Math.random() * 0.1, audioCtxRef.current.currentTime);
            lfoGain.gain.setValueAtTime(0.02, audioCtxRef.current.currentTime);

            lfo.connect(lfoGain);
            lfoGain.connect(oscGain.gain);

            osc.connect(oscGain);
            oscGain.connect(gainNodeRef.current);

            osc.start();
            lfo.start();
            oscillatorsRef.current.push({ osc, lfo });
        });

        gainNodeRef.current.gain.linearRampToValueAtTime(0.4, audioCtxRef.current.currentTime + 3);
        setIsPlaying(true);
    };

    const stopMeditation = () => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 2);
            setTimeout(() => {
                oscillatorsRef.current.forEach(({ osc, lfo }) => {
                    osc.stop();
                    lfo.stop();
                });
                oscillatorsRef.current = [];
                setIsPlaying(false);
            }, 2000);
        }
    };

    return (
        <div className="fixed bottom-24 right-8 z-50 flex items-center gap-3">
            <button
                onClick={isPlaying ? stopMeditation : startMeditation}
                className={`flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md transition-all duration-500 ${isPlaying
                        ? 'bg-yellow-500/20 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                        : 'bg-white/10 border-white/20 hover:bg-white/20'
                    } border`}
                title={isPlaying ? "Stop Meditation" : "Start Meditation"}
            >
                <span className={`text-2xl transition-transform duration-500 ${isPlaying ? 'scale-110' : 'scale-100'}`}>
                    {isPlaying ? '🧘' : '🎵'}
                </span>
            </button>
            {isPlaying && (
                <div className="text-yellow-200/80 text-xs font-space tracking-widest uppercase animate-pulse">
                    Meditation Active
                </div>
            )}
        </div>
    );
}
