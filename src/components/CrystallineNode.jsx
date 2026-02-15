import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { playChime } from '../audio/ChimeSound';
import { getRandomZenQuote } from '../utils/ZenQuotes';

// Bo Leaf shape path — creates a heart-shaped sacred leaf
function createBoLeafGeometry() {
    const shape = new THREE.Shape();
    // Pointed tip at the bottom
    shape.moveTo(0, -0.6);
    // Right side curve
    shape.bezierCurveTo(0.15, -0.4, 0.35, -0.1, 0.35, 0.15);
    // Upper right bulge
    shape.bezierCurveTo(0.35, 0.4, 0.2, 0.55, 0, 0.6);
    // Upper left bulge (mirror)
    shape.bezierCurveTo(-0.2, 0.55, -0.35, 0.4, -0.35, 0.15);
    // Left side curve back to tip
    shape.bezierCurveTo(-0.35, -0.1, -0.15, -0.4, 0, -0.6);

    const extrudeSettings = {
        steps: 1,
        depth: 0.03,
        bevelEnabled: true,
        bevelThickness: 0.015,
        bevelSize: 0.015,
        bevelSegments: 4,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center();
    return geo;
}

// Dharma Chakra — wheel with 8 spokes, built as merged buffer geometry
function createDharmaChakraGeometry() {
    const group = new THREE.Group();

    // Outer ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.035, 12, 64));
    group.add(ring);

    // Inner ring
    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.025, 12, 32));
    group.add(innerRing);

    // Hub
    const hub = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16));
    group.add(hub);

    // 8 Spokes
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const spoke = new THREE.Mesh(
            new THREE.CylinderGeometry(0.015, 0.015, 0.4, 6)
        );
        spoke.position.x = Math.cos(angle) * 0.2;
        spoke.position.y = Math.sin(angle) * 0.2;
        spoke.rotation.z = angle + Math.PI / 2;
        group.add(spoke);
    }

    return group;
}

// Sacred Object component — renders a Bo Leaf or Dharma Chakra
function SacredObject({ type, hovered, isGoldenHour }) {
    const boLeafGeo = useMemo(() => createBoLeafGeometry(), []);

    const glowIntensity = hovered ? 1.5 : 0.3;

    if (type === 'boLeaf' || type === 'tetrahedron' || type === 'dodecahedron') {
        return (
            <mesh geometry={boLeafGeo} scale={0.8}>
                <meshStandardMaterial
                    color={hovered ? '#66ff66' : '#2d8a4e'}
                    emissive="#22cc44"
                    emissiveIntensity={glowIntensity}
                    roughness={0.3}
                    metalness={0.1}
                    transparent
                    opacity={0.92}
                    side={THREE.DoubleSide}
                />
            </mesh>
        );
    }

    // Dharma Chakra — render as a group of meshes
    return <DharmaChakraMesh hovered={hovered} />;
}

function DharmaChakraMesh({ hovered }) {
    const groupRef = useRef();
    const glowIntensity = hovered ? 2.0 : 0.5;
    const color = hovered ? '#fff7aa' : '#daa520';

    const material = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                color,
                emissive: '#ffaa00',
                emissiveIntensity: glowIntensity,
                roughness: 0.2,
                metalness: 0.6,
                side: THREE.DoubleSide,
            }),
        [color, glowIntensity]
    );

    // Ring
    const ringGeo = useMemo(() => new THREE.TorusGeometry(0.4, 0.035, 12, 64), []);
    const innerRingGeo = useMemo(() => new THREE.TorusGeometry(0.15, 0.025, 12, 32), []);
    const hubGeo = useMemo(() => new THREE.SphereGeometry(0.06, 16, 16), []);
    const spokeGeo = useMemo(() => new THREE.CylinderGeometry(0.015, 0.015, 0.4, 6), []);

    const spokes = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return {
                angle,
                posX: Math.cos(angle) * 0.2,
                posY: Math.sin(angle) * 0.2,
                rotZ: angle + Math.PI / 2,
            };
        });
    }, []);

    return (
        <group ref={groupRef} scale={0.7}>
            <mesh geometry={ringGeo} material={material} />
            <mesh geometry={innerRingGeo} material={material} />
            <mesh geometry={hubGeo} material={material} />
            {spokes.map((s, i) => (
                <mesh
                    key={i}
                    geometry={spokeGeo}
                    material={material}
                    position={[s.posX, s.posY, 0]}
                    rotation={[0, 0, s.rotZ]}
                />
            ))}
        </group>
    );
}

export function CrystallineNode({
    type = 'sphere',
    radius,
    speed,
    offset,
    position = [0, 0, 0],
    onHover,
    isGoldenHour,
}) {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;
        const time = state.clock.elapsedTime * speed + offset;

        // Orbital path
        groupRef.current.position.x = Math.cos(time) * radius + position[0];
        groupRef.current.position.z = Math.sin(time) * radius + position[2];
        groupRef.current.position.y =
            Math.sin(time * 0.5) * 0.5 + position[1] + 1.5;

        // Gentle rotation
        groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.3;
        groupRef.current.rotation.y = time * 0.3;

        // Breathing scale on hover
        const breathe = hovered
            ? 1.0 + Math.sin(state.clock.elapsedTime * 3) * 0.08
            : 1.0;
        groupRef.current.scale.setScalar(breathe);
    });

    const handlePointerOver = (e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';

        if (!hasPlayed) {
            const pos = groupRef.current.position;
            playChime(type, { x: pos.x, y: pos.y, z: pos.z });
            setHasPlayed(true);

            const quote = getRandomZenQuote();
            onHover && onHover(quote, { x: pos.x, y: pos.y, z: pos.z });

            setTimeout(() => setHasPlayed(false), 2000);
        }
    };

    const handlePointerOut = () => {
        setHovered(false);
        document.body.style.cursor = 'default';
    };

    return (
        <group
            ref={groupRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        >
            <SacredObject type={type} hovered={hovered} isGoldenHour={isGoldenHour} />

            {/* Point light glow around sacred objects */}
            <pointLight
                color={type === 'boLeaf' ? '#44ff88' : '#ffcc44'}
                intensity={hovered ? 3 : 0.5}
                distance={2}
                decay={2}
            />
        </group>
    );
}
