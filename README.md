
# Resume Builder

A powerful, modern resume builder that leverages the Google Gemini API to help you create a professional and impactful resume. Edit sections in real-time, choose from a variety of beautiful templates, enhance your content with AI suggestions, and export a pixel-perfect PDF.

## ✨ Key Features

-   **Live Preview**: See your resume update in real-time as you type.
-   **25+ Professional Templates**: A wide selection of beautifully designed resume templates, from modern and creative to classic and executive.
-   **AI-Powered Content Enhancement**: Use the power of Google Gemini to rewrite and improve your professional summary and experience bullet points.
-   **Drag & Drop Layout Control**: Intuitively reorder resume sections directly within the live preview to customize the flow of your document.
-   **Section Visibility**: Easily hide or show sections to tailor your resume for different job applications.
-   **Dynamic Page Filling**: Templates automatically adjust their spacing to fill the entire page, ensuring a polished and professional look without awkward gaps.
-   **PDF Export**: Download your final resume as a high-quality, print-ready A4 PDF.
-   **Profile Image Upload**: Personalize your resume by adding a profile picture.
-   **Dark & Light Mode**: Switch between themes for your preferred editing environment.
-   **Persistent State**: All your data is automatically saved to your browser's local storage, so you'll never lose your work.

## 🚀 Tech Stack

-   **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **AI Integration**: [Google Gemini API (`@google/genai`)](https://ai.google.dev/sdks/gemini-api)
-   **PDF Generation**: [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
-   **Module Loading**: Native ES Modules with [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) (No build step required!)

## 🔧 Getting Started

This project is designed to run directly in the browser without any build steps.

### Prerequisites

-   A modern web browser (like Chrome, Firefox, or Edge).
-   A local web server to serve the files. You can use the `http-server` npm package or the Live Server extension in VS Code.

### Configuration: API Key for Local Development

The application is designed to securely access the Google Gemini API key from a pre-configured environment variable (`process.env.API_KEY`).

To run the application on your local machine for development or testing, you need to simulate this environment.

1.  **Get an API Key**: If you don't have one, get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).

2.  **Create a local environment file**: In the root directory of the project, create a new file named `env.js`.

3.  **Add your key to `env.js`**: Paste the following code into the file, replacing `"YOUR_API_KEY_HERE"` with your actual key. This file will create the necessary object on the `window` before the main application loads.
    ```javascript
    // env.js
    window.process = { env: { API_KEY: "YOUR_API_KEY_HERE" } };
    ```
    > **Note:** This `env.js` file should be added to your `.gitignore` to prevent accidentally committing your secret key to version control.

4.  **Load the environment file in `index.html`**: Open `index.html` and add a script tag for `env.js`. This tag **must** come *before* the main application script (`index.tsx`).

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <!-- ... other head tags ... -->
        <script src="env.js"></script>
        <!-- ... other head tags ... -->
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/index.tsx"></script>
      </body>
    </html>
    ```

### Running the App

1.  Clone or download the project files.
2.  Follow the **Configuration** steps above to set up your API key by creating and modifying `env.js` and `index.html`.
3.  Start a local web server in the project's root directory.
    -   If you have Node.js, you can run `npx http-server`.
    -   Alternatively, use the "Go Live" feature from the Live Server extension in VS Code.
4.  Open your browser and navigate to the local server's address (e.g., `http://localhost:8080`).

## 📁 Project Structure

```
.
├── components/         # React components
│   ├── Editor.tsx
│   ├── Preview.tsx
│   ├── Sidebar.tsx
│   ├── TemplateSelector.tsx
│   └── ui/
│       └── Icons.tsx
├── hooks/              # Custom React hooks
│   └── useResume.ts
├── services/           # API call services
│   └── geminiService.ts
├── App.tsx             # Main application component
├── constants.ts        # Constants and initial data
├── index.html          # HTML entry point
├── index.tsx           # React root renderer
├── metadata.json       # Application metadata
├── types.ts            # TypeScript type definitions
└── README.md           # You are here
```