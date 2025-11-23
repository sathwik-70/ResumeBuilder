# 📄 Professional AI Resume Builder

> **Build, Customize, and Download professional resumes in minutes with the power of Google Gemini AI.**

A feature-rich, modern web application designed to help users create ATS-friendly, visually stunning resumes. This project leverages React 19, TypeScript, and Tailwind CSS for a seamless user experience, integrated with Google's Gemini API for smart content enhancement.

---

## 📚 Table of Contents

1.  [Overview](#-overview)
2.  [Key Features](#-key-features)
3.  [Technical Architecture](#-technical-architecture)
    *   [Component Structure](#component-structure)
    *   [State Management](#state-management)
    *   [The Template Engine](#the-template-engine)
4.  [AI Integration](#-ai-integration-gemini)
5.  [Resume Data Structure](#-resume-data-structure)
6.  [Installation & Setup](#-installation--setup)
7.  [Usage Guide](#-usage-guide)
8.  [Developer Guide](#-developer-guide)
9.  [Contact](#-developer-contact)

---

## 🔭 Overview

The **Professional AI Resume Builder** is a client-side Single Page Application (SPA) designed to solve the common pain points of resume creation: formatting frustrations, lack of inspiration, and writer's block.

By combining a form-based editor with a real-time visual previewer, users can see their changes instantly. The application persists data locally, ensuring no work is lost, and uses generative AI to polish professional summaries, experience bullets, and skills.

---

## 🚀 Key Features

### 🧠 Advanced AI Integration
Powered by **Google Gemini 2.5 Flash**, the app acts as a professional resume writer:
-   **Contextual Enhancement**: It understands the difference between a "Project Description" and a "Job Responsibility".
-   **STAR Method Application**: Automatically rewrites experience bullets to follow the Situation-Task-Action-Result format.
-   **Skill Extraction**: Cleans up messy lists of skills into professional, keyword-rich formats.
-   **Tone Adjustment**: Ensures all text maintains a professional, active voice.

### 🎨 Extensive Template Engine
The application features **30+ handcrafted templates** catering to specific industries:
-   **Corporate/ATS**: (*Classic, Minimal, Slate*) - Clean typography, standard margins, black & white for high readability by parsing bots.
-   **Creative**: (*Aurora, Voltaic, Vibrant*) - High-energy layouts with gradients, background patterns, and non-standard grids for designers.
-   **Tech-Focused**: (*Techie, Midnight*) - Dark modes and monospaced fonts resembling code editors.
-   **Industry Specific**: (*Culinary, Care, Glacier*) - Thematic designs for hospitality and healthcare.

### 📱 Responsive & Adaptive UI
-   **Desktop**: A productivity-focused split-screen layout. The Editor allows for data entry on the left, while the Preview updates in real-time on the right.
-   **Mobile**: A tab-based interface ("Editor" vs "Preview") with a collapsible navigation sidebar and touch-friendly input fields.
-   **Dynamic Scaling**: The A4 preview component uses CSS Transforms to scale down perfectly to fit any screen width (from 320px to 4k) while maintaining the correct aspect ratio for printing.

### 💾 Local Persistence
-   **Auto-Save**: Data is saved to the browser's `localStorage` on every keystroke (debounced).
-   **Privacy Focused**: No user data is sent to a backend server. The resume lives entirely on the client's device.

---

## 🏗 Technical Architecture

### Component Structure

The application is built using a modular React architecture:

*   **`App.tsx`**: The root layout controller. It handles the responsive switching between mobile tabs and desktop split-views. It manages global state like `theme` and `activeSection`.
*   **`Sidebar.tsx`**: A navigation component that handles section switching and reordering via Drag-and-Drop API.
*   **`Editor.tsx`**: A composite component containing specific sub-forms (`PersonalInfoForm`, `ExperienceForm`, etc.). It handles all user input and validation.
*   **`Preview.tsx`**: The rendering engine. It calculates the necessary scale factor to fit the A4 page on the screen and renders the selected template.
*   **`TemplateSelector.tsx`**: A gallery view that renders miniature versions of the user's actual resume inside template thumbnails using the `ResumeContainer`.

### State Management

The application uses a custom hook **`useResume.ts`** to centralize logic:
1.  **Initialization**: It lazy-loads data from `localStorage` or falls back to `INITIAL_RESUME_DATA`.
2.  **Actions**: It exports specific reducer-like functions (`updatePersonalInfo`, `addListItem`, `updateListItem`, `reorderSections`) to prevent component prop drilling from becoming unmanageable.
3.  **Persistence**: It uses a `useEffect` with a debounce timer to save state changes back to `localStorage`.

### The Template Engine

The template system in `components/Preview.tsx` is designed for extensibility:
*   **ResumeContainer**: A wrapper component that receives the `resume` data and a `template` enum. It switches dynamically to render the correct child component (e.g., `<ModernTemplate />`).
*   **Isolated CSS**: Each template is a self-contained functional component using Tailwind utility classes. This ensures that styling changes in one template do not break others.
*   **Data Safety**: All templates are typed to accept the full `Resume` interface. If a user adds a new section, TypeScript ensures we update the templates to render it.

---

## 🤖 AI Integration (Gemini)

The `services/geminiService.ts` module handles communication with Google's Generative AI.

**Key Prompts Used:**
1.  **Summary**: *"Rewrite this into a single professional paragraph focusing on action verbs."*
2.  **Bullet Point**: *"Rewrite using the STAR method. Be concise."*
3.  **Skills**: *"Reorganize into a professional list, removing duplicates."*
4.  **Project**: *"Highlight technical challenges and impact."*

**Configuration:**
-   **Model**: `gemini-2.5-flash` (Optimized for speed and cost).
-   **Temperature**: `0.7` (Balances creativity with professional adherence).

---

## 📂 Resume Data Structure

The application uses a strict TypeScript interface (`types.ts`) to ensure data integrity:

```typescript
interface Resume {
  personalInfo: {
    name: string;
    email: string;
    // ...
  };
  experience: ExperienceItem[]; // { id, title, company, description[], ... }
  education: EducationItem[];
  projects: ProjectItem[];
  skills: string[];
  sectionOrder: Section[]; // Allows users to reorder resume sections
  // ...
}
```

---

## 💿 Installation & Setup

This project uses **Vite** for a fast development experience and **Tailwind CSS** for styling.

### Prerequisites
*   Node.js (v16 or higher recommended)
*   NPM or Yarn

### Steps

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/resume-builder.git
    cd resume-builder
    ```

2.  **Install Dependencies**
    *(Note: This project currently uses CDN links for React in the provided code, but for a local Node environment, you would run)*:
    ```bash
    npm install
    ```

3.  **Configure API Key**
    To use AI features, you need a Google Gemini API Key.
    *   Get a key from [Google AI Studio](https://aistudio.google.com/).
    *   Create a file `env.js` or `.env` depending on your build setup.
    *   *For the provided code structure*, verify `process.env.API_KEY` is accessible.

4.  **Run Development Server**
    ```bash
    npm run dev
    # OR if using the HTML/JS version directly:
    npx http-server .
    ```

---

## 📖 Usage Guide

1.  **Start in the Editor**: Fill out the "Personal Info" section. Upload a professional photo if your region/industry requires it.
2.  **Add Experience**: Use the "Add Experience" button. Type a rough draft of your duties, then click the **✨ (Sparkles)** button to have AI rewrite them professionally.
3.  **Customize Sections**: Use the Sidebar to drag-and-drop sections. For example, if you are a fresh graduate, move "Education" above "Experience".
4.  **Choose a Template**: Go to the "Templates" tab. Click through the thumbnails. The preview updates instantly.
5.  **Refine**: Toggle the visibility of sections you don't need (e.g., References).
6.  **Download**: Click "Download PDF". A modal will ask for a filename. The app generates a polished PDF ready for application.

---

## 👩‍💻 Developer Guide

### Adding a New Template
1.  **Define Enum**: Add a new key to `Template` enum in `types.ts`.
2.  **Create Component**: Create a new component in `components/Preview.tsx` (e.g., `const MyNewTemplate = ({ resume }) => ...`).
3.  **Register**: Add the component to the `switch` statement in `ResumeContainer`.
4.  **Add Thumbnail**: The `TemplateSelector` will automatically pick it up, but you can customize the background color mapping in `getTemplateBackground`.

### Customizing the Theme
The app uses Tailwind's configuration. You can change the primary color scheme by editing the `bg-gradient` classes in `App.tsx` and `Sidebar.tsx`.

---

## 📬 Developer Contact

This project was architected and crafted with ❤️ by **Sathwik Pamu**.

I am a Full Stack Developer passionate about building tools that empower users. This project represents my expertise in:
*   **Frontend Engineering**: React, TypeScript, Responsive Design.
*   **UX/UI Design**: Creating intuitive, accessible interfaces.
*   **AI Integration**: leveraging LLMs for practical user utility.

If you have questions, feature requests, or want to collaborate:

*   **Developer**: Sathwik Pamu
*   **Role**: Full Stack Developer
*   **Focus**: React, Next.js, AI, and Modern Web Technologies.

---
*© 2024 Resume Builder. All Rights Reserved.*
