document.addEventListener('DOMContentLoaded', () => {
    const introText = document.querySelector('#intro-text');
    const mindfulnessText = document.querySelector('#mindfulness-text');
    const endText = document.querySelector('#end-text');
    const goalSound = document.querySelector('#goal-sound');

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

        document.querySelector('#lava-lamp-background').setAttribute('material', 'color', `linear-gradient(45deg, ${color1}, ${color2})`);
    }

    setRandomBackground();

    const randomMessage = mindfulnessMessages[Math.floor(Math.random() * mindfulnessMessages.length)];
    mindfulnessText.setAttribute('text', 'value', randomMessage.text);
    endText.setAttribute('text', 'value', randomMessage.end);

    function startExperience() {
        introText.setAttribute('visible', 'false');
        goalSound.play();

        setTimeout(() => {
            mindfulnessText.setAttribute('visible', 'true');

            setTimeout(() => {
                mindfulnessText.setAttribute('visible', 'false');

                setTimeout(() => {
                    endText.setAttribute('visible', 'true');
                    goalSound.play();

                    setTimeout(() => {
                        endText.setAttribute('visible', 'false');
                        introText.setAttribute('visible', 'true');
                        setRandomBackground();

                        const newRandomMessage = mindfulnessMessages[Math.floor(Math.random() * mindfulnessMessages.length)];
                        mindfulnessText.setAttribute('text', 'value', newRandomMessage.text);
                        endText.setAttribute('text', 'value', newRandomMessage.end);
                    }, 30000);
                }, 180000);
            }, 20000);
        }, 1000);
    }

    setTimeout(startExperience, 10000);
});
