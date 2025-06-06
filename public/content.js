console.log("🧠 Content script loaded");

const observer = new MutationObserver(() => {
  // Adjust selector to the actual structure of chatgpt.com messages if needed
  const userMessages = document.querySelectorAll('[data-message-author-role="user"]');
  console.log("🧾 Found user messages:", userMessages.length);

  if (userMessages.length > 0) {
    const last = userMessages[userMessages.length - 1];
    const lastPrompt = last.innerText?.trim();

    if (lastPrompt) {
      chrome.storage.local.set({ lastPrompt }, () => {
        console.log("✅ Stored lastPrompt:", lastPrompt);

        chrome.runtime.sendMessage({ action: "promptCaptured" });

      });
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

