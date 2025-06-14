document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const startBtn = document.getElementById('startBtn');
    const input = document.getElementById('input');
    const quoteDisplay = document.getElementById('quote');
    const inputDisplay = document.getElementById('input-display');
    const timer = document.getElementById('timer');
    const wpmMetrics = document.querySelector('.wpm-metrics');
    const clicksMetrics = document.querySelector('.clicks-metrics');
    const clickArea = document.getElementById('click-area');
    const textContent = document.querySelector('.text-content');

    // Metrics Elements
    const wpmDisplay = document.getElementById('wpm');
    const wpsDisplay = document.getElementById('wps');
    const cpsDisplay = document.getElementById('cps');
    const cpmDisplay = document.getElementById('cpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const navItems = document.querySelectorAll('.nav-item');

    // State
    let currentTest = 'clicks';
    let timerInterval;
    let startTime;
    let isTestActive = false;
    let clickCount = 0;
    let totalKeystrokes = 0;
    let correctKeystrokes = 0;    // Test settings
    let TEST_DURATION = 10; // seconds
    const timeButtons = document.querySelectorAll('.time-btn');
      // Word bank for generating random sentences
    const wordBank = [
        // Common verbs
        "run", "jump", "play", "write", "read", "speak", "listen", "think", "create", "build",
        "design", "code", "type", "click", "scroll", "share", "learn", "teach", "grow", "develop",
        
        // Common nouns
        "time", "year", "people", "way", "day", "man", "thing", "woman", "life", "child",
        "world", "school", "state", "family", "student", "group", "country", "problem", "hand", "part",
        "place", "case", "week", "company", "system", "program", "question", "work", "number", "night",
        "point", "home", "water", "room", "mother", "area", "money", "story", "fact", "month",
        
        // Technology words
        "computer", "internet", "software", "hardware", "website", "database", "network", "server",
        "browser", "application", "programming", "developer", "algorithm", "interface", "keyboard",
        "monitor", "processor", "memory", "storage", "device",
        
        // Adjectives
        "good", "new", "first", "last", "long", "great", "little", "own", "other", "old",
        "right", "big", "high", "different", "small", "large", "next", "early", "young", "important",
        "few", "public", "bad", "same", "able", "quick", "smart", "clever", "bright", "sharp",
        
        // More nouns
        "phone", "book", "eye", "job", "word", "business", "issue", "side", "kind", "head",
        "house", "service", "friend", "father", "power", "hour", "game", "line", "end", "member",
        "law", "car", "city", "community", "name", "president", "team", "minute", "idea", "kid",
        
        // More verbs
        "say", "get", "make", "go", "know", "take", "see", "come", "think", "look",
        "want", "give", "use", "find", "tell", "ask", "work", "seem", "feel", "try",
        "leave", "call", "begin", "start", "move", "turn", "learn", "change", "play", "live",
        
        // Modern tech terms
        "app", "cloud", "data", "email", "file", "video", "social", "digital", "online", "mobile",
        "cyber", "viral", "stream", "download", "upload", "backup", "update", "sync", "share", "post",
        
        // Common adverbs
        "very", "also", "however", "here", "now", "then", "today", "together", "already", "yet",
        "later", "often", "almost", "always", "never", "daily", "quickly", "slowly", "carefully", "easily",
        
        // Prepositions
        "in", "on", "at", "with", "by", "from", "up", "about", "into", "over",
        "after", "beneath", "under", "above", "across", "through", "behind", "beyond", "during", "without",
        
        // More adjectives
        "happy", "sad", "busy", "free", "true", "false", "open", "closed", "full", "empty",
        "heavy", "light", "hard", "soft", "hot", "cold", "warm", "cool", "fresh", "tired",
        
        // Modern concepts
        "startup", "innovation", "creative", "design", "project", "meeting", "deadline", "goal", "plan", "task",
        "team", "group", "leader", "manager", "client", "user", "customer", "product", "service", "market"
    ];
    
    function generateRandomSentence() {
        const patterns = [
            "The [adj] [noun] [verb] [prep] the [adj] [noun].",
            "[noun] [verb] [prep] the [adj] [noun].",
            "A [adj] [noun] [verb] [adv].",
            "The [noun] [verb] [prep] [adj] [noun].",
            "[adj] [noun] [verb] the [noun] [adv]."
        ];
        
        const getRandomWord = (type) => {
            let words;
            switch(type) {
                case 'adj':
                    words = wordBank.filter(w => ['good', 'new', 'first', 'quick', 'smart', 'happy'].includes(w));
                    break;
                case 'noun':
                    words = wordBank.filter(w => ['time', 'computer', 'phone', 'book', 'app', 'team'].includes(w));
                    break;
                case 'verb':
                    words = wordBank.filter(w => ['run', 'jump', 'write', 'type', 'click', 'play'].includes(w));
                    break;
                case 'prep':
                    words = wordBank.filter(w => ['in', 'on', 'at', 'with', 'by', 'from'].includes(w));
                    break;
                case 'adv':
                    words = wordBank.filter(w => ['very', 'quickly', 'slowly', 'carefully', 'easily'].includes(w));
                    break;
                default:
                    words = wordBank;
            }
            return words[Math.floor(Math.random() * words.length)];
        };
        
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        return pattern.replace(/\[(.*?)\]/g, (_, type) => getRandomWord(type));
    }    function getRandomLines(count) {
        let result = [];
        let usedSentences = new Set();
        
        while (result.length < count) {
            const sentence = generateRandomSentence();
            if (!usedSentences.has(sentence)) {
                usedSentences.add(sentence);
                result.push(sentence);
            }
        }
        
        return result;
    }

    let currentTextLines = [];    function updateMode(mode) {
        if (isTestActive) return; // Don't switch modes during active test
        
        currentTest = mode;
        resetTest(); // Reset before changing mode
        
        if (mode === 'clicks') {
            clickArea.classList.remove('hidden');
            textContent.classList.add('hidden');
            input.classList.add('hidden');
            clicksMetrics.classList.remove('hidden');
            wpmMetrics.classList.add('hidden');
            accuracyDisplay.parentElement.classList.add('hidden');
            clickArea.textContent = 'Click Start to begin!';
        } else {
            clickArea.classList.add('hidden');
            textContent.classList.remove('hidden');
            input.classList.remove('hidden');
            clicksMetrics.classList.add('hidden');
            wpmMetrics.classList.remove('hidden');
            accuracyDisplay.parentElement.classList.remove('hidden');
            setupTypingTest();
        }
    }

    function setupTypingTest() {
        currentTextLines = getRandomLines(3);
        let displayText = currentTextLines.join('\n');
        quoteDisplay.innerHTML = displayText.split('\n').map(line => 
            `<div class="quote-line">${line}</div>`
        ).join('');
        input.value = '';
        input.placeholder = 'Start typing to begin...';
        inputDisplay.innerHTML = '';
    }

    function updateTextLines() {
        currentTextLines.shift();
        currentTextLines.push(getRandomLines(1)[0]);
        let displayText = currentTextLines.join('\n');
        quoteDisplay.innerHTML = displayText.split('\n').map(line => 
            `<div class="quote-line">${line}</div>`
        ).join('');
    }    function calculateMetrics() {
        const timeElapsed = Math.max(0.001, (Date.now() - startTime) / 1000);
        const minutes = timeElapsed / 60;
        
        if (currentTest === 'clicks') {
            const cps = clickCount / timeElapsed;
            const cpm = cps * 60;
            cpsDisplay.textContent = cps.toFixed(2);
            cpmDisplay.textContent = Math.round(cpm);
        } else {
            // Count actual completed words instead of using keystrokes
            const completedWords = currentTextLines.reduce((count, line) => {
                return count + line.split(' ').length;
            }, 0);
            
            const wpm = (completedWords / minutes);
            const wps = completedWords / timeElapsed;
            
            wpmDisplay.textContent = Math.round(wpm);
            wpsDisplay.textContent = wps.toFixed(2);
            
            const accuracy = totalKeystrokes > 0 ? (correctKeystrokes / totalKeystrokes) * 100 : 0;
            accuracyDisplay.textContent = accuracy.toFixed(1) + '%';
        }
    }    function updateDisplay() {
        const currentLine = currentTextLines[0];
        const typed = input.value;
        let displayHTML = '';
        
        let lineCorrectKeystrokes = 0;
        
        for (let i = 0; i < typed.length; i++) {
            if (i < currentLine.length && typed[i] === currentLine[i]) {
                displayHTML += typed[i];
                lineCorrectKeystrokes++;
            } else {
                displayHTML += `<span class="error">${typed[i]}</span>`;
            }
        }

        // Update total correct keystrokes
        if (typed.endsWith('\n') && typed.trim() === currentLine) {
            correctKeystrokes += lineCorrectKeystrokes;
        }

        inputDisplay.innerHTML = displayHTML;
    }

    function startTest() {
        if (isTestActive) return;
        
        isTestActive = true;
        startTime = Date.now();
        clickCount = 0;
        totalKeystrokes = 0;
        correctKeystrokes = 0;
        
        if (currentTest === 'clicks') {
            clickArea.textContent = 'Click anywhere!';
            clickArea.classList.remove('hidden');
            textContent.classList.add('hidden');
            input.classList.add('hidden');
        } else {
            clickArea.classList.add('hidden');
            textContent.classList.remove('hidden');
            input.classList.remove('hidden');            setupTypingTest();
            input.disabled = false;
            input.value = '';
            inputDisplay.innerHTML = '';
            input.focus();
        }
        
        timerInterval = setInterval(() => {            const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
            const timeLeft = Math.max(0, TEST_DURATION - timeElapsed);
            timer.textContent = timeLeft;
            calculateMetrics();
            
            if (timeElapsed >= TEST_DURATION) {
                clearInterval(timerInterval);
                isTestActive = false;
                if (currentTest === 'clicks') {
                    clickArea.textContent = 'Test completed! Click Start to try again.';
                } else {
                    input.disabled = true;
                }
            }
        }, 100);
    }    function resetTest() {
        isTestActive = false;
        clearInterval(timerInterval);
        clickCount = 0;
        totalKeystrokes = 0;
        correctKeystrokes = 0;
        completedLines = [];
        
        timer.textContent = '0';
        input.value = '';
        inputDisplay.innerHTML = '';
        
        if (currentTest === 'clicks') {
            cpsDisplay.textContent = '0';
            cpmDisplay.textContent = '0';
        } else {
            wpmDisplay.textContent = '0';
            wpsDisplay.textContent = '0';
            accuracyDisplay.textContent = '0%';
            input.disabled = true;
        }
    }

    // Time period handling
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!isTestActive) {
                timeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                TEST_DURATION = parseInt(btn.dataset.time);
                resetTest();
            }
        });
    });

    // Event Listeners
    startBtn.addEventListener('click', startTest);    // Click handler with ripple effect
    clickArea.addEventListener('click', (e) => {
        if (!isTestActive || currentTest !== 'clicks') return;
        if (e.target === input) return;

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        // Position the ripple at click position
        ripple.style.left = `${e.pageX - clickArea.offsetLeft}px`;
        ripple.style.top = `${e.pageY - clickArea.offsetTop}px`;
        
        // Add ripple to click area
        clickArea.appendChild(ripple);
        
        // Remove ripple after animation
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });

        clickCount++;
        calculateMetrics();
    });    // Track completed words and accuracy
    let completedLines = [];
    let lastTypedLength = 0;

    input.addEventListener('input', () => {
        if (currentTest === 'clicks') return;
        
        if (!isTestActive) {
            startTest();
            completedLines = []; // Reset completed lines
            lastTypedLength = 0;
            correctKeystrokes = 0;
        }
        
        const currentLine = currentTextLines[0];
        const typed = input.value;
        
        // Handle backspace for accuracy calculation
        if (typed.length < lastTypedLength) {
            // If backspace was pressed, reduce total keystrokes
            totalKeystrokes = Math.max(0, totalKeystrokes - (lastTypedLength - typed.length));
        } else {
            // Only increment total keystrokes for new characters
            totalKeystrokes += typed.length - lastTypedLength;
        }
        lastTypedLength = typed.length;
        
        // Calculate correct keystrokes
        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
            if (i < currentLine.length && typed[i] === currentLine[i]) {
                correct++;
            }
        }
        correctKeystrokes = correct;
        
        updateDisplay();
        
        // Check if current line is completed
        if (typed.endsWith('\n') && typed.trim() === currentLine) {
            completedLines.push(currentLine); // Add to completed lines
            // Add the correct keystrokes from this line to total
            correctKeystrokes += currentLine.length;
            updateTextLines();
            input.value = '';
            inputDisplay.innerHTML = '';
            lastTypedLength = 0;
        }
        
        calculateMetrics();
    });

    input.addEventListener('keydown', (e) => {
        if (currentTest === 'clicks') return;
        
        if (e.key === 'Enter') {
            e.preventDefault();
            const currentLine = currentTextLines[0];
            const typed = input.value;
            
            if (typed === currentLine) {
                updateTextLines();
                input.value = '';
                inputDisplay.innerHTML = '';
            }
        }
    });    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            updateMode(item.dataset.test);
            navItems.forEach(navItem => {
                navItem.classList.toggle('active', navItem === item);
            });
        });
    });

    // Initialize
    updateMode('clicks');
});
