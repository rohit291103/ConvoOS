import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const LIGHT_BLUE = "#EFF6FF"; // Tailwind blue-100
const WHITE = "#FFFFFF";
const BLUE = "#3B82F6"; // Tailwind blue-500
const GRAY_DARK = "#1F2937"; // Tailwind gray-800
const RED = "#EF4444"; // Tailwind red-500
const Popup = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    // Load data from chrome.storage.local
    const loadData = async () => {
        try {
            const result = await new Promise((resolve) => {
                chrome.storage.local.get(["lastPrompt", "captureTimestamp", "isActive"], resolve);
            });
            setData(result);
        }
        catch (error) {
            console.error("Error loading data:", error);
        }
        finally {
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
                await new Promise((resolve) => {
                    chrome.storage.local.clear(resolve);
                });
                await loadData();
            }
            catch (error) {
                console.error("Error clearing data:", error);
            }
        }
    };
    const formatTimestamp = (timestamp) => {
        try {
            return new Date(timestamp).toLocaleString();
        }
        catch {
            return "Unknown";
        }
    };
    const isActive = data.isActive === true || (data.lastPrompt && data.lastPrompt.trim() !== "");
    const styles = {
        container: {
            width: 340,
            minHeight: 420,
            padding: 0,
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
            backgroundColor: WHITE,
            color: GRAY_DARK,
            borderRadius: 12,
            boxShadow: "0 6px 20px rgba(59, 130, 246, 0.3), 0 0 6px rgba(59, 130, 246, 0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
        },
        header: {
            backgroundColor: LIGHT_BLUE,
            padding: "20px 24px",
            color: BLUE,
            textAlign: "center",
            userSelect: "none",
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
            margin: "-6px 0 0",
            fontSize: 14,
            fontWeight: 500,
            opacity: 0.85,
        },
        content: {
            flex: 1,
            padding: 24,
            display: "flex",
            flexDirection: "column",
        },
        statusCard: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
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
            userSelect: "none",
        },
        sectionTitle: {
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 12,
            color: BLUE,
            userSelect: "none",
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
            overflowY: "auto",
            maxHeight: 110,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            userSelect: "text",
        },
        emptyState: {
            textAlign: "center",
            fontStyle: "italic",
            opacity: 0.6,
            color: BLUE,
            userSelect: "none",
            paddingTop: 30,
            fontSize: 15,
        },
        timestamp: {
            fontSize: 11,
            marginTop: 8,
            opacity: 0.7,
            color: BLUE,
            userSelect: "none",
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
            userSelect: "none",
        },
        buttonDisabled: {
            opacity: 0.6,
            cursor: "not-allowed",
        },
    };
    if (loading) {
        return (_jsxs("div", { style: styles.container, children: [_jsx("div", { style: styles.header, children: _jsx("h1", { style: styles.title, children: "\uD83E\uDDE0 ConvoOS" }) }), _jsx("div", { style: styles.content, children: _jsx("div", { style: styles.emptyState, children: "Loading..." }) })] }));
    }
    return (_jsxs("div", { style: styles.container, children: [_jsxs("div", { style: styles.header, children: [_jsxs("h1", { style: styles.title, children: [_jsx("img", { src: "/icon.png", alt: "ConvoOS Logo", style: { height: 80, width: 80, marginRight: -18, verticalAlign: "middle" } }), "ConvoOS"] }), _jsx("p", { style: styles.subtitle, children: "Chat Capture & Summarization" })] }), _jsxs("div", { style: styles.content, children: [_jsxs("div", { style: styles.statusCard, children: [_jsx("div", { children: "Extension Status" }), _jsxs("div", { style: styles.statusBadge, children: [_jsx("span", { children: isActive ? "🟢" : "🔴" }), isActive ? "Active" : "Inactive"] })] }), _jsxs("div", { style: { flex: 1, display: "flex", flexDirection: "column" }, children: [_jsx("div", { style: styles.sectionTitle, children: "Latest Captured Prompt" }), _jsx("div", { style: styles.promptBox, children: data.lastPrompt ? (_jsxs(_Fragment, { children: [data.lastPrompt, data.captureTimestamp && (_jsxs("div", { style: styles.timestamp, children: ["Captured: ", formatTimestamp(data.captureTimestamp)] }))] })) : (_jsx("div", { style: styles.emptyState, children: "No prompts captured yet" })) })] }), _jsx("div", { style: styles.actions, children: _jsx("button", { onClick: handleClear, style: styles.button, title: "Clear all stored prompts", children: "\uD83D\uDDD1\uFE0F Clear Data" }) })] })] }));
};
export default Popup;
