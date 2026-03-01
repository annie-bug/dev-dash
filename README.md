# 🚀 DevDash: AI Developer Persona Engine

DevDash is a high-performance frontend analytics dashboard that transforms standard GitHub profiles into deep-dive architectural reviews. By entering a GitHub username, the application fetches real-time repository data and leverages the Google Gemini API to generate a professional "Executive Summary" of the developer's tech stack, core strengths, and growth areas.


<img width="1920" height="1080" alt="Screenshot 2026-03-01 134017" src="https://github.com/user-attachments/assets/a60c8c14-19c2-4cc8-85a9-79daad07baa7" />

<img width="1920" height="1080" alt="Screenshot 2026-03-01 134058" src="https://github.com/user-attachments/assets/1ced8208-e202-4337-9717-999af284c4b0" />

<img width="1920" height="1080" alt="Screenshot 2026-03-01 134117" src="https://github.com/user-attachments/assets/d1d500a2-a689-4fcd-b818-c2369e565399" />


## ✨ Features

* **🧠 AI-Powered Architectural Reviews:** Utilizes Google's `gemini-2.5-flash` model with strict JSON schema parsing to generate accurate, professional developer personas.
* **⚡ Optimized Search:** Implements custom React hooks for debounced URL-syncing, preventing rate-limit blocks and ensuring a smooth user experience.
* **📊 Interactive Data Visualization:** Features dual side-by-side Recharts (Donut and Radial Bar charts) to dynamically map repository star distribution and language ecosystems.
* **💎 Premium Glassmorphism UI:** Built completely with pure Tailwind CSS v4, featuring glowing omnibars, 3D hover states, and smooth Recharts animations.
* **🔄 Smart Caching & State:** Powered by TanStack Query (React Query) for flawless loading states, error handling, and memory caching without unnecessary API calls.

## 🛠️ Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **State & Data Fetching:** [TanStack Query](https://tanstack.com/query/latest)
* **AI Engine:** [Google Gemini API](https://ai.google.dev/) 
* **Data Visualization:** [Recharts](https://recharts.org/)
* **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started (Local Development)

Want to run DevDash locally? Follow these steps:

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/dev-dash.git
cd dev-dash
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Set up Environment Variables
Create a `.env.local` file in the root of your project and add your Google Gemini API key:
\`\`\`text
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

### 4. Run the development server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
