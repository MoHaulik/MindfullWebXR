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
        { text: "Recall a time recently when you felt a sense of calm. Bring that feeling into this moment.", end: "Hold onto this calmness as you go about your day." },
        { text: "Think about a challenge you're facing and how it will help you grow.", end: "Embrace growth and learning from every challenge." },
        { text: "Become very aware of the things you see, hear, and feel. Let this focus your attention.", end: "Stay mindful and present in each moment." },
        { text: "Think about something you love to do and why it brings you joy.", end: "Find time today to engage in something that brings you joy." },
        { text: "Recall a time when you learned a new way of doing something and what it felt like to think in that new way.", end: "Be open to learning and new perspectives." },
        { text: "Recall a challenge you’ve overcome. Looking back, what’s one thing you learned from it?", end: "Use your past experiences to guide you forward." },
        { text: "Open and close your eyes and mouth a few times. Then let the muscles in your face gently relax.", end: "Carry this feeling of relaxation with you." },
        { text: "Remind yourself of a recent challenge you’ve overcome. Think about the traits you have that helped.", end: "Recognize and celebrate your strengths." },
        { text: "Recall a recent moment when you felt inspired. Think about what led to that moment.", end: "Seek out inspiration in your daily life." },
        { text: "Picture gentle ocean waves. Imagine how they sound rolling in one after the other.", end: "Let the rhythm of the waves calm and soothe you." },
        { text: "Think about a time when someone was kind to you and how it felt. Enjoy this memory.", end: "Carry this kind memory with you." },
        { text: "Reflect on someone you appreciate and why.", end: "Express your appreciation to them today." },
        { text: "Picture a place where you feel most at peace. Imagine yourself there now.", end: "Hold onto this peaceful feeling." },
        { text: "Think about a goal you have. What’s one small step you can take today to move toward it?", end: "Take action towards your goal, no matter how small." },
        { text: "Recall a compliment someone gave you recently. How did it make you feel?", end: "Share a compliment with someone else today." },
        { text: "Visualize a time when you felt proud of yourself. What did you accomplish?", end: "Believe in your ability to achieve great things." },
        { text: "Think about a book or movie that made you think deeply. What did you learn from it?", end: "Seek out thought-provoking experiences." },
        { text: "Remember a time when you laughed deeply. What brought you so much joy?", end: "Find reasons to laugh and smile today." },
        { text: "Picture a favorite memory from childhood. What made it special?", end: "Cherish your happy memories." },
        { text: "Think about a person who has influenced you positively. What did you learn from them?", end: "Carry their lessons with you." },
        { text: "Recall a time when you felt very connected to someone. What made that connection strong?", end: "Nurture your important relationships." },
        { text: "Visualize a place you want to visit someday. Imagine the sights, sounds, and smells.", end: "Keep your dreams and aspirations alive." },
        { text: "Reflect on a recent achievement, no matter how small. What did it take to accomplish it?", end: "Celebrate your achievements." },
        { text: "Think about a time you felt truly happy. What were you doing?", end: "Create more moments of happiness." },
        { text: "Picture yourself in a comfortable and safe place. Imagine how it feels.", end: "Return to this safe place whenever you need it." },
        { text: "Recall a time when you felt strong and capable. What gave you that strength?", end: "Tap into your inner strength." },
        { text: "Think about a recent act of kindness you witnessed. How did it make you feel?", end: "Be inspired to perform acts of kindness." },
        { text: "Visualize a bright future for yourself. What does it look like?", end: "Work towards making that future a reality." },
        { text: "Remember a time when you felt very grateful. What were you grateful for?", end: "Practice gratitude daily." },
        { text: "Think about a time when you felt truly understood. What was that like?", end: "Strive to understand and be understood." },
        { text: "Picture a person who always makes you smile. Why do they have that effect on you?", end: "Let them know they make you smile." },
        { text: "Recall a time when you felt very peaceful. What contributed to that feeling?", end: "Seek out peace and tranquility." },
        { text: "Think about a time you received good advice. What was it and how did it help you?", end: "Share valuable advice with others." },
        { text: "Reflect on a moment when you felt very motivated. What was driving you?", end: "Use that motivation to tackle your tasks today." },
        { text: "Picture a favorite meal you've had. Imagine the tastes and smells.", end: "Enjoy and savor your meals mindfully." },
        { text: "Think about a time when you felt a deep sense of connection to nature. Where were you?", end: "Spend time in nature to rejuvenate yourself." },
        { text: "Recall a time when you helped someone and how it made you feel.", end: "Look for opportunities to help others." },
        { text: "Visualize a time when you felt balanced and in harmony. What contributed to that balance?", end: "Strive for balance in your daily life." }
    ];

    // Function to generate a random color within a specified range
    function getRandomColor(range) {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += range[Math.floor(Math.random() * range.length)];
        }
        return color;
    }

    // Function to set random gradient background with contrasting colors
    function setRandomBackground() {
        const warmColors = '89ABCDEF'; // Letters for light, warm colors
        const coolColors = '01234567'; // Letters for dark, cool colors

        const color1 = getRandomColor(warmColors);
        const color2 = getRandomColor(coolColors);

        lavaLampBackground.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
        lavaLampBackground.style.backgroundSize = "200% 200%";
    }

    // Set random background on load
    setRandomBackground();

    // Randomly select a mindfulness message and end prompt
    const randomMessage = mindfulnessMessages[Math.floor(Math.random() * mindfulnessMessages.length)];
    mindfulnessText.textContent = randomMessage.text;
    endText.textContent = randomMessage.end;

    introText.addEventListener('click', () => {
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
                        setRandomBackground();  // Change background color for each session

                        // Randomly select a new mindfulness message and end prompt for the next session
                        const newRandomMessage = mindfulnessMessages[Math.floor(Math.random() * mindfulnessMessages.length)];
                        mindfulnessText.textContent = newRandomMessage.text;
                        endText.textContent = newRandomMessage.end;
                    }, 30000);  // Show end text for 30 seconds
                }, 180000);  // Wait for 3 minutes before showing end text
            }, 20000);  // Show mindfulness text for 20 seconds
        }, 1000); // Delay before showing mindfulness text
    });
});
