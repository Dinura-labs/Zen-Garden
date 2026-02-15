import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { CrystallineNode } from './CrystallineNode';
import { InteractiveSand } from './InteractiveSand';
import { PhysicsWorld, FloatingStone, FloatingPetal } from './PhysicsWorld';
import { updateListenerPosition } from '../audio/ChimeSound';

// Sacred Bodhi Tree
function BodhiTree({ isGoldenHour }) {
    const groupRef = useRef();
    const foliageColor = isGoldenHour ? '#4d7c2c' : '#2d4c1e';
    const trunkColor = isGoldenHour ? '#4a3728' : '#3d2b1f';

    useFrame((state) => {
        const time = state.clock.elapsedTime;
        groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.03;
        groupRef.current.rotation.x = Math.cos(time * 0.4) * 0.02;
    });

    return (
        <group ref={groupRef} position={[0, 0.6, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Main Trunk - Stylized and organic */}
                <mesh position={[0, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.05, 0.15, 1.2, 8]} />
                    <meshStandardMaterial color={trunkColor} roughness={0.9} />
                </mesh>

                {/* Branches */}
                {[...Array(6)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.sin(i * 1.05) * 0.3,
                            0.2 + i * 0.15,
                            Math.cos(i * 1.05) * 0.3
                        ]}
                        rotation={[
                            Math.random() * 0.5,
                            i * 1.05,
                            0.5 + Math.random() * 0.5
                        ]}
                        castShadow
                    >
                        <cylinderGeometry args={[0.02, 0.05, 0.8, 6]} />
                        <meshStandardMaterial color={trunkColor} roughness={0.9} />
                    </mesh>
                ))}

                {/* Lush Foliage Clusters */}
                {[...Array(12)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.sin(i * 0.5) * 0.6,
                            0.6 + Math.random() * 0.4,
                            Math.cos(i * 0.5) * 0.6
                        ]}
                        castShadow
                    >
                        <dodecahedronGeometry args={[0.25 + Math.random() * 0.15, 1]} />
                        <MeshWobbleMaterial
                            color={foliageColor}
                            speed={1}
                            factor={0.2}
                            roughness={1}
                        />
                    </mesh>
                ))}
            </Float>
        </group>
    );
}

// Glowing Stupa focal point
function Stupa({ isGoldenHour }) {
    return (
        <group position={[0, -0.2, -4]}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Base */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[1.5, 1.8, 0.4, 32]} />
                    <meshStandardMaterial color="#8b4513" roughness={0.8} />
                </mesh>

                {/* Dome */}
                <mesh position={[0, 0.6, 0]}>
                    <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial
                        color="#daa520"
                        metalness={0.8}
                        roughness={0.2}
                        emissive="#ffaa00"
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* Spire */}
                <mesh position={[0, 1.8, 0]}>
                    <cylinderGeometry args={[0.05, 0.2, 1.2, 16]} />
                    <meshStandardMaterial color="#ffd700" metalness={1} />
                </mesh>

                {/* Focal Light */}
                <pointLight position={[0, 1.5, 0]} intensity={2} color="#ffaa00" distance={5} />
            </Float>
        </group>
    );
}

// Sacred Lotus Particles
function LotusParticles({ count = 50, isGoldenHour }) {
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 20,
                    Math.random() * 10,
                    (Math.random() - 0.5) * 20
                ],
                speed: Math.random() * 0.02 + 0.01,
                size: Math.random() * 0.05 + 0.02
            });
        }
        return temp;
    }, [count]);

    return (
        <group>
            {particles.map((p, i) => (
                <Float key={i} position={p.position} speed={2} rotationIntensity={2} floatIntensity={1}>
                    <mesh>
                        <tetrahedronGeometry args={[p.size, 0]} />
                        <meshStandardMaterial
                            color={isGoldenHour ? "#ffd700" : "#ffb3d9"}
                            emissive={isGoldenHour ? "#ff8800" : "#ff66aa"}
                            emissiveIntensity={2}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                </Float>
            ))}
            <Sparkles
                count={100}
                scale={15}
                size={2}
                speed={0.5}
                opacity={0.3}
                color={isGoldenHour ? "#ffcc00" : "#ffffff"}
            />
        </group>
    );
}

export default function Scene3D({ antiGravity, onQuoteHover }) {
    const hour = new Date().getHours();
    const isGoldenHour = hour >= 6 && hour < 18;

    useFrame(({ camera, state }) => {
        updateListenerPosition(camera.position.x, camera.position.y, camera.position.z);
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={50} />

            {/* Deep Volumetric Atmosphere */}
            <fog attach="fog" args={['#1a0f0f', 5, 25]} />
            <ambientLight intensity={isGoldenHour ? 0.3 : 0.1} />

            {/* Sacred Sun/Moon Light */}
            <directionalLight
                position={[10, 10, 5]}
                intensity={isGoldenHour ? 2 : 0.5}
                color={isGoldenHour ? "#f4c430" : "#8899ff"}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            {/* Ground */}
            <InteractiveSand isGoldenHour={isGoldenHour} />

            {/* Sacred Focal Point */}
            <Stupa isGoldenHour={isGoldenHour} />

            {/* The Bodhi Tree */}
            <BodhiTree isGoldenHour={isGoldenHour} />

            {/* Sacred Floating Objects */}
            <CrystallineNode
                type="boLeaf"
                radius={4}
                speed={0.15}
                offset={0}
                onHover={onQuoteHover}
                isGoldenHour={isGoldenHour}
            />
            <CrystallineNode
                type="chakra"
                radius={5}
                speed={0.12}
                offset={Math.PI / 2}
                onHover={onQuoteHover}
                isGoldenHour={isGoldenHour}
            />
            <CrystallineNode
                type="boLeaf"
                radius={6}
                speed={0.1}
                offset={Math.PI}
                onHover={onQuoteHover}
                isGoldenHour={isGoldenHour}
            />
            <CrystallineNode
                type="chakra"
                radius={4.5}
                speed={0.18}
                offset={Math.PI * 1.5}
                onHover={onQuoteHover}
                isGoldenHour={isGoldenHour}
            />

            {/* Sacred Particles & Lights */}
            <LotusParticles isGoldenHour={isGoldenHour} />

            {/* Fireflies / Spirit Lights */}
            {[...Array(15)].map((_, i) => (
                <Float key={i} position={[(Math.random() - 0.5) * 10, 1 + Math.random() * 3, (Math.random() - 0.5) * 10]}>
                    <pointLight
                        intensity={0.5}
                        distance={3}
                        color={isGoldenHour ? "#ffaa00" : "#00ffff"}
                    />
                </Float>
            ))}

            <PhysicsWorld antiGravity={antiGravity}>
                {/* Floating Sacred Stones */}
                <FloatingStone position={[2, 4, 1]} size={0.15} />
                <FloatingStone position={[-3, 5, -2]} size={0.2} />
                <FloatingStone position={[1, 6, -3]} size={0.12} />

                {/* Floating Lotus Petals */}
                <FloatingPetal position={[1, 5, 1]} color="#ffb3d9" />
                <FloatingPetal position={[-2, 6, 0]} color="#ffffff" />
                <FloatingPetal position={[0, 4, -1]} color="#ffb3d9" />
            </PhysicsWorld>
        </>
    );
}
