// Platform detection function
function detectPlatform(url) {
  if (!url) return "unknown";

  if (url.startsWith("https://chatgpt.com/")) {
    return "chatgpt";
  }
  if (url.startsWith("https://claude.ai/")) {
    return "claude";
  }
  if (url.startsWith("https://gemini.google.com/")) {
    return "gemini";
  }
  return "unknown";
}

// Listen for messages as before
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NEW_PROMPT") {
    chrome.storage.local.set({ lastPrompt: message.payload }, () => {
      console.log("🧠 Prompt saved:", message.payload);
    });
  }

  if (message.action === "promptCaptured") {
    chrome.action.setBadgeText({ text: "1" });
    chrome.action.setBadgeBackgroundColor({ color: "#555555" });

    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, 3000);
  }
});

// Detect platform on tab update and notify content script
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const platform = detectPlatform(tab.url);
    chrome.tabs.sendMessage(tabId, { action: "setPlatform", platform }, (response) => {
      if (chrome.runtime.lastError) {
        // No content script injected in tab, ignore silently
      } else {
        console.log("🛰️ Sent platform info to content script:", platform);
      }
    });
  }
});
