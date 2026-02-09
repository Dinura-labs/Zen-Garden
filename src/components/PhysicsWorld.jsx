import React from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

// Floating physics-based elements
export function FloatingStone({ position, size = 0.15 }) {
    return (
        <RigidBody
            position={position}
            colliders="ball"
            restitution={0.5}
            friction={0.1}
            linearDamping={0.5}
            angularDamping={0.5}
        >
            <mesh castShadow>
                <dodecahedronGeometry args={[size, 0]} />
                <meshStandardMaterial color="#4a4a4a" roughness={0.7} metalness={0.3} />
            </mesh>
        </RigidBody>
    );
}

// Cherry blossom petal
export function FloatingPetal({ position, color }) {
    return (
        <RigidBody
            position={position}
            colliders="cuboid"
            restitution={0.3}
            friction={0.05}
            linearDamping={0.8}
            angularDamping={0.8}
            mass={0.01}
        >
            <mesh castShadow>
                <boxGeometry args={[0.1, 0.05, 0.02]} />
                <meshStandardMaterial
                    color={color || '#ffb3d9'}
                    transparent
                    opacity={0.8}
                    roughness={0.4}
                />
            </mesh>
        </RigidBody>
    );
}

// Physics World Wrapper
export function PhysicsWorld({ children, antiGravity }) {
    const gravity = antiGravity ? [0, 0, 0] : [0, -2, 0];

    return (
        <Physics gravity={gravity} debug={false}>
            {children}
        </Physics>
    );
}
