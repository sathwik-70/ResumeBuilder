# 📄 Professional AI Resume Builder

> **Architected and crafted with ❤️ by Sathwik Pamu**

A production-grade, full-stack capable web application that empowers users to build ATS-friendly, visually stunning resumes in minutes. This project leverages the power of **React 19**, **TypeScript**, **Tailwind CSS**, and **Google Gemini AI** to provide a seamless, real-time resume editing experience.

---

## 📚 Table of Contents

1.  [Overview](#-overview)
2.  [The Template Ecosystem](#-the-template-ecosystem)
    *   [Template Catalog (33 Designs)](#template-catalog)
3.  [Technical Deep Dive](#-technical-deep-dive)
    *   [Real-Time Preview Architecture](#real-time-preview-architecture)
    *   [State Management Implementation](#state-management-implementation)
    *   [PDF Generation Engine](#pdf-generation-engine)
4.  [AI Integration (Gemini 2.5)](#-ai-integration)
5.  [Feature Breakdown](#-feature-breakdown)
6.  [Installation & Setup](#-installation--setup)
7.  [Developer Contact](#-developer-contact)

---

## 🔭 Overview

The **Professional AI Resume Builder** addresses the disconnect between content creation and visual formatting. Traditional word processors shift layout when content changes; this application decouples data from design.

**Core Philosophy:**
*   **Data First**: Users focus on entering their achievements without worrying about fonts or margins.
*   **Design Agnostic**: The underlying data structure allows the same resume to be rendered as a minimal black-and-white document or a vibrant, creative portfolio instantly.
*   **Intelligence**: AI is not an afterthought; it is embedded directly into the input fields to assist with writer's block.

---

## 🎨 The Template Ecosystem

This project features a massive library of **33 unique templates**, each handcrafted using Tailwind CSS to target specific industries, job levels, and aesthetic preferences.

### Template Catalog

The templates are categorized by their design architecture and intended use case:

#### 🏛️ Corporate & Traditional (ATS Optimized)
*Best for: Finance, Law, Government, Traditional Corporate Roles*

1.  **Classic**: The gold standard. Serif fonts (Times New Roman style), strict vertical hierarchy, and elegant dividers.
2.  **Modern**: Clean sans-serif typography with a subtle indigo header bar. Balances professionalism with modern readability.
3.  **Executive**: A sidebar-based layout with a heavy slate header. Highlights expertise and leadership summary.
4.  **Minimal**: Pure whitespace and typography. No distracting colors or borders. Ideal for academic CVs.
5.  **Slate**: A two-column layout using a calming slate-grey sidebar for contact info, maximizing space for experience.
6.  **Corporate Blue**: Traditional structure with deep navy headers. Trustworthy and authoritative.
7.  **Cambridge**: An academic aesthetic with double-borders and centered headers. Perfect for researchers and scholars.
8.  **Vanguard**: A bold red-and-white layout with a strong visual hierarchy. Great for management roles.
9.  **Crimson**: Similar to Corporate Blue but uses deep red accents for a more aggressive, commanding presence.
10. **Monochrome**: High-contrast black and white. Thick borders and blocky headers. Resembles a newspaper layout.

#### 🎨 Creative & Design
*Best for: Graphic Designers, UI/UX, Marketing, Art Directors*

11. **Creative**: Features a vibrant fuchsia sidebar and ample whitespace. Great for showing personality.
12. **Colorful**: Uses a gradient header (Pink-Purple-Indigo) to instantly grab attention.
13. **Spectrum**: Defined by a multi-colored border gradient. Playful yet structured.
14. **Vibrant**: High-energy layout using violet and indigo gradients. Massive typography for names and headers.
15. **Folio**: Mimics a portfolio website. Heavy focus on "Work History" and "Projects" in a grid layout.
16. **Aurora**: Dark mode aesthetics on paper. Deep slate background with glowing green/purple text gradients.
17. **Voltaic**: Cyberpunk-inspired. Neutral-900 background with electric yellow accents and monospaced fonts.
18. **Nordic**: Ultra-minimalist Scandinavian design. Centered alignment, plenty of breathing room, slate-50 background.

#### 💻 Technology & Code
*Best for: Software Engineers, DevOps, Data Scientists*

19. **Techie**: The entire resume looks like an IDE (VS Code). Sections are JSON objects (`const experience = [...]`).
20. **Midnight**: A deep dark theme (Slate-900) with Cyan accents. High contrast, screen-first design.
21. **Onyx**: A structured dark-sidebar layout. Very popular for senior developer roles.

#### 🏥 Service & Industry Specific
*Best for: Healthcare, Hospitality, Trades*

22. **Care**: Designed for Nursing and Healthcare. Calming teal color palette with rounded, soft corners.
23. **Culinary**: A menu-style layout using stone/beige textures and serif fonts. Perfect for Chefs and Hospitality.
24. **Glacier**: Clinical and clean. Cyan and White palette. Excellent for medical or dental professionals.
25. **Artisan**: Textural "paper" background (Stone-50) with a thick border. Great for skilled trades and crafts.

#### 🌟 Modern & Hybrid
*Best for: Startups, Product Management, General Purpose*

26. **Crafter**: The default template. Balanced Emerald Green theme with a left sidebar.
27. **Emerald**: A top-border layout using varied shades of green. Fresh and growth-oriented.
28. **Sunrise**: Warm orange tones with a centered header. Optimistic and energetic.
29. **Ocean**: Sky blue header and background accents. Calm and reliable.
30. **Ruby**: A unique layout with a vertical text sidebar for the name (Rose color scheme).
31. **Goldenrod**: A standout yellow border design. High visibility.
32. **Infographic**: Uses charts and bars to visualize skills and proficiency.
33. **Nova**: Deep Indigo background with pink/purple neon accents. Futuristic and bold.

---

## 🛠 Technical Deep Dive

### Real-Time Preview Architecture

The most complex feature of this application is the **Instant Preview**. Here is how it works under the hood:

1.  **Single Source of Truth**:
    The application state resides in `App.tsx` and is managed by the custom hook `useResume`. This state object conforms to the `Resume` interface defined in `types.ts`.

2.  **Prop Propagation**:
    The `resume` object is passed down to two main branches of the component tree simultaneously:
    *   **The Editor (`<Editor />`)**: Inputs bind directly to this state. When a user types, `setResume` updates the state immediately.
    *   **The Preview (`<Preview />`)**: This component receives the *same* `resume` object as a prop.

3.  **The Rendering Engine (`ResumeContainer`)**:
    Located in `components/Preview.tsx`, the `ResumeContainer` acts as a dynamic switch.
    *   It accepts a `template` enum (e.g., `'MODERN'`).
    *   It conditionally renders the corresponding component (e.g., `<ModernTemplate resume={resume} />`).
    *   **Direct Reactivity**: Since `<ModernTemplate />` is a functional React component that accepts `resume` as a prop, any change in the parent state triggers a re-render. There is no intermediate compilation step. As you type a letter in the "Name" field, React's Virtual DOM diffing updates the text node in the Preview instantly.

4.  **Responsive Scaling (The A4 Challenge)**:
    Web screens vary in width, but an A4 paper is fixed at `210mm` wide.
    *   The preview container uses a **ResizeObserver**.
    *   It calculates the available width of the parent container.
    *   It computes a `scale` factor: `availableWidth / 794px` (794px is the pixel width of A4 at 96 DPI).
    *   It applies a CSS `transform: scale(n)` to the resume. This ensures the resume *looks* like a full page but fits on a mobile screen.

### State Management Implementation

We avoid Redux or Context for simplicity and performance, opting for a custom hook (`useResume.ts`) that handles:
*   **Lazy Initialization**: Reads from `localStorage` only on mount.
*   **Debounced Persistence**: Saves to `localStorage` 500ms after the last edit to prevent disk trashing.
*   **Immutability Helpers**: Provides specific functions (`addListItem`, `updateListItem`) to handle complex nested array updates without mutating state directly.

### PDF Generation Engine

We use `html2pdf.js` for client-side generation.
*   **Input**: The raw DOM node of the `ResumeContainer`.
*   **Configuration**:
    *   `scale: 4`: We render the canvas at 4x resolution before saving to ensure crisp text and sharp images, even for small fonts.
    *   `format: 'a4'`: Strictly enforces standard paper size.
    *   `margin: 0`: We handle margins via CSS padding inside the templates to ensure full-bleed backgrounds (like in the *Nova* or *Aurora* templates) render correctly without white borders.

---

## 🤖 AI Integration

The application integrates with **Google Gemini 2.5 Flash** via the `@google/genai` SDK.

**Implementation Details (`services/geminiService.ts`):**
*   **Prompt Engineering**: We use distinct system instructions for different context types.
    *   *Skills*: "Remove duplicates, fix spelling, categorize."
    *   *Experience*: "Rewrite using STAR method (Situation, Task, Action, Result)."
    *   *Summary*: "Make it impactful and professional."
*   **Latency Optimization**: We set `thinkingBudget: 0` to disable the model's internal reasoning chain for these tasks, ensuring the response is near-instantaneous.

---

## 🧩 Feature Breakdown

1.  **Drag-and-Drop Reordering**:
    *   Users can reorder entire sections (e.g., move "Education" above "Experience") in the Sidebar.
    *   Logic: Standard HTML5 Drag and Drop API updating the `sectionOrder` array in state.

2.  **Section Visibility Toggle**:
    *   Users can hide sections (like "References") without deleting the data.
    *   Logic: Filter the `sectionOrder` array during rendering but keep the data in the `resume` object.

3.  **Rich Text Handling**:
    *   While we use standard text areas, the templates are smart enough to handle newlines and bullet points automatically.

4.  **Dark Mode**:
    *   Implemented via Tailwind's `darkMode: 'class'` strategy. The UI shells (Sidebar, Editor) adapt, but the Resume Preview remains true to its print colors (Paper is always white/colored, ink is always dark).

---

## 💿 Installation & Setup

1.  **Clone**:
    ```bash
    git clone https://github.com/your-username/resume-builder.git
    cd resume-builder
    ```

2.  **Install**:
    ```bash
    npm install
    ```

3.  **Environment**:
    Create a `.env` file (or configure your build environment):
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run**:
    ```bash
    npm run dev
    ```

---

## 👨‍💻 Developer Contact

This project was architected, designed, and developed by **Sathwik Pamu**.

*   **Role**: Full Stack Developer & UI/UX Specialist
*   **Expertise**: React Ecosystem, AI Integration, Modern CSS Architecture.
*   **Vision**: To democratize professional career tools using open web technologies.

If you are interested in this project, have feature requests, or wish to collaborate on future endeavors, please reach out.

*© 2024 Resume Builder. All Rights Reserved.*
