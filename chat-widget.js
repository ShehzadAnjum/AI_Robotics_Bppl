/**
 * AI Robotics Book Chat Widget
 * Connects to Vercel backend at airobobookmagic.vercel.app
 */

(function() {
  'use strict';

  const API_URL = 'https://airobobookmagic.vercel.app/api/chat';
  let sessionId = null;
  let isOpen = false;

  // Load session from localStorage
  function loadSession() {
    sessionId = localStorage.getItem('chat_session_id');
  }

  // Save session to localStorage
  function saveSession(id) {
    sessionId = id;
    localStorage.setItem('chat_session_id', id);
  }

  // Create chat widget HTML
  function createChatWidget() {
    const widgetHTML = `
      <div id="ai-chat-widget" style="display: none;">
        <div id="chat-header">
          <span>AI Robotics Assistant</span>
          <button id="chat-close">&times;</button>
        </div>
        <div id="chat-messages"></div>
        <div id="chat-input-container">
          <input
            type="text"
            id="chat-input"
            placeholder="Ask about robotics..."
            disabled
          />
          <button id="chat-send" disabled>Send</button>
        </div>
      </div>
      <button id="chat-toggle">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  // Add message to chat
  function addMessage(role, content) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-message-${role}`;
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return messageDiv;
  }

  // Send message to API
  async function sendMessage(message) {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    // Disable input
    input.disabled = true;
    sendBtn.disabled = true;
    input.value = '';

    // Add user message
    addMessage('user', message);

    // Create assistant message container
    const assistantMsg = addMessage('assistant', '');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          includeHistory: true
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Read streaming response
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.error) {
                assistantMsg.textContent = `Error: ${data.error}`;
                assistantMsg.classList.add('chat-error');
                break;
              }

              if (data.sessionId) {
                saveSession(data.sessionId);
              }

              if (data.content) {
                fullResponse += data.content;
                assistantMsg.textContent = fullResponse;
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
        }
      }

      if (fullResponse === '') {
        assistantMsg.textContent = 'No response received';
      }

    } catch (error) {
      console.error('Chat error:', error);
      assistantMsg.textContent = `Error: ${error.message}`;
      assistantMsg.classList.add('chat-error');
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // Handle text selection and populate chat input
  function handleTextSelection() {
    const selectedText = window.getSelection().toString().trim();
    const input = document.getElementById('chat-input');

    // Only populate if text is selected and chat input exists
    if (selectedText && input && selectedText.length > 0 && selectedText.length < 500) {
      // Format the selected text as a question
      const formattedText = `Explain this: "${selectedText}"`;
      input.value = formattedText;

      // Optional: Open chat widget automatically when text is selected
      const widget = document.getElementById('ai-chat-widget');
      const toggle = document.getElementById('chat-toggle');
      if (!isOpen && widget) {
        isOpen = true;
        widget.style.display = 'flex';
        input.disabled = false;
        document.getElementById('chat-send').disabled = false;
        input.focus();

        // Move cursor to end of input
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  }

  // Initialize widget
  function init() {
    loadSession();
    createChatWidget();

    const widget = document.getElementById('ai-chat-widget');
    const toggle = document.getElementById('chat-toggle');
    const close = document.getElementById('chat-close');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    // Toggle chat
    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      widget.style.display = isOpen ? 'flex' : 'none';
      if (isOpen) {
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
      }
    });

    // Close chat
    close.addEventListener('click', () => {
      isOpen = false;
      widget.style.display = 'none';
    });

    // Send message on button click
    sendBtn.addEventListener('click', () => {
      const message = input.value.trim();
      if (message) {
        sendMessage(message);
      }
    });

    // Send message on Enter key
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const message = input.value.trim();
        if (message) {
          sendMessage(message);
        }
      }
    });

    // Listen for text selection on the page
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
