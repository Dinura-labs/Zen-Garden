import React, { useEffect, useState, useRef } from 'react';

export default function MeditationBackground() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioCtxRef = useRef(null);
    const gainNodeRef = useRef(null);
    const oscillatorsRef = useRef([]);
    const intervalRef = useRef(null);

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

        // Deep binaural drone
        const baseFrequencies = [128.43, 192.64, 256.87]; // Low drone

        baseFrequencies.forEach((freq) => {
            const oscL = audioCtxRef.current.createOscillator();
            const oscR = audioCtxRef.current.createOscillator();
            const pL = audioCtxRef.current.createStereoPanner();
            const pR = audioCtxRef.current.createStereoPanner();
            const g = audioCtxRef.current.createGain();

            oscL.type = 'sine';
            oscR.type = 'sine';

            // 6Hz binaural offset (Theta state)
            oscL.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
            oscR.frequency.setValueAtTime(freq + 6, audioCtxRef.current.currentTime);

            pL.pan.value = -1;
            pR.pan.value = 1;
            g.gain.value = 0.05;

            oscL.connect(pL);
            oscR.connect(pR);
            pL.connect(g);
            pR.connect(g);
            g.connect(gainNodeRef.current);

            oscL.start();
            oscR.start();
            oscillatorsRef.current.push(oscL, oscR);
        });

        // Ethereal wind chimes
        intervalRef.current = setInterval(() => {
            if (!audioCtxRef.current) return;
            const osc = audioCtxRef.current.createOscillator();
            const g = audioCtxRef.current.createGain();
            const p = audioCtxRef.current.createStereoPanner();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800 + Math.random() * 1200, audioCtxRef.current.currentTime);
            p.pan.value = (Math.random() - 0.5) * 2;

            g.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
            g.gain.linearRampToValueAtTime(0.015, audioCtxRef.current.currentTime + 0.1);
            g.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 3);

            osc.connect(p);
            p.connect(g);
            g.connect(audioCtxRef.current.destination);

            osc.start();
            osc.stop(audioCtxRef.current.currentTime + 3.1);
        }, 4000);

        gainNodeRef.current.gain.linearRampToValueAtTime(0.5, audioCtxRef.current.currentTime + 4);
        setIsPlaying(true);
    };

    const stopMeditation = () => {
        if (gainNodeRef.current) {
            gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 3);
            clearInterval(intervalRef.current);
            setTimeout(() => {
                oscillatorsRef.current.forEach(osc => {
                    try { osc.stop(); } catch (e) { }
                });
                oscillatorsRef.current = [];
                setIsPlaying(false);
            }, 3000);
        }
    };

    return (
        <div className="fixed bottom-24 right-8 z-50 flex items-center gap-4">
            {isPlaying && (
                <div className="flex flex-col items-end">
                    <div className="text-yellow-400 text-[10px] font-playfair tracking-[4px] uppercase animate-pulse">
                        Mindfulness Active
                    </div>
                </div>
            )}
            <button
                onClick={isPlaying ? stopMeditation : startMeditation}
                className={`flex items-center justify-center w-14 h-14 rounded-full backdrop-blur-xl transition-all duration-700 shadow-2xl ${isPlaying
                        ? 'bg-yellow-500/20 border-yellow-500/50 shadow-yellow-500/20'
                        : 'bg-white/5 border-white/10 hover:bg-white/15'
                    } border group`}
            >
                <span className={`text-2xl transition-transform duration-700 group-hover:scale-125 ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    {isPlaying ? '🪷' : '🧘'}
                </span>
            </button>
        </div>
    );
}
