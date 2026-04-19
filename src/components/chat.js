const API_URL     = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000';
const API_KEY     = import.meta.env.VITE_CHATBOT_API_KEY || '';

export function renderChat() {
  return `
<div id="chat-widget">
  <button id="chat-toggle" aria-label="Chat with Stefan's Virtual Self" aria-expanded="false">
    <span class="chat-toggle-open">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
        <path d="M20 3v4"/><path d="M22 5h-4"/>
        <path d="M4 17v2"/><path d="M5 18H3"/>
      </svg>
      <span>Ask Stefan</span>
    </span>
    <span class="chat-toggle-close">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
      <span>Close</span>
    </span>
  </button>

  <div id="chat-panel" aria-hidden="true" role="dialog" aria-label="Chat with Stefan's Virtual Self">
    <div class="chat-header">
      <div class="chat-header-avatar" aria-hidden="true">SK</div>
      <div>
        <p class="chat-header-name">Stefan Kirov</p>
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
        "Hi! I'm Stefan, in a virtual form. Feel free to ask about my experience, projects, or how I think about building systems."
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
    setLoading(true);  // shows typing indicator

    // Pre-create the assistant bubble (hidden until first token arrives)
    const assistantDiv = document.createElement('div');
    assistantDiv.className = 'chat-msg chat-msg-assistant';
    assistantDiv.textContent = '';

    let fullResponse = '';

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (API_KEY) headers['X-API-Key'] = API_KEY;

      const res = await fetch(`${API_URL}/chat/stream`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Response is live — swap typing indicator for the real bubble
      hideTyping();
      messages.appendChild(assistantDiv);
      messages.scrollTop = messages.scrollHeight;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // SSE lines are separated by \n\n; process complete events
        const parts = buffer.split('\n\n');
        buffer = parts.pop(); // keep any incomplete trailing chunk

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith('data:')) continue;

          const raw = line.slice(5).trim();
          if (raw === '[DONE]') break;

          try {
            const { token } = JSON.parse(raw);
            fullResponse += token;
            assistantDiv.textContent = fullResponse;
            messages.scrollTop = messages.scrollHeight;
          } catch {
            // ignore malformed SSE frames
          }
        }
      }

      if (fullResponse) {
        history.push({ role: 'user', content: text });
        history.push({ role: 'assistant', content: fullResponse });
      }
    } catch (err) {
      console.error('Chat error:', err);
      hideTyping();
      // Show error in the bubble (append it if not yet in DOM)
      if (!assistantDiv.isConnected) messages.appendChild(assistantDiv);
      if (!fullResponse) {
        assistantDiv.textContent = "Sorry, I couldn't connect right now. Please try again in a moment.";
      }
      messages.scrollTop = messages.scrollHeight;
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
