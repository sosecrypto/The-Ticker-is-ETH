import React, { useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { CatmullRomCurve3, Vector3 } from 'three';
import * as THREE from 'three';
import Ethereum3DLogo from './Ethereum3DLogo';


const NetworkCoordination: React.FC = () => {
    const [glowIntensity, setGlowIntensity] = useState(1);

    // Create random paths radiating from central logo
    const paths = useMemo(() => {
        const count = 6; // Reduced for a cleaner look
        return Array.from({ length: count }, () => {
            const start = new Vector3(0, 0, 0);
            const end = new Vector3(
                (Math.random() - 0.5) * 12,
                (Math.random() - 0.5) * 10,
                (Math.random() - 1.0) * 8
            );

            // Middle control point for curve
            const mid = new Vector3().lerpVectors(start, end, 0.5);
            mid.add(new Vector3(
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3,
                (Math.random() - 0.5) * 3
            ));

            return new CatmullRomCurve3([start, mid, end]);
        });
    }, []);


    useFrame(() => {
        // Slowly decay glow intensity back to base level
        if (glowIntensity > 1) {
            setGlowIntensity(prev => THREE.MathUtils.lerp(prev, 1, 0.05));
        }
    });

    return (
        <group scale={1.5}>
            <Ethereum3DLogo glowIntensity={glowIntensity} />

            {/* Render items around the logo */}
            {paths.map((path, i) => (
                <group key={i}>
                    <mesh>
                        <tubeGeometry args={[path, 64, 0.012, 8, false]} />
                        <meshStandardMaterial
                            color="#3C4CA8"
                            transparent
                            opacity={0.1}
                            emissive="#1A1A3D"
                            emissiveIntensity={0.2}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

export default NetworkCoordination;
