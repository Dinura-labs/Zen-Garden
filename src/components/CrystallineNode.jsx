import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text } from '@react-three/drei';
import { playChime } from '../audio/ChimeSound';
import { getRandomZenQuote } from '../utils/ZenQuotes';

// Custom Bo Leaf Geometry
function BoLeafGeometry() {
    return useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.2, 0.1, 0.4, 0.4, 0.4, 0.7);
        shape.bezierCurveTo(0.4, 1.1, 0, 1.3, 0, 1.5);
        shape.bezierCurveTo(0, 1.3, -0.4, 1.1, -0.4, 0.7);
        shape.bezierCurveTo(-0.4, 0.4, -0.2, 0.1, 0, 0);

        const extrudeSettings = {
            steps: 2,
            depth: 0.05,
            bevelEnabled: true,
            bevelThickness: 0.02,
            bevelSize: 0.02,
            bevelSegments: 3
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, []);
}

// Custom Dharma Chakra Geometry
function DharmachakraGeometry() {
    return useMemo(() => {
        const group = new THREE.Group();

        // Outer rim
        const torusGeom = new THREE.TorusGeometry(0.5, 0.05, 16, 100);
        const rim = new THREE.Mesh(torusGeom);
        group.add(rim);

        // Center hub
        const hubGeom = new THREE.SphereGeometry(0.1, 16, 16);
        const hub = new THREE.Mesh(hubGeom);
        group.add(hub);

        // 8 Spokes
        for (let i = 0; i < 8; i++) {
            const spokeGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.5);
            const spoke = new THREE.Mesh(spokeGeom);
            const angle = (i / 8) * Math.PI * 2;
            spoke.position.x = Math.cos(angle) * 0.25;
            spoke.position.y = Math.sin(angle) * 0.25;
            spoke.rotation.z = angle + Math.PI / 2;
            group.add(spoke);
        }

        return group;
    }, []);
}

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

    const boLeafGeo = BoLeafGeometry();

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
        tetrahedron: <primitive object={boLeafGeo} />,
        icosahedron: <DharmachakraComponent />,
        dodecahedron: <primitive object={boLeafGeo} />,
        octahedron: <DharmachakraComponent />,
        boLeaf: <primitive object={boLeafGeo} />,
        chakra: <DharmachakraComponent />
    };

    // Sub-component for Chakra to handle primitives correctly
    function DharmachakraComponent() {
        const chakraGeo = DharmachakraGeometry();
        return <primitive object={chakraGeo} />;
    }

    return (
        <mesh
            ref={meshRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            {geometries[type]}
            <MeshTransmissionMaterial
                transmission={0.9}
                thickness={0.5}
                roughness={0.1}
                chromaticAberration={0.2}
                anisotropy={0.1}
                distortion={0.1}
                distortionScale={0.3}
                temporalDistortion={0.1}
                emissive={type === 'boLeaf' || type === 'tetrahedron' ? '#44ff44' : '#ffcc00'}
                emissiveIntensity={hovered ? 2 : 0.4}
                color={hovered ? '#ffffff' : (type === 'boLeaf' || type === 'tetrahedron' ? '#228b22' : '#daa520')}
                transparent
                opacity={0.9}
            />
        </mesh>
    );
}
