import { useEffect, useState } from "react";

declare const chrome: any;

interface StorageData {
  lastPrompt?: string;
  captureTimestamp?: string;
  isActive?: boolean;
}

const LIGHT_BLUE = "#EFF6FF"; // Tailwind blue-100
const WHITE = "#FFFFFF";
const BLUE = "#3B82F6"; // Tailwind blue-500
const GRAY_DARK = "#1F2937"; // Tailwind gray-800
const RED = "#EF4444"; // Tailwind red-500

const Popup = () => {
  const [data, setData] = useState<StorageData>({});
  const [loading, setLoading] = useState(true);

  // Load data from chrome.storage.local
  const loadData = async () => {
    try {
      const result = await new Promise<StorageData>((resolve) => {
        chrome.storage.local.get(
          ["lastPrompt", "captureTimestamp", "isActive"],
          resolve
        );
      });
      setData(result);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClear = async () => {
    if (confirm("Clear all captured data?")) {
      try {
        await new Promise<void>((resolve) => {
          chrome.storage.local.clear(resolve);
        });
        await loadData();
      } catch (error) {
        console.error("Error clearing data:", error);
      }
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleString();
    } catch {
      return "Unknown";
    }
  };

  const isActive =
    data.isActive === true || (data.lastPrompt && data.lastPrompt.trim() !== "");

  const styles = {
    container: {
      width: 340,
      minHeight: 420,
      padding: 0,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      backgroundColor: WHITE,
      color: GRAY_DARK,
      borderRadius: 12,
      boxShadow:
        "0 6px 20px rgba(59, 130, 246, 0.3), 0 0 6px rgba(59, 130, 246, 0.15)",
      display: "flex",
      flexDirection: "column" as const,
      overflow: "hidden",
    },
    header: {
      backgroundColor: LIGHT_BLUE,
      padding: "20px 24px",
      color: BLUE,
      textAlign: "center" as const,
      userSelect: "none" as const,
    },
    title: {
      margin: 0,
      fontSize: 24,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    subtitle: {
      margin: "6px 0 0",
      fontSize: 14,
      fontWeight: 500,
      opacity: 0.85,
    },
    content: {
      flex: 1,
      padding: 24,
      display: "flex",
      flexDirection: "column" as const,
    },
    statusCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "14px 20px",
      backgroundColor: LIGHT_BLUE,
      borderRadius: 10,
      boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15)",
      marginBottom: 24,
      fontWeight: 600,
      fontSize: 15,
    },
    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 14px",
      borderRadius: 20,
      fontWeight: 600,
      fontSize: 13,
      color: isActive ? BLUE : RED,
      backgroundColor: isActive ? "rgba(59, 130, 246, 0.15)" : "rgba(239, 68, 68, 0.15)",
      userSelect: "none" as const,
    },
    sectionTitle: {
      fontWeight: 600,
      fontSize: 14,
      marginBottom: 12,
      color: BLUE,
      userSelect: "none" as const,
    },
    promptBox: {
      flex: 1,
      padding: 14,
      borderRadius: 10,
      fontSize: 14,
      lineHeight: 1.5,
      backgroundColor: WHITE,
      color: GRAY_DARK,
      boxShadow: "inset 0 0 8px rgba(59, 130, 246, 0.15)",
      overflowY: "auto" as const,
      maxHeight: 110,
      whiteSpace: "pre-wrap" as const,
      wordBreak: "break-word" as const,
      userSelect: "text" as const,
    },
    emptyState: {
      textAlign: "center" as const,
      fontStyle: "italic",
      opacity: 0.6,
      color: BLUE,
      userSelect: "none" as const,
      paddingTop: 30,
      fontSize: 15,
    },
    timestamp: {
      fontSize: 11,
      marginTop: 8,
      opacity: 0.7,
      color: BLUE,
      userSelect: "none" as const,
    },
    actions: {
      display: "flex",
      gap: 14,
      marginTop: 24,
    },
    button: {
      flex: 1,
      padding: "12px 0",
      borderRadius: 10,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      border: `2px solid ${BLUE}`,
      backgroundColor: WHITE,
      color: BLUE,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      transition: "all 0.25s ease",
      userSelect: "none" as const,
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>🧠 ConvoOS</h1>
        </div>
        <div style={styles.content}>
          <div style={styles.emptyState}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <img
            src="/icon.png"
            alt="ConvoOS Logo"
            style={{ height: 80, width: 80, marginRight: -18, verticalAlign: "middle" }}
          />
          ConvoOS
        </h1>
        <p style={styles.subtitle}>Chat Capture & Summarization</p>
      </div>

      <div style={styles.content}>
        <div style={styles.statusCard}>
          <div>Extension Status</div>
          <div style={styles.statusBadge}>
            <span>{isActive ? "🟢" : "🔴"}</span>
            {isActive ? "Active" : "Inactive"}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={styles.sectionTitle}>Latest Captured Prompt</div>
          <div style={styles.promptBox}>
            {data.lastPrompt ? (
              <>
                {data.lastPrompt}
                {data.captureTimestamp && (
                  <div style={styles.timestamp}>
                    Captured: {formatTimestamp(data.captureTimestamp)}
                  </div>
                )}
              </>
            ) : (
              <div style={styles.emptyState}>No prompts captured yet</div>
            )}
          </div>
        </div>

        <div style={styles.actions}>
          {/* Sync Now button removed since it does nothing */}
          <button onClick={handleClear} style={styles.button} title="Clear all stored prompts">
            🗑️ Clear Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
