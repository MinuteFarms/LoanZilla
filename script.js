// Loanzilla - Advanced Student Loan Monster Battle Game
class LoanzillaGame {
    constructor() {
        this.loans = [];
        this.playerLevel = 1;
        this.playerXP = 0;
        this.totalDamage = 0;
        this.itemsThrown = 0;
        this.battleTime = 0;
        this.accuracy = 0;
        this.hits = 0;
        this.misses = 0;
        this.monsterHP = 100000;
        this.maxMonsterHP = 100000;
        this.dailyGrowth = 0;
        this.selectedItem = null;
        this.currentTool = 'sock-launcher';
        this.achievements = [];
        this.battleStartTime = Date.now();
        this.lastInterestUpdate = Date.now();
        
        // Level thresholds and titles
        this.levelData = {
            1: { title: 'Intern Avenger', xpRequired: 0, perks: ['Starter pack'] },
            2: { title: 'Side Hustler', xpRequired: 100, perks: ['Unlock Budget Brick'] },
            3: { title: 'Budget Beast', xpRequired: 500, perks: ['Bonus XP from free items'] },
            4: { title: 'Interest Slayer', xpRequired: 1000, perks: ['Mid-tier item unlock'] },
            5: { title: 'Financial Freedom Fighter', xpRequired: 5000, perks: ['Badge + mini-boss unlocked'] },
            6: { title: 'Credit Crusher', xpRequired: 10000, perks: ['Special sound FX/unlock'] },
            7: { title: 'The Debt Ender', xpRequired: 25000, perks: ['Loan Lance weapon unlocked'] },
            8: { title: 'Destroyer of Debt Dimensions', xpRequired: 50000, perks: ['Monster skin and taunts unlocked'] },
            9: { title: 'Ultimate Knight in Shining Armor', xpRequired: 100000, perks: ['Full perks, Diamond Debt Destroyer, infinite daily throws'] }
        };
        
        // Arsenal items
        this.arsenal = {
            free: {
                'soggy-sock': { name: 'Soggy Sock', damage: 100, icon: '🧦', availability: 'Daily Free', cooldown: 86400000 },
                'rotten-tomato': { name: 'Rotten Tomato', damage: 200, icon: '🍅', availability: 'Watch Ad', cooldown: 0 },
                'alarm-clock': { name: 'Noisy Alarm', damage: 0, effect: 'stun', icon: '⏰', availability: 'Daily Streak', cooldown: 86400000 },
                'penny': { name: 'Petty Penny', damage: 1, icon: '🪙', availability: 'Tap to Spam', repeatable: true }
            },
            premium: {
                'budget-brick': { name: 'Budget Brick', damage: 1000, icon: '🧱', cost: 0.99 },
                'credit-shredder': { name: 'Credit Shredder', damage: 7500, icon: '✂️', cost: 4.99 },
                'debt-nuke': { name: 'Debt Nuke', damage: 30000, icon: '💥', cost: 19.99 },
                'refund-meteor': { name: 'Refund Meteor', damage: 80000, icon: '☄️', cost: 49.99 },
                'rain-benjamins': { name: 'Rain of Benjamins', damage: 'real', icon: '💸', cost: 'variable' }
            }
        };
        
        // Real loan data with target zones (July 2025 +5% balances)
        this.realLoans = [
            {
                id: 'AI',
                name: 'Grad PLUS',
                code: 'AI',
                type: 'Grad PLUS',
                rate: 9.08,
                balance: 25203.20,
                zone: 'head',
                position: { top: '5%', left: '50%' },
                dailyInterest: 6.27,
                interestPerSecond: 0.0000726
            },
            {
                id: 'AK',
                name: 'Grad PLUS',
                code: 'AK',
                type: 'Grad PLUS',
                rate: 9.08,
                balance: 23263.05,
                zone: 'right-shoulder',
                position: { top: '15%', left: '75%' },
                dailyInterest: 5.78,
                interestPerSecond: 0.0000669
            },
            {
                id: 'AJ',
                name: 'Unsubsidized',
                code: 'AJ',
                type: 'Unsubsidized',
                rate: 8.08,
                balance: 22424.96,
                zone: 'left-arm',
                position: { top: '25%', left: '25%' },
                dailyInterest: 4.96,
                interestPerSecond: 0.0000574
            },
            {
                id: 'AG',
                name: 'Grad PLUS',
                code: 'AG',
                type: 'Grad PLUS',
                rate: 8.05,
                balance: 39249.46,
                zone: 'chest',
                position: { top: '35%', left: '50%' },
                dailyInterest: 8.65,
                interestPerSecond: 0.0001001
            },
            {
                id: 'AH',
                name: 'Unsubsidized',
                code: 'AH',
                type: 'Unsubsidized',
                rate: 7.05,
                balance: 23793.47,
                zone: 'belly',
                position: { top: '45%', left: '50%' },
                dailyInterest: 4.60,
                interestPerSecond: 0.0000532
            },
            {
                id: 'AF',
                name: 'Unsubsidized',
                code: 'AF',
                type: 'Unsubsidized',
                rate: 6.54,
                balance: 23937.69,
                zone: 'right-leg',
                position: { top: '65%', left: '65%' },
                dailyInterest: 4.29,
                interestPerSecond: 0.0000496
            },
            {
                id: 'AE',
                name: 'Unsubsidized',
                code: 'AE',
                type: 'Unsubsidized',
                rate: 5.28,
                balance: 11736.43,
                zone: 'left-leg',
                position: { top: '65%', left: '35%' },
                dailyInterest: 1.70,
                interestPerSecond: 0.0000197
            },
            {
                id: 'MEFA',
                name: 'Private (Defer)',
                code: 'MEFA',
                type: 'Private (Defer)',
                rate: 6.64,
                balance: 47726.62,
                zone: 'tail',
                position: { top: '55%', left: '85%' },
                dailyInterest: 8.68,
                interestPerSecond: 0.0001004
            },
            {
                id: 'Edvestinu',
                name: 'Private (Repay)',
                code: 'Edvestinu',
                type: 'Private (Repay)',
                rate: 6.53,
                balance: 24541.25,
                zone: 'floating-orb',
                position: { top: '20%', left: '15%' },
                dailyInterest: 4.39,
                interestPerSecond: 0.0000508
            }
        ];
        
        this.init();
    }
    
    init() {
        this.loadData();
        this.setupEventListeners();
        this.updateUI();
        this.startBattleTimer();
        this.startInterestTimer();
        this.renderRealLoanOrbs();
        this.calculateTotalInterest();
    }
    
    startInterestTimer() {
        // Update interest every second
        setInterval(() => {
            this.updateRealTimeInterest();
        }, 1000);
    }
    
    updateRealTimeInterest() {
        const now = Date.now();
        const timeDiff = (now - this.lastInterestUpdate) / 1000; // seconds
        
        // Update each loan's balance with real-time interest
        this.realLoans.forEach(loan => {
            const interestAccrued = loan.interestPerSecond * timeDiff;
            loan.balance += interestAccrued;
            
            // Recalculate daily interest
            loan.dailyInterest = (loan.balance * (loan.rate / 100)) / 365;
            loan.interestPerSecond = loan.dailyInterest / 86400;
        });
        
        this.lastInterestUpdate = now;
        this.calculateTotalInterest();
        this.updateLoanOrbs();
    }
    
    calculateTotalInterest() {
        this.dailyGrowth = this.realLoans.reduce((total, loan) => {
            return total + loan.dailyInterest;
        }, 0);
        
        document.getElementById('daily-growth').textContent = `+${this.formatCurrency(this.dailyGrowth)}`;
    }
    
    renderRealLoanOrbs() {
        const monsterTorso = document.querySelector('.monster-torso');
        monsterTorso.innerHTML = ''; // Clear existing orbs
        
        this.realLoans.forEach(loan => {
            const orb = document.createElement('div');
            orb.className = 'loan-orb';
            orb.dataset.loanId = loan.id;
            orb.dataset.zone = loan.zone;
            orb.style.top = loan.position.top;
            orb.style.left = loan.position.left;
            
            // Add zone-specific styling
            orb.classList.add(`zone-${loan.zone}`);
            
            orb.innerHTML = `
                <div class="orb-glow"></div>
                <div class="orb-content">
                    <div class="orb-code">${loan.code}</div>
                    <div class="orb-balance">${this.formatCurrency(loan.balance)}</div>
                </div>
                <div class="orb-tooltip">
                    <div class="tooltip-content">
                        <h4>${loan.name} (${loan.code})</h4>
                        <p><strong>Type:</strong> ${loan.type}</p>
                        <p><strong>Balance:</strong> ${this.formatCurrency(loan.balance)}</p>
                        <p><strong>Rate:</strong> ${loan.rate}%</p>
                        <p><strong>Daily Interest:</strong> ${this.formatCurrency(loan.dailyInterest)}</p>
                        <p><strong>Per Second:</strong> ${this.formatCurrency(loan.interestPerSecond)}</p>
                        <p><strong>Zone:</strong> ${this.getZoneDisplayName(loan.zone)}</p>
                    </div>
                </div>
            `;
            
            // Add click event
            orb.addEventListener('click', (e) => {
                this.targetLoan(loan);
            });
            
            monsterTorso.appendChild(orb);
        });
    }
    
    getZoneDisplayName(zone) {
        const zoneNames = {
            'head': 'Head',
            'right-shoulder': 'Right Shoulder',
            'left-arm': 'Left Arm',
            'chest': 'Chest',
            'belly': 'Belly',
            'right-leg': 'Right Leg',
            'left-leg': 'Left Leg',
            'tail': 'Tail',
            'floating-orb': 'Floating Orb'
        };
        return zoneNames[zone] || zone;
    }
    
    updateLoanOrbs() {
        this.realLoans.forEach(loan => {
            const orb = document.querySelector(`[data-loan-id="${loan.id}"]`);
            if (orb) {
                const balanceElement = orb.querySelector('.orb-balance');
                if (balanceElement) {
                    balanceElement.textContent = this.formatCurrency(loan.balance);
                }
                
                // Update tooltip
                const tooltip = orb.querySelector('.tooltip-content');
                if (tooltip) {
                    tooltip.innerHTML = `
                        <h4>${loan.name} (${loan.code})</h4>
                        <p><strong>Type:</strong> ${loan.type}</p>
                        <p><strong>Balance:</strong> ${this.formatCurrency(loan.balance)}</p>
                        <p><strong>Rate:</strong> ${loan.rate}%</p>
                        <p><strong>Daily Interest:</strong> ${this.formatCurrency(loan.dailyInterest)}</p>
                        <p><strong>Per Second:</strong> ${this.formatCurrency(loan.interestPerSecond)}</p>
                        <p><strong>Zone:</strong> ${this.getZoneDisplayName(loan.zone)}</p>
                    `;
                }
            }
        });
    }
    
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToSection(e.target.getAttribute('href').substring(1));
            });
        });
        
        // Arsenal tabs
        document.querySelectorAll('.arsenal-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchArsenalTab(e.target.dataset.tab);
            });
        });
        
        // Item selection
        document.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectItem(card.dataset.item);
            });
        });
        
        // Throwing zone
        const throwingZone = document.getElementById('throwing-zone');
        throwingZone.addEventListener('click', (e) => {
            this.throwItem(e);
        });
        
        // Form submissions
        document.getElementById('add-loan-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addLoan();
        });
        
        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.closeModal(e.target.closest('.modal').id);
            });
        });
        
        // Leaderboard tabs
        document.querySelectorAll('.leaderboard-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLeaderboardTab(e.target.dataset.tab);
            });
        });
    }
    
    navigateToSection(sectionId) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
        
        // Scroll to section
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
    
    switchArsenalTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.arsenal-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // Update item grids
        document.querySelectorAll('.item-grid').forEach(grid => {
            grid.classList.remove('active');
        });
        document.getElementById(`${tab}-items`).classList.add('active');
    }
    
    switchLeaderboardTab(tab) {
        // Update tab buttons
        document.querySelectorAll('.leaderboard-tabs .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // Update leaderboard lists
        document.querySelectorAll('.leaderboard-list').forEach(list => {
            list.classList.remove('active');
        });
        document.getElementById(`${tab}-leaderboard`).classList.add('active');
    }
    
    selectItem(itemId) {
        this.selectedItem = itemId;
        
        // Update visual selection
        document.querySelectorAll('.item-card').forEach(card => {
            card.style.borderColor = 'rgba(255, 107, 53, 0.3)';
        });
        
        const selectedCard = document.querySelector(`[data-item="${itemId}"]`);
        if (selectedCard) {
            selectedCard.style.borderColor = '#ff6b35';
            
            // Check if it's a premium item
            if (selectedCard.classList.contains('premium')) {
                this.showPurchaseModal(itemId);
            }
        }
    }
    
    showPurchaseModal(itemId) {
        const item = this.arsenal.premium[itemId];
        if (!item) return;
        
        document.getElementById('purchase-icon').textContent = item.icon;
        document.getElementById('purchase-name').textContent = item.name;
        document.getElementById('purchase-description').textContent = `Deal ${item.damage} HP damage to Loanzilla`;
        document.getElementById('purchase-cost').textContent = `$${item.cost}`;
        
        document.getElementById('purchase-modal').classList.add('active');
    }
    
    closePurchaseModal() {
        document.getElementById('purchase-modal').classList.remove('active');
        this.selectedItem = null;
    }
    
    confirmPurchase() {
        // In a real app, this would integrate with payment processing
        const item = this.arsenal.premium[this.selectedItem];
        if (item) {
            this.throwItem(null, item.damage, true);
            this.closePurchaseModal();
            
            // Show success message
            this.showNotification(`Successfully purchased ${item.name}!`, 'success');
        }
    }
    
    throwItem(event, damage = null, isPremium = false) {
        if (!this.selectedItem && !damage) return;
        
        let itemDamage = damage;
        let itemId = this.selectedItem;
        
        if (!damage) {
            const item = this.arsenal.free[this.selectedItem] || this.arsenal.premium[this.selectedItem];
            if (!item) return;
            
            itemDamage = item.damage;
            itemId = this.selectedItem;
        }
        
        // Calculate damage based on tool
        const toolMultiplier = this.getToolMultiplier();
        const finalDamage = itemDamage * toolMultiplier;
        
        // Apply damage to monster
        this.dealDamage(finalDamage);
        
        // Create throw animation
        this.createThrowAnimation(event, itemId);
        
        // Update stats
        this.itemsThrown++;
        this.hits++;
        this.updateAccuracy();
        
        // Add XP
        this.addXP(finalDamage);
        
        // Check for level up
        this.checkLevelUp();
        
        // Update UI
        this.updateUI();
        
        // Reset selection for free items
        if (!isPremium) {
            this.selectedItem = null;
            document.querySelectorAll('.item-card').forEach(card => {
                card.style.borderColor = 'rgba(255, 107, 53, 0.3)';
            });
        }
    }
    
    getToolMultiplier() {
        const toolMultipliers = {
            'sock-launcher': 3,
            'tshirt-cannon': 5,
            'ramen-blaster': 8,
            'knights-gauntlet': 15,
            'diamond-destroyer': 50
        };
        return toolMultipliers[this.currentTool] || 1;
    }
    
    createThrowAnimation(event, itemId) {
        const throwingZone = document.getElementById('throwing-zone');
        const monster = document.getElementById('loanzilla-monster');
        
        // Create projectile element
        const projectile = document.createElement('div');
        projectile.textContent = this.arsenal.free[itemId]?.icon || this.arsenal.premium[itemId]?.icon || '🎯';
        projectile.style.position = 'absolute';
        projectile.style.fontSize = '24px';
        projectile.style.pointerEvents = 'none';
        projectile.style.zIndex = '10';
        
        // Position projectile
        if (event) {
            projectile.style.left = (event.clientX - 10) + 'px';
            projectile.style.top = (event.clientY - 10) + 'px';
        } else {
            projectile.style.left = '50%';
            projectile.style.top = '50%';
        }
        
        document.body.appendChild(projectile);
        
        // Animate to monster
        const monsterRect = monster.getBoundingClientRect();
        const targetX = monsterRect.left + monsterRect.width / 2;
        const targetY = monsterRect.top + monsterRect.height / 2;
        
        projectile.style.transition = 'all 0.8s ease-out';
        projectile.style.transform = `translate(${targetX - event?.clientX || 0}px, ${targetY - event?.clientY || 0}px) scale(0.5)`;
        projectile.style.opacity = '0';
        
        // Remove projectile after animation
        setTimeout(() => {
            document.body.removeChild(projectile);
        }, 800);
        
        // Flash monster on hit
        setTimeout(() => {
            monster.classList.add('damage-flash');
            setTimeout(() => {
                monster.classList.remove('damage-flash');
            }, 300);
        }, 800);
    }
    
    dealDamage(damage) {
        this.monsterHP = Math.max(0, this.monsterHP - damage);
        this.totalDamage += damage;
        
        // Update monster HP bar
        const hpPercentage = (this.monsterHP / this.maxMonsterHP) * 100;
        document.getElementById('monster-hp-fill').style.width = hpPercentage + '%';
        document.getElementById('monster-hp-text').textContent = 
            `${this.formatCurrency(this.monsterHP)} / ${this.formatCurrency(this.maxMonsterHP)}`;
        
        // Show damage number
        this.showDamageNumber(damage);
        
        // Check if monster is defeated
        if (this.monsterHP <= 0) {
            this.monsterDefeated();
        }
    }
    
    showDamageNumber(damage) {
        const monster = document.getElementById('loanzilla-monster');
        const damageText = document.createElement('div');
        damageText.textContent = `-${this.formatCurrency(damage)}`;
        damageText.style.position = 'absolute';
        damageText.style.color = '#ff6b35';
        damageText.style.fontSize = '24px';
        damageText.style.fontWeight = 'bold';
        damageText.style.pointerEvents = 'none';
        damageText.style.zIndex = '15';
        damageText.style.left = '50%';
        damageText.style.top = '30%';
        damageText.style.transform = 'translateX(-50%)';
        
        monster.appendChild(damageText);
        
        // Animate damage number
        damageText.style.transition = 'all 1s ease-out';
        damageText.style.transform = 'translateX(-50%) translateY(-50px)';
        damageText.style.opacity = '0';
        
        setTimeout(() => {
            monster.removeChild(damageText);
        }, 1000);
    }
    
    monsterDefeated() {
        this.showNotification('🎉 Loanzilla defeated! But it will return stronger tomorrow...', 'success');
        
        // Reset monster HP
        setTimeout(() => {
            this.monsterHP = this.maxMonsterHP;
            this.updateUI();
        }, 3000);
    }
    
    addXP(amount) {
        const xpGain = Math.floor(amount / 10);
        this.playerXP += xpGain;
        
        // Update XP bar
        const currentLevelData = this.levelData[this.playerLevel];
        const nextLevelData = this.levelData[this.playerLevel + 1];
        
        if (nextLevelData) {
            const xpForCurrentLevel = currentLevelData.xpRequired;
            const xpForNextLevel = nextLevelData.xpRequired;
            const xpProgress = this.playerXP - xpForCurrentLevel;
            const xpRequired = xpForNextLevel - xpForCurrentLevel;
            const xpPercentage = (xpProgress / xpRequired) * 100;
            
            document.getElementById('xp-fill').style.width = xpPercentage + '%';
            document.getElementById('xp-text').textContent = `${xpProgress} / ${xpRequired} XP`;
        } else {
            document.getElementById('xp-fill').style.width = '100%';
            document.getElementById('xp-text').textContent = 'MAX LEVEL';
        }
    }
    
    checkLevelUp() {
        const nextLevel = this.playerLevel + 1;
        const nextLevelData = this.levelData[nextLevel];
        
        if (nextLevelData && this.playerXP >= nextLevelData.xpRequired) {
            this.playerLevel = nextLevel;
            this.levelUp();
        }
    }
    
    levelUp() {
        // Update level display
        document.getElementById('player-level').textContent = this.playerLevel;
        document.getElementById('player-title').textContent = this.levelData[this.playerLevel].title;
        
        // Add level up animation
        const levelDisplay = document.querySelector('.level-display');
        levelDisplay.classList.add('level-up');
        setTimeout(() => {
            levelDisplay.classList.remove('level-up');
        }, 500);
        
        // Show notification
        this.showNotification(`🎉 Level Up! You are now ${this.levelData[this.playerLevel].title}!`, 'success');
        
        // Unlock new tools
        this.unlockTools();
        
        // Update UI
        this.updateUI();
    }
    
    unlockTools() {
        const toolUnlocks = {
            2: 'tshirt-cannon',
            5: 'ramen-blaster',
            7: 'knights-gauntlet',
            9: 'diamond-destroyer'
        };
        
        if (toolUnlocks[this.playerLevel]) {
            const toolCard = document.querySelector(`[data-tool="${toolUnlocks[this.playerLevel]}"]`);
            if (toolCard) {
                toolCard.classList.remove('locked');
                toolCard.classList.add('unlocked');
                toolCard.querySelector('.tool-status').textContent = 'Unlocked';
                this.showNotification(`🔓 New tool unlocked: ${toolCard.querySelector('h3').textContent}!`, 'success');
            }
        }
    }
    
    updateAccuracy() {
        this.accuracy = this.hits > 0 ? Math.round((this.hits / (this.hits + this.misses)) * 100) : 0;
    }
    
    startBattleTimer() {
        setInterval(() => {
            this.battleTime++;
            this.updateBattleTime();
        }, 1000);
    }
    
    updateBattleTime() {
        const hours = Math.floor(this.battleTime / 3600);
        const minutes = Math.floor((this.battleTime % 3600) / 60);
        document.getElementById('battle-time').textContent = `${hours}h ${minutes}m`;
    }
    
    targetLoan(loan) {
        // Calculate bonus damage for targeting high-interest loans
        const interestBonus = loan.rate / 10; // Higher rate = more bonus
        const baseDamage = 50;
        const bonusDamage = Math.floor(baseDamage * interestBonus);
        
        // Apply damage to the specific loan
        const damageReduction = bonusDamage * 0.01; // 1 HP = $0.01
        loan.balance = Math.max(0, loan.balance - damageReduction);
        
        // Recalculate interest for this loan
        loan.dailyInterest = (loan.balance * (loan.rate / 100)) / 365;
        loan.interestPerSecond = loan.dailyInterest / 86400;
        
        // Update the orb
        this.updateLoanOrbs();
        this.calculateTotalInterest();
        
        // Show targeting feedback
        this.showNotification(`🎯 Targeted ${loan.code} (${loan.type})! Bonus damage: ${this.formatCurrency(bonusDamage)}`, 'success');
        
        // Add XP for targeting
        this.addXP(bonusDamage);
        this.checkLevelUp();
    }
    
    addLoan() {
        const form = document.getElementById('add-loan-form');
        const formData = new FormData(form);
        
        const loan = {
            id: Date.now(),
            name: formData.get('loan-name') || document.getElementById('loan-name').value,
            balance: parseFloat(formData.get('loan-balance') || document.getElementById('loan-balance').value),
            rate: parseFloat(formData.get('loan-rate') || document.getElementById('loan-rate').value),
            payment: parseFloat(formData.get('loan-payment') || document.getElementById('loan-payment').value) || 0,
            dueDate: formData.get('loan-due-date') || document.getElementById('loan-due-date').value
        };
        
        this.loans.push(loan);
        this.calculateDailyGrowth();
        this.renderLoans();
        this.closeModal('add-loan-modal');
        this.showNotification(`🐉 New loan monster recruited: ${loan.name}!`, 'success');
        
        // Reset form
        form.reset();
    }
    
    renderLoans() {
        const loansGrid = document.getElementById('loans-grid');
        loansGrid.innerHTML = '';
        
        // Show real loans first
        this.realLoans.forEach(loan => {
            const loanCard = document.createElement('div');
            loanCard.className = 'loan-card';
            loanCard.innerHTML = `
                <div class="loan-header">
                    <h3 class="loan-name">${loan.name} (${loan.code})</h3>
                    <span class="loan-zone">${this.getZoneDisplayName(loan.zone)}</span>
                </div>
                <div class="loan-balance">${this.formatCurrency(loan.balance)}</div>
                <div class="loan-stats">
                    <div class="loan-stat">
                        <span class="stat-label">Type</span>
                        <span class="stat-value">${loan.type}</span>
                    </div>
                    <div class="loan-stat">
                        <span class="stat-label">Rate</span>
                        <span class="stat-value">${loan.rate}%</span>
                    </div>
                    <div class="loan-stat">
                        <span class="stat-label">Daily Interest</span>
                        <span class="stat-value">${this.formatCurrency(loan.dailyInterest)}</span>
                    </div>
                    <div class="loan-stat">
                        <span class="stat-label">Per Second</span>
                        <span class="stat-value">${this.formatCurrency(loan.interestPerSecond)}</span>
                    </div>
                </div>
                <div class="loan-actions">
                    <button class="btn btn-primary btn-small" onclick="game.targetLoanFromCard('${loan.id}')">
                        <i class="fas fa-crosshairs"></i> Target
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="game.showLoanDetails('${loan.id}')">
                        <i class="fas fa-info"></i> Details
                    </button>
                </div>
            `;
            
            loansGrid.appendChild(loanCard);
        });
        
        // Show custom loans if any
        this.loans.forEach(loan => {
            const dailyInterest = (loan.balance * (loan.rate / 100)) / 365;
            const monthlyInterest = dailyInterest * 30;
            
            const loanCard = document.createElement('div');
            loanCard.className = 'loan-card custom-loan';
            loanCard.innerHTML = `
                <div class="loan-header">
                    <h3 class="loan-name">${loan.name}</h3>
                    <span class="loan-id">#${loan.id}</span>
                </div>
                <div class="loan-balance">${this.formatCurrency(loan.balance)}</div>
                <div class="loan-stats">
                    <div class="loan-stat">
                        <span class="stat-label">Rate</span>
                        <span class="stat-value">${loan.rate}%</span>
                    </div>
                    <div class="loan-stat">
                        <span class="stat-label">Daily Interest</span>
                        <span class="stat-value">${this.formatCurrency(dailyInterest)}</span>
                    </div>
                    <div class="loan-stat">
                        <span class="stat-label">Payment</span>
                        <span class="stat-value">${this.formatCurrency(loan.payment)}</span>
                    </div>
                    <div class="loan-stat">
                        <span class="stat-label">Due Date</span>
                        <span class="stat-value">${loan.dueDate || 'Not Set'}</span>
                    </div>
                </div>
                <div class="loan-actions">
                    <button class="btn btn-primary btn-small" onclick="game.editLoan(${loan.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="game.deleteLoan(${loan.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            `;
            
            loansGrid.appendChild(loanCard);
        });
    }
    
    targetLoanFromCard(loanId) {
        const loan = this.realLoans.find(l => l.id === loanId);
        if (loan) {
            this.targetLoan(loan);
        }
    }
    
    showLoanDetails(loanId) {
        const loan = this.realLoans.find(l => l.id === loanId);
        if (loan) {
            const details = `
                <strong>${loan.name} (${loan.code})</strong><br>
                Type: ${loan.type}<br>
                Balance: ${this.formatCurrency(loan.balance)}<br>
                Rate: ${loan.rate}%<br>
                Daily Interest: ${this.formatCurrency(loan.dailyInterest)}<br>
                Per Second: ${this.formatCurrency(loan.interestPerSecond)}<br>
                Zone: ${this.getZoneDisplayName(loan.zone)}
            `;
            this.showNotification(details, 'info');
        }
    }
    
    editLoan(loanId) {
        const loan = this.loans.find(l => l.id === loanId);
        if (!loan) return;
        
        // Populate edit form (in a real app, this would open an edit modal)
        this.showNotification(`Editing ${loan.name}...`, 'info');
    }
    
    deleteLoan(loanId) {
        const loan = this.loans.find(l => l.id === loanId);
        if (!loan) return;
        
        if (confirm(`Are you sure you want to remove ${loan.name}?`)) {
            this.loans = this.loans.filter(l => l.id !== loanId);
            this.calculateDailyGrowth();
            this.renderLoans();
            this.showNotification(`🗑️ ${loan.name} has been removed!`, 'success');
        }
    }
    
    openAddLoanModal() {
        document.getElementById('add-loan-modal').classList.add('active');
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            font-size: 14px;
            line-height: 1.4;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds for info, 3 seconds for others
        const duration = type === 'info' ? 5000 : 3000;
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 4
        }).format(amount);
    }
    
    updateUI() {
        // Update battle stats
        document.getElementById('total-damage').textContent = this.formatCurrency(this.totalDamage);
        document.getElementById('items-thrown').textContent = this.itemsThrown;
        document.getElementById('accuracy').textContent = `${this.accuracy}%`;
        
        // Update monster HP
        const hpPercentage = (this.monsterHP / this.maxMonsterHP) * 100;
        document.getElementById('monster-hp-fill').style.width = hpPercentage + '%';
        document.getElementById('monster-hp-text').textContent = 
            `${this.formatCurrency(this.monsterHP)} / ${this.formatCurrency(this.maxMonsterHP)}`;
        
        // Update daily growth
        document.getElementById('daily-growth').textContent = `+${this.formatCurrency(this.dailyGrowth)}`;
    }
    
    loadData() {
        const savedData = localStorage.getItem('loanzilla-save');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.assign(this, data);
        }
    }
    
    saveData() {
        const saveData = {
            loans: this.loans,
            playerLevel: this.playerLevel,
            playerXP: this.playerXP,
            totalDamage: this.totalDamage,
            itemsThrown: this.itemsThrown,
            battleTime: this.battleTime,
            accuracy: this.accuracy,
            hits: this.hits,
            misses: this.misses,
            monsterHP: this.monsterHP,
            maxMonsterHP: this.maxMonsterHP,
            dailyGrowth: this.dailyGrowth,
            currentTool: this.currentTool,
            achievements: this.achievements
        };
        
        localStorage.setItem('loanzilla-save', JSON.stringify(saveData));
    }
}

// Global functions for HTML onclick handlers
function openAddLoanModal() {
    game.openAddLoanModal();
}

function closeAddLoanModal() {
    game.closeModal('add-loan-modal');
}

function closePurchaseModal() {
    game.closePurchaseModal();
}

function confirmPurchase() {
    game.confirmPurchase();
}

// Initialize game when DOM is loaded
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new LoanzillaGame();
    
    // Auto-save every 30 seconds
    setInterval(() => {
        game.saveData();
    }, 30000);
    
    // Save on page unload
    window.addEventListener('beforeunload', () => {
        game.saveData();
    });
}); 