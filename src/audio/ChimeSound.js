// Spatial Audio Chime for Sacred Objects
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

// Play spatial chime based on sacred object type
export function playChime(type, position = { x: 0, y: 0, z: 0 }) {
    const ctx = initAudioContext();

    if (ctx.state === 'suspended') {
        ctx.resume();
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const panner = ctx.createPanner();

    panner.panningModel = 'HRTF';
    panner.distanceModel = 'inverse';
    panner.refDistance = 1;
    panner.maxDistance = 15;
    panner.setPosition(position.x, position.y, position.z);

    // Tibetan Singing Bowl Frequencies (Hz)
    const frequencies = {
        boLeaf: 432,    // Heart chakra / Natural resonance
        chakra: 528,    // Transformation / DNA repair
        tetrahedron: 432,
        icosahedron: 528,
        dodecahedron: 639,
        sphere: 741,
        octahedron: 852
    };

    const frequency = frequencies[type] || 432;

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Harmonic layers for richness
    const harmonic1 = ctx.createOscillator();
    harmonic1.type = 'sine';
    harmonic1.frequency.setValueAtTime(frequency * 2.01, ctx.currentTime);

    const harmonic1Gain = ctx.createGain();
    harmonic1Gain.gain.value = 0.15;

    // Chime envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

    oscillator.connect(gainNode);
    harmonic1.connect(harmonic1Gain);
    gainNode.connect(panner);
    harmonic1Gain.connect(panner);
    panner.connect(masterGainNode);

    oscillator.start(ctx.currentTime);
    harmonic1.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 2.6);
    harmonic1.stop(ctx.currentTime + 2.6);
}

export function updateListenerPosition(x, y, z) {
    if (audioContext && audioContext.listener) {
        if (audioContext.listener.positionX) {
            audioContext.listener.positionX.setTargetAtTime(x, audioContext.currentTime, 0.1);
            audioContext.listener.positionY.setTargetAtTime(y, audioContext.currentTime, 0.1);
            audioContext.listener.positionZ.setTargetAtTime(z, audioContext.currentTime, 0.1);
        } else {
            audioContext.listener.setPosition(x, y, z);
        }
    }
}
