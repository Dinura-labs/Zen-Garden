import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text } from '@react-three/drei';
import { playChime } from '../audio/ChimeSound';
import { getRandomZenQuote } from '../utils/ZenQuotes';

export function CrystallineNode({
    type = 'sphere',
    radius,
    speed,
    offset,
    position = [0, 0, 0],
    onHover,
    isGoldenHour
}) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    useFrame((state) => {
        const time = state.clock.elapsedTime * speed + offset;
        meshRef.current.position.x = Math.cos(time) * radius + position[0];
        meshRef.current.position.z = Math.sin(time) * radius + position[2];
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.5 + position[1] + 1;

        // Rotation animation
        meshRef.current.rotation.x = time * 0.3;
        meshRef.current.rotation.y = time * 0.4;
    });

    const handlePointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);

        if (!hasPlayed) {
            // Play spatial audio chime
            const pos = meshRef.current.position;
            playChime(type, { x: pos.x, y: pos.y, z: pos.z });
            setHasPlayed(true);

            // Get random quote and trigger overlay
            const quote = getRandomZenQuote();
            onHover && onHover(quote, { x: pos.x, y: pos.y, z: pos.z });

            // Reset after delay
            setTimeout(() => setHasPlayed(false), 2000);
        }
    };

    const handlePointerOut = () => {
        setHovered(false);
    };

    const geometries = {
        sphere: <sphereGeometry args={[0.35, 32, 32]} />,
        tetrahedron: <tetrahedronGeometry args={[0.4, 0]} />,
        icosahedron: <icosahedronGeometry args={[0.38, 0]} />,
        dodecahedron: <dodecahedronGeometry args={[0.35, 0]} />,
        octahedron: <octahedronGeometry args={[0.4, 0]} />
    };

    return (
        <mesh
            ref={meshRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {geometries[type]}
            <MeshTransmissionMaterial
                transmission={0.95}
                thickness={0.3}
                roughness={0}
                chromaticAberration={0.6}
                anisotropy={0.3}
                distortion={0.3}
                distortionScale={0.5}
                temporalDistortion={0.2}
                emissive={isGoldenHour ? '#ff8800' : '#00ffff'}
                emissiveIntensity={hovered ? 1.5 : 0.2}
                color={hovered ? (isGoldenHour ? '#ffaa44' : '#00ffff') : '#ffffff'}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}
