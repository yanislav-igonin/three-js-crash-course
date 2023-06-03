import * as THREE from 'three';
import './style.css'

const scene = new THREE.Scene();

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const sphere = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
});
const mesh = new THREE.Mesh(sphere, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, windowSize.width / windowSize.height);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector('#webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(windowSize.width, windowSize.height);
renderer.render(scene, camera);

window.addEventListener('resize', (event) => {
  const { innerWidth, innerHeight } = event.target;
  windowSize.width = innerWidth;
  windowSize.height = innerHeight;
  camera.aspect = windowSize.width / windowSize.height;
  camera.updateProjectionMatrix();
  renderer.setSize(windowSize.width, windowSize.height);
});

const loop = () => {
  light.position.x = 20 * Math.sin(Date.now() * 0.005);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

loop();

