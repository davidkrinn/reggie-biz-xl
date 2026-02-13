// Game state
let money = 0;
let clicks = 0;
let clickValue = 1;

// Upgrades configuration
const upgrades = [
    { id: 'upgrade1', name: 'Double Click', cost: 10, multiplier: 2, effect: 'multiplier' },
    { id: 'upgrade2', name: 'Triple Click', cost: 50, multiplier: 3, effect: 'multiplier' },
    { id: 'upgrade3', name: 'Auto Clicker', cost: 100, income: 0.1, effect: 'income' }
];

let purchasedUpgrades = new Set();
let autoClickerRate = 0;

// DOM elements
const moneyDisplay = document.getElementById('money');
const clicksDisplay = document.getElementById('clicks');
const clickButton = document.getElementById('clickButton');
const resetButton = document.getElementById('resetButton');
const upgradesContainer = document.getElementById('upgradesContainer');

// Initialize game
function init() {
    clickButton.addEventListener('click', handleClick);
    resetButton.addEventListener('click', handleReset);
    renderUpgrades();
    startAutoClicker();
}

// Handle click
function handleClick() {
    clicks++;
    money += clickValue;
    updateDisplay();
}

// Handle reset
function handleReset() {
    if (confirm('Are you sure you want to reset your progress?')) {
        money = 0;
        clicks = 0;
        clickValue = 1;
        purchasedUpgrades.clear();
        autoClickerRate = 0;
        upgradesContainer.innerHTML = '';
        updateDisplay();
        renderUpgrades();
    }
}

// Update display
function updateDisplay() {
    moneyDisplay.textContent = Math.floor(money);
    clicksDisplay.textContent = clicks;
}

// Render upgrades
function renderUpgrades() {
    upgradesContainer.innerHTML = '';
    upgrades.forEach(upgrade => {
        const btn = document.createElement('button');
        btn.className = 'upgrade-btn';
        btn.textContent = `${upgrade.name}\n$${upgrade.cost}`;
        btn.disabled = money < upgrade.cost;
        
        btn.addEventListener('click', () => {
            if (money >= upgrade.cost) {
                purchaseUpgrade(upgrade);
                btn.disabled = true;
            }
        });
        
        upgradesContainer.appendChild(btn);
    });
}

// Purchase upgrade
function purchaseUpgrade(upgrade) {
    money -= upgrade.cost;
    purchasedUpgrades.add(upgrade.id);
    
    if (upgrade.effect === 'multiplier') {
        clickValue *= upgrade.multiplier;
    } else if (upgrade.effect === 'income') {
        autoClickerRate += upgrade.income;
    }
    
    updateDisplay();
    renderUpgrades();
}

// Auto clicker
function startAutoClicker() {
    setInterval(() => {
        if (autoClickerRate > 0) {
            money += autoClickerRate;
            updateDisplay();
            renderUpgrades();
        }
    }, 1000);
}

// Start the game
init();
