"use client";

/**
 * Procedural 3D industrial site (no external models): oil & gas tanks + flare, MEP pipe rack,
 * civil building frame + tower crane, shutdown columns + scaffolding, and glowing worker beacons.
 * The camera flies between zones as `progress` (0..1) moves; the active zone glows crimson.
 * Palette: Black #0B0B0B · Crimson #8B0D1A · Off-white #F5F2ED.
 */
import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BLACK = "#0b0b0b";
const STEEL = "#2a2626";
const STEEL_LIGHT = "#4a4442";
const OFFWHITE = "#f5f2ed";
const CRIMSON = "#8b0d1a";
const CRIMSON_GLOW = "#ff2d43";

export type SceneInputs = {
  progress: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
};

/* Zone centres (x, z) and camera stops for each discipline, in story order */
export const ZONES = [
  { key: "oil", centre: new THREE.Vector3(-4.2, 0, -0.6), cam: new THREE.Vector3(-1.2, 3.1, 5.2) },
  { key: "mep", centre: new THREE.Vector3(0, 0, 1.6), cam: new THREE.Vector3(3.2, 2.4, 6.4) },
  { key: "civil", centre: new THREE.Vector3(4.2, 0, -0.8), cam: new THREE.Vector3(8.4, 4.2, 5.4) },
  { key: "shutdown", centre: new THREE.Vector3(0.2, 0, -3.6), cam: new THREE.Vector3(3.4, 5.2, 3.6) },
] as const;
const OVERVIEW_CAM = new THREE.Vector3(0, 9, 13);
const OVERVIEW_TARGET = new THREE.Vector3(0, 0.6, -0.6);

/** progress 0..1 → zone index (−1 = overview before the first zone) and blend */
function zoneAt(p: number) {
  const n = ZONES.length;
  const scaled = p * (n + 0.35) - 0.35; // short overview at the start
  return scaled;
}

/* ───────────────── materials (shared) ───────────────── */
function useMats() {
  return useMemo(
    () => ({
      steel: new THREE.MeshStandardMaterial({ color: STEEL, metalness: 0.75, roughness: 0.38 }),
      steelLight: new THREE.MeshStandardMaterial({ color: STEEL_LIGHT, metalness: 0.7, roughness: 0.42 }),
      off: new THREE.MeshStandardMaterial({ color: OFFWHITE, metalness: 0.15, roughness: 0.55 }),
      ground: new THREE.MeshStandardMaterial({ color: "#121010", metalness: 0.2, roughness: 0.9 }),
    }),
    []
  );
}

/** a zone whose crimson accents brighten when active */
function useZoneGlow(index: number, inputs: SceneInputs) {
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: CRIMSON, emissive: new THREE.Color(CRIMSON_GLOW), emissiveIntensity: 0.15, metalness: 0.4, roughness: 0.35 }),
    []
  );
  useFrame(() => {
    const z = zoneAt(inputs.progress.current);
    const d = Math.abs(z - index);
    const target = d < 0.6 ? 1.6 - d * 2 : 0.15;
    mat.emissiveIntensity += (target - mat.emissiveIntensity) * 0.08;
  });
  return mat;
}

/* ───────────────── zones ───────────────── */
function OilGasZone({ inputs }: { inputs: SceneInputs }) {
  const m = useMats();
  const glow = useZoneGlow(0, inputs);
  const flame = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!flame.current) return;
    const t = clock.elapsedTime;
    flame.current.scale.set(1, 1 + Math.sin(t * 9) * 0.12 + Math.sin(t * 5.3) * 0.08, 1);
  });
  const c = ZONES[0].centre;
  const tanks: [number, number, number, number][] = [
    [-1.1, -0.6, 0.85, 1.1],
    [0.9, -0.9, 0.7, 0.9],
    [-0.4, 1.0, 0.6, 0.8],
  ];
  return (
    <group position={c}>
      {tanks.map(([x, z, r, h], i) => (
        <group key={i} position={[x, 0, z]}>
          <mesh material={m.off} position={[0, h / 2, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[r, r, h, 40]} />
          </mesh>
          <mesh material={glow} position={[0, h * 0.62, 0]}>
            <cylinderGeometry args={[r + 0.012, r + 0.012, 0.08, 40]} />
          </mesh>
          <mesh material={m.steelLight} position={[0, h + 0.04, 0]}>
            <cylinderGeometry args={[r * 0.96, r, 0.08, 40]} />
          </mesh>
        </group>
      ))}
      {/* flare stack */}
      <group position={[1.6, 0, 0.9]}>
        <mesh material={m.steel} position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.06, 0.1, 3.2, 12]} />
        </mesh>
        <mesh ref={flame} position={[0, 3.35, 0]}>
          <coneGeometry args={[0.13, 0.42, 16]} />
          <meshBasicMaterial color={CRIMSON_GLOW} toneMapped={false} />
        </mesh>
        <pointLight position={[0, 3.4, 0]} color={CRIMSON_GLOW} intensity={2.2} distance={5} />
      </group>
    </group>
  );
}

function MepZone({ inputs }: { inputs: SceneInputs }) {
  const m = useMats();
  const glow = useZoneGlow(1, inputs);
  const c = ZONES[1].centre;
  const pipes = useMemo(() => {
    const list: { curve: THREE.CatmullRomCurve3; r: number; glow: boolean }[] = [];
    for (let i = 0; i < 4; i++) {
      const y = 0.55 + i * 0.18;
      const z = -0.25 + (i % 2) * 0.5;
      list.push({
        curve: new THREE.CatmullRomCurve3([
          new THREE.Vector3(-2.6, y, z),
          new THREE.Vector3(-0.6, y, z),
          new THREE.Vector3(0.6, y + (i === 1 ? 0.5 : 0), z),
          new THREE.Vector3(2.6, y + (i === 1 ? 0.5 : 0), z),
        ]),
        r: 0.05 + (i % 2) * 0.02,
        glow: i === 2,
      });
    }
    return list;
  }, []);
  return (
    <group position={c}>
      {/* rack frames */}
      {[-2.2, -1.1, 0, 1.1, 2.2].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {[-0.45, 0.45].map((z) => (
            <mesh key={z} material={m.steel} position={[0, 0.65, z]}>
              <boxGeometry args={[0.07, 1.3, 0.07]} />
            </mesh>
          ))}
          {[0.5, 1.1].map((y) => (
            <mesh key={y} material={m.steelLight} position={[0, y, 0]}>
              <boxGeometry args={[0.06, 0.06, 1.0]} />
            </mesh>
          ))}
        </group>
      ))}
      {pipes.map((p, i) => (
        <mesh key={i} material={p.glow ? glow : i % 2 ? m.off : m.steelLight}>
          <tubeGeometry args={[p.curve, 60, p.r, 12, false]} />
        </mesh>
      ))}
      {/* electrical cabinets */}
      {[-1.6, -1.2].map((x) => (
        <mesh key={x} material={m.off} position={[x, 0.32, 0.95]}>
          <boxGeometry args={[0.32, 0.64, 0.22]} />
        </mesh>
      ))}
      <mesh material={glow} position={[-1.4, 0.55, 1.07]}>
        <boxGeometry args={[0.5, 0.04, 0.01]} />
      </mesh>
    </group>
  );
}

function CivilZone({ inputs }: { inputs: SceneInputs }) {
  const m = useMats();
  const glow = useZoneGlow(2, inputs);
  const jib = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (jib.current && !inputs.reducedMotion) jib.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.6 + 0.4;
  });
  const c = ZONES[2].centre;
  const floors = 5;
  return (
    <group position={c}>
      {/* building frame under construction */}
      <group position={[-0.5, 0, 0.2]}>
        {Array.from({ length: floors }).map((_, f) => (
          <group key={f} position={[0, f * 0.42, 0]}>
            <mesh material={f === floors - 1 ? glow : m.off} position={[0, 0.42, 0]}>
              <boxGeometry args={[1.5, 0.05, 1.1]} />
            </mesh>
            {[
              [-0.7, -0.5],
              [0.7, -0.5],
              [-0.7, 0.5],
              [0.7, 0.5],
              [0, -0.5],
              [0, 0.5],
            ].map(([x, z]) => (
              <mesh key={`${x}${z}`} material={m.steel} position={[x, 0.21, z]}>
                <boxGeometry args={[0.06, 0.42, 0.06]} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      {/* tower crane */}
      <group position={[1.2, 0, -0.6]}>
        <mesh material={glow} position={[0, 1.9, 0]}>
          <boxGeometry args={[0.14, 3.8, 0.14]} />
        </mesh>
        <group ref={jib} position={[0, 3.8, 0]}>
          <mesh material={glow} position={[-0.9, 0, 0]}>
            <boxGeometry args={[2.6, 0.1, 0.1]} />
          </mesh>
          <mesh material={m.off} position={[0.55, -0.12, 0]}>
            <boxGeometry args={[0.35, 0.22, 0.24]} />
          </mesh>
          <mesh material={m.steelLight} position={[-1.9, -0.6, 0]}>
            <boxGeometry args={[0.01, 1.2, 0.01]} />
          </mesh>
          <mesh material={m.off} position={[-1.9, -1.25, 0]}>
            <boxGeometry args={[0.28, 0.1, 0.28]} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function ShutdownZone({ inputs }: { inputs: SceneInputs }) {
  const m = useMats();
  const glow = useZoneGlow(3, inputs);
  const c = ZONES[3].centre;
  const columns: [number, number, number][] = [
    [-0.9, 0.28, 2.8],
    [0, 0.36, 3.4],
    [0.9, 0.24, 2.4],
  ];
  return (
    <group position={c}>
      {columns.map(([x, r, h], i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh material={m.off} position={[0, h / 2, 0]}>
            <cylinderGeometry args={[r, r, h, 32]} />
          </mesh>
          {Array.from({ length: Math.floor(h / 0.6) }).map((_, k) => (
            <mesh key={k} material={k % 2 ? m.steelLight : glow} position={[0, 0.5 + k * 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[r + 0.03, 0.022, 8, 40]} />
            </mesh>
          ))}
        </group>
      ))}
      {/* scaffolding around the tallest column */}
      {Array.from({ length: 6 }).map((_, k) => (
        <group key={k} position={[0, k * 0.5, 0]}>
          {[
            [-0.55, -0.55],
            [0.55, -0.55],
            [-0.55, 0.55],
            [0.55, 0.55],
          ].map(([x, z]) => (
            <mesh key={`${x}${z}`} material={m.steelLight} position={[x, 0.25, z]}>
              <boxGeometry args={[0.03, 0.5, 0.03]} />
            </mesh>
          ))}
          <mesh material={m.steel} position={[0, 0.5, -0.55]}>
            <boxGeometry args={[1.12, 0.03, 0.03]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** Instanced glowing worker beacons that bob gently around every zone */
function Workers({ inputs }: { inputs: SceneInputs }) {
  const count = 46;
  const ref = useRef<THREE.InstancedMesh>(null);
  const data = useMemo(() => {
    const rnd = (s: number) => {
      const x = Math.sin(s * 999.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => {
      const zone = ZONES[i % ZONES.length].centre;
      return {
        x: zone.x + (rnd(i + 1) - 0.5) * 3.2,
        z: zone.z + (rnd(i + 7) - 0.5) * 2.6 + 1.2,
        phase: rnd(i + 13) * Math.PI * 2,
      };
    });
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = inputs.reducedMotion ? 0 : clock.elapsedTime;
    data.forEach((w, i) => {
      dummy.position.set(w.x + Math.sin(t * 0.4 + w.phase) * 0.15, 0.09 + Math.abs(Math.sin(t * 1.6 + w.phase)) * 0.05, w.z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.045, 0.1, 4, 8]} />
      <meshBasicMaterial color={CRIMSON_GLOW} toneMapped={false} />
    </instancedMesh>
  );
}

/** Ground: dark disc with crimson concentric grid lines */
function Ground() {
  const grid = useMemo(() => {
    const g = new THREE.PolarGridHelper(12, 16, 10, 64, new THREE.Color(CRIMSON), new THREE.Color("#2b1517"));
    (g.material as THREE.Material).transparent = true;
    (g.material as THREE.Material).opacity = 0.55;
    return g;
  }, []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[12, 96]} />
        <meshStandardMaterial color="#0f0d0d" metalness={0.3} roughness={0.85} />
      </mesh>
      <primitive object={grid} position={[0, 0.002, 0]} />
    </group>
  );
}

/** Floating dust/embers for depth */
function Embers({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const n = 420;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = Math.random() * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.035} color={OFFWHITE} transparent opacity={0.5} depthWrite={false} sizeAttenuation />
    </points>
  );
}

/** Camera rig: blends overview → zone stops by progress, plus pointer parallax */
function Rig({ inputs }: { inputs: SceneInputs }) {
  const { camera, size } = useThree();
  const pos = useMemo(() => new THREE.Vector3().copy(OVERVIEW_CAM), []);
  const target = useMemo(() => new THREE.Vector3().copy(OVERVIEW_TARGET), []);
  const want = useMemo(() => new THREE.Vector3(), []);
  const wantT = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    const z = zoneAt(inputs.progress.current);
    if (z < 0) {
      const k = 1 + z / 0.35; // 0..1 into first zone
      want.copy(OVERVIEW_CAM).lerp(ZONES[0].cam, Math.max(0, k));
      wantT.copy(OVERVIEW_TARGET).lerp(ZONES[0].centre, Math.max(0, k));
    } else {
      const i = Math.min(Math.floor(z), ZONES.length - 1);
      const j = Math.min(i + 1, ZONES.length - 1);
      const f = THREE.MathUtils.smoothstep(z - i, 0.35, 1);
      want.copy(ZONES[i].cam).lerp(ZONES[j].cam, f);
      wantT.copy(ZONES[i].centre).lerp(ZONES[j].centre, f);
    }
    wantT.y += 0.9;
    // pull the camera back on narrow screens so each zone fits the frame
    const aspect = size.width / Math.max(size.height, 1);
    const dist = aspect < 0.8 ? 1.85 : aspect < 1.3 ? 1.4 : 1.15;
    want.sub(wantT).multiplyScalar(dist).add(wantT);
    const px = inputs.reducedMotion ? 0 : inputs.pointer.current.x;
    const py = inputs.reducedMotion ? 0 : inputs.pointer.current.y;
    want.x += px * 0.6;
    want.y += py * 0.35;
    pos.lerp(want, 0.06);
    target.lerp(wantT, 0.06);
    camera.position.copy(pos);
    camera.lookAt(target);
  });
  return null;
}

export default function IndustrialSiteScene({ inputs, active }: { inputs: SceneInputs; active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 9, 13], fov: 38, near: 0.1, far: 80 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(BLACK);
        scene.fog = new THREE.Fog(BLACK, 12, 28);
      }}
    >
      <ambientLight intensity={0.35} />
      <hemisphereLight args={[OFFWHITE, "#1a0b0d", 0.45]} />
      <directionalLight position={[6, 10, 6]} intensity={1.6} color={OFFWHITE} />
      <directionalLight position={[-8, 4, -6]} intensity={0.9} color={CRIMSON_GLOW} />
      <Ground />
      <OilGasZone inputs={inputs} />
      <MepZone inputs={inputs} />
      <CivilZone inputs={inputs} />
      <ShutdownZone inputs={inputs} />
      <Workers inputs={inputs} />
      <Embers reducedMotion={inputs.reducedMotion} />
      <Rig inputs={inputs} />
    </Canvas>
  );
}
