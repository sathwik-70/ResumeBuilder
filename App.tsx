
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import TemplateSelector from './components/TemplateSelector';
import { Section, Template } from './types';
import { SECTIONS } from './constants';
import { useResume } from './hooks/useResume';
import { Bars3Icon } from './components/ui/Icons';

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
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  
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

  const handleSidebarNavigation = (section: Section) => {
      setActiveSection(section);
      setMobileTab('editor');
  };


  return (
    <>
      <div className="flex h-[100dvh] font-sans bg-transparent flex-col lg:flex-row overflow-hidden">
        
        {/* Mobile Header */}
        <header className="lg:hidden flex-shrink-0 h-16 bg-gradient-to-r from-green-50/95 to-emerald-100/95 dark:from-slate-800/95 dark:to-emerald-900/95 backdrop-blur-md border-b border-white/50 dark:border-slate-700/50 px-4 flex items-center justify-between z-20 shadow-sm">
           <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors">
                 <Bars3Icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
              </button>
              <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 bg-clip-text text-transparent">Resume Builder</span>
           </div>
           
           <div className="flex bg-white/50 dark:bg-slate-800/50 rounded-lg p-1 backdrop-blur-sm border border-white/20 dark:border-white/10">
              <button 
                onClick={() => setMobileTab('editor')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${mobileTab === 'editor' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
              >
                Editor
              </button>
              <button 
                onClick={() => setMobileTab('preview')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${mobileTab === 'preview' ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
              >
                Preview
              </button>
           </div>
        </header>

        <Sidebar 
          activeSection={activeSection} 
          setActiveSection={handleSidebarNavigation} 
          theme={theme} 
          setTheme={setTheme}
          resume={resumeHook.resume}
          updateSectionOrder={resumeHook.updateSectionOrder}
          toggleSectionVisibility={resumeHook.toggleSectionVisibility}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <main className="flex flex-1 w-full overflow-hidden relative bg-slate-50 dark:bg-slate-900 lg:bg-transparent">
          <div className={`
            w-full h-full
            lg:w-2/5 lg:static lg:block flex-shrink-0
            absolute top-0 left-0 transition-transform duration-300 ease-in-out z-0
            ${mobileTab === 'editor' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            {activeSection === Section.TEMPLATES ? (
                <TemplateSelector 
                  template={template} 
                  setTemplate={setTemplate}
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  resume={resumeHook.resume}
                />
            ) : (
                <Editor 
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                  onGoToPreview={() => setMobileTab('preview')}
                  toggleSectionVisibility={resumeHook.toggleSectionVisibility}
                  {...resumeHook}
                />
            )}
          </div>
          
          <div className={`
            w-full h-full
            lg:w-3/5 lg:static lg:block flex-shrink-0
            absolute top-0 left-0 transition-transform duration-300 ease-in-out z-10 lg:z-auto
            bg-slate-100 dark:bg-slate-900/50
            ${mobileTab === 'preview' ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}>
              <Preview 
                resume={resumeHook.resume} 
                template={template} 
                onEdit={() => setMobileTab('editor')}
                onChangeTemplate={() => { setActiveSection(Section.TEMPLATES); setMobileTab('editor'); }}
              />
          </div>
        </main>
      </div>
      
      {/* Footer: Hidden on mobile to maximize space */}
      <footer className="hidden md:block fixed bottom-4 right-6 text-sm text-emerald-800 dark:text-emerald-100 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg border border-white/30 dark:border-emerald-900/50 z-50">
        crafted with ❤️ by Sathwik Pamu
      </footer>
    </>
  );
};

export default App;
