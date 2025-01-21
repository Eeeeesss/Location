const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Камера
camera.position.set(10, 15, 10);
camera.lookAt(0, 0, 0);

// Пол
const floorGeometry = new THREE.PlaneGeometry(20, 15);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xdcdcdc });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Функция для создания стен
function createWall(startX, startY, startZ, length, height, thickness, direction = "x", color = 0xffffff) {
    let width, depth;

    // Определение размеров стены в зависимости от направления
    if (direction === "x") {
        width = length;
        depth = thickness;
    } else if (direction === "z") {
        width = thickness;
        depth = length;
    } else {
        console.error("Неправильное направление. Используйте 'x' или 'z'.");
        return;
    }

    const wallGeometry = new THREE.BoxGeometry(width, height, depth);
    const wallMaterial = new THREE.MeshStandardMaterial({ color });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);

    // Позиционирование стены
    wall.position.set(
        startX + (direction === "x" ? length / 2 : 0), // Смещение вдоль оси X
        startY + height / 2, // Поднятие стены на половину её высоты
        startZ + (direction === "z" ? length / 2 : 0)  // Смещение вдоль оси Z
    );

    scene.add(wall);
}

// Кухня-студия и гостиная
createWall(-10, 0, 7.5, 20, 3, 0.01, "x");  // Стена вдоль оси X
createWall(10, 0, -7.5, 15, 3, 0.01, "z");  // Стена вдоль оси X

// createWall(0, 0, 0, 10, 3, 0.2, "z");
// // Санузел
// createWall(4, 3, 0.2, 6, 1.5, 2.5);   // Левая стена санузла
// createWall(0.2, 3, 4, 8, 1.5, 0);     // Правая стена санузла
// createWall(4, 3, 0.2, 6, 1.5, -2.5);  // Задняя стена санузла

// // Прихожая
// createWall(3, 3, 0.2, -7, 1.5, 0);   // Стена прихожей
// createWall(3, 3, 0.2, -7, 1.5, 5);   // Стена прихожей (слева)

// // Спальня
// createWall(6, 3, 0.2, -12, 1.5, 0);  // Левая стена спальни
// createWall(0.2, 3, 6, -9, 1.5, 3);   // Правая стена спальни
// createWall(6, 3, 0.2, -12, 1.5, -3); // Задняя стена спальни

// Двери
function createDoor(startX, startY, startZ, width, height, thickness, direction = "x", color = 0x8B4513) {
    let doorWidth, doorDepth;

    // Определение размеров двери в зависимости от направления
    if (direction === "x") {
        doorWidth = width;
        doorDepth = thickness;
    } else if (direction === "z") {
        doorWidth = thickness;
        doorDepth = width;
    } else {
        console.error("Неправильное направление. Используйте 'x' или 'z'.");
        return;
    }

    const doorGeometry = new THREE.BoxGeometry(doorWidth, height, doorDepth);
    const doorMaterial = new THREE.MeshStandardMaterial({ color });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);

    // Позиционирование двери
    door.position.set(
        startX + (direction === "x" ? width / 2 : 0),  // Смещение вдоль оси X
        startY + height / 2,                          // Поднятие двери на половину её высоты
        startZ + (direction === "z" ? width / 2 : 0)  // Смещение вдоль оси Z
    );

    scene.add(door);
}

// Двери
createDoor(7, 0, 7.5, 1, 2, 0.1, "x");
// createDoor(1, 2, 7, 1, -3.8);    // Дверь из санузла в кухню
// createDoor(1, 2, -9, 1, 2);     // Дверь в спальню

// Окна
// function createWindow(width, height, x, y, z, rotation = 0) {
//     const windowGeometry = new THREE.BoxGeometry(width, height, 0.1);
//     const windowMaterial = new THREE.MeshStandardMaterial({
//         color: 0x87CEEB,
//         transparent: true,
//         opacity: 0.5,
//     });
//     const window = new THREE.Mesh(windowGeometry, windowMaterial);
//     window.position.set(x, y, z);
//     window.rotation.y = rotation;
//     scene.add(window);
// }

// Окна
// createWindow(4, 1.5, 0, 2, 7.4);   // Окно на задней стене кухни-гостиной
// createWindow(3, 1.5, 7.4, 2, 0, Math.PI / 2); // Окно на правой стене спальни

// Мебель (кухня)
// function createKitchenUnit(x, y, z) {
//     const unitGeometry = new THREE.BoxGeometry(2, 1, 1);
//     const unitMaterial = new THREE.MeshStandardMaterial({ color: 0x555555 });
//     const unit = new THREE.Mesh(unitGeometry, unitMaterial);
//     unit.position.set(x, y, z);
//     scene.add(unit);
// }
// createKitchenUnit(-3, 0.5, 2.5);  // Шкаф на кухне
// createKitchenUnit(-3, 0.5, 0);    // Плита
// createKitchenUnit(-3, 0.5, -2.5); // Холодильник

// Мебель (гостиная)
// function createSofa(x, y, z) {
//     const sofaGeometry = new THREE.BoxGeometry(4, 1, 2);
//     const sofaMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
//     const sofa = new THREE.Mesh(sofaGeometry, sofaMaterial);
//     sofa.position.set(x, y, z);
//     scene.add(sofa);
// }
// createSofa(0, 0.5, 5); // Диван в гостиной

// Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Управление камерой
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Масштабирование окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function saveCameraState() {
    const cameraState = {
        position: camera.position,
        target: controls.target,
    };
    localStorage.setItem("cameraState", JSON.stringify(cameraState));
}

// Функция для загрузки состояния камеры
function loadCameraState() {
    const savedState = localStorage.getItem("cameraState");
    if (savedState) {
        const { position, target } = JSON.parse(savedState);

        // Установка позиции камеры
        camera.position.set(position.x, position.y, position.z);

        // Установка цели камеры
        controls.target.set(target.x, target.y, target.z);
        controls.update();
    }
}

// Камера
camera.position.set(10, 15, 10); // Позиция по умолчанию
camera.lookAt(0, 0, 0);

// Загрузка состояния камеры при загрузке страницы
loadCameraState();

// Сохранение состояния камеры при закрытии/обновлении страницы
window.addEventListener("beforeunload", saveCameraState);

// Анимация
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
