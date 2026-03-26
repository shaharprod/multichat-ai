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
            { id: 'gemini-3.1-pro-preview', name: 'Gemini 3.1 Pro', desc: '🔥 החכם ביותר, קידוד ואייג\'נטים' },
            { id: 'gemini-3.1-flash-lite-preview', name: 'Gemini 3.1 Flash Lite', desc: '⚡ ביצועי שיא במחיר נמוך' },
            { id: 'gemini-3-flash-preview', name: 'Gemini 3.0 Flash', desc: 'ביצועים גבוהים, מהיר' },
            { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', desc: 'מהיר ומשתלם' },
            { id: 'gemini-2.0-flash-lite', name: 'Gemini 2.0 Flash Lite', desc: 'הכי זול' },
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

// ── שליחת הודעה ──────────────────────────────────────────────
async function sendMessage(content) {
    if (state.isStreaming) return;

    let conv = getCurrentConversation();
    if (!conv) conv = createConversation();

    // Update conversation provider/model
    conv.provider = state.provider;
    conv.model = state.model;

    const userMsg = { role: 'user', content, provider: state.provider };
    conv.messages.push(userMsg);
    appendMessageToDOM(userMsg);

    if (conv.messages.length === 1) {
        conv.title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        renderChatHistory();
    }

    // אנימציית הקלדה
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar ${state.provider}-avatar">${PROVIDERS[state.provider].name.slice(0, 2)}</div>
        <div class="message-bubble">
            <div class="message-content">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        </div>
    `;
    dom.messagesContainer.appendChild(typingDiv);
    scrollToBottom();

    state.isStreaming = true;
    dom.sendBtn.disabled = true;

    try {
        const apiKey = state.apiKeys[PROVIDERS[state.provider].keyField];
        if (!apiKey) {
            throw new Error('לא הוגדר מפתח API עבור ' + PROVIDERS[state.provider].name + '. לחצו על "⚙️ הגדרות API" בתפריט.');
        }

        // הערכת טוקנים לקלט
        const allText = conv.messages.map(m => m.content).join(' ');
        const inputTokens = estimateTokens(allText);

        let response;
        switch (state.provider) {
            case 'openai':    response = await callOpenAI(apiKey, conv.messages); break;
            case 'google':    response = await callGoogle(apiKey, conv.messages); break;
            case 'claude':    response = await callClaude(apiKey, conv.messages); break;
            case 'perplexity': response = await callPerplexity(apiKey, conv.messages); break;
            case 'grok':      response = await callGrok(apiKey, conv.messages); break;
        }

        typingDiv.remove();

        // הערכת טוקנים לפלט וחישוב עלות
        const outputTokens = estimateTokens(response);
        const cost = trackCost(inputTokens, outputTokens, state.model);
        conv.totalCost = (conv.totalCost || 0) + cost;

        const aiMsg = {
            role: 'assistant',
            content: response,
            provider: state.provider,
            inputTokens,
            outputTokens,
            cost,
        };
        conv.messages.push(aiMsg);
        appendMessageToDOM(aiMsg);
        renderChatHistory();

    } catch (error) {
        typingDiv.remove();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'message ai-message';
        errorDiv.innerHTML = `
            <div class="message-avatar ${state.provider}-avatar">!</div>
            <div class="message-bubble">
                <div class="message-content">
                    <div class="message-error">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                        ${escapeHtml(error.message)}
                    </div>
                </div>
            </div>
        `;
        dom.messagesContainer.appendChild(errorDiv);
    }

    state.isStreaming = false;
    dom.sendBtn.disabled = !dom.messageInput.value.trim();
    scrollToBottom();
    saveState();
}

// ── OpenAI API ────────────────────────────────────────────────
async function callOpenAI(apiKey, messages) {
    const systemMsg = { role: 'system', content: 'ענה תמיד בעברית אלא אם המשתמש פנה בשפה אחרת. השתמש ב-RTL.' };
    const apiMessages = [systemMsg, ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
    }))];

    const res = await fetch(PROVIDERS.openai.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שגיאת OpenAI: ${res.status}`);
    }
    const data = await res.json();
    return data.choices[0].message.content;
}

// ── Google Gemini API ─────────────────────────────────────────
async function callGoogle(apiKey, messages) {
    const systemInstruction = { parts: [{ text: 'ענה תמיד בעברית אלא אם המשתמש פנה בשפה אחרת. השתמש ב-RTL.' }] };
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
        throw new Error(err.error?.message || `שגיאת Google: ${res.status}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'אין תשובה';
}

// ── Claude API ────────────────────────────────────────────────
async function callClaude(apiKey, messages) {
    const apiMessages = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
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
            system: 'ענה תמיד בעברית אלא אם המשתמש פנה בשפה אחרת. השתמש ב-RTL.',
            messages: apiMessages,
            max_tokens: 4096,
            temperature: state.temperature,
        }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שגיאת Claude: ${res.status}. ייתכן שנדרש CORS proxy.`);
    }
    const data = await res.json();
    return data.content?.[0]?.text || 'אין תשובה';
}

// ── Perplexity API ────────────────────────────────────────────
async function callPerplexity(apiKey, messages) {
    const systemMsg = { role: 'system', content: 'ענה תמיד בעברית אלא אם המשתמש פנה בשפה אחרת.' };
    const apiMessages = [systemMsg, ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
    }))];

    const res = await fetch(PROVIDERS.perplexity.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שגיאת Perplexity: ${res.status}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || 'אין תשובה';
}

// ── Grok (xAI) API ────────────────────────────────────────────
async function callGrok(apiKey, messages) {
    const systemMsg = { role: 'system', content: 'ענה תמיד בעברית אלא אם המשתמש פנה בשפה אחרת. השתמש ב-RTL.' };
    const apiMessages = [systemMsg, ...messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
    }))];

    const res = await fetch(PROVIDERS.grok.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model: state.model, messages: apiMessages, temperature: state.temperature }),
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `שגיאת Grok: ${res.status}`);
    }
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

    // מיקרופון
    const micBtn = $('#micBtn');
    if (micBtn) micBtn.addEventListener('click', toggleRecording);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSettings();
            closeBudget();
            dom.sidebar.classList.remove('open');
            if (isRecording) stopRecording();
        }
    });

    // אתחול זיהוי דיבור
    initSpeechRecognition();

    // טעינת קולות TTS
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => {};
    }
}

// ── דיבור למיקרופון (STT) ──────────────────────────────────────
let recognition = null;
let isRecording = false;

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn('Speech Recognition לא נתמך בדפדפן זה');
        const micBtn = $('#micBtn');
        if (micBtn) micBtn.style.display = 'none';
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }

        if (finalTranscript && dom.messageInput) {
            dom.messageInput.value += finalTranscript;
            dom.sendBtn.disabled = false;
            dom.charCount.textContent = dom.messageInput.value.length;
        }
    };

    recognition.onerror = (event) => {
        console.error('שגיאת זיהוי דיבור:', event.error);
        stopRecording();
    };

    recognition.onend = () => {
        if (isRecording) {
            // מפסיק אוטומטית - נעצור
            stopRecording();
        }
    };
}

function startRecording() {
    if (!recognition) return;
    isRecording = true;
    const micBtn = $('#micBtn');
    if (micBtn) micBtn.classList.add('recording');
    recognition.lang = 'he-IL'; // ברירת מחדל עברית
    recognition.start();
}

function stopRecording() {
    if (!recognition) return;
    isRecording = false;
    const micBtn = $('#micBtn');
    if (micBtn) micBtn.classList.remove('recording');
    try { recognition.stop(); } catch(e) {}
}

function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

// ── קריאה קולית (TTS) ──────────────────────────────────────────
let currentUtterance = null;

function speakText(text, button) {
    // אם כבר מדבר, עצור
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        $$('.tts-btn.speaking').forEach(b => b.classList.remove('speaking'));
        if (currentUtterance && button.classList.contains('speaking')) {
            button.classList.remove('speaking');
            currentUtterance = null;
            return;
        }
    }

    // נקה תגיות HTML ותווי Markdown
    const cleanText = text
        .replace(/<[^>]*>/g, '')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/#{1,6}\s/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'he-IL';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // נסה למצוא קול עברי
    const voices = speechSynthesis.getVoices();
    const hebrewVoice = voices.find(v => v.lang.startsWith('he'));
    if (hebrewVoice) utterance.voice = hebrewVoice;

    button.classList.add('speaking');
    currentUtterance = utterance;

    utterance.onend = () => {
        button.classList.remove('speaking');
        currentUtterance = null;
    };

    utterance.onerror = () => {
        button.classList.remove('speaking');
        currentUtterance = null;
    };

    speechSynthesis.speak(utterance);
}

// ── הפעלה ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
