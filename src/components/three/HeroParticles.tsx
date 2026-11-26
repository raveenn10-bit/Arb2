"use client";

/** Cinematic crimson / off-white particle field + slow wireframe icosahedron, layered over the hero photos. */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Field({ count, pointer }: { count: number; pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const pts = useRef<THREE.Points>(null);
  const shape = useRef<THREE.LineSegments>(null);
  const { geo, mat } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const crimson = new THREE.Color("#ff3348");
    const off = new THREE.Color("#f5f2ed");
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = Math.random() < 0.55 ? crimson : off;
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const m = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending });
    return { geo: g, mat: m };
  }, [count]);
  const wire = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.4, 1)), []);
  useFrame(({ camera, clock }, dt) => {
    const t = clock.elapsedTime;
    if (pts.current) {
      pts.current.rotation.y += dt * 0.025;
      pts.current.position.y = Math.sin(t * 0.3) * 0.15;
    }
    if (shape.current) {
      shape.current.rotation.x += dt * 0.08;
      shape.current.rotation.y += dt * 0.12;
    }
    camera.position.x += (pointer.current.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (pointer.current.y * 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return (
    <>
      <points ref={pts} geometry={geo} material={mat} />
      <lineSegments ref={shape} geometry={wire} position={[4.2, 0.4, -1]}>
        <lineBasicMaterial color="#ff3348" transparent opacity={0.28} />
      </lineSegments>
    </>
  );
}

export default function HeroParticles({ mobile = false }: { mobile?: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 50 }} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}>
      <Field count={mobile ? 260 : 700} pointer={pointer} />
    </Canvas>
  );
}
