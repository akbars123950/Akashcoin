// JokeAPI Documentation: https://jokeapi.dev/

// Game State
let jokeState = {
    currentJoke: null,
    category: 'general',
    totalJokes: localStorage.getItem("jokeCount") ? parseInt(localStorage.getItem("jokeCount")) : 0,
    favorites: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [],
};

// API Endpoints
const jokeAPIEndpoints = {
    general: 'https://v2.jokeapi.dev/joke/Any?type=single',
    programming: 'https://v2.jokeapi.dev/joke/Programming?type=single',
    'knock-knock': 'https://v2.jokeapi.dev/joke/Knock-Knock?type=single',
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    displayFavorites();
});

// Fetch Joke from API
async function fetchJoke() {
    const btn = document.getElementById('generateBtn');
    const jokeCard = document.getElementById('jokeCard');
    const jokeText = document.getElementById('jokeText');
    
    // Disable button and show loading state
    btn.disabled = true;
    jokeCard.classList.add('loading');
    jokeText.innerText = '⏳ Loading a funny joke...';
    
    try {
        const endpoint = jokeAPIEndpoints[jokeState.category] || jokeAPIEndpoints.general;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        
        // Extract joke text
        let jokeText = data.joke || '';
        let jokeType = 'Single';
        
        if (data.type === 'twopart') {
            jokeText = `${data.setup}\n\n${data.delivery}`;
            jokeType = 'Two-Part';
        }
        
        // Store current joke
        jokeState.currentJoke = jokeText;
        
        // Update display
        document.getElementById('jokeText').innerText = jokeText;
        document.getElementById('jokeType').innerText = `${jokeType} • ${data.category || jokeState.category}`;
        
        // Update stats
        jokeState.totalJokes++;
        saveGameState();
        updateDisplay();
        
        // Enable copy and share buttons
        document.getElementById('copyBtn').disabled = false;
        document.getElementById('shareBtn').disabled = false;
        
        // Play sound effect
        playSound();
        
        showNotification('😂 Joke loaded successfully!');
        
    } catch (error) {
        console.error('Error fetching joke:', error);
        document.getElementById('jokeText').innerText = 'Oops! Failed to load a joke. Please try again!';
        document.getElementById('jokeType').innerText = 'Error';
        showNotification('❌ Failed to load joke. Check your connection!');
    } finally {
        // Re-enable button and remove loading state
        btn.disabled = false;
        jokeCard.classList.remove('loading');
    }
}

// Copy Joke to Clipboard
function copyJoke() {
    if (!jokeState.currentJoke) {
        showNotification('⚠️ No joke to copy!');
        return;
    }
    
    navigator.clipboard.writeText(jokeState.currentJoke).then(() => {
        showNotification('✅ Joke copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('❌ Failed to copy joke');
    });
}

// Share Joke
function shareJoke() {
    if (!jokeState.currentJoke) {
        showNotification('⚠️ No joke to share!');
        return;
    }
    
    const text = `😂 Check out this joke:\n\n${jokeState.currentJoke}`;
    
    if (navigator.share) {
        // Use native share if available
        navigator.share({
            title: '😂 Funny Joke',
            text: text,
        }).catch(err => console.log('Share cancelled'));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(text).then(() => {
            showNotification('✅ Joke formatted and copied!');
        });
    }
}

// Set Category
function setCategory(category) {
    jokeState.category = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Fetch new joke
    fetchJoke();
}

// Add to Favorites
function toggleFavorite() {
    if (!jokeState.currentJoke) {
        showNotification('⚠️ No joke to add!');
        return;
    }
    
    const index = jokeState.favorites.indexOf(jokeState.currentJoke);
    
    if (index > -1) {
        // Remove from favorites
        jokeState.favorites.splice(index, 1);
        showNotification('❤️ Removed from favorites');
    } else {
        // Add to favorites
        jokeState.favorites.push(jokeState.currentJoke);
        showNotification('❤️ Added to favorites!');
    }
    
    saveGameState();
    displayFavorites();
}

// Display Favorites
function displayFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    
    if (jokeState.favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorites yet. Click the heart to add!</p>';
        document.getElementById('favCount').innerText = '0';
        return;
    }
    
    favoritesList.innerHTML = '';
    
    jokeState.favorites.forEach((joke, index) => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <span class="favorite-text">${joke}</span>
            <button class="favorite-btn" onclick="removeFavorite(${index})">Remove</button>
        `;
        favoritesList.appendChild(favoriteItem);
    });
    
    document.getElementById('favCount').innerText = jokeState.favorites.length;
}

// Remove Favorite
function removeFavorite(index) {
    jokeState.favorites.splice(index, 1);
    saveGameState();
    displayFavorites();
    showNotification('❌ Removed from favorites');
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Play Sound Effect
function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        console.log('Sound not available');
    }
}

// Update Display
function updateDisplay() {
    document.getElementById('jokeCount').innerText = jokeState.totalJokes;
    document.getElementById('favCount').innerText = jokeState.favorites.length;
}

// Save Game State
function saveGameState() {
    localStorage.setItem("jokeCount", jokeState.totalJokes);
    localStorage.setItem("favorites", JSON.stringify(jokeState.favorites));
}

// Add slideOut animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Auto-fetch a joke on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        fetchJoke();
    }, 500);
});
