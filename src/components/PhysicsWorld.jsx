import React from 'react';
import { Physics, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

// Floating meditation stones - darker and rounder
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
                <icosahedronGeometry args={[size, 1]} />
                <meshStandardMaterial
                    color="#2c2c2c"
                    roughness={0.9}
                    metalness={0.1}
                />
            </mesh>
        </RigidBody>
    );
}

// Lotus petal - delicate and curved
export function FloatingPetal({ position, color }) {
    return (
        <RigidBody
            position={position}
            colliders="cuboid"
            restitution={0.3}
            friction={0.05}
            linearDamping={1.2}
            angularDamping={1.2}
            mass={0.01}
        >
            <mesh castShadow rotation={[Math.random(), Math.random(), Math.random()]}>
                <sphereGeometry args={[0.08, 16, 16, 0, Math.PI, 0, Math.PI / 2]} />
                <meshStandardMaterial
                    color={color || '#ffb3d9'}
                    transparent
                    opacity={0.9}
                    roughness={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </RigidBody>
    );
}

// Physics World Wrapper
export function PhysicsWorld({ children, antiGravity }) {
    const gravity = antiGravity ? [0, 0, 0] : [0, -1.5, 0];

    return (
        <Physics gravity={gravity} debug={false}>
            {children}
        </Physics>
    );
}
