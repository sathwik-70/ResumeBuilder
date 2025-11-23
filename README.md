
# 📄 Professional AI Resume Builder

> **Build, Customize, and Download professional resumes in minutes with the power of Google Gemini AI.**

A feature-rich, modern web application designed to help users create ATS-friendly, visually stunning resumes. This project leverages React, TypeScript, and Tailwind CSS for a seamless user experience, integrated with Google's Gemini API for smart content enhancement.

## 🚀 Key Features

### 🧠 Advanced AI Integration
At the heart of the application is **Google Gemini AI**, assisting users in writing compelling content:
-   **Professional Summaries**: Generates impactful, role-specific professional summaries based on current trends.
-   **Experience Enhancement**: Rewrites job descriptions into concise, achievement-oriented bullet points using the **STAR method** (Situation, Task, Action, Result).
-   **Project Descriptions**: Transforms technical ramblings into clear, high-impact project showcases highlighting technical challenges and outcomes.
-   **Skill Optimization**: Organizes and refines raw lists of skills into professional keywords.

### 🎨 Extensive Template Library
The application features **30+ handcrafted templates** designed for every stage of a career, from internships to executive roles.

**Template Categories:**
*   **Modern & Clean**: (*Modern, Crafter, Emerald, Slate*) - Perfect for corporate jobs, balancing white space with subtle colors.
*   **ATS-Friendly**: (*Classic, Minimal, Typographic*) - Text-focused layouts optimized for Applicant Tracking Systems.
*   **Creative & Vibrant**: (*Aurora, Voltaic, Spectrum, Vibrant*) - High-energy designs with bold gradients and colors for designers and marketers.
*   **Professional & Dark**: (*Onyx, Midnight, Techie*) - Sleek dark-mode inspired themes ideal for developers and tech professionals.
*   **Industry Specific**: (*Culinary, Care, Glazier*) - Tailored layouts for hospitality, healthcare, and medical fields.

### 👁️ Real-Time Responsive Preview
*   **Instant Feedback**: The preview pane updates instantly as you type in the editor.
*   **Responsive Scaling**: The A4 preview automatically scales to fit any screen size, from mobile phones to large desktop monitors, ensuring you always see the full layout.
*   **Visual Fidelity**: What you see is exactly what you get in the PDF export.

### 📱 Mobile-First Experience
*   **Adaptive Layout**: On desktop, enjoy a split-screen view. On mobile, seamless tab switching between Editor and Preview.
*   **Sidebar Navigation**: A collapsible sidebar allows for quick jumping between resume sections.
*   **Touch-Optimized**: All buttons and inputs are sized for touch interaction.

## 📝 Resume Data Sections

The application collects comprehensive professional data to build a complete profile:

1.  **Personal Information**:
    *   Full Name, Job Title.
    *   Contact details (Email, Phone, Location).
    *   Social Links (LinkedIn, Website/Portfolio).
    *   **Profile Photo**: Option to upload, crop, and display a professional headshot (supported by specific templates).
    *   **Professional Summary**: AI-enhanced bio text.

2.  **Professional Experience**:
    *   Role/Title, Company Name.
    *   Dates of Employment.
    *   Location.
    *   **Bullet Points**: Dynamic list support for job responsibilities, with individual AI enhancement for each point.

3.  **Education**:
    *   Degree/Qualification.
    *   Institution/School.
    *   Graduation Date & Location.

4.  **Projects**:
    *   Project Name & Link.
    *   Tech Stack used.
    *   Detailed Description (AI-enhanced).

5.  **Skills**:
    *   A flexible text area that parses soft and hard skills, formatted automatically by the chosen template.

6.  **Additional Sections**:
    *   **Certifications**: track professional licenses and certificates.
    *   **Languages**: proficiency levels with visual bars in supported templates.
    *   **Websites & Profiles**: Add unlimited external links (GitHub, Behance, etc.).

## 📤 Export & Download

The application includes a robust export engine powered by `html2pdf.js`:

*   **Pixel-Perfect PDF**: Generates high-quality A4 PDFs (210mm x 297mm).
*   **Single-Page Optimization**: The preview engine is tuned to help users fit content onto a single page, a standard preference for modern recruiters.
*   **Custom Filenames**: Before downloading, a modal prompts the user to name their file (defaults to `[Name]_resume.pdf`), ensuring organized file management.
*   **Client-Side Generation**: The PDF is generated entirely in the browser. No personal data is sent to a server for file creation.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React 19](https://react.dev/) - For a reactive, component-based UI.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety and robust code.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - For rapid, utility-first styling and responsive design.
-   **AI Integration**: [Google Gemini API (@google/genai)](https://ai.google.dev/) - For generative text features.
-   **PDF Generation**: [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) - For converting DOM elements to PDF.
-   **Icons**: Heroicons - For a clean, consistent icon set.
-   **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`) & LocalStorage for persistence.

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

## 👨‍💻 Developer Contact

This project was crafted with ❤️ by **Sathwik Pamu**.

I am passionate about building scalable web applications and intuitive UI/UX experiences. If you have any questions, suggestions for new templates, or just want to connect, feel free to reach out!

-   **Developer**: Sathwik Pamu
-   **Role**: Full Stack Developer & UI/UX Enthusiast
-   **Focus**: React, TypeScript, Tailwind CSS, AI Integration.

---

