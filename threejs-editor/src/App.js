import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Menu from "./Menu";
import PlaneForm from "./PlaneForm";
import { ObjectFactory } from "./ObjectFactory";

const App = () => {
  const mountRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [renderer, setRenderer] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [showPlaneForm, setShowPlaneForm] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Configure camera and controls
    camera.position.set(10, 15, 20);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(ambientLight, pointLight);

    // Handle window resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Set scene, camera, and renderer state
    setScene(scene);
    setCamera(camera);
    setRenderer(renderer);

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  const handleCreatePlane = (length, width) => {
    if (!scene) return;
    const plane = ObjectFactory.createPlane(length, width);
    scene.add(plane);
    setShowPlaneForm(false);
  };

  const handleCreateObject = (type) => {
    if (!scene) return;
    const object = ObjectFactory[`create${type.charAt(0).toUpperCase() + type.slice(1)}`]();
    scene.add(object);
  };

  const handleMouseDown = (event) => {
    if (!scene || !camera) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      setSelectedObject(intersects[0].object);
      setDragging(true);
    }
  };

  const handleMouseMove = (event) => {
    if (!dragging || !selectedObject || !camera) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);

    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersectionPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    if (intersectionPoint) {
      selectedObject.position.x = intersectionPoint.x;
      selectedObject.position.z = intersectionPoint.z;
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setSelectedObject(null);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: "relative" }}
    >
      <div ref={mountRef} style={{ width: "100vw", height: "90vh" }} />
      <Menu onCreatePlane={() => setShowPlaneForm(true)} onCreateObject={handleCreateObject} />
      {showPlaneForm && (
        <PlaneForm
          onSubmit={handleCreatePlane}
          onClose={() => setShowPlaneForm(false)}
        />
      )}
    </div>
  );
};

export default App;
