chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "NEW_PROMPT") {
    chrome.storage.local.set({ lastPrompt: message.payload }, () => {
      console.log("🧠 Prompt saved:", message.payload);
    });
  }

  if (message.action === "promptCaptured") {
    // Set badge text
    chrome.action.setBadgeText({ text: "1" });

    // Optional: set badge color (red)
    chrome.action.setBadgeBackgroundColor({ color: "	#555555" });

    // Clear badge after 3 seconds
    setTimeout(() => {
      chrome.action.setBadgeText({ text: "" });
    }, 3000);
  }
});
