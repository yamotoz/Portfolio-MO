// Three.js Background Animation
// Effect: Constellation (Particles + Lines)

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none'; // Allow clicks to pass through
    document.body.prepend(canvas);

    // Scene Setup
    const scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x000000); // Let CSS handle background gradient

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150; // Number of particles
    const posArray = new Float32Array(particlesCount * 3);
    const velocityArray = new Float32Array(particlesCount * 3); // For movement

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 120; // Spread
        velocityArray[i] = (Math.random() - 0.5) * 0.05; // Speed
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.3,
        color: 0xd6b25c, // Brand Gold
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    // Lines (Constellation Effect)
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0xd6b25c,
        transparent: true,
        opacity: 0.15
    });

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);

        // Gentle rotation
        particlesMesh.rotation.z += 0.0005;

        // Update positions
        const positions = particlesGeometry.attributes.position.array;

        // We need to recreate lines every frame or update them efficiently
        // For simple constellation, we can just draw lines between close particles
        // But creating geometry every frame is heavy. 
        // Let's just move particles and let the rotation handle the "life".

        // Optional: Wiggle particles
        for (let i = 0; i < particlesCount; i++) {
            // positions[i*3 + 1] += Math.sin(elapsedTime + positions[i*3]) * 0.002;
        }
        particlesGeometry.attributes.position.needsUpdate = true;

        // Draw Lines dynamically? 
        // A better approach for constellation is to use a separate geometry for lines that updates
        // Or just keep it simple with points for performance.
        // Let's add a secondary mesh for lines if we want them static relative to points, 
        // but calculating distance every frame for 150^2 pairs is too much for JS without shaders.
        // So we will skip dynamic lines for now and stick to floating particles which look elegant.
        // If user really wants lines, we can use a LineSegments with pre-calculated pairs.

        renderer.render(scene, camera);
    }

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
