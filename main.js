import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import './style.css'

const scene = new THREE.Scene();

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const sphere = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
  roughness: 0.4,
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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

window.addEventListener('resize', (event) => {
  const { innerWidth, innerHeight } = event.target;
  windowSize.width = innerWidth;
  windowSize.height = innerHeight;
  camera.aspect = windowSize.width / windowSize.height;
  camera.updateProjectionMatrix();
  renderer.setSize(windowSize.width, windowSize.height);
});

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}
loop();

const timeline = gsap.timeline({ defaults: { duration: 1 } });
timeline.fromTo(mesh.scale, { z: 0, y: 0, x: 0 }, { z: 1, y: 1, x: 1 });
timeline.fromTo('nav', { y: -100 }, { y: 0 },)
timeline.fromTo('h1', { opacity: 0 }, { opacity: 1 },)

let mouseDown = false;
let rgb = [0, 0, 0]
window.addEventListener('mousedown', () => { mouseDown = true; });
window.addEventListener('mouseup', () => { mouseDown = false; });

window.addEventListener('mousemove', (event) => {
  if (mouseDown) {
    rgb = [
      Math.round((event.pageX / windowSize.width) * 255),
      Math.round((event.pageY / windowSize.height) * 255),
      150,
    ];

    const newColor = new THREE.Color(`rgb(${rgb.join(',')})`);
    gsap.to(mesh.material.color, newColor);
  }
});