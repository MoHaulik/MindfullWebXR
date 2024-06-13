import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { ShaderMaterial, PlaneGeometry, Mesh } from 'three';

document.addEventListener('DOMContentLoaded', () => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.6, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.6, 0);
    controls.update();

    // Lava lamp shader
    const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() }
    };

    const lavaLampMaterial = new ShaderMaterial({
        uniforms: uniforms,
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec2 vUv;
            void main() {
                vec2 p = -1.0 + 2.0 * vUv;
                float a = atan(p.y, p.x);
                float r = sqrt(dot(p, p));
                vec3 color = vec3(0.5 + 0.5 * cos(time + a + vec3(0, 2, 4)), 0.5 + 0.5 * cos(time + a + vec3(2, 4, 6)), 0.5 + 0.5 * cos(time + a + vec3(4, 6, 8)));
                gl_FragColor = vec4(color * (1.0 - r * r), 1.0);
            }
        `
    });

    // Skybox and ground
    const skyGeometry = new PlaneGeometry(1000, 1000);
    const sky = new Mesh(skyGeometry, lavaLampMaterial);
    sky.rotation.x = Math.PI / 2;
    scene.add(sky);

    const groundGeometry = new PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x7BC8A4 });
    const ground = new Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    scene.add(ground);

    // Lighting
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    // Load Fonts and Text
    const loader = new FontLoader();
    let introTextMesh, mindfulnessTextMesh, endTextMesh;
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });

        const introGeometry = new TextGeometry('Take a moment to reflect', {
            font: font,
            size: 0.5,
            height: 0.1
        });
        introTextMesh = new Mesh(introGeometry, textMaterial);
        introTextMesh.position.set(-3, 1.6, -3);
        scene.add(introTextMesh);

        const mindfulnessGeometry = new TextGeometry('', {
            font: font,
            size: 0.5,
            height: 0.1
        });
        mindfulnessTextMesh = new Mesh(mindfulnessGeometry, textMaterial);
        mindfulnessTextMesh.position.set(-3, 1.6, -3);
        mindfulnessTextMesh.visible = false;
        scene.add(mindfulnessTextMesh);

        const endGeometry = new TextGeometry('', {
            font: font,
            size: 0.5,
            height: 0.1
        });
        endTextMesh = new Mesh(endGeometry, textMaterial);
        endTextMesh.position.set(-3, 1.6, -3);
        endTextMesh.visible = false;
        scene.add(endTextMesh);
    });

    // Sound
    const listener = new THREE.AudioListener();
    camera.add(listener);
    const sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('goal.mp3', (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(false);
        sound.setVolume(0.5);
    });

    // Mindfulness Messages
    const mindfulnessMessages = [
        { text: "Think about who you will probably see next. Imagine bringing kindness to this interaction.", end: "Bring kindness to all your upcoming interactions" },
        { text: "Reflect on one thing you’re grateful for and think about why you appreciate it so much.", end: "Carry gratitude with you throughout the day." },
        // Add more messages as needed
    ];

    // Start Experience
    function startExperience() {
        introTextMesh.visible = false;
        sound.play();

        setTimeout(() => {
            const randomMessage = mindfulnessMessages[Math.floor(Math.random() * mindfulnessMessages.length)];
            mindfulnessTextMesh.geometry = new TextGeometry(randomMessage.text, {
                font: mindfulnessTextMesh.geometry.parameters.font,
                size: 0.5,
                height: 0.1
            });
            mindfulnessTextMesh.visible = true;

            setTimeout(() => {
                mindfulnessTextMesh.visible = false;

                setTimeout(() => {
                    endTextMesh.geometry = new TextGeometry(randomMessage.end, {
                        font: endTextMesh.geometry.parameters.font,
                        size: 0.5,
                        height: 0.1
                    });
                    endTextMesh.visible = true;
                    sound.play();

                    setTimeout(() => {
                        endTextMesh.visible = false;
                        setTimeout(startExperience, 10000);
                    }, 30000);
                }, 180000);
            }, 20000);
        }, 1000);
    }

    // Automatically start the experience after 10 seconds
    setTimeout(startExperience, 10000);

    // Animation loop
    function animate() {
        uniforms.time.value += 0.05;
        renderer.setAnimationLoop(animate);
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
