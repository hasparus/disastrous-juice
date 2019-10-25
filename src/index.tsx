import ReactDOM from "react-dom";
import React from "react";
import { Canvas, useThree, components as t } from "react-three-fiber";
import { useDrag } from "react-use-gesture";
import { useSpring, animated as a, AnimatedProps } from "react-spring/three";
import "./styles.css";

const { MeshNormalMaterial } = t;

function Obj() {
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  const [spring, set] = useSpring<AnimatedProps>(() => ({
    position: [0, 0, 0],
    config: { mass: 4, friction: 50, tension: 1500 },
  })) as any;
  const bind = useDrag(
    ({ offset: [x, y] }) => set({ position: [x / aspect, -y / aspect, 0] }),
    { pointerEvents: true }
  );

  return (
    <a.mesh {...spring} {...bind()}>
      <t.DodecahedronBufferGeometry attach="geometry" />
      <MeshNormalMaterial attach="material" />
    </a.mesh>
  );
}

ReactDOM.render(
  <Canvas>
    <Obj />
  </Canvas>,
  document.getElementById("root")
);
