import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import axios from "axios";

export default function Home() {
    const [pythonData, setPythonData] = useState({});
    const [nextjsData, setNextjsData] = useState({});
    const sceneRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:8000/python-model-info").then(res => setPythonData(res.data));
        axios.get("/api/nextjs-model-info").then(res => setNextjsData(res.data));
    }, []);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneRef.current.appendChild(renderer.domElement);

        // Add OrbitControls for rotation, zoom, and pan
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth rotation
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 1;
        controls.zoomSpeed = 1.2;

        // Load OBJ model
        const loader = new OBJLoader();
        loader.load("/capsule.obj", (object) => {
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load("/image.png");
            object.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.material = new THREE.MeshBasicMaterial({ map: texture });
                }
            });
            scene.add(object);
        });

        // Add lighting
        const light = new THREE.AmbientLight(0xffffff);
        scene.add(light);

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update(); // Update controls
            renderer.render(scene, camera);
        }
        animate();

        // Handle window resize
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener("resize", onWindowResize);

        return () => {
            window.removeEventListener("resize", onWindowResize);
            sceneRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div>
            <div ref={sceneRef} style={{ width: "100vw", height: "100vh" }}></div>
            <div style={{ position: "absolute", top: 10, left: 10, color: "white" }}>
                <h2>Model Metadata</h2>
                <p><b>Name:</b> {pythonData.model_name}</p>
                <p><b>Vertex Count:</b> {pythonData.vertex_count}</p>
                <p><b>Texture:</b> {pythonData.texture}</p>
                <p><b>Scale:</b> {nextjsData.model_scale}</p>
                <p><b>Number of Faces:</b> {nextjsData.num_faces}</p>
            </div>
        </div>
    );
}
