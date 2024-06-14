document.addEventListener('DOMContentLoaded', () => {
    const introText = document.getElementById('intro-text');
    const mindfulnessText = document.getElementById('mindfulness-text');
    const endText = document.getElementById('end-text');
    const overlay = document.querySelector('.overlay');
    const lavaLampBackground = document.querySelector('.lava-lamp-background');
    const goalSound = document.getElementById('goal-sound');

    const mindfulnessMessages = [
        { text: "Think about who you will probably see next. Imagine bringing kindness to this interaction.", end: "Bring kindness to all your upcoming interactions" },
        { text: "Reflect on one thing you’re grateful for and think about why you appreciate it so much.", end: "Carry gratitude with you throughout the day." },
        { text: "Recall a time recently when you felt a sense of calm. Bring that feeling into this moment.", end: "Hold onto this calmness as you go about your day." }
    ];

    function getRandomColor(range) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += range[Math.floor(Math.random() * range.length)];
        }
        return color;
    }

    function setRandomBackground() {
        const warmColors = '89ABCDEF';
        const coolColors = '01234567';

        const color1 = getRandomColor(warmColors);
        const color2 = getRandomColor(coolColors);

        lavaLampBackground.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
        lavaLampBackground.style.backgroundSize = "200% 200%";
    }

    setRandomBackground();

    const randomMessage = mindfulnessMessages[Math.floor(Math.random() * mindfulnessMessages.length)];
    mindfulnessText.textContent = randomMessage.text;
    endText.textContent = randomMessage.end;

    function startExperience() {
        introText.classList.add('hidden');
        overlay.style.background = 'rgba(128, 128, 128, 0)';
        goalSound.play();

        setTimeout(() => {
            mindfulnessText.classList.remove('hidden');
            mindfulnessText.classList.add('fade-in-out');

            setTimeout(() => {
                mindfulnessText.classList.add('hidden');
                mindfulnessText.classList.remove('fade-in-out');
                
                setTimeout(() => {
                    endText.classList.remove('hidden');
                    goalSound.play();
                    
                    setTimeout(() => {
                        endText.classList.add('hidden');
                        overlay.style.background = 'rgba(128, 128, 128, 0.5)';
                        introText.classList.remove('hidden');
                        setRandomBackground();

                        const newRandomMessage = mindfulnessMessages[Math.floor(Math.random() * mindfulnessMessages.length)];
                        mindfulnessText.textContent = newRandomMessage.text;
                        endText.textContent = newRandomMessage.end;
                    }, 30000);
                }, 180000);
            }, 20000);
        }, 1000);
    }

    // Automatically start the experience after 10 seconds
    setTimeout(startExperience, 10000);

    // WebXR setup
    if (navigator.xr) {
        navigator.xr.requestSession('immersive-vr').then(onSessionStarted);
    } else {
        console.log('WebXR not supported');
    }

    function onSessionStarted(session) {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.xr.enabled = true;
        document.getElementById('xr-canvas-container').appendChild(VRButton.createButton(renderer));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

        const light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 20, 0);
        scene.add(light);

        const animate = function () {
            renderer.setAnimationLoop(render);
        };

        function render() {
            renderer.render(scene, camera);
        }

        session.addEventListener('end', () => {
            renderer.setAnimationLoop(null);
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop(render);

        animate();
    }
});
