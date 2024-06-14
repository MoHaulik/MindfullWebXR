document.addEventListener('DOMContentLoaded', () => {
    const goalSound = document.getElementById('goal-sound');
    const mindfulnessMessages = [
        { text: "Think about who you will probably see next. Imagine bringing kindness to this interaction.", end: "Bring kindness to all your upcoming interactions" },
        { text: "Reflect on one thing you’re grateful for and think about why you appreciate it so much.", end: "Carry gratitude with you throughout the day." },
        { text: "Recall a time recently when you felt a sense of calm. Bring that feeling into this moment.", end: "Hold onto this calmness as you go about your day." }
    ];

    let camera, scene, renderer;
    let mindfulnessText, endText;
    let startTimeout;

    function init() {
        const container = document.getElementById('container');
        
        // Set up the scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10);
        camera.position.set(0, 1.6, 3);  // Position camera at eye level

        // Create renderer and enable XR
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.xr.enabled = true;
        container.appendChild(renderer.domElement);
        document.body.appendChild(VRButton.createButton(renderer));

        // Add a simple glowing background (for example, a glowing cube)
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Add overlay for mindfulness text
        mindfulnessText = document.createElement('div');
        mindfulnessText.style.position = 'absolute';
        mindfulnessText.style.width = '100%';
        mindfulnessText.style.textAlign = 'center';
        mindfulnessText.style.color = 'white';
        mindfulnessText.style.fontSize = '2em';
        mindfulnessText.style.top = '20%';
        mindfulnessText.classList.add('hidden');
        document.body.appendChild(mindfulnessText);

        endText = document.createElement('div');
        endText.style.position = 'absolute';
        endText.style.width = '100%';
        endText.style.textAlign = 'center';
        endText.style.color = 'white';
        endText.style.fontSize = '2em';
        endText.style.top = '20%';
        endText.classList.add('hidden');
        document.body.appendChild(endText);

        startTimeout = setTimeout(startExperience, 10000);

        // Handle window resize
        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function startExperience() {
        const randomMessage = mindfulnessMessages[Math.floor(Math.random() * mindfulnessMessages.length)];
        mindfulnessText.textContent = randomMessage.text;
        endText.textContent = randomMessage.end;

        goalSound.play();

        mindfulnessText.classList.remove('hidden');
        setTimeout(() => {
            mindfulnessText.classList.add('hidden');
            endText.classList.remove('hidden');
            goalSound.play();
            setTimeout(() => {
                endText.classList.add('hidden');
                startTimeout = setTimeout(startExperience, 10000);
            }, 30000); // Show end text for 30 seconds
        }, 20000); // Show mindfulness text for 20 seconds
    }

    function animate() {
        renderer.setAnimationLoop(render);
    }

    function render() {
        renderer.render(scene, camera);
    }

    init();
    animate();
});
