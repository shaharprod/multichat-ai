/* ═══════════════════════════════════════════════════════════════
   MultiChat AI — אפליקציית צ'אט רב-ספקית
   תמיכה: OpenAI, Google Gemini, Claude, Perplexity
   מעקב מחירים בזמן אמת + RTL עברית מלא
   ═══════════════════════════════════════════════════════════════ */

// ── תמחור מודלים ($ לכל מיליון טוקנים) ───────────────────────
const PRICING = {
    // OpenAI
    'gpt-4o':           { input: 2.50,  output: 10.00, name: 'GPT-4o' },
    'gpt-4o-mini':      { input: 0.15,  output: 0.60,  name: 'GPT-4o Mini' },
    'gpt-4-turbo':      { input: 10.00, output: 30.00, name: 'GPT-4 Turbo' },
    'o1-preview':       { input: 15.00, output: 60.00, name: 'O1 Preview' },
    'o1-mini':          { input: 3.00,  output: 12.00, name: 'O1 Mini' },
    'gpt-3.5-turbo':    { input: 0.50,  output: 1.50,  name: 'GPT-3.5 Turbo' },
    // Google Gemini 3.x
    'gemini-3.1-pro-preview':        { input: 2.00,  output: 12.00, name: 'Gemini 3.1 Pro' },
    'gemini-3.1-flash-lite-preview': { input: 0.25,  output: 1.50,  name: 'Gemini 3.1 Flash Lite' },
    'gemini-3-flash-preview':        { input: 0.50,  output: 3.00,  name: 'Gemini 3.0 Flash' },
    // Google Gemini 2.x
    'gemini-2.0-flash':       { input: 0.10,  output: 0.40,  name: 'Gemini 2.0 Flash' },
    'gemini-2.0-flash-lite':  { input: 0.075, output: 0.30,  name: 'Gemini 2.0 Flash Lite' },
    'gemini-1.5-pro':         { input: 1.25,  output: 5.00,  name: 'Gemini 1.5 Pro' },
    'gemini-1.5-flash':       { input: 0.075, output: 0.30,  name: 'Gemini 1.5 Flash' },
    // Claude
    'claude-sonnet-4-6':           { input: 3.00,  output: 15.00, name: 'Claude Sonnet 4.6' },
    'claude-opus-4-6':             { input: 15.00, output: 75.00, name: 'Claude Opus 4.6' },
    'claude-haiku-4-5-20251001':   { input: 0.80,  output: 4.00,  name: 'Claude Haiku 4.5' },
    // Perplexity
    'sonar-pro':           { input: 3.00,  output: 15.00, name: 'Sonar Pro' },
    'sonar':               { input: 1.00,  output: 1.00,  name: 'Sonar' },
    'sonar-reasoning-pro': { input: 2.00,  output: 8.00,  name: 'Sonar Reasoning Pro' },
    'sonar-reasoning':     { input: 1.00,  output: 5.00,  name: 'Sonar Reasoning' },
    // xAI Grok
    'grok-4.20-0309-reasoning':     { input: 2.00, output: 6.00, name: 'Grok 4.20' },
    'grok-4-1-fast-reasoning':      { input: 0.20, output: 0.50, name: 'Grok 4.1 Fast' },
    'grok-4-1-fast-non-reasoning':  { input: 0.20, output: 0.50, name: 'Grok 4.1 Fast (No Reason)' },
};

// ── הגדרת ספקים ומודלים ───────────────────────────────────────
const PROVIDERS = {
    openai: {
        name: 'OpenAI',
        models: [
            { id: 'gpt-4o', name: 'GPT-4o', desc: 'המהיר והחכם ביותר' },
            { id: 'gpt-4o-mini', name: 'GPT-4o Mini', desc: 'מהיר וזול' },
            { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', desc: 'חלון הקשר 128K' },
            { id: 'o1-preview', name: 'O1 Preview', desc: 'חשיבה מתקדמת' },
            { id: 'o1-mini', name: 'O1 Mini', desc: 'חשיבה מהירה' },
            { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', desc: 'הכי זול' },
        ],
        endpoint: 'https://api.openai.com/v1/chat/completions',
        keyField: 'openaiKey',
    },
    google: {
        name: 'Google Gemini',
        models: [
            { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', desc: '⭐ מומלץ — מהיר, חינמי, ומשתלם' },
            { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash Lite', desc: 'הכי זול' },
            { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', desc: '🔥 החכם ביותר (מכסה מוגבלת!)' },
            { id: 'gemini-3.1-flash-lite-preview', name: 'Gemini 3.1 Flash Lite', desc: '⚡ ביצועי שיא במחיר נמוך' },
            { id: 'gemini-3-flash-preview', name: 'Gemini 3.0 Flash', desc: 'ביצועים גבוהים, מהיר' },
            { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', desc: 'חלון 2M טוקנים' },
            { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', desc: 'מאוזן' },
        ],
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/',
        keyField: 'googleKey',
    },
    claude: {
        name: 'Claude',
        models: [
            { id: 'claude-sonnet-4-6', name: 'Claude Sonnet 4.6', desc: 'מאוזן ומהיר' },
            { id: 'claude-opus-4-6', name: 'Claude Opus 4.6', desc: 'החכם ביותר' },
            { id: 'claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5', desc: 'מהיר וזול' },
        ],
        endpoint: 'https://api.anthropic.com/v1/messages',
        keyField: 'claudeKey',
    },
    perplexity: {
        name: 'Perplexity',
        models: [
            { id: 'sonar-pro', name: 'Sonar Pro', desc: 'חיפוש מתקדם' },
            { id: 'sonar', name: 'Sonar', desc: 'חיפוש בסיסי' },
            { id: 'sonar-reasoning-pro', name: 'Sonar Reasoning Pro', desc: 'חשיבה + חיפוש' },
            { id: 'sonar-reasoning', name: 'Sonar Reasoning', desc: 'חשיבה מהירה' },
        ],
        endpoint: 'https://api.perplexity.ai/chat/completions',
        keyField: 'perplexityKey',
    },
    grok: {
        name: 'Grok (xAI)',
        models: [
            { id: 'grok-4.20-0309-reasoning', name: 'Grok 4.20', desc: '🔥 החכם ביותר, חשיבה מתקדמת' },
            { id: 'grok-4-1-fast-reasoning', name: 'Grok 4.1 Fast', desc: '⚡ מהיר, חלון 2M, זול מאוד' },
            { id: 'grok-4-1-fast-non-reasoning', name: 'Grok 4.1 Fast (ישיר)', desc: 'מהיר ללא חשיבה' },
        ],
        endpoint: 'https://api.x.ai/v1/chat/completions',
        keyField: 'grokKey',
    },
};

// ── מצב האפליקציה ────────────────────────────────────────────
let state = {
    provider: 'openai',
    model: 'gpt-4o',
    temperature: 0.7,
    theme: 'light',
    conversations: [],
    currentConversationId: null,
    apiKeys: {},
    claudeProxy: '',
    ttsVoice: 'nova',
    ttsSpeed: 1.0,
    ttsModel: 'gpt-4o-mini-tts',  // gpt-4o-mini-tts = קול אנושי טבעי; tts-1-hd = רובוטי אבל מדויק
    isStreaming: false,
    // מעקב הוצאות
    budget: {
        limit: 5.00,        // סף תקציב ב-$
        alertAt: 0.8,       // התראה ב-80%
        totalSpent: 0,       // סה"כ הוצאה
        sessionSpent: 0,     // הוצאה בסשן הנוכחי
        history: [],         // היסטוריית הוצאות
    },
};

// ── DOM ───────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const dom = {};

function cacheDom() {
    dom.sidebar = $('#sidebar');
    dom.sidebarToggle = $('#sidebarToggle');
    dom.sidebarClose = $('#sidebarClose');
    dom.providerGrid = $('#providerGrid');
    dom.modelSelect = $('#modelSelect');
    dom.temperature = $('#temperature');
    dom.tempValue = $('#tempValue');
    dom.newChatBtn = $('#newChatBtn');
    dom.chatHistory = $('#chatHistory');
    dom.messagesContainer = $('#messagesContainer');
    dom.welcomeScreen = $('#welcomeScreen');
    dom.messageInput = $('#messageInput');
    dom.sendBtn = $('#sendBtn');
    dom.charCount = $('#charCount');
    dom.currentModelDisplay = $('#currentModelDisplay');
    dom.settingsModal = $('#settingsModal');
    dom.settingsBtn = $('#settingsBtn');
    dom.closeSettings = $('#closeSettings');
    dom.saveKeysBtn = $('#saveKeysBtn');
    dom.clearKeysBtn = $('#clearKeysBtn');
    dom.themeToggle = $('#themeToggle');
    dom.themeLabel = $('#themeLabel');
    dom.exportBtn = $('#exportBtn');
    dom.costDisplay = $('#costDisplay');
    dom.budgetBar = $('#budgetBar');
    dom.budgetModal = $('#budgetModal');
    dom.budgetBtn = $('#budgetBtn');
    dom.closeBudget = $('#closeBudget');
    dom.budgetLimitInput = $('#budgetLimitInput');
    dom.saveBudgetBtn = $('#saveBudgetBtn');
    dom.resetCostsBtn = $('#resetCostsBtn');
    dom.pricingInfo = $('#pricingInfo');
}

// ── אתחול ─────────────────────────────────────────────────────
function init() {
    cacheDom();
    loadState();
    applyTheme();
    updateProviderUI();
    updateModelSelect();
    updateModelDisplay();
    updateCostDisplay();
    updatePricingInfo();
    renderChatHistory();
    bindEvents();

    if (state.currentConversationId) {
        loadConversation(state.currentConversationId);
    }
}

// ── שמירה וטעינה ──────────────────────────────────────────────
function loadState() {
    try {
        const saved = localStorage.getItem('multichat_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed, budget: { ...state.budget, ...parsed.budget } };
        }
    } catch (e) { console.warn('שגיאה בטעינת מצב:', e); }
}

function saveState() {
    try {
        localStorage.setItem('multichat_state', JSON.stringify(state));
    } catch (e) { console.warn('שגיאה בשמירת מצב:', e); }
}

// ── עיצוב ─────────────────────────────────────────────────────
function applyTheme() {
    document.body.setAttribute('data-theme', state.theme);
    if (dom.themeLabel) dom.themeLabel.textContent = state.theme === 'dark' ? 'מצב בהיר' : 'מצב כהה';
}

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveState();
}

// ── ספק ומודל ─────────────────────────────────────────────────
function setProvider(provider) {
    state.provider = provider;
    state.model = PROVIDERS[provider].models[0].id;
    updateProviderUI();
    updateModelSelect();
    updateModelDisplay();
    updatePricingInfo();
    saveState();
}

function updateProviderUI() {
    $$('.provider-card').forEach(card => {
        card.classList.toggle('active', card.dataset.provider === state.provider);
    });
}

function updateModelSelect() {
    const models = PROVIDERS[state.provider].models;
    dom.modelSelect.innerHTML = models.map(m => {
        const price = PRICING[m.id];
        const priceLabel = price ? ` (קלט: $${price.input}/M)` : '';
        return `<option value="${m.id}" ${m.id === state.model ? 'selected' : ''}>${m.name}${priceLabel}</option>`;
    }).join('');
}

function updateModelDisplay() {
    const provider = PROVIDERS[state.provider];
    const model = provider.models.find(m => m.id === state.model) || provider.models[0];
    dom.currentModelDisplay.innerHTML = `
        <span class="model-badge ${state.provider}">${provider.name}</span>
        <span class="model-name">${model.name}</span>
    `;
}

function updatePricingInfo() {
    const price = PRICING[state.model];
    if (!price || !dom.pricingInfo) return;

    dom.pricingInfo.innerHTML = `
        <div class="pricing-card">
            <div class="pricing-header">${price.name}</div>
            <div class="pricing-row">
                <span>קלט (Input)</span>
                <span class="pricing-value">$${price.input} / 1M טוקנים</span>
            </div>
            <div class="pricing-row">
                <span>פלט (Output)</span>
                <span class="pricing-value">$${price.output} / 1M טוקנים</span>
            </div>
            <div class="pricing-row pricing-estimate">
                <span>~1000 מילים</span>
                <span class="pricing-value">≈ $${((price.input * 750 + price.output * 750) / 1000000).toFixed(4)}</span>
            </div>
        </div>
    `;
}

// ── מעקב הוצאות ──────────────────────────────────────────────
function estimateTokens(text) {
    // הערכה גסה: ~4 תווים לטוקן באנגלית, ~2 בעברית
    const hebrewRatio = (text.match(/[\u0590-\u05FF]/g) || []).length / Math.max(text.length, 1);
    const charsPerToken = 4 - (hebrewRatio * 2);
    return Math.ceil(text.length / charsPerToken);
}

function calculateCost(inputTokens, outputTokens, modelId) {
    const price = PRICING[modelId];
    if (!price) return 0;
    return (inputTokens * price.input + outputTokens * price.output) / 1000000;
}

function trackCost(inputTokens, outputTokens, modelId) {
    const cost = calculateCost(inputTokens, outputTokens, modelId);
    state.budget.totalSpent += cost;
    state.budget.sessionSpent += cost;
    state.budget.history.push({
        date: new Date().toISOString(),
        model: modelId,
        inputTokens,
        outputTokens,
        cost,
    });

    updateCostDisplay();
    checkBudgetAlert(cost);
    saveState();
    return cost;
}

function updateCostDisplay() {
    if (!dom.costDisplay) return;

    const spent = state.budget.totalSpent;
    const limit = state.budget.limit;
    const percent = Math.min((spent / limit) * 100, 100);

    let statusClass = 'cost-ok';
    if (percent >= 100) statusClass = 'cost-over';
    else if (percent >= state.budget.alertAt * 100) statusClass = 'cost-warn';

    dom.costDisplay.innerHTML = `
        <div class="cost-summary ${statusClass}">
            <span class="cost-amount">$${spent.toFixed(4)}</span>
            <span class="cost-separator">/</span>
            <span class="cost-limit">$${limit.toFixed(2)}</span>
        </div>
    `;

    if (dom.budgetBar) {
        dom.budgetBar.style.width = `${percent}%`;
        dom.budgetBar.className = `budget-bar-fill ${statusClass}`;
    }
}

function checkBudgetAlert(lastCost) {
    const spent = state.budget.totalSpent;
    const limit = state.budget.limit;
    const percent = spent / limit;

    if (percent >= 1) {
        showBudgetNotification(
            `חריגה מתקציב! הוצאת $${spent.toFixed(4)} מתוך $${limit.toFixed(2)}. מומלץ לעבור למודל זול יותר או להפסיק.`,
            'over'
        );
    } else if (percent >= state.budget.alertAt) {
        showBudgetNotification(
            `התקרבת לסף התקציב: $${spent.toFixed(4)} מתוך $${limit.toFixed(2)} (${(percent * 100).toFixed(0)}%)`,
            'warn'
        );
    }
}

function showBudgetNotification(message, type) {
    const existing = $('.budget-notification');
    if (existing) existing.remove();

    const notif = document.createElement('div');
    notif.className = `budget-notification budget-${type}`;
    notif.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">✕</button>
    `;
    dom.messagesContainer.parentElement.insertBefore(notif, dom.messagesContainer);
    setTimeout(() => notif.remove(), 10000);
}

// ── שיחות ─────────────────────────────────────────────────────
function createConversation() {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const conv = {
        id,
        title: 'שיחה חדשה',
        provider: state.provider,
        model: state.model,
        messages: [],
        totalCost: 0,
        createdAt: new Date().toISOString(),
    };
    state.conversations.unshift(conv);
    state.currentConversationId = id;
    saveState();
    renderChatHistory();
    renderMessages();
    return conv;
}

function loadConversation(id) {
    state.currentConversationId = id;
    const conv = getCurrentConversation();
    if (conv) {
        state.provider = conv.provider;
        state.model = conv.model;
        updateProviderUI();
        updateModelSelect();
        updateModelDisplay();
        updatePricingInfo();
    }
    renderMessages();
    renderChatHistory();
    saveState();
}

function getCurrentConversation() {
    return state.conversations.find(c => c.id === state.currentConversationId);
}

function renderChatHistory() {
    if (!dom.chatHistory) return;
    if (state.conversations.length === 0) {
        dom.chatHistory.innerHTML = '<div class="empty-history">אין שיחות עדיין</div>';
        return;
    }

    dom.chatHistory.innerHTML = state.conversations.map(conv => {
        const providerColor = `var(--${conv.provider}-color)`;
        const isActive = conv.id === state.currentConversationId ? 'active' : '';
        const costLabel = conv.totalCost > 0 ? `<span class="h-cost">$${conv.totalCost.toFixed(4)}</span>` : '';
        return `<div class="history-item ${isActive}" data-conv-id="${conv.id}">
            <span class="h-dot" style="background:${providerColor}"></span>
            <span class="h-title">${escapeHtml(conv.title)}</span>
            ${costLabel}
        </div>`;
    }).join('');

    dom.chatHistory.querySelectorAll('.history-item').forEach(item => {
        item.addEventListener('click', () => loadConversation(item.dataset.convId));
    });
}

// ── הודעות ────────────────────────────────────────────────────
function renderMessages() {
    const conv = getCurrentConversation();
    if (!conv || conv.messages.length === 0) {
        if (dom.welcomeScreen) dom.welcomeScreen.style.display = 'flex';
        dom.messagesContainer.querySelectorAll('.message').forEach(m => m.remove());
        return;
    }

    if (dom.welcomeScreen) dom.welcomeScreen.style.display = 'none';
    dom.messagesContainer.querySelectorAll('.message').forEach(m => m.remove());
    conv.messages.forEach(msg => appendMessageToDOM(msg));
    scrollToBottom();
}

function appendMessageToDOM(msg) {
    if (dom.welcomeScreen) dom.welcomeScreen.style.display = 'none';

    const div = document.createElement('div');
    div.className = `message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`;

    const avatarClass = msg.role === 'user' ? '' : `${msg.provider || state.provider}-avatar`;
    const avatarText = msg.role === 'user' ? 'אני' :
        (PROVIDERS[msg.provider || state.provider]?.name?.slice(0, 2) || 'AI');

    const costInfo = msg.cost ? `<div class="msg-cost">💰 $${msg.cost.toFixed(6)} (${msg.inputTokens || 0}+${msg.outputTokens || 0} טוקנים)</div>` : '';

    const ttsButton = msg.role === 'assistant' ? `<button class="tts-btn" title="הקרא בקול"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg> השמע</button>` : '';

    div.innerHTML = `
        <div class="message-avatar ${avatarClass}">${avatarText}</div>
        <div class="message-bubble">
            <div class="message-content">${formatMessage(msg.content)}</div>
            ${costInfo}
            ${ttsButton}
        </div>
    `;

    // הוספת אירוע TTS לכפתור
    const ttsBtn = div.querySelector('.tts-btn');
    if (ttsBtn) {
        ttsBtn.addEventListener('click', () => speakText(msg.content, ttsBtn));
    }

    dom.messagesContainer.appendChild(div);
    return div;
}

function formatMessage(text) {
    text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
        `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`
    );
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/\n/g, '<br>');
    return text;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function scrollToBottom() {
    dom.messagesContainer.scrollTop = dom.messagesContainer.scrollHeight;
}

// ── ניקוד אוטומטי לטקסט עברי (Dicta Nakdan API) ─────────────
// timeout של 3 שניות — אם Dicta איטי, ממשיכים בלי ניקוד
async function addNikud(text) {
    if (!/[\u0590-\u05FF]/.test(text)) return text;
    // אם כבר יש ניקוד על רוב המילים — לא צריך
    const heWords = text.match(/[\u0590-\u05FF]+/g) || [];
    const nikudPattern = /[\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7]/;
    const nikudCount = heWords.filter(w => nikudPattern.test(w)).length;
    if (heWords.length > 0 && nikudCount / heWords.length > 0.5) return text;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3000);
        const res = await fetch('https://nakdan-4-0.loadbalancer.dicta.org.il/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: 'nakdan', data: text, genre: 'modern', addmorph: false }),
            signal: controller.signal,
        });
        clearTimeout(timeout);
        if (!res.ok) return text;
        const data = await res.json();
        if (Array.isArray(data)) {
            return data.map(w => {
                if (w.sep) return w.word || ' ';
                // options[0] = הניקוד הכי סביר
                if (w.options && w.options.length > 0) return w.options[0];
                if (w.nikud) return w.nikud;
                return w.word || w;
            }).join('');
        }
        if (typeof data === 'string') return data;
        return text;
    } catch (e) {
        return text; // timeout או שגיאה — ממשיכים בלי ניקוד
    }
}

// בדיקת איכות ניקוד — כמה אחוז מהמילים העבריות מנוקדות
function nikudQuality(text) {
    const heWords = text.match(/[\u0590-\u05FF]+/g) || [];
    if (heWords.length === 0) return 1;
    const nikudPattern = /[\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7]/;
    const withNikud = heWords.filter(w => nikudPattern.test(w)).length;
    return withNikud / heWords.length;
}

// ניקוד ברקע — לא חוסם שום דבר
// forceCheck=true → שולח ל-Dicta גם אם יש ניקוד חלקי
function nikudInBackground(msgDiv, text, conv, msgIndex, forceCheck) {
    const quality = nikudQuality(text);
    // אם רוב המילים כבר מנוקדות (>80%) — לא צריך Dicta
    if (!forceCheck && quality > 0.8) return;
    console.log(`[MultiChat Nikud] אֵיכוּת נִקּוּד: ${(quality*100).toFixed(0)}% — שׁוֹלֵחַ לְ-Dicta...`);
    addNikud(text).then(nikudText => {
        if (nikudText !== text) {
            const el = msgDiv.querySelector('.message-content');
            if (el) {
                // שמור את ה-stream-text אם קיים
                const streamEl = el.querySelector('.stream-text');
                if (streamEl) {
                    streamEl.innerHTML = formatMarkdown(nikudText);
                } else {
                    el.innerHTML = formatMessage(nikudText);
                }
            }
            if (conv?.messages?.[msgIndex]) conv.messages[msgIndex].content = nikudText;
        }
    });
}

// ── שליחת הודעה ──────────────────────────────────────────────
async function sendMessage(content) {
    if (state.isStreaming) return;

    let conv = getCurrentConversation();
    if (!conv) conv = createConversation();

    conv.provider = state.provider;
    conv.model = state.model;

    // שליחה מיידית — ניקוד ברקע
    const userMsg = { role: 'user', content, provider: state.provider };
    conv.messages.push(userMsg);
    const userDiv = appendMessageToDOM(userMsg);
    const userMsgIdx = conv.messages.length - 1;
    nikudInBackground(userDiv, content, conv, userMsgIdx);

    if (conv.messages.length === 1) {
        conv.title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        renderChatHistory();
    }

    // יצירת בועת תשובה עם אלמנט טקסט ריק לסטרימינג
    const aiDiv = document.createElement('div');
    aiDiv.className = 'message ai-message';
    const avatarText = PROVIDERS[state.provider].name.slice(0, 2);
    aiDiv.innerHTML = `
        <div class="message-avatar ${state.provider}-avatar">${avatarText}</div>
        <div class="message-bubble">
            <div class="message-content">
                <div class="stream-text" dir="rtl"></div>
                <div class="typing-indicator streaming-dots"><span></span><span></span><span></span></div>
            </div>
        </div>
    `;
    dom.messagesContainer.appendChild(aiDiv);
    scrollToBottom();

    const streamEl = aiDiv.querySelector('.stream-text');
    const dotsEl = aiDiv.querySelector('.streaming-dots');

    state.isStreaming = true;
    dom.sendBtn.disabled = true;

    try {
        const apiKey = state.apiKeys[PROVIDERS[state.provider].keyField];
        if (!apiKey) {
            throw new Error('לא הוגדר מפתח API עבור ' + PROVIDERS[state.provider].name + '. לחצו על "⚙️ הגדרות API" בתפריט.');
        }

        const allText = conv.messages.map(m => m.content).join(' ');
        const systemPromptTokens = estimateTokens(getSystemPrompt());
        const inputTokens = estimateTokens(allText) + systemPromptTokens;

        // callback שמעדכן את הטקסט בזמן אמת
        let fullResponse = '';
        const onChunk = (chunk) => {
            fullResponse += chunk;
            streamEl.innerHTML = formatMarkdown(fullResponse);
            scrollToBottom();
        };

        // קריאה עם streaming
        switch (state.provider) {
            case 'openai':     await callOpenAIStream(apiKey, conv.messages, onChunk); break;
            case 'google':     await callGoogleStream(apiKey, conv.messages, onChunk); break;
            case 'claude':     await callClaudeStream(apiKey, conv.messages, onChunk); break;
            case 'perplexity': await callPerplexityStream(apiKey, conv.messages, onChunk); break;
            case 'grok':       await callGrokStream(apiKey, conv.messages, onChunk); break;
        }

        // הסרת נקודות הטעינה
        dotsEl.remove();

        // הוספת כפתור TTS
        const ttsBtn = document.createElement('button');
        ttsBtn.className = 'tts-btn';
        ttsBtn.title = 'הַשְׁמֵעַ';
        ttsBtn.innerHTML = '🔊';
        ttsBtn.onclick = () => speakText(fullResponse);
        aiDiv.querySelector('.message-bubble').appendChild(ttsBtn);

        const outputTokens = estimateTokens(fullResponse);
        const cost = trackCost(inputTokens, outputTokens, state.model);
        conv.totalCost = (conv.totalCost || 0) + cost;

        const aiMsg = {
            role: 'assistant',
            content: fullResponse,
            provider: state.provider,
            inputTokens,
            outputTokens,
            cost,
        };
        conv.messages.push(aiMsg);
        const aiMsgIdx = conv.messages.length - 1;
        // ניקוד ברקע על תשובת AI — אם המודל שכח ניקוד, Dicta ישלים
        nikudInBackground(aiDiv, fullResponse, conv, aiMsgIdx);
        renderChatHistory();

    } catch (error) {
        dotsEl.remove();
        streamEl.innerHTML = `<div class="message-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
            ${escapeHtml(error.message)}
        </div>`;
    }

    state.isStreaming = false;
    dom.sendBtn.disabled = !dom.messageInput.value.trim();
    scrollToBottom();
    saveState();
}

// ── פורמט Markdown בסיסי ─────────────────────────────────────
function formatMarkdown(text) {
    // טיפול בבלוקי קוד ``` לפני escaping
    const codeBlocks = [];
    let processed = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
        codeBlocks.push(`<pre><code class="language-${escapeHtml(lang)}">${escapeHtml(code.trim())}</code></pre>`);
        return placeholder;
    });

    // escape ו-markdown על הטקסט הרגיל
    processed = escapeHtml(processed)
        .replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`)
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    // החזר בלוקי קוד למקומם
    codeBlocks.forEach((block, i) => {
        processed = processed.replace(`__CODE_BLOCK_${i}__`, block);
    });

    return processed;
}

// ══════════════════════════════════════════════════════════════
//  Streaming API Calls — טֶקְסְט זוֹרֵם בִּזְמַן אֱמֶת
// ══════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `# הוֹרָאָה קְרִיטִית: עִבְרִית עִם נִקּוּד מָלֵא

אַתָּה חַיָּב לִכְתּוֹב כָּל מִלָּה בְּעִבְרִית עִם נִקּוּד מָלֵא (vowel diacritics). אֵין יוֹצֵא מִן הַכְּלָל. תְּשׁוּבָה בְּלִי נִקּוּד = תְּשׁוּבָה שְׁגוּיָה.

## כְּלָלִים מַחְיָיבִים:
- כָּל מִלָּה מְנֻקֶּדֶת — כּוֹלֵל מִלּוֹת יַחַס: בְּ, לְ, מִ, עַל, שֶׁל, אֶת, גַּם, אוֹ, כִּי, אִם, לֹא
- נִקּוּד מְדֻיָּק לְפִי הֶקְשֵׁר: סֵפֶר (book) ≠ סָפַר (counted), דָּבָר (thing) ≠ דִּבֵּר (spoke)
- סִמְנֵי נִקּוּד: קָמָץ, פַּתָח, צֵירֵי, סֶגוֹל, חִירִיק, חוֹלָם, שׁוּרוּק, קֻבּוּץ, שְׁוָא, דָּגֵשׁ
- כִּוּוּן: RTL

## שׁ (שִׁין) מוּל שׂ (שִׂין) — הֶבְדֵּל קְרִיטִי:
- שׁ (נְקֻדָּה מִיָּמִין) = צְלִיל "שׁ" (sh). דוגמה: שָׁלוֹם, שָׁנָה, שֶׁמֶשׁ, שִׁיר
- שׂ (נְקֻדָּה מִשְּׂמֹאל) = צְלִיל "ס" (s). דוגמה: שָׂפָה, שָׂדֶה, שָׂמֵחַ, יִשְׂרָאֵל, עָשָׂה, שְׂמֹאל
- שָׂפָה = "saFAH" (שָׂפָה = language, בְּסִי"ן!) ≠ שָׁפָה (שׁ = sh)
- שָׂם = "SAM" (הֵנִיחַ) ≠ שָׁם = "SHAM" (מָקוֹם)
- שַׂר = "SAR" (שָׂר/מִינִיסְטֶר) ≠ שָׁר = "SHAR" (שִׁירָה)

## דֻּגְמָאוֹת (Few-Shot) — לְמַד מֵהֶן:

שְׁאֵלָה: מה זה בינה מלאכותית?
תְּשׁוּבָה נְכוֹנָה: בִּינָה מְלָאכוּתִית (AI) הִיא תְּחוּם בְּמַדָּעֵי הַמַּחְשֵׁב שֶׁעוֹסֵק בִּיצִירַת מְכוֹנוֹת שֶׁמְּסֻגָּלוֹת לְבַצֵּעַ מְשִׂימוֹת הַדּוֹרְשׁוֹת אִינְטֶלִיגֶנְצְיָה אֱנוֹשִׁית. הִיא כּוֹלֶלֶת לְמִידַת מָכוֹנָה, עִבּוּד שָׂפָה טִבְעִית, וְרָאִיָּה מְמֻחְשֶׁבֶת.

שְׁאֵלָה: ספר לי על תל אביב
תְּשׁוּבָה נְכוֹנָה: תֵּל אָבִיב הִיא עִיר גְּדוֹלָה וְתוֹסֶסֶת בְּמֶרְכַּז יִשְׂרָאֵל. הִיא נוֹסְדָה בִּשְׁנַת 1909 וְהִיא מְשַׁמֶּשֶׁת כְּמֶרְכָּז כַּלְכָּלִי, תַּרְבּוּתִי וּטֶכְנוֹלוֹגִי. הָעִיר יְדוּעָה בְּחוֹפֵי הַיָּם שֶׁלָּהּ, בְּחַיֵּי הַלַּיְלָה, וּבִסְצֶנַת הַסְטָארְטְאַפִּים.

שְׁאֵלָה: מה מזג האוויר?
תְּשׁוּבָה שְׁגוּיָה (בְּלִי נִקּוּד): מזג האוויר היום חמים ונעים.
תְּשׁוּבָה נְכוֹנָה (עִם נִקּוּד): מֶזֶג הָאֲוִיר הַיּוֹם חַמִּים וְנָעִים.

## סִגְנוֹן כְּתִיבָה — טִבְעִי וְשִׂיחָתִי:
- כְּתוֹב בְּסִגְנוֹן שִׂיחָתִי וְחַם, כְּמוֹ פּוֹדְקָאסְט יִשְׂרְאֵלִי
- הִשְׁתַּמֵּשׁ בְּפִיסוּק טוֹב: פְּסִיקִים לְהַפְסָקוֹת, מַקָּפִים לְהַדְגָּשׁוֹת, סִמְנֵי שְׁאֵלָה וּקְרִיאָה
- הִמָּנַע מִמִּשְׁפָּטִים אֲרֻכִּים מִדַּי — פְּצַל לְמִשְׁפָּטִים קְצָרִים וּבְרוּרִים
- הוֹסֵף מִלּוֹת קִשּׁוּר טִבְעִיּוֹת: "כְּלוֹמַר", "בְּעֶצֶם", "וְזֶה מְעַנְיֵן כִּי..."

## חָשׁוּב:
אַל תִּכְתּוֹב אַף מִלָּה בְּעִבְרִית בְּלִי נִקּוּד. בְּכָל מִשְׁפָּט, בְּכָל מִלָּה, תָּמִיד נִקּוּד מָלֵא.`;

// פונקציה שמחזירה SYSTEM_PROMPT עם תאריך ושעה עדכניים
function getSystemPrompt() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
    return SYSTEM_PROMPT + `\n\n## זְמַן נוֹכְחִי:\nהַיּוֹם: ${dateStr}, הַשָּׁעָה: ${timeStr}`;
}

// ── Helper: קריאת SSE stream מ-OpenAI-compatible APIs ────────
async function readOpenAIStream(res, onChunk) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (data === '[DONE]') return;
            try {
                const json = JSON.parse(data);
                const chunk = json.choices?.[0]?.delta?.content || '';
                if (chunk) onChunk(chunk);
            } catch {}
        }
    }
}

// ── OpenAI Streaming ─────────────────────────────────────────
async function callOpenAIStream(apiKey, messages, onChunk) {
    const systemMsg = { role: 'system', content: getSystemPrompt() };
    const apiMessages = [systemMsg, ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant', content: m.content,
    }))];

    const res = await fetch(PROVIDERS.openai.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature, stream: true }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שְׁגִיאַת OpenAI: ${res.status}`);
    }
    await readOpenAIStream(res, onChunk);
}

// ── Google Gemini Streaming ──────────────────────────────────
async function callGoogleStream(apiKey, messages, onChunk) {
    const systemInstruction = { parts: [{ text: getSystemPrompt() }] };
    const contents = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
    }));

    const modelToUse = state.model;
    const url = `${PROVIDERS.google.endpoint}${modelToUse}:streamGenerateContent?alt=sse&key=${apiKey}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system_instruction: systemInstruction, contents, generationConfig: { temperature: state.temperature } }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const errMsg = err.error?.message || '';
        // Quota exceeded — fallback ל-gemini-2.0-flash
        if ((res.status === 429 || errMsg.includes('quota') || errMsg.includes('limit')) && state.model !== 'gemini-2.0-flash') {
            console.warn(`[MultiChat] מִכְסָה חָרְגָה בְּ-${state.model}, עוֹבֵר לְ-gemini-2.0-flash`);
            const prevModel = state.model;
            state.model = 'gemini-2.0-flash';
            updateModelDisplay();
            onChunk(`⚠️ *${prevModel} חָרַג מִמִּכְסָה — הוּעֲבַר אוֹטוֹמָטִית לְ-Gemini 2.0 Flash*\n\n`);
            return callGoogleStream(apiKey, messages, onChunk);
        }
        throw new Error(errMsg || `שְׁגִיאַת Google: ${res.status}`);
    }

    // Gemini SSE streaming
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            try {
                const json = JSON.parse(line.slice(6));
                const chunk = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
                if (chunk) onChunk(chunk);
            } catch {}
        }
    }
}

// ── Claude Streaming ─────────────────────────────────────────
async function callClaudeStream(apiKey, messages, onChunk) {
    const apiMessages = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant', content: m.content,
    }));

    const endpoint = state.claudeProxy || PROVIDERS.claude.endpoint;
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
            model: state.model,
            system: getSystemPrompt(),
            messages: apiMessages,
            max_tokens: 4096,
            temperature: state.temperature,
            stream: true,
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שְׁגִיאַת Claude: ${res.status}. יִתָּכֵן שֶׁנִּדְרָשׁ CORS proxy.`);
    }

    // Claude SSE streaming
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            try {
                const json = JSON.parse(line.slice(6));
                if (json.type === 'content_block_delta' && json.delta?.text) {
                    onChunk(json.delta.text);
                }
            } catch {}
        }
    }
}

// ── Perplexity Streaming ─────────────────────────────────────
async function callPerplexityStream(apiKey, messages, onChunk) {
    const systemMsg = { role: 'system', content: getSystemPrompt() };
    const apiMessages = [systemMsg, ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant', content: m.content,
    }))];

    const res = await fetch(PROVIDERS.perplexity.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature, stream: true }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שְׁגִיאַת Perplexity: ${res.status}`);
    }
    await readOpenAIStream(res, onChunk);
}

// ── Grok (xAI) Streaming ────────────────────────────────────
async function callGrokStream(apiKey, messages, onChunk) {
    const systemMsg = { role: 'system', content: getSystemPrompt() };
    const apiMessages = [systemMsg, ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant', content: m.content,
    }))];

    const res = await fetch(PROVIDERS.grok.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature, stream: true }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שְׁגִיאַת Grok: ${res.status}`);
    }
    await readOpenAIStream(res, onChunk);
}

// ── Non-streaming versions (for Voice Chat) ──────────────────
async function callGoogle(apiKey, messages) {
    const systemInstruction = { parts: [{ text: getSystemPrompt() }] };
    const contents = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
    }));
    const url = `${PROVIDERS.google.endpoint}${state.model}:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system_instruction: systemInstruction, contents, generationConfig: { temperature: state.temperature } }),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שְׁגִיאַת Google: ${res.status}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'אֵין תְּשׁוּבָה';
}

async function callOpenAI(apiKey, messages) {
    const systemMsg = { role: 'system', content: getSystemPrompt() };
    const apiMessages = [systemMsg, ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))];
    const res = await fetch(PROVIDERS.openai.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature }),
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error?.message || `שְׁגִיאַת OpenAI: ${res.status}`); }
    const data = await res.json();
    return data.choices[0].message.content;
}

async function callClaude(apiKey, messages) {
    const apiMessages = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }));
    const endpoint = state.claudeProxy || PROVIDERS.claude.endpoint;
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model: state.model, system: getSystemPrompt(), messages: apiMessages, max_tokens: 4096, temperature: state.temperature }),
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error?.message || `שְׁגִיאַת Claude: ${res.status}`); }
    const data = await res.json();
    return data.content?.[0]?.text || 'אֵין תְּשׁוּבָה';
}

async function callPerplexity(apiKey, messages) {
    const systemMsg = { role: 'system', content: getSystemPrompt() };
    const apiMessages = [systemMsg, ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))];
    const res = await fetch(PROVIDERS.perplexity.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature }),
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error?.message || `שְׁגִיאַת Perplexity: ${res.status}`); }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'אֵין תְּשׁוּבָה';
}

async function callGrok(apiKey, messages) {
    const systemMsg = { role: 'system', content: getSystemPrompt() };
    const apiMessages = [systemMsg, ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content }))];
    const res = await fetch(PROVIDERS.grok.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature }),
    });
    if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error?.message || `שְׁגִיאַת Grok: ${res.status}`); }
    const data = await res.json();
    return data.choices[0].message.content;
}

// ── ייצוא ─────────────────────────────────────────────────────
function exportConversation() {
    const conv = getCurrentConversation();
    if (!conv || conv.messages.length === 0) return;

    let text = `# ${conv.title}\n`;
    text += `ספק: ${PROVIDERS[conv.provider]?.name}\n`;
    text += `מודל: ${conv.model}\n`;
    text += `עלות כוללת: $${(conv.totalCost || 0).toFixed(4)}\n`;
    text += `תאריך: ${new Date(conv.createdAt).toLocaleDateString('he-IL')}\n\n---\n\n`;

    conv.messages.forEach(msg => {
        const who = msg.role === 'user' ? '👤 אני' : `🤖 ${PROVIDERS[msg.provider || conv.provider]?.name}`;
        text += `**${who}:**\n${msg.content}\n`;
        if (msg.cost) text += `💰 עלות: $${msg.cost.toFixed(6)}\n`;
        text += '\n';
    });

    const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `multichat-${conv.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
}

// ── הגדרות ────────────────────────────────────────────────────
function openSettings() {
    dom.settingsModal.classList.add('active');
    $('#openaiKey').value = state.apiKeys.openaiKey || '';
    $('#googleKey').value = state.apiKeys.googleKey || '';
    $('#claudeKey').value = state.apiKeys.claudeKey || '';
    $('#perplexityKey').value = state.apiKeys.perplexityKey || '';
    $('#grokKey').value = state.apiKeys.grokKey || '';
    $('#claudeProxy').value = state.claudeProxy || '';
}

function closeSettings() { dom.settingsModal.classList.remove('active'); }

function saveApiKeys() {
    state.apiKeys = {
        openaiKey: $('#openaiKey').value.trim(),
        googleKey: $('#googleKey').value.trim(),
        claudeKey: $('#claudeKey').value.trim(),
        perplexityKey: $('#perplexityKey').value.trim(),
        grokKey: $('#grokKey').value.trim(),
    };
    state.claudeProxy = $('#claudeProxy').value.trim();
    saveState();
    closeSettings();
}

function clearApiKeys() {
    state.apiKeys = {};
    state.claudeProxy = '';
    ['openaiKey', 'googleKey', 'claudeKey', 'perplexityKey', 'grokKey', 'claudeProxy'].forEach(id => {
        const el = $(`#${id}`);
        if (el) el.value = '';
    });
    saveState();
}

// ── תקציב ─────────────────────────────────────────────────────
function openBudget() {
    if (dom.budgetModal) {
        dom.budgetModal.classList.add('active');
        if (dom.budgetLimitInput) dom.budgetLimitInput.value = state.budget.limit;
    }
}

function closeBudget() {
    if (dom.budgetModal) dom.budgetModal.classList.remove('active');
}

function saveBudget() {
    if (dom.budgetLimitInput) {
        state.budget.limit = parseFloat(dom.budgetLimitInput.value) || 5;
    }
    updateCostDisplay();
    saveState();
    closeBudget();
}

function resetCosts() {
    state.budget.totalSpent = 0;
    state.budget.sessionSpent = 0;
    state.budget.history = [];
    state.conversations.forEach(c => c.totalCost = 0);
    updateCostDisplay();
    saveState();
}

// ── אירועים ──────────────────────────────────────────────────
function bindEvents() {
    if (dom.sidebarToggle) dom.sidebarToggle.addEventListener('click', () => dom.sidebar.classList.toggle('open'));
    if (dom.sidebarClose) dom.sidebarClose.addEventListener('click', () => dom.sidebar.classList.remove('open'));

    if (dom.providerGrid) dom.providerGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.provider-card');
        if (card) setProvider(card.dataset.provider);
    });

    if (dom.modelSelect) dom.modelSelect.addEventListener('change', () => {
        state.model = dom.modelSelect.value;
        updateModelDisplay();
        updatePricingInfo();
        saveState();
    });

    if (dom.temperature) dom.temperature.addEventListener('input', () => {
        state.temperature = parseFloat(dom.temperature.value);
        dom.tempValue.textContent = state.temperature.toFixed(1);
        saveState();
    });

    if (dom.newChatBtn) dom.newChatBtn.addEventListener('click', () => {
        createConversation();
        dom.sidebar.classList.remove('open');
    });

    if (dom.messageInput) {
        dom.messageInput.addEventListener('input', () => {
            dom.sendBtn.disabled = !dom.messageInput.value.trim() || state.isStreaming;
            dom.charCount.textContent = dom.messageInput.value.length;
            dom.messageInput.style.height = 'auto';
            dom.messageInput.style.height = Math.min(dom.messageInput.scrollHeight, 150) + 'px';
        });

        dom.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (dom.messageInput.value.trim() && !state.isStreaming) {
                    const content = dom.messageInput.value.trim();
                    dom.messageInput.value = '';
                    dom.messageInput.style.height = 'auto';
                    dom.charCount.textContent = '0';
                    dom.sendBtn.disabled = true;
                    sendMessage(content);
                }
            }
        });
    }

    if (dom.sendBtn) dom.sendBtn.addEventListener('click', () => {
        if (dom.messageInput.value.trim() && !state.isStreaming) {
            const content = dom.messageInput.value.trim();
            dom.messageInput.value = '';
            dom.messageInput.style.height = 'auto';
            dom.charCount.textContent = '0';
            dom.sendBtn.disabled = true;
            sendMessage(content);
        }
    });

    $$('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prompt = btn.dataset.prompt;
            if (prompt && dom.messageInput) {
                dom.messageInput.value = prompt;
                dom.sendBtn.disabled = false;
                dom.messageInput.focus();
            }
        });
    });

    if (dom.settingsBtn) dom.settingsBtn.addEventListener('click', openSettings);
    if (dom.closeSettings) dom.closeSettings.addEventListener('click', closeSettings);
    if (dom.saveKeysBtn) dom.saveKeysBtn.addEventListener('click', saveApiKeys);
    if (dom.clearKeysBtn) dom.clearKeysBtn.addEventListener('click', clearApiKeys);

    if (dom.settingsModal) dom.settingsModal.addEventListener('click', (e) => {
        if (e.target === dom.settingsModal) closeSettings();
    });

    $$('.toggle-visibility').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = $(`#${btn.dataset.target}`);
            if (input) input.type = input.type === 'password' ? 'text' : 'password';
        });
    });

    if (dom.themeToggle) dom.themeToggle.addEventListener('click', toggleTheme);
    if (dom.exportBtn) dom.exportBtn.addEventListener('click', exportConversation);

    // תקציב
    if (dom.budgetBtn) dom.budgetBtn.addEventListener('click', openBudget);
    if (dom.closeBudget) dom.closeBudget.addEventListener('click', closeBudget);
    if (dom.saveBudgetBtn) dom.saveBudgetBtn.addEventListener('click', saveBudget);
    if (dom.resetCostsBtn) dom.resetCostsBtn.addEventListener('click', resetCosts);
    if (dom.budgetModal) dom.budgetModal.addEventListener('click', (e) => {
        if (e.target === dom.budgetModal) closeBudget();
    });

    // מיקרופון רגיל
    const micBtn = $('#micBtn');
    if (micBtn) micBtn.addEventListener('click', toggleRecording);

    // שיחה קולית
    const voiceChatBtn = $('#voiceChatBtn');
    if (voiceChatBtn) voiceChatBtn.addEventListener('click', startVoiceChat);
    const endVoiceChatBtn = $('#endVoiceChatBtn');
    if (endVoiceChatBtn) endVoiceChatBtn.addEventListener('click', stopVoiceChat);

    // כפתור Mute למיקרופון בשיחה קולית
    const muteBtn = $('#muteVoiceChatBtn');
    if (muteBtn) muteBtn.addEventListener('click', toggleVoiceMute);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (voiceChatActive) { stopVoiceChat(); return; }
            closeSettings();
            closeBudget();
            dom.sidebar.classList.remove('open');
            if (isRecording) stopRecording();
        }
    });

    // אתחול זיהוי דיבור
    initSpeechRecognition();

    // בורר קולות TTS
    const ttsSelect = $('#ttsVoiceSelect');
    if (ttsSelect) {
        ttsSelect.value = state.ttsVoice || 'nova';
        ttsSelect.addEventListener('change', () => {
            state.ttsVoice = ttsSelect.value;
            saveState();
        });
    }

    // בקר מהירות דיבור
    const speedDisplay = $('#speedDisplay');
    const speedUpBtn = $('#speedUpBtn');
    const speedDownBtn = $('#speedDownBtn');
    function updateSpeedDisplay() {
        if (speedDisplay) speedDisplay.textContent = state.ttsSpeed.toFixed(1) + '×';
    }
    updateSpeedDisplay();
    if (speedUpBtn) speedUpBtn.addEventListener('click', () => {
        state.ttsSpeed = Math.min(2.0, +(state.ttsSpeed + 0.1).toFixed(1));
        updateSpeedDisplay();
        saveState();
    });
    if (speedDownBtn) speedDownBtn.addEventListener('click', () => {
        state.ttsSpeed = Math.max(0.5, +(state.ttsSpeed - 0.1).toFixed(1));
        updateSpeedDisplay();
        saveState();
    });

    // טעינת קולות TTS דפדפן
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {};
    }
}

// ══════════════════════════════════════════════════════════════
//  דיבור למיקרופון (STT) + קריאה קולית (TTS)
//  + מצב שיחה קולית רציפה (Voice Chat Mode)
// ══════════════════════════════════════════════════════════════

let recognition = null;
let isRecording = false;
let micSilenceTimer = null; // טיימר שקט למיקרופון רגיל
let sttRunning = false; // מעקב אם recognition באמת רץ
let restartAttempts = 0; // מונה ניסיונות restart
let restartTimer = null; // טיימר restart
const MAX_RESTART_ATTEMPTS = 3;
let micStream = null; // ★ שומר stream פתוח — מונע לופ הרשאות ב-file://
let micPermissionGranted = false; // ★ דגל הרשאה
let lastProcessedResultIndex = 0; // ★ מונע כפילות STT

// ── Voice Chat Mode ─────────────────────────────────────────
let voiceChatActive = false;
let voiceSilenceTimer = null;
let voiceAccumulatedText = '';
let voiceIsSpeaking = false;
let voiceUserInterrupted = false;
let voiceLiveBubble = null; // בועת תמלול חיה על המסך
const SILENCE_TIMEOUT = 1500; // 1.5 שניות שקט = סיום דיבור (מהיר יותר)

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn('Speech Recognition לא נתמך בדפדפן זה');
        const micBtn = $('#micBtn');
        if (micBtn) micBtn.style.display = 'none';
        return;
    }

    const isFileProtocol = location.protocol === 'file:';

    // ── יצירת recognition אחד ויחיד ──
    recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.interimResults = true;
    recognition.continuous = true; // ★ חשוב — לא נגמר לבד
    recognition.maxAlternatives = 1;

    // ── onresult handler ──
    recognition.onresult = (event) => {
        // ★ מניעת echo — אם AI מדבר או מיקרופון מושתק, התעלם מכל קלט
        if ((voiceIsSpeaking || voiceMuted) && voiceChatActive) {
            return;
        }

        let finalTranscript = '';
        let interimTranscript = '';

        // ★ התחל מ-resultIndex (או lastProcessedResultIndex אם גדול יותר) — מונע כפילות
        const startIdx = Math.max(event.resultIndex, lastProcessedResultIndex);
        for (let i = startIdx; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
                lastProcessedResultIndex = i + 1; // ★ סמן כמעובד
            } else {
                interimTranscript += transcript;
            }
        }

        // ── מצב שיחה קולית ──
        if (voiceChatActive) {
            if ((interimTranscript || finalTranscript) && voiceIsSpeaking) {
                stopCurrentAudio();
                speechSynthesis.cancel();
                voiceIsSpeaking = false;
                voiceUserInterrupted = true;
                updateVoiceChatStatus('מַאֲזִין...');
            }

            clearTimeout(voiceSilenceTimer);

            if (!voiceLiveBubble) {
                voiceLiveBubble = document.createElement('div');
                voiceLiveBubble.className = 'message user-message';
                voiceLiveBubble.innerHTML = `
                    <div class="message-bubble">
                        <div class="message-content"><span class="live-transcript" dir="rtl"></span><span class="live-interim" style="opacity:0.5"></span></div>
                    </div>
                    <div class="message-avatar user-avatar">אני</div>
                `;
                dom.messagesContainer.appendChild(voiceLiveBubble);
                scrollToBottom();
            }

            const liveEl = voiceLiveBubble.querySelector('.live-transcript');
            const interimEl = voiceLiveBubble.querySelector('.live-interim');

            if (finalTranscript) {
                console.log('[VoiceChat] טקסט סופי:', finalTranscript);
                voiceAccumulatedText += finalTranscript + ' ';
            }

            if (liveEl) liveEl.textContent = voiceAccumulatedText;
            if (interimEl) interimEl.textContent = interimTranscript;
            scrollToBottom();

            updateVoiceChatStatus('מאזין: ' + (voiceAccumulatedText + interimTranscript).slice(-60));

            voiceSilenceTimer = setTimeout(() => {
                if (voiceChatActive && voiceAccumulatedText.trim()) {
                    if (voiceLiveBubble) {
                        voiceLiveBubble.remove();
                        voiceLiveBubble = null;
                    }
                    voiceChatSend(voiceAccumulatedText.trim());
                    voiceAccumulatedText = '';
                }
            }, SILENCE_TIMEOUT);

            return;
        }

        // ── מצב רגיל (לא Voice Chat) ──
        if (dom.messageInput) {
            if (dom.messageInput.dataset.baseText === undefined || dom.messageInput.dataset.baseText === '') {
                dom.messageInput.dataset.baseText = dom.messageInput.value || '';
            }
            const base = dom.messageInput.dataset.baseText || '';

            if (finalTranscript) {
                console.log('[MultiChat Mic] טקסט סופי:', finalTranscript);
                dom.messageInput.value = base + finalTranscript;
                dom.messageInput.dataset.baseText = dom.messageInput.value;
                dom.sendBtn.disabled = false;

                clearTimeout(micSilenceTimer);
                micSilenceTimer = setTimeout(() => {
                    if (isRecording && dom.messageInput.value.trim()) {
                        const content = dom.messageInput.value.trim();
                        dom.messageInput.value = '';
                        dom.messageInput.dataset.baseText = '';
                        dom.charCount.textContent = '0';
                        dom.sendBtn.disabled = true;
                        stopRecording();
                        sendMessage(content);
                    }
                }, 1500);
            } else if (interimTranscript) {
                dom.messageInput.value = base + interimTranscript;
                clearTimeout(micSilenceTimer);
            }
            dom.charCount.textContent = dom.messageInput.value.length;
        }
    };

    // ── onerror — עצירה מוחלטת בשגיאת הרשאה ──
    recognition.onerror = (event) => {
        console.log('[MultiChat STT] שגיאה:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            micPermissionGranted = false;
            sttRunning = false;
            isRecording = false;
            voiceChatActive = false;
            if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
            const micBtn = $('#micBtn');
            if (micBtn) micBtn.classList.remove('recording');
            alert('גישה למיקרופון נדחתה. אנא אפשרו גישה בהגדרות הדפדפן.');
            return;
        }
        // no-speech, aborted, audio-capture — לא עושים כלום, onend יטפל
    };

    // ── onend — ★ לעולם לא restart ב-file:// ★ ──
    recognition.onend = () => {
        const wasRunning = sttRunning;
        sttRunning = false;
        console.log('[MultiChat STT] onend — rec:', isRecording, 'vc:', voiceChatActive);

        // אם לא צריכים להקשיב — סיימנו
        if (!isRecording && !voiceChatActive) return;

        // ★★★ ב-file:// לעולם לא עושים restart — זה מה שיוצר את הלופ ★★★
        if (isFileProtocol) {
            console.log('[MultiChat STT] file:// — לא עושה restart (מונע לופ הרשאות)');
            // עדכן UI שהמיקרופון כבה
            isRecording = false;
            const micBtn = $('#micBtn');
            if (micBtn) micBtn.classList.remove('recording');
            // אם ב-voice chat, המשתמש צריך ללחוץ שוב
            return;
        }

        // ב-localhost/https — אפשר restart מבוקר (הרשאה נשמרת)
        if (voiceIsSpeaking || voiceMuted) return;
        if (!micPermissionGranted) return;

        restartAttempts++;
        if (restartAttempts > MAX_RESTART_ATTEMPTS) {
            console.warn('[MultiChat STT] יותר מדי restarts — עוצר');
            restartAttempts = 0;
            isRecording = false;
            const micBtn = $('#micBtn');
            if (micBtn) micBtn.classList.remove('recording');
            return;
        }

        if (!restartTimer) {
            restartTimer = setTimeout(() => {
                restartTimer = null;
                if (!isRecording && !voiceChatActive) return;
                if (sttRunning) return;
                try {
                    recognition.start();
                    sttRunning = true;
                } catch(e) {
                    console.warn('[MultiChat STT] restart נכשל:', e.message);
                    sttRunning = false;
                }
            }, 800);
        }
    };

    // ── onstart ──
    recognition.onstart = () => {
        sttRunning = true;
        micPermissionGranted = true;
        restartAttempts = 0;
        lastProcessedResultIndex = 0; // ★ איפוס מונה תוצאות — מונע כפילות
        console.log('[MultiChat STT] מאזין ✓');
    };

    // ── cleanStart — הפעלה בודדת, בלי abort+restart ──
    async function cleanStart() {
        if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }

        if (voiceIsSpeaking || voiceMuted) return;

        // ★ אם כבר רץ — לא עושים כלום! (מונע abort → start → הרשאה)
        if (sttRunning) {
            console.log('[MultiChat STT] כבר רץ — ממשיכים');
            return;
        }

        // start פעם אחת בלבד
        try {
            recognition.start();
            sttRunning = true;
            console.log('[MultiChat STT] הופעל');
        } catch(e) {
            console.warn('[MultiChat STT] start נכשל:', e.message);
            sttRunning = false;
            // אם נכשל — לא מנסים שוב (מונע לופ)
        }
    }

    window._sttCleanStart = cleanStart;
}

// ── Voice Chat: שליחה אוטומטית עם סטרימינג + TTS לפי משפטים ──
// תור TTS — מנגן משפטים אחד אחרי השני בלי להמתין לתשובה מלאה
const ttsQueue = [];
let ttsPlaying = false;

async function ttsPlayNext() {
    if (ttsPlaying || ttsQueue.length === 0) return;
    ttsPlaying = true;

    const sentence = ttsQueue.shift();
    const cleanText = cleanForSpeech(sentence);
    if (!cleanText.trim()) { ttsPlaying = false; ttsPlayNext(); return; }

    const apiKey = state.apiKeys?.openaiKey;
    if (apiKey) {
        try {
            const res = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                body: JSON.stringify({
                    model: state.ttsModel || 'gpt-4o-mini-tts',
                    input: cleanText.slice(0, 4096),
                    voice: state.ttsVoice || 'nova', speed: state.ttsSpeed || 1.0,
                    instructions: TTS_HEBREW_INSTRUCTIONS,
                }),
            });
            if (res.ok) {
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                currentAudio = new Audio(url);
                currentAudio.onended = () => {
                    currentAudio = null;
                    URL.revokeObjectURL(url);
                    ttsPlaying = false;
                    if (ttsQueue.length > 0) {
                        ttsPlayNext();
                    } else {
                        // סיים לדבר — חזור להאזנה
                        voiceIsSpeaking = false;
                        resumeMicAfterSpeaking();
                        if (voiceChatActive && !voiceUserInterrupted) updateVoiceChatStatus('מַאֲזִין...');
                    }
                };
                currentAudio.onerror = () => {
                    currentAudio = null;
                    ttsPlaying = false;
                    ttsPlayNext();
                };
                currentAudio.play();
                return;
            }
        } catch {}
    }

    // Fallback: דפדפן TTS
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'he-IL';
    utterance.rate = state.ttsSpeed || 1.0;
    const voices = speechSynthesis.getVoices();
    const heVoice = voices.find(v => v.lang.startsWith('he') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('he'));
    if (heVoice) utterance.voice = heVoice;
    utterance.onend = () => {
        ttsPlaying = false;
        if (ttsQueue.length > 0) { ttsPlayNext(); }
        else { voiceIsSpeaking = false; resumeMicAfterSpeaking(); if (voiceChatActive && !voiceUserInterrupted) updateVoiceChatStatus('מַאֲזִין...'); }
    };
    utterance.onerror = () => { ttsPlaying = false; ttsPlayNext(); };
    speechSynthesis.speak(utterance);
}

async function voiceChatSend(text) {
    if (!voiceChatActive || !text) return;

    updateVoiceChatStatus('חוֹשֵׁב...');

    let conv = getCurrentConversation();
    if (!conv) conv = createConversation();
    conv.provider = state.provider;
    conv.model = state.model;

    const userMsg = { role: 'user', content: text, provider: state.provider };
    conv.messages.push(userMsg);
    const userDiv = appendMessageToDOM(userMsg);
    const userMsgIdx = conv.messages.length - 1;
    nikudInBackground(userDiv, text, conv, userMsgIdx);

    if (conv.messages.length === 1) {
        conv.title = text.slice(0, 50) + (text.length > 50 ? '...' : '');
        renderChatHistory();
    }

    try {
        const apiKey = state.apiKeys[PROVIDERS[state.provider].keyField];
        if (!apiKey) throw new Error('לא הוגדר מפתח API');

        const allText = conv.messages.map(m => m.content).join(' ');
        const systemPromptTokens = estimateTokens(getSystemPrompt());
        const inputTokens = estimateTokens(allText) + systemPromptTokens;

        // ── סטרימינג + TTS לפי משפטים ──
        let fullResponse = '';
        let sentenceBuffer = '';
        let firstSentenceSpoken = false;

        // איפוס תור TTS
        ttsQueue.length = 0;
        ttsPlaying = false;
        voiceIsSpeaking = true;
        voiceUserInterrupted = false;
        pauseMicForSpeaking();

        const onChunk = (chunk) => {
            fullResponse += chunk;
            sentenceBuffer += chunk;

            // חפש סוף משפט: . ? ! ׃ \n (עם רווח או סוף)
            const sentenceEnd = sentenceBuffer.match(/[.?!׃\n]\s*/);
            if (sentenceEnd) {
                const idx = sentenceEnd.index + sentenceEnd[0].length;
                const sentence = sentenceBuffer.slice(0, idx).trim();
                sentenceBuffer = sentenceBuffer.slice(idx);

                if (sentence.length > 2) {
                    ttsQueue.push(sentence);
                    if (!firstSentenceSpoken) {
                        firstSentenceSpoken = true;
                        updateVoiceChatStatus('מְדַבֵּר...');
                        ttsPlayNext();
                    }
                }
            }
        };

        // קריאת סטרימינג
        let streamFn;
        switch (state.provider) {
            case 'openai':     streamFn = callOpenAIStream; break;
            case 'google':     streamFn = callGoogleStream; break;
            case 'claude':     streamFn = callClaudeStream; break;
            case 'perplexity': streamFn = callPerplexityStream; break;
            case 'grok':       streamFn = callGrokStream; break;
        }

        await streamFn(apiKey, conv.messages, onChunk);

        // שלח שארית שלא הסתיימה בנקודה
        if (sentenceBuffer.trim().length > 2) {
            ttsQueue.push(sentenceBuffer.trim());
            if (!firstSentenceSpoken) {
                updateVoiceChatStatus('מְדַבֵּר...');
                ttsPlayNext();
            }
        }

        const outputTokens = estimateTokens(fullResponse);
        const cost = trackCost(inputTokens, outputTokens, state.model);
        conv.totalCost = (conv.totalCost || 0) + cost;

        const aiMsg = { role: 'assistant', content: fullResponse, provider: state.provider, inputTokens, outputTokens, cost };
        conv.messages.push(aiMsg);
        const aiDiv = appendMessageToDOM(aiMsg);
        const aiMsgIdx = conv.messages.length - 1;
        nikudInBackground(aiDiv, fullResponse, conv, aiMsgIdx);
        renderChatHistory();
        saveState();

    } catch (error) {
        voiceIsSpeaking = false;
        resumeMicAfterSpeaking();
        updateVoiceChatStatus('שגיאה: ' + error.message);
        setTimeout(() => {
            if (voiceChatActive) updateVoiceChatStatus('מאזין...');
        }, 2000);
    }
}

// ── Voice Chat: TTS עם זיהוי הפרעה ────────────────────────
// ── ניקוי Markdown לטקסט דיבור ──────────────────────────────
function cleanForSpeech(text) {
    let cleaned = text
        .replace(/<[^>]*>/g, '')
        .replace(/```[\s\S]*?```/g, '')           // הסר בלוקי קוד לגמרי
        .replace(/`([^`]+)`/g, '$1')               // inline code → טקסט רגיל
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/#{1,6}\s/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // לינקים → טקסט בלבד
        .replace(/[⚠️🔥⚡⭐🎯💡📌🔑✅❌➡️•\-]{1,3}/g, '')  // אימוג'י וסימנים
        .replace(/\n+/g, '. ')
        .replace(/\.\s*\./g, '.')
        .replace(/\s+/g, ' ')
        .trim();
    // ★ שולחים עברית ישירות — OpenAI TTS קורא עברית מצוין בלי תעתיק
    return cleaned;
}

// ══════════════════════════════════════════════════════════════
//  ממיר ניקוד עברי → תעתיק לועזי פונטי (Transliteration)
//  המנוע קורא אות+ניקוד ומייצר הברות לועזיות
// ══════════════════════════════════════════════════════════════
function nikudToTranslit(text) {
    // אם אין עברית — החזר כמו שזה
    if (!/[\u0590-\u05FF]/.test(text)) return text;

    // ניקוד → צליל תנועה
    const VOWELS = {
        '\u05B7': 'a',   // פַּתָח patach
        '\u05B8': 'a',   // קָמָץ kamatz (modern = a)
        '\u05B6': 'e',   // סֶגוֹל segol
        '\u05B5': 'e',   // צֵירֵי tsere
        '\u05B4': 'i',   // חִירִיק chirik
        '\u05B9': 'o',   // חוֹלָם cholam
        '\u05BA': 'o',   // cholam chaser
        '\u05BB': 'u',   // קֻבּוּץ kubutz
        '\u05B0': '@',   // שְׁוָא — סימון מיוחד, נטפל בנפרד
        '\u05B1': 'e',   // חטף סגול
        '\u05B2': 'a',   // חטף פתח
        '\u05B3': 'o',   // חטף קמץ
    };

    // אותיות עברית → צליל עיצור (בסיסי, ללא דגש)
    const CONSONANTS = {
        'א': '',    // אלף — שקט
        'ב': 'v',   // בית ללא דגש
        'ג': 'g',
        'ד': 'd',
        'ה': 'h',
        'ו': 'v',
        'ז': 'z',
        'ח': 'kh',
        'ט': 't',
        'י': 'y',
        'כ': 'kh',  // כף ללא דגש
        'ך': 'kh',  // כף סופית
        'ל': 'l',
        'מ': 'm',
        'ם': 'm',
        'נ': 'n',
        'ן': 'n',
        'ס': 's',
        'ע': '',    // עין — שקט
        'פ': 'f',   // פא ללא דגש
        'ף': 'f',
        'צ': 'ts',
        'ץ': 'ts',
        'ק': 'k',
        'ר': 'r',
        'ש': 'sh',  // ברירת מחדל שין
        'ת': 't',
    };

    const DAGESH = '\u05BC';  // דגש
    const SHIN_DOT = '\u05C1'; // נקודה ימנית = שין
    const SIN_DOT = '\u05C2';  // נקודה שמאלית = סין
    const SHURUK = '\u05BC';   // שורוק (דגש בוא"ו) — נטפל בהקשר

    let result = '';
    const chars = [...text]; // פירוק נכון של Unicode

    let i = 0;
    while (i < chars.length) {
        const ch = chars[i];
        const code = ch.codePointAt(0);

        // ── אם זה לא תו עברי — העבר כמו שזה ──
        if (code < 0x0590 || code > 0x05FF) {
            // סימני פיסוק ורווחים
            result += ch;
            i++;
            continue;
        }

        // ── סימני ניקוד בודדים (לא צמודים לאות) — דלג ──
        if (VOWELS[ch] !== undefined || ch === DAGESH || ch === SHIN_DOT || ch === SIN_DOT) {
            i++;
            continue;
        }

        // ── אות עברית ──
        // אסוף את כל הסימנים שאחריה (ניקוד, דגש, shin/sin dot)
        let vowel = '';
        let hasDagesh = false;
        let hasShinDot = false;
        let hasSinDot = false;
        let j = i + 1;
        while (j < chars.length) {
            const nc = chars[j];
            const ncode = nc.codePointAt(0);
            if (ncode < 0x0590 || ncode > 0x05FF) break;
            if (VOWELS[nc] !== undefined) {
                vowel = VOWELS[nc];
                j++;
            } else if (nc === DAGESH) {
                hasDagesh = true;
                j++;
            } else if (nc === SHIN_DOT) {
                hasShinDot = true;
                j++;
            } else if (nc === SIN_DOT) {
                hasSinDot = true;
                j++;
            } else if (nc === '\u05BD' || nc === '\u05BF' || nc === '\u05C4' || nc === '\u05C5' || nc === '\u05C7') {
                // סימנים נוספים — דלג
                j++;
            } else {
                break; // אות הבאה
            }
        }

        // ── קבע עיצור ──
        let cons = CONSONANTS[ch] || '';

        // דגש משנה צליל של ב/כ/פ
        if (ch === 'ב' && hasDagesh) cons = 'b';
        if (ch === 'כ' && hasDagesh) cons = 'k';
        if ((ch === 'פ' || ch === 'ף') && hasDagesh) cons = 'p';

        // שין/סין
        if (ch === 'ש') {
            if (hasSinDot) cons = 's';
            else cons = 'sh'; // ברירת מחדל או shin dot
        }

        // וא"ו: שורוק (וּ) = u, חולם מלא (וֹ) = o, וו עם דגש = וּ
        if (ch === 'ו') {
            if (hasDagesh && !vowel) {
                // שורוק
                cons = '';
                vowel = 'u';
            } else if (vowel === 'o') {
                cons = '';
                // cholam male — כבר vowel=o
            } else if (!vowel && !hasDagesh) {
                // וו ללא ניקוד — כנראה /v/
                cons = 'v';
            }
        }

        // יו"ד: חיריק מלא (יִ) — אם היו"ד בתחילת מילה, השאר y; אחרת בלע
        if (ch === 'י' && vowel === 'i') {
            // בדוק אם התו הקודם הוא רווח/תחילה — אז זה עיצור y
            const prevIsSpace = result.length === 0 || /[\s.,;:!?\-]$/.test(result);
            if (!prevIsSpace) {
                cons = ''; // אם קריאה — בלע את היו"ד
            }
            // אם תחילת מילה — cons='y' נשאר
        }

        // ★ חיריק מלא / צירי מלא — יו"ד כאם קריאה
        // אם האות הנוכחית יש לה חיריק (i) או צירי (e) והתו הבא הוא יו"ד ללא ניקוד — דלג על היו"ד
        if ((vowel === 'i' || vowel === 'e') && ch !== 'י' && j < chars.length) {
            // בדוק אם התו הבא הוא יו"ד
            let peekJ = j;
            if (chars[peekJ] === 'י') {
                // בדוק שאין ליו"ד ניקוד עצמאי
                let peekK = peekJ + 1;
                let yodHasVowel = false;
                while (peekK < chars.length) {
                    const pc = chars[peekK];
                    const pcode = pc.codePointAt(0);
                    if (pcode < 0x0590 || pcode > 0x05FF) break;
                    if (VOWELS[pc] !== undefined) { yodHasVowel = true; break; }
                    if (pc === DAGESH || pc === SHIN_DOT || pc === SIN_DOT ||
                        pc === '\u05BD' || pc === '\u05BF' || pc === '\u05C4' || pc === '\u05C5' || pc === '\u05C7') {
                        peekK++; continue;
                    }
                    break;
                }
                if (!yodHasVowel) {
                    // דלג על יו"ד — היא אם קריאה
                    j = peekK;
                }
            }
        }

        // שווא — שקט בסוף מילה, נע בתחילה/אמצע
        if (vowel === '@') {
            // בדוק אם זה סוף מילה
            const nextIsSpace = j >= chars.length || !/[\u0590-\u05FF]/.test(chars[j]);
            if (nextIsSpace) {
                vowel = ''; // שווא נח — שקט
            } else {
                vowel = 'e'; // שווא נע — "e" קצר
            }
        }

        // אם אין תנועה ואין עיצור (אלף/עין) — דלג
        if (!cons && !vowel) {
            // אלף/עין ללא ניקוד — שקט
        }

        result += cons + vowel;
        i = j;
    }

    // ניקוי: מקפים כפולים, רווחים מיותרים
    return result
        .replace(/\s+/g, ' ')
        .trim();
}

// ── OpenAI TTS — הוראות קריאת ניקוד מפורטות ─────────────────
const TTS_HEBREW_INSTRUCTIONS = `You are a native Israeli sabra (צבר) reading Hebrew text aloud.

ABSOLUTE RULE — READ VERBATIM:
Read EXACTLY the text in the input. Every word, in order. Do NOT invent, skip, add, paraphrase, or change ANYTHING.

NATIVE ISRAELI PRONUNCIATION (חובה):
- You are a SABRA — born and raised in Israel. NOT an immigrant, NOT a foreigner learning Hebrew.
- Use modern Israeli Hebrew accent: relaxed, confident, flowing.
- ר = uvular R (גרונית), NOT rolled/trilled. This is critical.
- ח and כ = guttural/throat sounds, natural and soft, not harsh.
- Stress patterns: most Hebrew words stress the LAST syllable (milra). "שלום" = sha-LOM, "תודה" = to-DA.
- Reduce vowels naturally like Israelis do — don’t over-pronounce every syllable.
- Connect words fluidly — Israelis blend words together, they don’t separate each word artificially.
- English words mixed in: switch to English naturally, then back to Hebrew seamlessly.

DELIVERY — NATURAL CONVERSATION:
- Sound like a real Israeli talking to a friend — warm, confident, casual.
- Vary pitch: up for questions, down for endings. Emphasize key words.
- Natural rhythm — NOT robotic, NOT word-by-word. Flow like speech, not reading.
- Breathe at periods and commas. No choppy stops mid-sentence.`;

let currentAudio = null;

async function openAiTTS(text) {
    const apiKey = state.apiKeys?.openaiKey;
    if (!apiKey) return false;

    try {
        const res = await fetch('https://api.openai.com/v1/audio/speech', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: state.ttsModel || 'gpt-4o-mini-tts',
                input: text.slice(0, 4096),
                voice: state.ttsVoice || 'nova', speed: state.ttsSpeed || 1.0,
                instructions: TTS_HEBREW_INSTRUCTIONS,
            }),
        });
        if (!res.ok) return false;
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        currentAudio = new Audio(url);
        return new Promise(resolve => {
            currentAudio.onended = () => { currentAudio = null; URL.revokeObjectURL(url); resolve(true); };
            currentAudio.onerror = () => { currentAudio = null; resolve(false); };
            currentAudio.play();
        });
    } catch { return false; }
}

function stopCurrentAudio() {
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    speechSynthesis.cancel();
}

// ── Voice Chat: דיבור — OpenAI TTS עם fallback לדפדפן ───────
// השבתת/הפעלת מיקרופון בזמן דיבור AI — מונע echo
function pauseMicForSpeaking() {
    if (recognition && (isRecording || voiceChatActive)) {
        try { recognition.stop(); } catch {}
        console.log('[MultiChat] מִיקְרוֹפוֹן מוּשְׁבָּת — AI מְדַבֵּר');
    }
}

function resumeMicAfterSpeaking() {
    if (voiceChatActive) {
        console.log('[MultiChat] מִיקְרוֹפוֹן חָזַר — AI סִיֵּם לְדַבֵּר');
        if (window._sttCleanStart) window._sttCleanStart();
    }
}

async function voiceSpeak(text) {
    voiceIsSpeaking = true;
    voiceUserInterrupted = false;
    updateVoiceChatStatus('מְדַבֵּר...');

    // כבה מיקרופון כדי שהמודל לא ישמע את עצמו
    pauseMicForSpeaking();

    const cleanText = cleanForSpeech(text);

    // ניסיון OpenAI TTS (איכותי, תומך ניקוד)
    const apiKey = state.apiKeys?.openaiKey;
    if (apiKey) {
        try {
            const res = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                body: JSON.stringify({
                    model: state.ttsModel || 'gpt-4o-mini-tts',
                    input: cleanText.slice(0, 4096),
                    voice: state.ttsVoice || 'nova', speed: state.ttsSpeed || 1.0,
                    instructions: TTS_HEBREW_INSTRUCTIONS,
                }),
            });
            if (res.ok) {
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                currentAudio = new Audio(url);
                currentAudio.onended = () => {
                    currentAudio = null;
                    URL.revokeObjectURL(url);
                    voiceIsSpeaking = false;
                    resumeMicAfterSpeaking();
                    if (voiceChatActive && !voiceUserInterrupted) updateVoiceChatStatus('מַאֲזִין...');
                };
                currentAudio.onerror = () => {
                    currentAudio = null;
                    voiceIsSpeaking = false;
                    resumeMicAfterSpeaking();
                    if (voiceChatActive) updateVoiceChatStatus('מַאֲזִין...');
                };
                currentAudio.play();
                return;
            }
        } catch {}
    }

    // Fallback: דפדפן TTS
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'he-IL';
    utterance.rate = state.ttsSpeed || 1.0;
    const voices = speechSynthesis.getVoices();
    const heVoice = voices.find(v => v.lang.startsWith('he') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('he'));
    if (heVoice) utterance.voice = heVoice;
    utterance.onend = () => { voiceIsSpeaking = false; resumeMicAfterSpeaking(); if (voiceChatActive && !voiceUserInterrupted) updateVoiceChatStatus('מַאֲזִין...'); };
    utterance.onerror = () => { voiceIsSpeaking = false; resumeMicAfterSpeaking(); if (voiceChatActive) updateVoiceChatStatus('מַאֲזִין...'); };
    speechSynthesis.speak(utterance);
}

// ── Voice Chat: UI ─────────────────────────────────────────
function updateVoiceChatStatus(text) {
    const statusEl = $('#voiceChatStatus');
    if (statusEl) statusEl.textContent = text;
}

let voiceMuted = false;

function toggleVoiceMute() {
    // ★ אם AI מדבר — לחיצה על mute קודם עוצרת את הדיבור
    if (voiceIsSpeaking) {
        stopCurrentAudio();
        speechSynthesis.cancel();
        ttsQueue.length = 0;
        ttsPlaying = false;
        voiceIsSpeaking = false;
        voiceUserInterrupted = true;
        console.log('[MultiChat] דיבור AI נעצר על ידי המשתמש');
        // אם כבר מושתק — רק עצור דיבור, לא שנה מצב mute
        if (voiceMuted) {
            updateVoiceChatStatus('מיקרופון מושתק 🔇');
            return;
        }
        // אם לא מושתק — עצור דיבור וחזור להאזנה
        resumeMicAfterSpeaking();
        updateVoiceChatStatus('מַאֲזִין...');
        return;
    }

    voiceMuted = !voiceMuted;
    const muteBtn = $('#muteVoiceChatBtn');

    if (voiceMuted) {
        // השתק — עצור STT
        try { recognition.stop(); } catch {}
        if (muteBtn) {
            muteBtn.classList.add('muted');
            muteBtn.querySelector('.mute-label').textContent = 'בטל השתקה';
        }
        updateVoiceChatStatus('מיקרופון מושתק 🔇');
        console.log('[MultiChat] מיקרופון מושתק (Mute)');
    } else {
        // בטל השתקה — הפעל STT מחדש
        if (muteBtn) {
            muteBtn.classList.remove('muted');
            muteBtn.querySelector('.mute-label').textContent = 'השתק';
        }
        if (voiceChatActive && !voiceIsSpeaking) {
            if (window._sttCleanStart) window._sttCleanStart();
            updateVoiceChatStatus('מַאֲזִין...');
        }
        console.log('[MultiChat] מיקרופון חזר (Unmute)');
    }
}

function startVoiceChat() {
    voiceChatActive = true;
    voiceAccumulatedText = '';
    voiceIsSpeaking = false;
    voiceMuted = false;
    isRecording = true;

    // אפס מצב כפתור mute
    const muteBtn = $('#muteVoiceChatBtn');
    if (muteBtn) {
        muteBtn.classList.remove('muted');
        muteBtn.querySelector('.mute-label').textContent = 'השתק';
    }

    // הפעלה נקייה דרך cleanStart
    if (window._sttCleanStart) window._sttCleanStart();

    // הראה את ממשק השיחה הקולית
    const overlay = $('#voiceChatOverlay');
    if (overlay) overlay.classList.add('active');
    updateVoiceChatStatus('מאזין...');
}

function stopVoiceChat() {
    voiceChatActive = false;
    voiceAccumulatedText = '';
    clearTimeout(voiceSilenceTimer);

    // הסר בועת תמלול חיה
    if (voiceLiveBubble) {
        voiceLiveBubble.remove();
        voiceLiveBubble = null;
    }

    // עצור TTS ותור TTS
    stopCurrentAudio();
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    ttsQueue.length = 0;
    ttsPlaying = false;
    voiceIsSpeaking = false;

    // עצור מיקרופון
    isRecording = false;
    if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
    try { recognition.stop(); } catch(e) {}
    sttRunning = false;
    restartAttempts = 0;

    // הסתר ממשק
    const overlay = $('#voiceChatOverlay');
    if (overlay) overlay.classList.remove('active');
    const micBtn = $('#micBtn');
    if (micBtn) micBtn.classList.remove('recording');
}

// ── מיקרופון רגיל (לא Voice Chat) ──────────────────────────
function startRecording() {
    if (!recognition) return;
    isRecording = true;
    const micBtn = $('#micBtn');
    if (micBtn) micBtn.classList.add('recording');
    recognition.lang = 'he-IL';
    if (window._sttCleanStart) window._sttCleanStart();
}

function stopRecording() {
    if (!recognition) return;
    isRecording = false;
    clearTimeout(micSilenceTimer);
    if (restartTimer) { clearTimeout(restartTimer); restartTimer = null; }
    const micBtn = $('#micBtn');
    if (micBtn) micBtn.classList.remove('recording');
    if (dom.messageInput) delete dom.messageInput.dataset.baseText;
    try { recognition.stop(); } catch(e) {}
    sttRunning = false;
    restartAttempts = 0;
    // ★ לא משחררים את micStream — שומרים הרשאה פתוחה
}

function toggleRecording() {
    if (isRecording) stopRecording();
    else startRecording();
}

// ── TTS לכפתור השמע (מצב רגיל) — OpenAI TTS + fallback ─────
let currentUtterance = null;

async function speakText(text, button) {
    // עצור דיבור קודם
    stopCurrentAudio();
    $$('.tts-btn.speaking').forEach(b => b.classList.remove('speaking'));
    if (button && button.classList.contains('speaking')) {
        currentUtterance = null;
        return;
    }

    const cleanText = cleanForSpeech(text);
    if (button) button.classList.add('speaking');

    // ניסיון OpenAI TTS
    const apiKey = state.apiKeys?.openaiKey;
    if (apiKey) {
        try {
            const res = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                body: JSON.stringify({ model: state.ttsModel || 'gpt-4o-mini-tts', input: cleanText.slice(0, 4096), voice: state.ttsVoice || 'nova', speed: state.ttsSpeed || 1.0, instructions: TTS_HEBREW_INSTRUCTIONS }),
            });
            if (res.ok) {
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                currentAudio = new Audio(url);
                currentAudio.onended = () => { currentAudio = null; URL.revokeObjectURL(url); if (button) button.classList.remove('speaking'); };
                currentAudio.onerror = () => { currentAudio = null; if (button) button.classList.remove('speaking'); };
                currentAudio.play();
                return;
            }
        } catch {}
    }

    // Fallback: דפדפן TTS
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'he-IL';
    utterance.rate = state.ttsSpeed || 1.0;
    const voices = speechSynthesis.getVoices();
    const heVoice = voices.find(v => v.lang.startsWith('he') && v.name.includes('Google')) || voices.find(v => v.lang.startsWith('he'));
    if (heVoice) utterance.voice = heVoice;
    currentUtterance = utterance;
    utterance.onend = () => { if (button) button.classList.remove('speaking'); currentUtterance = null; };
    utterance.onerror = () => { if (button) button.classList.remove('speaking'); currentUtterance = null; };
    speechSynthesis.speak(utterance);
}

// ── הפעלה ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
