import * as THREE from "three";

export const ObjectFactory = {
  createPlane: (length, width) => {
    const geometry = new THREE.PlaneGeometry(length, width);
    const material = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    return plane;
  },

  createWall: () => {
    const geometry = new THREE.BoxGeometry(10, 3, 0.1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(0, 1.5, 0);
    return wall;
  },

  createDoor: () => {
    const geometry = new THREE.BoxGeometry(1, 2, 0.1);
    const material = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const door = new THREE.Mesh(geometry, material);
    door.position.set(0, 1, 0);
    return door;
  },

  createWindow: () => {
    const geometry = new THREE.BoxGeometry(2, 1, 0.1);
    const material = new THREE.MeshStandardMaterial({ color: 0x87ceeb, transparent: true, opacity: 0.5 });
    const window = new THREE.Mesh(geometry, material);
    window.position.set(0, 1.5, 0);
    return window;
  },

  createFurniture: () => {
    const geometry = new THREE.BoxGeometry(2, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x555555 });
    const furniture = new THREE.Mesh(geometry, material);
    furniture.position.set(0, 0.5, 0);
    return furniture;
  },
};
