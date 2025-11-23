
# 📄 Professional AI Resume Builder

> **Build, Customize, and Download professional resumes in minutes with the power of Google Gemini AI.**

A feature-rich, modern web application designed to help users create ATS-friendly, visually stunning resumes. This project leverages React, TypeScript, and Tailwind CSS for a seamless user experience, integrated with Google's Gemini API for smart content enhancement.

## ✨ Key Features

### 🎨 Design & Customization
-   **30+ Professional Templates**: From "Executive" and "Classic" to "Creative" and "Techie", choose a design that fits your industry.
-   **Live Real-Time Preview**: Watch your resume transform instantly as you type.
-   **Drag & Drop Reordering**: Easily rearrange sections (Experience, Education, Skills, etc.) to prioritize your strongest assets.
-   **Smart Section Visibility**: Toggle sections on or off with a single click—perfect for tailoring resumes to specific job descriptions.
-   **Theme Support**: Fully functional Dark Mode and Light Mode for comfortable editing day or night.

### 🤖 AI-Powered Enhancements
-   **Smart Summary Writer**: Generate impactful professional summaries based on your role.
-   **Bullet Point Refiner**: Turn basic task lists into achievement-oriented STAR method bullet points.
-   **Skill Organizer**: Instantly categorize and professionalize your list of skills.
-   **Project Description Improver**: Make your project descriptions concise and technical with one click.

### 📱 Responsive & Accessible
-   **Mobile-First Design**: Edit your resume on the go with a fully responsive mobile interface featuring a slide-out sidebar and fixed navigation.
-   **Cross-Platform**: Works seamlessly on Desktop, Tablet, and Mobile devices.

### 📤 Export & Privacy
-   **High-Quality PDF**: Download a pixel-perfect A4 PDF ready for printing or emailing.
-   **Local Storage**: Your data stays in your browser. No accounts, no servers—your privacy is paramount.
-   **Single Page Optimization**: Templates are optimized to fit content neatly onto A4 pages.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React 19](https://react.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**: [Google Gemini API (@google/genai)](https://ai.google.dev/)
-   **PDF Generation**: [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)
-   **Icons**: Heroicons
-   **Build Tool**: Native ES Modules (No bundler required for dev)

## 🚀 Getting Started

This project is built to run directly in the browser using modern ES Modules.

### 1. Prerequisites
-   A modern web browser (Chrome, Edge, Firefox).
-   A code editor (VS Code recommended).
-   A local web server (e.g., Live Server extension for VS Code, or `npx http-server`).

### 2. Installation
Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

### 3. API Configuration
To use the AI features, you need a Google Gemini API Key.

1.  Get a key from [Google AI Studio](https://aistudio.google.com/).
2.  Create a file named `env.js` in the root directory.
3.  Add the following code to `env.js`:
    ```javascript
    window.process = { 
      env: { 
        API_KEY: "YOUR_GOOGLE_GEMINI_API_KEY_HERE" 
      } 
    };
    ```
4.  **Security Note**: Never commit `env.js` to public repositories.

### 4. Running the App
Since this project uses native ES modules, you cannot open `index.html` directly from the file system (file:// protocol). You must serve it via HTTP.

-   **VS Code**: Right-click `index.html` and select "Open with Live Server".
-   **Terminal**: Run `npx http-server .` and open the provided localhost URL.

## 📂 Project Structure

```
resume-builder/
├── components/         # React UI Components
│   ├── Editor.tsx      # Main form inputs and AI logic
│   ├── Preview.tsx     # Resume rendering and PDF export
│   ├── Sidebar.tsx     # Navigation and section management
│   ├── TemplateSelector.tsx # Grid view for choosing designs
│   └── ui/             # Reusable UI elements (Icons, etc.)
├── hooks/              # Custom Hooks
│   └── useResume.ts    # State management and LocalStorage logic
├── services/           # External Services
│   └── geminiService.ts# Google Gemini API integration
├── App.tsx             # Main Layout
├── constants.ts        # Initial data and configuration
├── types.ts            # TypeScript Interfaces
└── index.html          # Entry point
```

## 👨‍💻 Developer Contact

This project was crafted with ❤️ by **Sathwik Pamu**.

If you have any questions, suggestions, or just want to connect, feel free to reach out!

-   **Developer**: Sathwik Pamu
-   **Role**: Full Stack Developer & UI/UX Enthusiast
-   **mail** : sathwikpamu@gmail.com
-   **Focus**: Building scalable web applications with modern technologies.

---
* Resume Builder. All Rights Reserved.*
