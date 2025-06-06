console.log("🧠 Content script loaded");

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

const observer = new MutationObserver(() => {
  const userMessages = document.querySelectorAll('[data-message-author-role="user"]');
  console.log("🧾 Found user messages:", userMessages.length);

  if (userMessages.length > 0) {
    const last = userMessages[userMessages.length - 1];
    const lastPrompt = last.innerText?.trim();

    if (lastPrompt) {
      chrome.storage.local.set({ lastPrompt }, () => {
        console.log("✅ Stored lastPrompt:", lastPrompt);

        safeSendMessage({ action: "promptCaptured" });
      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });
