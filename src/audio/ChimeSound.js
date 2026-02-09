// Spatial Audio Chime for Crystalline Nodes
let audioContext = null;
let masterGainNode = null;

// Initialize audio context
export function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        masterGainNode = audioContext.createGain();
        masterGainNode.gain.value = 0.3;
        masterGainNode.connect(audioContext.destination);
    }
    return audioContext;
}

// Play spatial chime based on crystal type
export function playChime(crystalType, position = { x: 0, y: 0, z: 0 }) {
    const ctx = initAudioContext();

    // Resume audio context if suspended (browser requirement)
    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    // Create oscillator for the chime
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const panner = ctx.createPanner();

    // Set 3D spatial properties
    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 10;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;
    panner.setPosition(position.x, position.y, position.z);

    // Different frequencies for different crystal types
    const frequencies = {
        tetrahedron: 528,  // C (Solfeggio frequency)
        icosahedron: 639,  // D#
        dodecahedron: 741, // F#
        sphere: 852,       // G#
        octahedron: 963    // B
    };

    const frequency = frequencies[crystalType] || 528;

    // Configure oscillator  
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Add subtle harmonics
    const harmonic = ctx.createOscillator();
    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(frequency * 2, ctx.currentTime);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.value = 0.2;

    // Envelope for natural chime sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

    harmonicGain.gain.setValueAtTime(0, ctx.currentTime);
    harmonicGain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    harmonicGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

    // Connect audio graph
    oscillator.connect(gainNode);
    harmonic.connect(harmonicGain);
    gainNode.connect(panner);
    harmonicGain.connect(panner);
    panner.connect(masterGainNode);

    // Play and stop
    oscillator.start(ctx.currentTime);
    harmonic.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5);
    harmonic.stop(ctx.currentTime + 1.2);
}

// Update listener position (camera position)
export function updateListenerPosition(x, y, z) {
    if (audioContext && audioContext.listener) {
        audioContext.listener.setPosition(x, y, z);
    }
}
