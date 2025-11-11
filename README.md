# Resume Builder - Professional Resume Creator

A modern, professional resume builder web application inspired by platforms like MyPerfectResume and Zety. Create ATS-friendly resumes with beautiful templates and real-time preview.

## 🚀 Features

### Core Features
- **Multi-Step Resume Builder Flow** - Guided step-by-step process
- **Professional Templates** - Multiple ATS-friendly templates
- **Real-Time Preview** - See changes instantly as you build
- **PDF Export** - Download professional PDF resumes
- **Auto-Save** - Never lose your progress
- **Dark/Light Mode** - Toggle between themes

### Resume Sections
- Personal Information
- Education
- Work Experience
- Skills
- Certifications
- Projects
- Languages
- Achievements
- Interests

### Template Categories
- **Tech Templates** - Perfect for software developers, engineers
- **Creative Templates** - Ideal for designers, artists, marketers
- **Business Templates** - Professional for corporate roles
- **Academic Templates** - Research and education positions
- **Minimalist Templates** - Clean, content-focused designs

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **PDF Generation**: jsPDF + html2canvas
- **Build Tool**: Vite
- **State Management**: React Context + useReducer

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in the terminal)

## 🏗️ Project Structure

```
src/
├── components/
│   ├── steps/           # Form step components
│   ├── templates/       # Resume template components
│   ├── Header.tsx       # Navigation header
│   ├── HomePage.tsx     # Landing page
│   ├── ResumeBuilder.tsx # Main builder component
│   ├── ResumePreview.tsx # Live preview component
│   └── StepIndicator.tsx # Progress indicator
├── context/
│   └── ResumeContext.tsx # Global state management
├── types/
│   └── index.ts         # TypeScript type definitions
├── App.tsx              # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Templates

The application includes several professional templates:

### Modern Templates
- **Modern Tech**: Clean design with accent colors for tech roles
- **Modern Creative**: Bold design for creative positions

### Traditional Templates
- **Traditional Business**: Classic format for corporate roles
- **Traditional Academic**: Academic format for research positions

### Minimalist Templates
- **Minimalist Clean**: Ultra-clean design focusing on content
- **Minimalist Elegant**: Elegant design for sophisticated roles

## 📄 PDF Export

The application generates professional PDF resumes that are:
- ATS-friendly (Applicant Tracking System compatible)
- Print-ready with proper A4 formatting
- Clean and professional
- Optimized for readability

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Templates

1. Create a new template component in `src/components/templates/`
2. Add the template to the `ResumeTemplate.tsx` switch statement
3. Add template metadata to the templates array in `TemplateStep.tsx`

### Adding New Form Steps

1. Create a new step component in `src/components/steps/`
2. Add the step to the steps array in `ResumeBuilder.tsx`
3. Add the step to the renderStepContent switch statement
4. Update the types in `src/types/index.ts` if needed

## 🎯 Key Features Implementation

### Multi-Step Form
- Guided step-by-step process
- Progress tracking
- Ability to go back and edit previous steps
- Form validation with React Hook Form

### Real-Time Preview
- Live preview updates as you type
- A4 page formatting
- Responsive design
- Template switching

### Auto-Save
- Automatic saving to localStorage
- Data persistence across sessions
- No data loss

### PDF Generation
- High-quality PDF export
- Proper A4 formatting
- ATS-friendly output
- Clean, professional appearance

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by professional resume builders like MyPerfectResume and Zety
- Built with modern React best practices
- Uses Tailwind CSS for beautiful, responsive design
- PDF generation powered by jsPDF and html2canvas

## 📞 Support

For support or questions, please open an issue in the repository. 