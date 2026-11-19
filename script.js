/* =========================================================
   RIOGAME // COMMAND CENTER LOGIC
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    const gameSelect = document.getElementById('gameSelect');
    const rateValue = document.getElementById('rateValue');
    const totalValue = document.getElementById('totalValue');
    const bookingForm = document.getElementById('bookingForm');
    const hoursInput = document.getElementById('hours');
    const dateInput = document.getElementById('bookingDate');
    const playerName = document.getElementById('playerName');
    const message = document.getElementById('systemMessage');
    const msgTitle = document.getElementById('msgTitle');
    const msgBody = document.getElementById('msgBody');
    const modal = document.getElementById('confirmModal');
    const receipt = document.getElementById('receipt');
    const closeModal = document.getElementById('closeModal');
    const pingValue = document.getElementById('pingValue');

    const getRate = () => {
        const option = gameSelect.options[gameSelect.selectedIndex];
        const rate = parseInt(option ? option.getAttribute('data-price') : '0', 10);
        return Number.isFinite(rate) ? rate : 0;
    };

    const getHours = () => {
        const hours = parseInt(hoursInput.value, 10);
        return Number.isFinite(hours) ? hours : 0;
    };

    function updateTotals() {
        const rate = getRate();
        rateValue.textContent = rate;
        totalValue.textContent = rate * getHours();
    }

    function showMessage(title, body, type) {
        msgTitle.textContent = title;
        msgBody.textContent = body;
        message.className = 'system-message ' + type;
        message.hidden = false;
    }

    function hideMessage() {
        message.hidden = true;
        message.className = 'system-message';
    }

    // Default date = today (local)
    const now = new Date();
    dateInput.value = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString().slice(0, 10);

    // Update rate + total when game changes
    gameSelect.addEventListener('change', () => {
        hideMessage();
        updateTotals();
    });

    // Recalculate when hours change
    hoursInput.addEventListener('input', updateTotals);

    // Rate card item click -> select that game
    document.querySelectorAll('.rate-item').forEach((item) => {
        item.addEventListener('click', () => {
            gameSelect.value = item.dataset.game;
            updateTotals();
            hideMessage();
            document.getElementById('bookingPanel').scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // Tabs
    document.querySelectorAll('.tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
            tab.classList.add('active');

            const targets = { main: 'newsPanel', slots: 'bookingPanel', rates: 'rateCard' };
            const target = document.getElementById(targets[tab.dataset.tab]);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // Sidebar navigation active state
    document.querySelectorAll('.nav-links a').forEach((link) => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.nav-links li').forEach((li) => li.classList.remove('active'));
            link.parentElement.classList.add('active');
        });
    });

    // Handle form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = playerName.value.trim();
        const game = gameSelect.options[gameSelect.selectedIndex].text;
        const hours = getHours();
        const rate = getRate();
        const total = rate * hours;

        if (name === '' || rate === 0 || hours < 1 || hours > 10 || dateInput.value === '') {
            const problems = [];
            if (name === '') problems.push('PLAYER NAME');
            if (rate === 0) problems.push('GAME SELECTION');
            if (dateInput.value === '') problems.push('DATE');
            if (hours < 1 || hours > 10) problems.push('HOURS (1-10)');
            showMessage('ACCESS DENIED', '// MISSING: ' + problems.join(' / ') + '. RECHECK AND RETRANSMIT.', 'denied');
            return;
        }

        showMessage('ACCESS GRANTED', '// SLOT CONFIRMED. REF: RG-' + Date.now().toString().slice(-6), 'granted');

        const rows = [
            ['PLAYER', name.toUpperCase()],
            ['GAME', game],
            ['DATE', dateInput.value],
            ['HOURS', String(hours)],
            ['RATE', rate + ' CR / HR'],
            ['TOTAL', total + ' CREDITS']
        ];

        receipt.replaceChildren(...rows.map(([label, value]) => {
            const row = document.createElement('div');
            row.className = 'receipt-row';
            const key = document.createElement('span');
            key.textContent = label;
            const val = document.createElement('b');
            val.textContent = value;
            row.append(key, val);
            return row;
        }));

        modal.hidden = false;
        closeModal.focus();
    });

    // Close confirmation
    const close = () => { modal.hidden = true; };
    closeModal.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) close();
    });

    // Live ping indicator
    setInterval(() => {
        pingValue.textContent = (10 + Math.floor(Math.random() * 25)) + 'ms';
    }, 4000);

    updateTotals();
});
