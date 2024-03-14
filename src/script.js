import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

/*
Cursor
*/

const cursor = {
  x: 0,
  y: 0,
};

let clickedPoint = null;
const dial = document.querySelector(".dial");

/**
 * Base
 */
// Canvas

const canvas = document.querySelector("canvas.webgl");
canvas.addEventListener("dblclick", (event) => {
  let ndcX = (event.clientX / sizes.width) * 2 - 1;
  let ndcY = -(event.clientY / sizes.height) * 2 + 1;

  const raycaster = new THREE.Raycaster();

  raycaster.setFromCamera({ x: ndcX, y: ndcY }, camera);

  const intersects = raycaster.intersectObjects([group], true);

  if (intersects.length > 0) {
    clickedPoint = intersects[0].point;
  }
  let left = event.clientX;
  let top = event.clientY;

  dial.style.top = `${top}px`;
  dial.style.left = `${left}px`;
  dial.style.display = "block";
  console.log(cursor.x);

  controls.addEventListener("change", () => {
    if (clickedPoint) {
      const vector = clickedPoint.clone().project(camera);
      const x = (vector.x * 0.5 + 0.5) * sizes.width;
      const y = (-vector.y * 0.5 + 0.5) * sizes.height;

      // Update the position of the modal
      dial.style.left = `${x}px`;
      dial.style.top = `${y}px`;

      //prevent dial from being seen from the back

      if (clickedPoint.z > camera.position.z) {
        dial.style.display = "none";
      } else {
        dial.style.display = "block";
      }
    }
  });
});

let seeComment = false;
let comment = "";
const pin = document.querySelector("#pin");
const commentDiv = document.querySelector("#comments");
const form = document.querySelector("#form");
const button = document.querySelector("#button");
button.addEventListener("click", () => {
  comment = form.elements[0].value;
  commentDiv.innerHTML += `<p>${comment}</p>`;
  seeComment = true;
  commentDiv.style.display = "block";
  if (seeComment === true) {
    commentDiv.style.display = "block";
    console.log("hello");
    canvas.addEventListener("click", (event) => {
      pin.style.display = "block";
      form.style.display = "none";
      commentDiv.style.display = "none";
    });
  }
});

pin.addEventListener("click", () => {
  form.style.display = "block";
  pin.style.display = "none";
  commentDiv.style.display = "block";
});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  //update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

const group = new THREE.Group();

// Object
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.8, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfccf55 })
);
group.add(sphere);

const cube1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfbfaf2 })
);
cube1.position.x = 1;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfbfaf2 })
);
cube2.position.x = -1;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfbfaf2 })
);
cube3.position.y = -1;
group.add(cube3);
scene.add(group);

const cube4 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfbfaf2 })
);
cube4.position.y = 1;
group.add(cube4);

const cube5 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfbfaf2 })
);
cube5.position.y = 0.7;
cube5.position.x = 0.7;
group.add(cube5);

const cube6 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfbfaf2 })
);
cube6.position.y = -0.7;
cube6.position.x = -0.7;
group.add(cube6);

const cube7 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfbfaf2 })
);
cube7.position.y = 0.7;
cube7.position.x = -0.7;
group.add(cube7);

const cube8 = new THREE.Mesh(
  new THREE.SphereGeometry(0.7, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xfbfaf2 })
);
cube8.position.y = -0.7;
cube8.position.x = 0.7;
group.add(cube8);
scene.add(group);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

//controls

//const controls = new OrbitControls(camera, canvas);
//controls.enableDamping = true;

const controls = new TrackballControls(camera, canvas);
const aspectRatio = sizes.width / sizes.height;
/*const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100
);*/
//camera.position.x = 2;
//camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(group.position);
scene.add(camera);

window.addEventListener("mousemove", (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5);
  cursor.y = event.clientY / sizes.height - 0.5;
});

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  if (clickedPoint) {
    const vector = clickedPoint.clone().project(camera);
    const x = (vector.x * 0.5 + 0.5) * sizes.width;
    const y = (-vector.y * 0.5 + 0.5) * sizes.height;

    // Update the position of the modal
    dial.style.left = `${x}px`;
    dial.style.top = `${y}px`;
  }

  //update camera

  /*camera.position.x = Math.cos(cursor.x * Math.PI * 2) * 3;
  camera.position.z = Math.sin(cursor.x * Math.PI * 2) * 3;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);*/

  // Update objects
  // mesh.rotation.y = elapsedTime;

  //update dial position

  //Prevent camera from going inside the object

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera({ x: cursor.x, y: cursor.y }, camera);

  const intersects = raycaster.intersectObjects([group], true);

  if (intersects.length > 0) {
    const [intersect] = intersects;
    const distance = camera.position.distanceTo(intersect.point);

    if (distance < 0.51) {
      const [x, y, z] = intersect.point.toArray();
      camera.position.set(x, y, z + 0.51);
    }
  }

  //update controls
  controls.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
