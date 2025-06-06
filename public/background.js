chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NEW_PROMPT") {
    chrome.storage.local.set({ lastPrompt: message.payload }, () => {
      console.log("🧠 Prompt saved:", message.payload);
    });
  }

  if (message.action === "promptCaptured") {
    chrome.action.setBadgeText({ text: "1" });

    // ✅ Fixed badge color
    chrome.action.setBadgeBackgroundColor({ color: "#555555" });

    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, 3000);
  }
});
