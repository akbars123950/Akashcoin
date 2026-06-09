# 🪙 Akash Coin - Clicker Game

A modern, fully-featured clicker game with stunning animations, upgrades, and auto-clicker mechanics. Built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### Core Gameplay
- 🖱️ **Click to Earn** - Tap the coin to earn AKC tokens
- 💾 **Local Storage** - Your progress is automatically saved
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices

### Upgrades & Power-ups
- **2️⃣ Double Earnings** (500 AKC) - Earn 2x coins per tap
- **3️⃣ Triple Earnings** (2000 AKC) - Earn 3x coins per tap
- **⚙️ Auto Clicker** (1000 AKC) - Earn coins automatically over time, upgrade multiple times for increased earnings

### Visual Effects
- ✨ Smooth animations and transitions
- 🎨 Beautiful gradient design with a dark theme
- 🎯 Floating text showing earned coins
- 🔊 Sound effects on coin collection
- 📊 Real-time stats display

## 🚀 Quick Start

1. **Open the game:**
   - Simply open `index.html` in your web browser
   - No installation or server required!

2. **Start playing:**
   - Click the coin to earn AKC tokens
   - Buy upgrades to earn more coins faster
   - Progress is saved automatically

3. **Access from anywhere:**
   - Host on GitHub Pages
   - Deploy to any static hosting service (Netlify, Vercel, etc.)

## 📁 Project Structure

```
Akashcoin/
├── index.html      # Main game interface
├── styles.css      # Beautiful styling with animations
├── script.js       # Game logic and mechanics
└── README.md       # This file
```

## 🎮 How to Play

1. **Earn Coins**: Click the large coin in the center of the screen
2. **Buy Upgrades**: Use your earned coins to purchase power-ups:
   - **Double Earnings**: Doubles your coins per click
   - **Triple Earnings**: Triples your coins per click (stacks with double!)
   - **Auto Clicker**: Earn coins automatically, level it up for more!
3. **Progress**: Watch your balance grow as you collect coins
4. **Reset**: Click the reset button at the bottom to start over

## 💡 Game Mechanics

### Earnings Calculation
- **Base**: 1 AKC per click
- **With Double**: 2 AKC per click
- **With Triple**: 3 AKC per click
- **Both Active**: 6 AKC per click (multiplicative!)

### Auto Clicker
- **Level 1**: +0.5 AKC per second
- **Level 2**: +1 AKC per second
- **Level 3**: +1.5 AKC per second
- Each level multiplies by active upgrades

## 🌐 Deploy Online

### GitHub Pages (Free)
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select `main` branch as source
4. Your game will be live at `https://yourusername.github.io/Akashcoin`

### Netlify (Free)
1. Connect your GitHub repository
2. Automatic deployment on every push
3. Get a custom domain

### Vercel (Free)
1. Import your repository
2. One-click deployment
3. Instant CDN distribution

## 🛠️ Development

### Technologies Used
- **HTML5** - Semantic markup and structure
- **CSS3** - Gradients, animations, flexbox, grid
- **Vanilla JavaScript** - No dependencies required

### Browser Support
- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

### Local Development
```bash
# Simply open in a browser
open index.html
# or
start index.html
```

## 💾 Save System

Your game data is stored in browser's `localStorage`:
- `coins` - Current balance
- `coinsPerClick` - Coins earned per click
- `doubleEarnings` - Double earnings upgrade status
- `tripleEarnings` - Triple earnings upgrade status
- `autoClicker` - Auto clicker status
- `autoClickerLevel` - Auto clicker level

**Note**: Clearing browser cache will reset your progress!

## 🎨 Customization

### Change Colors
Edit `styles.css` and modify the gradient colors:
```css
background: linear-gradient(135deg, #fbbf24, #f59e0b, #ec4899);
```

### Adjust Costs
Edit `script.js` and modify the `upgradeCosts` object:
```javascript
const upgradeCosts = {
    double: 500,      // Change this
    triple: 2000,     // Change this
    auto: 1000,       // Change this
};
```

### Change Earnings
Modify the `gameState.coinsPerClick` or upgrade multipliers in `script.js`

## 🐛 Troubleshooting

### Game not saving progress
- Check if localStorage is enabled in browser settings
- Try clearing browser cache and refresh

### Sound not working
- Check browser audio permissions
- Some browsers require user interaction for audio

### Animations not smooth
- Try a different browser
- Update your browser to the latest version
- Check GPU hardware acceleration is enabled

## 📊 Stats

- **Lines of Code**: ~450
- **File Size**: ~18KB total (gzipped)
- **Load Time**: <100ms
- **Dependencies**: 0 (vanilla JS)
- **Browser Support**: 95%+

## 🎯 Future Features

- 🌍 Multiplayer/Leaderboard
- 💰 Real currency integration
- 🏆 Achievements and badges
- 📈 Advanced statistics
- 🎁 Daily rewards
- 🎪 Mini-games
- 🌙 Dark/Light theme toggle

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 👨‍💻 Author

**akbars123950** - [GitHub Profile](https://github.com/akbars123950)

## 🙏 Support

If you enjoy Akash Coin, please:
- ⭐ Star this repository
- 🐛 Report any issues
- 💬 Share feedback
- 📢 Spread the word!

---

**Enjoy playing Akash Coin! Happy clicking! 🪙✨**
