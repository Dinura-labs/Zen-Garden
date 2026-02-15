import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CrystallineNode } from './CrystallineNode';
import { InteractiveSand } from './InteractiveSand';
import { PhysicsWorld, FloatingStone, FloatingPetal } from './PhysicsWorld';
import { updateListenerPosition } from '../audio/ChimeSound';

// Enhanced Floating Island with higher detail
export function FloatingIsland() {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    });

    return (
        <mesh ref={meshRef} position={[0, -0.3, 0]} castShadow receiveShadow>
            <dodecahedronGeometry args={[1.8, 2]} />
            <meshStandardMaterial
                color="#5a4d41"
                roughness={0.9}
                metalness={0.05}
            />
        </mesh>
    );
}

// Enhanced Bonsai Tree with time-responsive colors
export function BonsaiTree({ isGoldenHour }) {
    const groupRef = useRef();

    const foliageColor = isGoldenHour ? '#3a6020' : '#2a4518';
    const trunkColor = isGoldenHour ? '#5a4230' : '#4a3728';

    useFrame((state) => {
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.06;
        groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.04;
    });

    return (
        <group ref={groupRef} position={[0, 0.5, 0]}>
            {/* Main Trunk */}
            <mesh position={[0, -0.3, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.13, 0.9, 8]} />
                <meshStandardMaterial color={trunkColor} roughness={0.9} />
            </mesh>

            {/* Branch 1 */}
            <mesh position={[0.35, 0, 0]} rotation={[0, 0, -0.5]} castShadow>
                <cylinderGeometry args={[0.04, 0.08, 0.7, 6]} />
                <meshStandardMaterial color={trunkColor} roughness={0.9} />
            </mesh>

            {/* Branch 2 */}
            <mesh position={[-0.25, 0.1, 0.1]} rotation={[0, 0, 0.4]} castShadow>
                <cylinderGeometry args={[0.035, 0.07, 0.5, 6]} />
                <meshStandardMaterial color={trunkColor} roughness={0.9} />
            </mesh>

            {/* Foliage clusters */}
            <mesh position={[0, 0.35, 0]} castShadow>
                <dodecahedronGeometry args={[0.28, 1]} />
                <meshStandardMaterial color={foliageColor} roughness={0.7} />
            </mesh>

            <mesh position={[0.55, 0.2, 0]} castShadow>
                <dodecahedronGeometry args={[0.22, 1]} />
                <meshStandardMaterial color={foliageColor} roughness={0.7} />
            </mesh>

            <mesh position={[-0.35, 0.28, 0.12]} castShadow>
                <dodecahedronGeometry args={[0.2, 1]} />
                <meshStandardMaterial color={foliageColor} roughness={0.7} />
            </mesh>

            <mesh position={[0.1, 0.42, -0.1]} castShadow>
                <dodecahedronGeometry args={[0.18, 1]} />
                <meshStandardMaterial color={foliageColor} roughness={0.7} />
            </mesh>
        </group>
    );
}

// Enhanced Starfield with better visuals
export function Starfield({ count = 400, isGoldenHour }) {
    const pointsRef = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
            velocities[i] = Math.random() * 0.5 + 0.1;

            // Color based on time
            const colorMix = isGoldenHour ? 0.8 : 0.3;
            colors[i * 3] = colorMix + Math.random() * 0.2;
            colors[i * 3 + 1] = colorMix + Math.random() * 0.2;
            colors[i * 3 + 2] = 1;
        }

        return { positions, velocities, colors };
    }, [count, isGoldenHour]);

    useFrame(() => {
        const positions = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 2] += particles.velocities[i] * 0.03;

            if (positions[i * 3 + 2] > 30) {
                positions[i * 3 + 2] = -30;
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                vertexColors
                transparent
                opacity={0.7}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Main Enhanced Scene
export default function Scene3D({ antiGravity, onQuoteHover }) {
    const [currentQuote, setCurrentQuote] = useState(null);

    // Time-based lighting
    const hour = new Date().getHours();
    const isGoldenHour = hour >= 6 && hour < 18;

    const handleCrystalHover = (quote, position) => {
        setCurrentQuote(quote);
        onQuoteHover && onQuoteHover(quote);
    };

    // Update audio listener position
    useFrame(({ camera }) => {
        updateListenerPosition(camera.position.x, camera.position.y, camera.position.z);
    });

    return (
        <>
            {/* Time-based Lighting System */}
            <ambientLight intensity={isGoldenHour ? 0.4 : 0.25} />

            {/* Main directional light - Saffron/Sunset */}
            <directionalLight
                position={[8, 6, 5]}
                intensity={1.5}
                color="#f4c430"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            {/* Accent lights - Warm Gold */}
            <pointLight
                position={[-5, 3, -5]}
                intensity={1.2}
                color="#ffd700"
            />
            <pointLight
                position={[5, 2, 3]}
                intensity={0.8}
                color="#ff8c00"
            />

            {/* Rim light for dramatic effect */}
            <spotLight
                position={[0, 10, -8]}
                intensity={1.5}
                angle={0.6}
                penumbra={0.5}
                color="#ffffff"
            />

            {/* Interactive Sand with shader */}
            <InteractiveSand isGoldenHour={isGoldenHour} />

            {/* Floating Island */}
            <FloatingIsland />

            {/* Enhanced Bonsai Tree */}
            <BonsaiTree isGoldenHour={isGoldenHour} />

            {/* Crystalline Nodes -> Sacred Objects */}
            <CrystallineNode
                type="boLeaf"
                radius={3.2}
                speed={0.25}
                offset={0}
                onHover={handleCrystalHover}
                isGoldenHour={isGoldenHour}
            />
            <CrystallineNode
                type="chakra"
                radius={3.8}
                speed={0.22}
                offset={Math.PI / 3}
                onHover={handleCrystalHover}
                isGoldenHour={isGoldenHour}
            />
            <CrystallineNode
                type="boLeaf"
                radius={4.2}
                speed={0.2}
                offset={Math.PI * 2 / 3}
                onHover={handleCrystalHover}
                isGoldenHour={isGoldenHour}
            />
            <CrystallineNode
                type="chakra"
                radius={3.5}
                speed={0.28}
                offset={Math.PI}
                onHover={handleCrystalHover}
                isGoldenHour={isGoldenHour}
            />
            <CrystallineNode
                type="boLeaf"
                radius={4.0}
                speed={0.18}
                offset={Math.PI * 4 / 3}
                onHover={handleCrystalHover}
                isGoldenHour={isGoldenHour}
            />

            {/* Physics-based floating elements */}
            <PhysicsWorld antiGravity={antiGravity}>
                <FloatingStone position={[2, 2, 1]} size={0.12} />
                <FloatingStone position={[-2, 2.5, -1]} size={0.15} />
                <FloatingStone position={[1, 3, -2]} size={0.1} />
                <FloatingStone position={[-1.5, 2.8, 1.5]} size={0.13} />

                <FloatingPetal position={[1.5, 3, 0.5]} color="#ffb3d9" />
                <FloatingPetal position={[-1, 3.5, -0.5]} color="#ffd1e8" />
                <FloatingPetal position={[0.5, 3.2, 1]} color="#ffb3d9" />
                <FloatingPetal position={[-0.8, 3.8, 0.8]} color="#ffc4df" />
                <FloatingPetal position={[2, 3.3, -1]} color="#ffb3d9" />
            </PhysicsWorld>

            {/* Enhanced Starfield */}
            <Starfield count={400} isGoldenHour={isGoldenHour} />
        </>
    );
}
