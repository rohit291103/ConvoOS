import { useEffect, useState } from "react";

declare const chrome: any;

const Popup = () => {
  const [prompt, setPrompt] = useState("Loading...");

  useEffect(() => {
    chrome.storage.local.get(["lastPrompt"], (result: { lastPrompt?: string }) => {
      setPrompt(result.lastPrompt || "No prompt captured yet.");
    });
  }, []);

  const handleSync = () => {
    console.log("Sync triggered (MVP: no backend yet)");
  };

  return (
    <div style={{ width: "300px", padding: "16px", fontFamily: "sans-serif" }}>
      <h2>🧠 ConvoOS</h2>
      <p><strong>Status:</strong> 🟢 Active</p>
      <hr />
      <p><strong>Last Prompt:</strong></p>
      <p style={{ fontSize: "14px", color: "#444" }}>{prompt}</p>
      <button onClick={handleSync} style={{ marginTop: "12px", padding: "8px" }}>
        🔄 Sync Now
      </button>
      <hr />
      <p style={{ fontSize: "12px", color: "#999" }}>v1.0</p>
    </div>
  );
};

export default Popup;
