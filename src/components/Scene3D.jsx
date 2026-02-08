import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Stone Island
export function FloatingIsland() {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <mesh ref={meshRef} position={[0, -0.5, 0]}>
            <dodecahedronGeometry args={[1.5, 1]} />
            <meshStandardMaterial
                color="#3a3a3a"
                roughness={0.8}
                metalness={0.2}
            />
        </mesh>
    );
}

// Stylized Bonsai Tree
export function BonsaiTree() {
    const groupRef = useRef();

    useFrame((state) => {
        // Gentle sway animation
        groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
        groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.6) * 0.03;
    });

    return (
        <group ref={groupRef} position={[0, 0.5, 0]}>
            {/* Trunk */}
            <mesh position={[0, -0.3, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
                <meshStandardMaterial color="#4a3728" roughness={0.9} />
            </mesh>

            {/* Main Branch */}
            <mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.5]}>
                <cylinderGeometry args={[0.05, 0.08, 0.6, 6]} />
                <meshStandardMaterial color="#4a3728" roughness={0.9} />
            </mesh>

            {/* Foliage clusters */}
            <mesh position={[0, 0.3, 0]}>
                <dodecahedronGeometry args={[0.25, 0]} />
                <meshStandardMaterial color="#2d5016" roughness={0.7} />
            </mesh>

            <mesh position={[0.5, 0.15, 0]}>
                <dodecahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial color="#2d5016" roughness={0.7} />
            </mesh>

            <mesh position={[-0.2, 0.25, 0.1]}>
                <dodecahedronGeometry args={[0.18, 0]} />
                <meshStandardMaterial color="#2d5016" roughness={0.7} />
            </mesh>
        </group>
    );
}

// Orbiting Glassmorphic Shape
export function OrbitingShape({ radius, speed, offset, shapeType = 'sphere' }) {
    const meshRef = useRef();
    const [hovered, setHovered] = React.useState(false);

    useFrame((state) => {
        const time = state.clock.elapsedTime * speed + offset;
        meshRef.current.position.x = Math.cos(time) * radius;
        meshRef.current.position.z = Math.sin(time) * radius;
        meshRef.current.position.y = Math.sin(time * 0.5) * 0.5;
        meshRef.current.rotation.x = time * 0.5;
        meshRef.current.rotation.y = time * 0.3;
    });

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            {shapeType === 'sphere' ? (
                <sphereGeometry args={[0.3, 32, 32]} />
            ) : (
                <octahedronGeometry args={[0.35, 0]} />
            )}
            <MeshTransmissionMaterial
                transmission={0.9}
                thickness={0.5}
                roughness={0.1}
                chromaticAberration={0.5}
                anisotropy={0.5}
                distortion={0.2}
                distortionScale={0.5}
                temporalDistortion={0.1}
                emissive={hovered ? '#00ffff' : '#000000'}
                emissiveIntensity={hovered ? 0.8 : 0}
                color={hovered ? '#00ffff' : '#ffffff'}
            />
        </mesh>
    );
}

// Starfield Particle System
export function Starfield({ count = 500 }) {
    const pointsRef = useRef();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
            velocities[i] = Math.random() * 0.5 + 0.1;
        }

        return { positions, velocities };
    }, [count]);

    useFrame((state) => {
        const positions = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 2] += particles.velocities[i] * 0.02;

            if (positions[i * 3 + 2] > 25) {
                positions[i * 3 + 2] = -25;
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
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#ffffff"
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Main 3D Scene
export default function Scene3D() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.8}
                castShadow
            />
            <pointLight position={[-5, 3, -5]} intensity={0.5} color="#646cff" />

            {/* 3D Elements */}
            <FloatingIsland />
            <BonsaiTree />

            {/* Orbiting Shapes */}
            <OrbitingShape radius={3} speed={0.3} offset={0} shapeType="sphere" />
            <OrbitingShape radius={3.5} speed={0.25} offset={Math.PI} shapeType="sphere" />
            <OrbitingShape radius={4} speed={0.2} offset={Math.PI / 2} shapeType="octahedron" />
            <OrbitingShape radius={3.2} speed={0.28} offset={Math.PI * 1.5} shapeType="octahedron" />

            {/* Starfield */}
            <Starfield count={300} />
        </>
    );
}
