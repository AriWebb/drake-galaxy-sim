// Galaxy visualization
let scene, camera, renderer, controls;
let stars = [];
const particleCount = 10000;
const galaxyRadius = 5000;
const galaxyHeight = 300;
const coreRadius = 1000;
const coreConcentration = 0.5;

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 100000);
    camera.position.set(0, 1000, 2000);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('container').appendChild(renderer.domElement);
    
    // Add controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 15000;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    
    // Create stars
    createGalaxy();
    
    // Add window resize handler
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// Create the galaxy with spiral arms
function createGalaxy() {
    const starColors = [
        0xFFFFFF, // white
        0xFFFF00, // yellow
        0xFFD700, // gold
        0xFF8C00, // orange
        0xFF4500, // red-orange
        0x00BFFF, // light blue
        0x1E90FF  // blue
    ];
    
    // Create geometry for all stars
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const color = new THREE.Color();
    
    // Define spiral arms
    const spiralArms = 5;
    const armSpread = 0.5;
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Determine if star is in core or in spiral arms
        const isCore = Math.random() < coreConcentration;
        
        let x, y, z;
        
        if (isCore) {
            // Stars in galactic core - dense center
            const r = Math.random() * coreRadius;
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * 0.5 * Math.PI;
            
            x = r * Math.cos(theta) * Math.cos(phi);
            y = r * Math.sin(phi);
            z = r * Math.sin(theta) * Math.cos(phi);
            
            // Core stars are whiter/bluer
            color.set(starColors[Math.floor(Math.random() * 2)]);
        } else {
            // Stars in spiral arms
            const arm = Math.floor(Math.random() * spiralArms);
            const angle = (Math.PI * 2 * arm / spiralArms) + (Math.random() * armSpread);
            const distance = coreRadius + Math.random() * (galaxyRadius - coreRadius);
            const spiralFactor = 4.0; // controls tightness of the spiral
            
            const theta = angle + (distance / galaxyRadius) * spiralFactor;
            
            x = distance * Math.cos(theta);
            z = distance * Math.sin(theta);
            
            // Add some randomness to spiral
            x += (Math.random() - 0.5) * distance * 0.3;
            z += (Math.random() - 0.5) * distance * 0.3;
            
            // Y-position (height) drops off with distance from center
            const heightFactor = 1 - (distance / galaxyRadius) * 0.8;
            y = (Math.random() - 0.5) * galaxyHeight * heightFactor;
            
            // Different colors based on position
            const colorIndex = Math.min(Math.floor((distance / galaxyRadius) * starColors.length), starColors.length - 1);
            color.set(starColors[colorIndex]);
        }
        
        // Set position
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
        
        // Set color
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    // Add attributes to geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create point material
    const material = new THREE.PointsMaterial({
        size: 4,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    // Create the particle system
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    
    // Add a reference point for the galactic center
    const centerGeometry = new THREE.SphereGeometry(50, 32, 32);
    const centerMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.8
    });
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerSphere);
}

// Handle window resizing
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // required if controls.enableDamping = true
    renderer.render(scene, camera);
}

// Start the visualization
init();