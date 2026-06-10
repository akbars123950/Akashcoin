// AKASH COIN - Mining Game Logic

// Initialize game data
let gameData = {
    coins: localStorage.getItem('akashCoins') ? parseInt(localStorage.getItem('akashCoins')) : 0,
    coinsPerClick: localStorage.getItem('coinsPerClick') ? parseInt(localStorage.getItem('coinsPerClick')) : 1,
    coinsPerSecond: localStorage.getItem('coinsPerSecond') ? parseInt(localStorage.getItem('coinsPerSecond')) : 0,
    upgradeCost: localStorage.getItem('upgradeCost') ? parseInt(localStorage.getItem('upgradeCost')) : 10,
    upgradeLevel: localStorage.getItem('upgradeLevel') ? parseInt(localStorage.getItem('upgradeLevel')) : 0,
    autoMiners: localStorage.getItem('autoMiners') ? parseInt(localStorage.getItem('autoMiners')) : 0,
    autoMinerCost: localStorage.getItem('autoMinerCost') ? parseInt(localStorage.getItem('autoMinerCost')) : 50,
    referralBonus: localStorage.getItem('referralBonus') ? parseInt(localStorage.getItem('referralBonus')) : 0,
    totalEarned: localStorage.getItem('totalEarned') ? parseInt(localStorage.getItem('totalEarned')) : 0
};

// Update display
function updateDisplay() {
    document.getElementById('coins').textContent = formatNumber(gameData.coins) + ' AKC';
    saveGameData();
}

// Format large numbers
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// Mine coin function
function mineCoin() {
    gameData.coins += gameData.coinsPerClick;
    gameData.totalEarned += gameData.coinsPerClick;
    updateDisplay();
    createCoinAnimation();
}

// Coin animation effect
function createCoinAnimation() {
    const coin = document.querySelector('.coin');
    coin.style.transform = 'scale(0.85)';
    setTimeout(() => {
        coin.style.transform = 'scale(1)';
    }, 100);
    
    // Floating text animation
    const floatingText = document.createElement('div');
    floatingText.textContent = '+' + gameData.coinsPerClick;
    floatingText.style.position = 'fixed';
    floatingText.style.left = '50%';
    floatingText.style.top = '50%';
    floatingText.style.color = '#FFD700';
    floatingText.style.fontSize = '24px';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.animation = 'floatUp 1s ease-out forwards';
    document.body.appendChild(floatingText);
    
    setTimeout(() => floatingText.remove(), 1000);
}

// Add floating animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -60px);
        }
    }
`;
document.head.appendChild(style);

// Upgrade button
document.querySelectorAll('.btn')[0].addEventListener('click', function() {
    if (gameData.coins >= gameData.upgradeCost) {
        gameData.coins -= gameData.upgradeCost;
        gameData.upgradeLevel++;
        gameData.coinsPerClick++;
        gameData.upgradeCost = Math.floor(gameData.upgradeCost * 1.15);
        updateDisplay();
        alert('✅ Upgraded! Now earning: ' + gameData.coinsPerClick + ' coins per click\\nNext upgrade cost: ' + gameData.upgradeCost);
    } else {
        alert('❌ Not enough coins! Need: ' + gameData.upgradeCost);
    }
});

// Referral button
document.querySelectorAll('.btn')[1].addEventListener('click', function() {
    const referralLink = window.location.href + '?ref=' + btoa('akbars123950');
    alert('📢 Your Referral Link:\\n\\n' + referralLink + '\\n\\nShare to earn bonus coins!');
    // Copy to clipboard
    navigator.clipboard.writeText(referralLink);
});

// Wallet button
document.querySelectorAll('.btn')[2].addEventListener('click', function() {
    showWalletInfo();
});

// Show wallet info
function showWalletInfo() {
    const info = `
💰 WALLET INFO
================
Coins: ${formatNumber(gameData.coins)} AKC
Total Earned: ${formatNumber(gameData.totalEarned)} AKC
Per Click: ${gameData.coinsPerClick} AKC
Per Second: ${gameData.coinsPerSecond} AKC
Auto Miners: ${gameData.autoMiners}
Upgrade Level: ${gameData.upgradeLevel}
Referral Bonus: ${gameData.referralBonus} AKC
    `;
    alert(info);
}

// Auto mining function
function autoMine() {
    if (gameData.autoMiners > 0) {
        gameData.coins += gameData.coinsPerSecond;
        gameData.totalEarned += gameData.coinsPerSecond;
        updateDisplay();
    }
}

// Auto mine every second
setInterval(autoMine, 1000);

// Save game data to localStorage
function saveGameData() {
    localStorage.setItem('akashCoins', gameData.coins);
    localStorage.setItem('coinsPerClick', gameData.coinsPerClick);
    localStorage.setItem('coinsPerSecond', gameData.coinsPerSecond);
    localStorage.setItem('upgradeCost', gameData.upgradeCost);
    localStorage.setItem('upgradeLevel', gameData.upgradeLevel);
    localStorage.setItem('autoMiners', gameData.autoMiners);
    localStorage.setItem('autoMinerCost', gameData.autoMinerCost);
    localStorage.setItem('referralBonus', gameData.referralBonus);
    localStorage.setItem('totalEarned', gameData.totalEarned);
}

// Bottom menu navigation
document.querySelectorAll('.menu a')[0].addEventListener('click', (e) => {
    e.preventDefault();
    alert('🏠 Home page - Mining game');
});

document.querySelectorAll('.menu a')[1].addEventListener('click', (e) => {
    e.preventDefault();
    alert('⚡ Mining stats:\\nTotal mined: ' + formatNumber(gameData.totalEarned) + ' AKC');
});

document.querySelectorAll('.menu a')[2].addEventListener('click', (e) => {
    e.preventDefault();
    alert('👥 Friends feature coming soon!\\nInvite friends and earn bonus coins.');
});

document.querySelectorAll('.menu a')[3].addEventListener('click', (e) => {
    e.preventDefault();
    alert('👤 Profile:\\nLevel: ' + gameData.upgradeLevel + '\\nAuto Miners: ' + gameData.autoMiners);
});

// Initial display update
updateDisplay();

// Save game data every 5 seconds
setInterval(saveGameData, 5000);

console.log('🎮 AKASH COIN Game Loaded!');