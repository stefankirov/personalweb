const API_URL     = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000';
const API_KEY     = import.meta.env.VITE_CHATBOT_API_KEY || '';

export function renderChat() {
  return `
<div id="chat-widget">
  <button id="chat-toggle" aria-label="Chat with Stefan's AI" aria-expanded="false">
    <span class="chat-toggle-open">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
      </svg>
      <span>Ask Stefan's AI</span>
    </span>
    <span class="chat-toggle-close">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <span>Close</span>
    </span>
  </button>

  <div id="chat-panel" aria-hidden="true" role="dialog" aria-label="Chat with Stefan's AI">
    <div class="chat-header">
      <div class="chat-header-avatar" aria-hidden="true">SK</div>
      <div>
        <p class="chat-header-name">Stefan Kirov <span class="chat-header-ai-badge">AI</span></p>
        <p class="chat-header-sub">Ask me about my background &amp; work</p>
      </div>
    </div>

    <div id="chat-messages" role="log" aria-live="polite" aria-label="Chat messages"></div>

    <div class="chat-input-row">
      <input
        type="text"
        id="chat-input"
        placeholder="Ask me anything…"
        autocomplete="off"
        aria-label="Your message"
        maxlength="500"
      />
      <button id="chat-send" aria-label="Send message" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  </div>
</div>
`;
}

export function mountChat() {
  const toggle   = document.getElementById('chat-toggle');
  const panel    = document.getElementById('chat-panel');
  const input    = document.getElementById('chat-input');
  const sendBtn  = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  let history   = [];
  let isOpen    = false;
  let isLoading = false;

  // ── open / close ──────────────────────────────────────────────────────────

  function openChat() {
    isOpen = true;
    toggle.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('open');
    input.focus();

    if (messages.children.length === 0) {
      addMessage(
        'assistant',
        "Hi! I'm Stefan's AI — think of me as his virtual self. Ask me anything about my background, experience, skills, or projects. I'd love to chat!"
      );
    }
  }

  function closeChat() {
    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('open');
  }

  toggle.addEventListener('click', () => (isOpen ? closeChat() : openChat()));

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) closeChat();
  });

  // ── messages ──────────────────────────────────────────────────────────────

  function addMessage(role, content) {
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg-${role}`;
    div.textContent = content;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chat-msg chat-msg-assistant chat-typing';
    div.id = 'chat-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    document.getElementById('chat-typing')?.remove();
  }

  // ── send ──────────────────────────────────────────────────────────────────

  function setLoading(loading) {
    isLoading = loading;
    sendBtn.disabled = loading || !input.value.trim();
    input.disabled = loading;
    if (loading) showTyping(); else hideTyping();
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isLoading) return;

    input.value = '';
    sendBtn.disabled = true;
    addMessage('user', text);
    setLoading(true);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (API_KEY) headers['X-API-Key'] = API_KEY;

      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      addMessage('assistant', data.response);
      history.push({ role: 'user', content: text });
      history.push({ role: 'assistant', content: data.response });
    } catch (err) {
      console.error('Chat error:', err);
      addMessage('assistant', "Sorry, I couldn't connect right now. Please try again in a moment.");
    } finally {
      setLoading(false);
      input.focus();
    }
  }

  sendBtn.addEventListener('click', sendMessage);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  input.addEventListener('input', () => {
    sendBtn.disabled = !input.value.trim() || isLoading;
  });
}
