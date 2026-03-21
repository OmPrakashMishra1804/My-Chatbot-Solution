# 🌿 Ayurvedic Sage: Ancient Wisdom AI

Ayurvedic Sage is a niche-specific, production-ready chatbot designed to provide ancient Indian wellness guidance, identify medicinal plants, and offer holistic lifestyle advice. 

Built with a focus on premium **Frontend Experience (UX/UI)**, the app feels like a sanctuary of knowledge rather than a generic utility.

## 🎯 Why Ayurvedic Sage?

While general AI exists, users seeking wellness often want a specific "persona" — one that is wise, calm, and grounded in tradition. This project demonstrates how niche branding, specific system prompting, and tailored UI can transform a basic chat interface into a specialized product.

## ✨ Key Features

- **Wise AI Persona**: System-prompted to act as an Ayurvedic expert with a compassionate, formal tone.
- **Micro-Animations**: Uses Framer Motion for smooth entry of bubbles, onboarding, and loading states.
- **Smart UX States**:
  - **Onboarding**: A premium welcome sequence to set the tone.
  - **Empty State**: Intelligent prompt chips (e.g., "Identify Tulsi", "Balance Doshas").
  - **Loading Shimmer**: Custom skeleton loaders for a polished feel during contemplation.
- **Glassmorphism Design**: Modern UI with soft shadows, emerald/gold palette, and parchment-like backgrounds.
- **Persistence**: Remembers your journeys across sessions using `localStorage`.
- **Responsive & Premium**: Optimized for mobile and desktop with a fixed sidebar/drawer.

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS (Custom Theme)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Logic**: Custom Hooks (`useLocalStorage`) + AI Mock Service

## 🚀 Future Improvements

- **Image Analysis**: Integrated plant identification via Vision AI.
- **Dosha Quiz**: An interactive questionnaire to determine user constitution.
- **Voice Synthesis**: A calm, meditative voice for AI responses.
- **PDF Reports**: Generating "Wellness Prescriptions" based on chat history.

## 📂 Project Structure

```text
/src
  /components  -> UI logic and layout
  /hooks       -> Custom state management (LocalStorage)
  /services    -> AI logic and system prompts
  /App.jsx     -> Main application controller
  /index.css   -> Custom design system tokens
```
