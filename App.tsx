
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import TemplateSelector from './components/TemplateSelector';
import { Section, Template } from './types';
import { SECTIONS } from './constants';
import { useResume } from './hooks/useResume';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(SECTIONS[0]);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('theme');
    // Ensure it's a valid value, otherwise default to 'light'
    return storedTheme === 'dark' ? 'dark' : 'light';
  });
  const [template, setTemplate] = useState<Template>(() => {
      const savedTemplate = localStorage.getItem('resume-template');
      return (savedTemplate as Template) || Template.CRAFTER;
  });
  
  const resumeHook = useResume();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('resume-template', template);
  }, [template]);


  return (
    <>
      <div className="flex h-screen font-sans bg-transparent">
        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          theme={theme} 
          setTheme={setTheme}
          resume={resumeHook.resume}
          updateSectionOrder={resumeHook.updateSectionOrder}
          toggleSectionVisibility={resumeHook.toggleSectionVisibility}
        />
        <main className="flex flex-1 w-full overflow-hidden">
          <div className="w-2/5 flex-shrink-0">
            {activeSection === Section.TEMPLATES ? (
                <TemplateSelector template={template} setTemplate={setTemplate} />
            ) : (
                <Editor 
                  activeSection={activeSection}
                  {...resumeHook}
                />
            )}
          </div>
          <div className="w-3/5">
              <Preview 
                resume={resumeHook.resume} 
                template={template} 
              />
          </div>
        </main>
      </div>
      <footer className="fixed bottom-4 right-6 text-sm text-emerald-800 dark:text-emerald-100 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg border border-white/30 dark:border-emerald-900/50 z-50">
        crafted with ❤️ by Sathwik Pamu
      </footer>
    </>
  );
};

export default App;