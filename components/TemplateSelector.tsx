
import React from 'react';
import { Section, Template, Resume } from '../types';
import { ArrowLeftIcon, ArrowRightIcon } from './ui/Icons';
import { SECTIONS } from '../constants';
import { ResumeContainer } from './Preview';

type TemplateSelectorProps = {
  template: Template;
  setTemplate: (template: Template) => void;
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  resume: Resume;
};

const TemplateThumbnail: React.FC<{
    templateName: Template, 
    activeTemplate: Template, 
    setTemplate: (t: Template) => void,
    children: React.ReactNode
}> = ({ templateName, activeTemplate, setTemplate, children }) => (
    <div className="text-center">
        <button
            onClick={() => setTemplate(templateName)}
            className={`w-full rounded-2xl p-1.5 transition-all duration-300 group transform hover:-translate-y-2 relative ${
                activeTemplate === templateName ? 'shadow-2xl ring-2 ring-emerald-500 ring-offset-2' : 'shadow-lg hover:shadow-xl'
            }`}
        >
            <div className="relative w-full h-80 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden flex justify-center items-start pt-4">
                 <div className="transform scale-[0.27] origin-top shadow-md pointer-events-none select-none">
                    {children}
                 </div>
            </div>
        </button>
        <p className={`mt-4 text-base font-bold transition-colors ${activeTemplate === templateName ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-200'}`}>{templateName}</p>
    </div>
);

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ template, setTemplate, activeSection, setActiveSection, resume }) => {
  
  const currentIndex = SECTIONS.indexOf(activeSection);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < SECTIONS.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) setActiveSection(SECTIONS[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) setActiveSection(SECTIONS[currentIndex + 1]);
  };

  const NavigationButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <button
          onClick={handlePrevious}
          disabled={!hasPrevious}
          className={`flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-200 ${isMobile ? 'flex-1' : ''} ${
              hasPrevious 
              ? 'text-emerald-700 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 shadow-sm' 
              : 'text-slate-400 dark:text-slate-600 bg-slate-100 dark:bg-slate-800/50 cursor-not-allowed'
          }`}
      >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Previous
      </button>

      <button
          onClick={handleNext}
          disabled={!hasNext}
          className={`flex items-center justify-center px-5 py-2.5 text-sm font-bold rounded-full shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5 ${isMobile ? 'flex-1' : ''} ${
              hasNext
              ? 'text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600'
              : 'text-slate-400 bg-slate-200 dark:bg-slate-700 cursor-not-allowed shadow-none'
          }`}
      >
          Next
          <ArrowRightIcon className="w-4 h-4 ml-2" />
      </button>
    </>
  );

  // Filter out Onyx and add it to the end
  const templateList = Object.values(Template).filter(t => t !== Template.ONYX);
  templateList.push(Template.ONYX);

  return (
    <div className="h-full flex flex-col relative bg-transparent">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 custom-scrollbar">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-6 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent shrink-0">Choose a Template</h2>
        <div className="rounded-2xl bg-gradient-to-br from-emerald-200 via-green-200 to-teal-200 dark:from-emerald-800/80 dark:via-green-800/80 dark:to-slate-900/80 p-px shadow-2xl flex flex-col min-h-[calc(100%-4rem)]">
          <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-lg rounded-[15px] p-4 md:p-8 flex-grow flex flex-col">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-12 flex-grow px-2">
                {templateList.map((t) => (
                    <TemplateThumbnail 
                        key={t} 
                        templateName={t} 
                        activeTemplate={template} 
                        setTemplate={setTemplate}
                    >
                        <ResumeContainer resume={resume} template={t} id={undefined} />
                    </TemplateThumbnail>
                ))}
            </div>
            
            {/* Desktop Navigation Buttons (Inside card) */}
            <div className="hidden md:flex mt-8 pt-6 border-t border-emerald-100 dark:border-slate-700 justify-between items-center gap-4">
              <NavigationButtons />
            </div>
          </div>
        </div>

        <div className="md:hidden mt-8 text-center text-xs text-slate-400 pb-8">
          crafted with ❤️ by Sathwik Pamu
        </div>
      </div>

      {/* Mobile Fixed Footer */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl border-t border-emerald-100 dark:border-slate-700 z-20 flex gap-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
         <NavigationButtons isMobile />
      </div>
    </div>
  );
};

export default TemplateSelector;
