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
      <div id="text-selection-menu">
        <button id="explain-btn">📖 Explain</button>
        <button id="translate-urdu-btn">🌐 Translate to Urdu</button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  // Detect if text contains Urdu characters
  function containsUrdu(text) {
    // Urdu Unicode range: U+0600 to U+06FF (Arabic/Urdu script)
    const urduRegex = /[\u0600-\u06FF]/;
    return urduRegex.test(text);
  }

  // Add message to chat
  function addMessage(role, content) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message chat-message-${role}`;

    // Apply Urdu styling if message contains Urdu text
    if (containsUrdu(content)) {
      messageDiv.classList.add('urdu-text');
    }

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

  // Store selected text temporarily
  let currentSelection = '';

  // Show text selection menu
  function showSelectionMenu(x, y, selectedText) {
    const menu = document.getElementById('text-selection-menu');
    currentSelection = selectedText;

    // Position menu near selection
    menu.style.left = x + 'px';
    menu.style.top = (y - 50) + 'px'; // Position above selection
    menu.style.display = 'flex';
  }

  // Hide text selection menu
  function hideSelectionMenu() {
    const menu = document.getElementById('text-selection-menu');
    menu.style.display = 'none';
    currentSelection = '';
  }

  // Handle text selection and show context menu
  function handleTextSelection(event) {
    // Delay to ensure selection is complete
    setTimeout(() => {
      const selectedText = window.getSelection().toString().trim();

      // Hide menu if no text selected
      if (!selectedText || selectedText.length === 0) {
        hideSelectionMenu();
        return;
      }

      // Only show menu for reasonable text length
      if (selectedText.length > 0 && selectedText.length < 500) {
        // Get selection position
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        // Show menu near the selection
        showSelectionMenu(
          rect.left + (rect.width / 2) - 100, // Center horizontally
          rect.top + window.scrollY, // Position at selection
          selectedText
        );
      }
    }, 10);
  }

  // Handle "Explain" button click
  function handleExplain() {
    if (!currentSelection) return;

    const input = document.getElementById('chat-input');
    const widget = document.getElementById('ai-chat-widget');

    // Format as explanation request
    input.value = `Explain this: "${currentSelection}"`;

    // Open chat widget if not already open
    if (!isOpen) {
      isOpen = true;
      widget.style.display = 'flex';
      input.disabled = false;
      document.getElementById('chat-send').disabled = false;
    }

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    // Hide menu
    hideSelectionMenu();
  }

  // Handle "Translate to Urdu" button click
  function handleTranslateUrdu() {
    if (!currentSelection) return;

    const input = document.getElementById('chat-input');
    const widget = document.getElementById('ai-chat-widget');

    // Format as translation request
    input.value = `Translate this to Urdu: "${currentSelection}"`;

    // Open chat widget if not already open
    if (!isOpen) {
      isOpen = true;
      widget.style.display = 'flex';
      input.disabled = false;
      document.getElementById('chat-send').disabled = false;
    }

    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);

    // Hide menu
    hideSelectionMenu();
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
    const explainBtn = document.getElementById('explain-btn');
    const translateBtn = document.getElementById('translate-urdu-btn');
    const selectionMenu = document.getElementById('text-selection-menu');

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

    // Handle Explain button
    explainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleExplain();
    });

    // Handle Translate to Urdu button
    translateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleTranslateUrdu();
    });

    // Listen for text selection on the page
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);

    // Hide menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!selectionMenu.contains(e.target)) {
        hideSelectionMenu();
      }
    });

    // Prevent menu from closing when clicking inside it
    selectionMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
