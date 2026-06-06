import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Text,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  className?: string;
  /** Brand label text on the bottle front */
  label?: string;
  /** Small italic sub-label */
  sublabel?: string;
};

/**
 * Procedural amber-glass dropper bottle, built from a lathe profile.
 * Real 3D mesh — light, shadow and silhouette change as it rotates.
 */
export function Bottle3D({
  className,
  label = "Earth & Tonic",
  sublabel = "Gut Tonic",
}: Props) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.4, 4.6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#00000000"]} />
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, 2, -2]} intensity={0.4} color="#a8c49d" />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Float
            speed={1.4}
            rotationIntensity={0.35}
            floatIntensity={0.6}
            floatingRange={[-0.08, 0.08]}
          >
            <PointerBottle label={label} sublabel={sublabel} />
          </Float>
          <ContactShadows
            position={[0, -1.55, 0]}
            opacity={0.45}
            scale={5}
            blur={2.8}
            far={3}
            color="#1f3a2a"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ---------- Inner mesh with pointer-driven rotation ---------- */

function PointerBottle({ label, sublabel }: { label: string; sublabel: string }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      target.current.x = ny * 0.35; // pitch
      target.current.y = nx * 0.7; // yaw
    }
    function onOrient(e: DeviceOrientationEvent) {
      const g = (e.gamma ?? 0) / 45;
      const b = ((e.beta ?? 0) - 45) / 90;
      target.current.x = Math.max(-0.5, Math.min(0.5, b * 0.4));
      target.current.y = Math.max(-1, Math.min(1, g));
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  useFrame((_, dt) => {
    if (!group.current) return;
    // Smoothly lerp to target rotation
    const k = 1 - Math.pow(0.001, dt);
    group.current.rotation.x += (target.current.x - group.current.rotation.x) * k;
    group.current.rotation.y += (target.current.y - group.current.rotation.y) * k;
  });

  return (
    <group ref={group} position={[0, -0.1, 0]}>
      <BottleMesh />
      <LabelDecal label={label} sublabel={sublabel} />
    </group>
  );
}

/* ---------- Geometry ---------- */

function BottleMesh() {
  // Lathe profile for an apothecary dropper bottle (radius, height)
  const points = useMemo(() => {
    const p: THREE.Vector2[] = [];
    // bottom -> up
    p.push(new THREE.Vector2(0.0, -1.4));
    p.push(new THREE.Vector2(0.55, -1.4));
    p.push(new THREE.Vector2(0.7, -1.35));
    p.push(new THREE.Vector2(0.75, -1.25));
    // straight body
    p.push(new THREE.Vector2(0.75, -1.1));
    p.push(new THREE.Vector2(0.75, 0.4));
    // shoulder
    p.push(new THREE.Vector2(0.73, 0.55));
    p.push(new THREE.Vector2(0.6, 0.7));
    p.push(new THREE.Vector2(0.45, 0.78));
    // neck
    p.push(new THREE.Vector2(0.28, 0.85));
    p.push(new THREE.Vector2(0.28, 1.05));
    // rim
    p.push(new THREE.Vector2(0.32, 1.08));
    p.push(new THREE.Vector2(0.32, 1.12));
    return p;
  }, []);

  const bottleGeom = useMemo(
    () => new THREE.LatheGeometry(points, 96),
    [points],
  );

  return (
    <group>
      {/* Amber glass body */}
      <mesh geometry={bottleGeom} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#6b3a14"
          roughness={0.15}
          metalness={0.0}
          transmission={0.55}
          thickness={0.8}
          ior={1.45}
          attenuationColor="#8a4a18"
          attenuationDistance={1.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Cap (matte black) */}
      <mesh position={[0, 1.32, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.42, 64]} />
        <meshStandardMaterial color="#15201a" roughness={0.55} metalness={0.1} />
      </mesh>
      {/* Cap top dome */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.34, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a2a22" roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Dropper rubber bulb peeking above cap */}
      <mesh position={[0, 1.82, 0]} castShadow>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial color="#2a1a14" roughness={0.85} />
      </mesh>

      {/* Inner liquid hint (slightly smaller cylinder, darker amber) */}
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.7, 0.65, 1.5, 64]} />
        <meshPhysicalMaterial
          color="#3d1a08"
          roughness={0.3}
          transmission={0.6}
          thickness={1.5}
          ior={1.4}
          attenuationColor="#5a2410"
          attenuationDistance={0.6}
        />
      </mesh>
    </group>
  );
}

/* ---------- Label (front cream paper with brand text) ---------- */

function LabelDecal({ label, sublabel }: { label: string; sublabel: string }) {
  // Slightly curved label — a partial cylinder sleeve hugging the bottle front
  const labelGeom = useMemo(() => {
    const radius = 0.755;
    const height = 1.15;
    const arc = Math.PI * 0.95; // ~170° wrap, front-facing
    const g = new THREE.CylinderGeometry(
      radius,
      radius,
      height,
      64,
      1,
      true,
      -arc / 2,
      arc,
    );
    return g;
  }, []);

  return (
    <group position={[0, -0.3, 0]} rotation={[0, Math.PI, 0]}>
      <mesh geometry={labelGeom}>
        <meshStandardMaterial
          color="#f3ead7"
          roughness={0.85}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Brand text — sits in front of the label, follows the curve approx */}
      <group position={[0, 0.25, -0.78]}>
        <Text
          fontSize={0.13}
          color="#1f3a2a"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          {label.toUpperCase()}
        </Text>
      </group>
      <group position={[0, 0.02, -0.78]}>
        <Text
          fontSize={0.22}
          color="#16302a"
          anchorX="center"
          anchorY="middle"
        >
          {sublabel}
        </Text>
      </group>
      <group position={[0, -0.25, -0.78]}>
        <Text
          fontSize={0.06}
          color="#4a6741"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.3}
        >
          ORGANIC HERBAL TONIC
        </Text>
      </group>
      <group position={[0, -0.42, -0.78]}>
        <Text
          fontSize={0.05}
          color="#4a6741"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.25}
        >
          1 FL OZ · 30 ML
        </Text>
      </group>
    </group>
  );
}
