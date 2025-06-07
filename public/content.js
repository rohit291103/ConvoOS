console.log("🧠 Content script loaded");

// Safe sendMessage helper to communicate with background script
function safeSendMessage(message) {
  try {
    if (chrome.runtime?.id) {
      chrome.runtime.sendMessage(message);
    } else {
      console.warn("⚠️ Extension context invalid. Message not sent:", message);
    }
  } catch (e) {
    console.error("❌ Error sending message:", e);
  }
}

// Fallback helper: find first matching element using multiple selectors
function getFirstMatchingSelector(parent, selectors = []) {
  for (const sel of selectors) {
    const el = parent.querySelector(sel);
    if (el) return el;
  }
  return null;
}

let currentPlatform = "unknown";

// Default config (ChatGPT fallback)
let platformConfig = {
  userSelector: ['div[data-message-author-role="user"]'],
  assistantSelector: ['div[data-message-author-role="assistant"]'],
  messageTextSelector: ['div.whitespace-pre-wrap'],
};

// Listen for platform info from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "setPlatform") {
    currentPlatform = message.platform;

    const platformConfigs = {
      chatgpt: {
        userSelector: ['div[data-message-author-role="user"]'],
        assistantSelector: ['div[data-message-author-role="assistant"]'],
        messageTextSelector: ['div.whitespace-pre-wrap', '.markdown.prose'],
      },
      claude: {
        userSelector: ['[data-testid="user-message"]'],
        assistantSelector: ['div[data-is-streaming="false"].group:has(.font-claude-message)'],
        messageTextSelector: ['p.whitespace-pre-wrap.break-words', 'p.whitespace-normal.break-words'],
      },
      // TODO: Gemini support — update with real selectors after inspecting DOM
      gemini: {
        userSelector: ['your-gemini-user-selector'],
        assistantSelector: ['your-gemini-assistant-selector'],
        messageTextSelector: ['your-gemini-message-text-selector'],
      },
    };

    platformConfig = platformConfigs[currentPlatform] || platformConfig;

    console.log("🌐 Platform set to:", currentPlatform, "Using config:", platformConfig);
  }
});

// Mutation observer to track new messages
const observer = new MutationObserver(() => {
  const userMessages = [];

  // Try each userSelector and collect messages
  for (const sel of platformConfig.userSelector) {
    document.querySelectorAll(sel).forEach((el) => userMessages.push(el));
  }

  console.log("🧾 Found user messages:", userMessages.length);

  if (userMessages.length > 0) {
    const lastUserMessage = userMessages[userMessages.length - 1];
    const textElement = getFirstMatchingSelector(lastUserMessage, platformConfig.messageTextSelector);
    const lastPrompt = textElement?.innerText.trim();

    if (lastPrompt) {
      chrome.storage.local.set({ lastPrompt }, () => {
        console.log("✅ Stored lastPrompt:", lastPrompt);
        safeSendMessage({ action: "promptCaptured" });
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
