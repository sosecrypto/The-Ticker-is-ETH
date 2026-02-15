import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Ethereum3DLogoProps {
    glowIntensity?: number;
}

const Ethereum3DLogo: React.FC<Ethereum3DLogoProps> = ({ glowIntensity = 1 }) => {
    const groupRef = useRef<THREE.Group>(null);
    const topGap = 0.1;

    // Official Branding HEX
    const COLORS = {
        salmon: "#F0C0B0",
        cyan: "#B8F2F2",
        lavender: "#B59BF2",
        blue: "#4377EF",
    };

    useFrame((state) => {
        if (!groupRef.current) return;

        // Base graceful rotation
        groupRef.current.rotation.y += 0.005;

        // Subtle mouse follow
        const targetX = (state.mouse.x * Math.PI) / 20;
        const targetY = (state.mouse.y * Math.PI) / 20;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, groupRef.current.rotation.y + targetX, 0.05);
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    });

    const GlassMaterial = ({ color = "#ffffff" }: { color?: string }) => (
        <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={1.5}
            roughness={0.05}
            transmission={1}
            ior={2.4} // Diamond-like refraction
            chromaticAberration={0.15}
            anisotropy={0.3}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.05}
            color={color}
        />
    );

    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />

            {/* Studio Lighting */}
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 20, 10]} angle={0.15} penumbra={1} intensity={2} color={COLORS.cyan} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1} color={COLORS.salmon} />

            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <group ref={groupRef} scale={1.2}>

                    {/* TOP PYRAMID */}
                    <group position={[0, 0.75 + topGap, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0, 1, 1.5, 4]} />
                            <GlassMaterial />
                        </mesh>
                        {/* Internal Chromatic Lights for Branding Color */}
                        <pointLight position={[-0.5, 0, 0.2]} intensity={5 * glowIntensity} color={COLORS.salmon} distance={2} />
                        <pointLight position={[0.5, 0.2, 0.2]} intensity={5 * glowIntensity} color={COLORS.cyan} distance={2} />
                        {/* Subtle Wireframe for edge definition */}
                        <mesh scale={1.001}>
                            <cylinderGeometry args={[0, 1, 1.5, 4]} />
                            <meshStandardMaterial color={COLORS.cyan} wireframe opacity={0.1} transparent />
                        </mesh>
                    </group>

                    {/* MIDDLE DIAMOND */}
                    <group position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1.1, 0.6, 1.1]}>
                        <mesh>
                            <octahedronGeometry args={[1, 0]} />
                            <meshStandardMaterial
                                color={COLORS.blue}
                                emissive={COLORS.blue}
                                emissiveIntensity={2 * glowIntensity}
                                roughness={0}
                                metalness={0.8}
                                transparent
                                opacity={0.6}
                            />
                        </mesh>
                    </group>

                    {/* BOTTOM PYRAMID (Elongated) */}
                    <group position={[0, -0.95 - topGap, 0]} rotation={[Math.PI, 0, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0, 1.05, 1.9, 4]} />
                            <GlassMaterial />
                        </mesh>
                        {/* Internal Chromatic Lights */}
                        <pointLight position={[-0.4, 0.2, 0.2]} intensity={4 * glowIntensity} color={COLORS.salmon} distance={2} />
                        <pointLight position={[0.4, -0.2, 0.2]} intensity={6 * glowIntensity} color={COLORS.lavender} distance={2.5} />
                        <mesh scale={1.001}>
                            <cylinderGeometry args={[0, 1.05, 1.9, 4]} />
                            <meshStandardMaterial color={COLORS.lavender} wireframe opacity={0.1} transparent />
                        </mesh>
                    </group>

                    {/* RADIANT CORE PULSE */}
                    <mesh scale={0.12}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive={COLORS.cyan}
                            emissiveIntensity={20 * glowIntensity}
                        />
                        <pointLight intensity={10 * glowIntensity} distance={4} color={COLORS.cyan} />
                    </mesh>
                </group>
            </Float>
        </group>
    );
};

export default Ethereum3DLogo;
