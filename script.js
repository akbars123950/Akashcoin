// Game State
let gameState = {
    coins: localStorage.getItem("coins") ? parseInt(localStorage.getItem("coins")) : 0,
    coinsPerClick: localStorage.getItem("coinsPerClick") ? parseInt(localStorage.getItem("coinsPerClick")) : 1,
    doubleEarnings: localStorage.getItem("doubleEarnings") === "true",
    tripleEarnings: localStorage.getItem("tripleEarnings") === "true",
    autoClicker: localStorage.getItem("autoClicker") === "true",
    autoClickerLevel: localStorage.getItem("autoClickerLevel") ? parseInt(localStorage.getItem("autoClickerLevel")) : 0,
};

// Upgrade Costs
const upgradeCosts = {
    double: 500,
    triple: 2000,
    auto: 1000,
};

// Initialize Game
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    loadUpgradeStates();
    
    if (gameState.autoClicker) {
        startAutoClicker();
    }
});

// Update Display
function updateDisplay() {
    document.getElementById('coins').innerText = formatNumber(gameState.coins);
    document.getElementById('cps').innerText = gameState.coinsPerClick;
    updateUpgradeButtons();
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(2) + 'K';
    }
    return num.toString();
}

// Mine Coin on Click
function mineCoin() {
    let earnedCoins = gameState.coinsPerClick;
    
    if (gameState.doubleEarnings) {
        earnedCoins *= 2;
    }
    
    if (gameState.tripleEarnings) {
        earnedCoins *= 3;
    }
    
    gameState.coins += earnedCoins;
    saveGameState();
    updateDisplay();
    
    // Animate coin
    animateCoin(earnedCoins);
    animateCoinClick();
    playSound();
}

// Animate Coin Click
function animateCoinClick() {
    const coinImage = document.getElementById('coinImage');
    const tapIndicator = document.getElementById('tapIndicator');
    
    // Scale animation
    coinImage.style.animation = 'none';
    setTimeout(() => {
        coinImage.style.animation = '';
    }, 10);
    
    // Tap pulse animation
    tapIndicator.style.animation = 'none';
    setTimeout(() => {
        tapIndicator.style.animation = 'tapPulse 0.6s ease-out';
    }, 10);
}

// Floating Text Animation
function animateCoin(amount) {
    const coin = document.getElementById('coinImage');
    const rect = coin.getBoundingClientRect();
    
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.innerText = '+' + formatNumber(amount);
    floatingText.style.left = (rect.left + rect.width / 2) + 'px';
    floatingText.style.top = (rect.top + rect.height / 2) + 'px';
    
    document.body.appendChild(floatingText);
    
    setTimeout(() => {
        floatingText.remove();
    }, 1000);
}

// Play Sound Effect
function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Buy Upgrade
function buyUpgrade(upgradeType) {
    const cost = upgradeCosts[upgradeType];
    
    if (gameState.coins < cost) {
        showNotification('Not enough AKC!');
        return;
    }
    
    gameState.coins -= cost;
    
    switch(upgradeType) {
        case 'double':
            if (!gameState.doubleEarnings) {
                gameState.doubleEarnings = true;
                gameState.coinsPerClick *= 2;
                showNotification('Double Earnings Unlocked! 2️⃣');
            }
            break;
        case 'triple':
            if (!gameState.tripleEarnings) {
                gameState.tripleEarnings = true;
                gameState.coinsPerClick *= 3;
                showNotification('Triple Earnings Unlocked! 3️⃣');
            }
            break;
        case 'auto':
            if (!gameState.autoClicker) {
                gameState.autoClicker = true;
                gameState.autoClickerLevel = 1;
                startAutoClicker();
                showNotification('Auto Clicker Activated! ⚙️');
            } else {
                gameState.autoClickerLevel++;
                showNotification('Auto Clicker Level ' + gameState.autoClickerLevel + '!');
            }
            break;
    }
    
    saveGameState();
    updateDisplay();
}

// Auto Clicker
function startAutoClicker() {
    setInterval(() => {
        if (gameState.autoClicker) {
            let autoCoins = gameState.autoClickerLevel * 0.5;
            
            if (gameState.doubleEarnings) {
                autoCoins *= 2;
            }
            
            if (gameState.tripleEarnings) {
                autoCoins *= 3;
            }
            
            gameState.coins += autoCoins;
            saveGameState();
            updateDisplay();
        }
    }, 1000);
}

// Update Upgrade Buttons State
function updateUpgradeButtons() {
    const doubleBtn = document.getElementById('doubleEarnings');
    const autoBtn = document.getElementById('autoClicker');
    const tripleBtn = document.getElementById('tripleEarnings');
    
    // Double Earnings
    if (gameState.doubleEarnings) {
        doubleBtn.disabled = true;
        doubleBtn.innerText = '✓ Purchased';
        doubleBtn.style.opacity = '0.6';
    } else {
        doubleBtn.disabled = gameState.coins < upgradeCosts.double;
    }
    
    // Auto Clicker
    if (gameState.autoClicker) {
        autoBtn.innerText = `Level ${gameState.autoClickerLevel}`;
        autoBtn.style.opacity = '1';
    } else {
        autoBtn.disabled = gameState.coins < upgradeCosts.auto;
    }
    
    // Triple Earnings
    if (gameState.tripleEarnings) {
        tripleBtn.disabled = true;
        tripleBtn.innerText = '✓ Purchased';
        tripleBtn.style.opacity = '0.6';
    } else {
        tripleBtn.disabled = gameState.coins < upgradeCosts.triple;
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #fbbf24, #f59e0b);
        color: black;
        padding: 20px 40px;
        border-radius: 10px;
        font-weight: bold;
        font-size: 1.2em;
        z-index: 1000;
        animation: slideDown 0.5s ease-out;
    `;
    notification.innerText = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Save Game State
function saveGameState() {
    localStorage.setItem("coins", gameState.coins);
    localStorage.setItem("coinsPerClick", gameState.coinsPerClick);
    localStorage.setItem("doubleEarnings", gameState.doubleEarnings);
    localStorage.setItem("tripleEarnings", gameState.tripleEarnings);
    localStorage.setItem("autoClicker", gameState.autoClicker);
    localStorage.setItem("autoClickerLevel", gameState.autoClickerLevel);
}

// Load Upgrade States
function loadUpgradeStates() {
    updateUpgradeButtons();
}

// Reset Game
function resetGame() {
    if (confirm('Are you sure you want to reset your game? This cannot be undone!')) {
        gameState = {
            coins: 0,
            coinsPerClick: 1,
            doubleEarnings: false,
            tripleEarnings: false,
            autoClicker: false,
            autoClickerLevel: 0,
        };
        
        localStorage.clear();
        updateDisplay();
        showNotification('Game Reset!');
    }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
    }
`;
document.head.appendChild(style);
