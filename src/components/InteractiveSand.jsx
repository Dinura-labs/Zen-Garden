import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sandVertexShader, sandFragmentShader } from '../shaders/sandRipple';

export function InteractiveSand({ isGoldenHour }) {
    const meshRef = useRef();
    const { viewport, pointer } = useThree();

    // Create shader material
    const uniforms = useMemo(
        () => ({
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uTime: { value: 0 },
            uIsGoldenHour: { value: isGoldenHour }
        }),
        [isGoldenHour]
    );

    useFrame((state) => {
        // Update time uniform
        uniforms.uTime.value = state.clock.elapsedTime;

        // Update mouse position (normalized to 0-1 range)
        uniforms.uMouse.value.x = (pointer.x + 1) / 2;
        uniforms.uMouse.value.y = (pointer.y + 1) / 2;

        // Update golden hour state
        uniforms.uIsGoldenHour.value = isGoldenHour;
    });

    return (
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.5, 0]}
            receiveShadow
        >
            <planeGeometry args={[6, 6, 128, 128]} />
            <shaderMaterial
                vertexShader={sandVertexShader}
                fragmentShader={sandFragmentShader}
                uniforms={uniforms}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
