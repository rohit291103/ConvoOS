import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const Popup = () => {
    const [prompt, setPrompt] = useState("Loading...");
    useEffect(() => {
        chrome.storage.local.get(["lastPrompt"], (result) => {
            setPrompt(result.lastPrompt || "No prompt captured yet.");
        });
    }, []);
    const handleSync = () => {
        console.log("Sync triggered (MVP: no backend yet)");
    };
    return (_jsxs("div", { style: { width: "300px", padding: "16px", fontFamily: "sans-serif" }, children: [_jsx("h2", { children: "\uD83E\uDDE0 ConvoOS" }), _jsxs("p", { children: [_jsx("strong", { children: "Status:" }), " \uD83D\uDFE2 Active"] }), _jsx("hr", {}), _jsx("p", { children: _jsx("strong", { children: "Last Prompt:" }) }), _jsx("p", { style: { fontSize: "14px", color: "#444" }, children: prompt }), _jsx("button", { onClick: handleSync, style: { marginTop: "12px", padding: "8px" }, children: "\uD83D\uDD04 Sync Now" }), _jsx("hr", {}), _jsx("p", { style: { fontSize: "12px", color: "#999" }, children: "v1.0" })] }));
};
export default Popup;
