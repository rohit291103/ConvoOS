# ConvoOS

🧠 **ConvoOS** is a Chrome extension that captures user prompts from ChatGPT and other AI chat platforms, enabling seamless context syncing and agentic execution across multiple AI models and applications.

---

## 🚀 Project Overview

ConvoOS bridges the gap between AI chatbots by:

- Capturing and storing prompts you type on ChatGPT (and other supported AI platforms)
- Syncing conversation context across different AI agents and services
- Enabling agentic execution of commands on third-party platforms (e.g., GitHub) via MCP-based APIs

This allows users to continue workflows seamlessly across multiple AI environments without losing context.

---

## 📦 Features (Sprint 1 MVP)

- Chrome extension popup UI built with React
- Captures ChatGPT prompt text via content scripts
- Stores last prompt locally using Chrome Storage API
- Visual indicator showing ConvoOS is active
- Manual sync button (no backend integration yet)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Google Chrome browser

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/yourusername/ConvoOS.git
   cd ConvoOS
2. Install Dependencies
     npm install
    # or
    yarn install
3.Start the development server:
    npm run dev

4.Load the extension in Chrome:
  Open chrome://extensions/

  Enable Developer mode (toggle top right)

  Click Load unpacked

  Select the dist folder inside your project directory (or build if that's your output folder)

5. Navigate to https://chat.openai.com and open the extension popup. You should see the last captured prompt displayed.

