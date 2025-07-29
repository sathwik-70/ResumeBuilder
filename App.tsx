
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
      <footer className="fixed bottom-6 right-6 z-50">
        <div className="p-px rounded-full bg-gradient-to-r from-green-300/50 via-emerald-400/50 to-teal-300/50 dark:from-slate-600/80 dark:to-slate-700/80 shadow-2xl">
            <div className="px-5 py-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300">
                crafted with ❤️ by Sathwik Pamu
            </div>
        </div>
      </footer>
    </>
  );
};

export default App;
