
import React, { useState } from 'react';
import { Section, Resume } from '../types';
import { SECTIONS, REORDERABLE_SECTIONS } from '../constants';
import { UserIcon, BriefcaseIcon, AcademicCapIcon, SparklesIcon, SunIcon, MoonIcon, CodeBracketIcon, LinkIcon, BadgeCheckIcon, GlobeAltIcon, Squares2X2Icon, EyeIcon, EyeSlashIcon, Bars3Icon } from './ui/Icons';

type SidebarProps = {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  resume: Resume;
  updateSectionOrder: (newOrder: Section[]) => void;
  toggleSectionVisibility: (section: Section) => void;
};

const SectionIcon = ({ section, className }: { section: Section, className: string }) => {
  switch (section) {
    case Section.PERSONAL_INFO: return <UserIcon className={className} />;
    case Section.EXPERIENCE: return <BriefcaseIcon className={className} />;
    case Section.EDUCATION: return <AcademicCapIcon className={className} />;
    case Section.SKILLS: return <SparklesIcon className={className} />;
    case Section.PROJECTS: return <CodeBracketIcon className={className}/>;
    case Section.TEMPLATES: return <Squares2X2Icon className={className}/>;
    case Section.PROFILES: return <LinkIcon className={className}/>;
    case Section.CERTIFICATIONS: return <BadgeCheckIcon className={className}/>;
    case Section.LANGUAGES: return <GlobeAltIcon className={className}/>;
    default: return null;
  }
};

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection, theme, setTheme, resume, updateSectionOrder, toggleSectionVisibility }) => {
  const [draggingItem, setDraggingItem] = useState<Section | null>(null);
  
  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, section: Section) => {
    setDraggingItem(section);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', section);
  };
  
  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>, targetSection: Section) => {
    e.preventDefault();
    const draggedSection = e.dataTransfer.getData('text/plain') as Section;
    
    if (draggedSection && draggedSection !== targetSection && REORDERABLE_SECTIONS.includes(draggedSection) && REORDERABLE_SECTIONS.includes(targetSection)) {
        const currentOrder = resume.sectionOrder.filter(s => REORDERABLE_SECTIONS.includes(s));
        const draggedIndex = currentOrder.indexOf(draggedSection);
        const targetIndex = currentOrder.indexOf(targetSection);

        const newOrder = [...currentOrder];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(targetIndex, 0, draggedSection);

        updateSectionOrder(newOrder);
    }
    setDraggingItem(null);
  };


  return (
    <aside className="w-72 flex-shrink-0 bg-gradient-to-b from-green-50/60 to-emerald-100/60 dark:from-slate-800/80 dark:to-emerald-900/80 backdrop-blur-xl border-r border-white/50 dark:border-slate-800/50 p-6 flex flex-col justify-between shadow-2xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 px-2 py-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
            Resume Builder
        </h1>
        <nav className="space-y-2">
          {SECTIONS.map((section) => {
            const isReorderable = REORDERABLE_SECTIONS.includes(section);
            const isVisible = resume.sectionOrder.includes(section);

            const getStyles = () => {
                let styles = 'w-full flex items-center px-4 py-3 text-sm font-semibold rounded-full transition-all duration-300 group relative transform hover:scale-105 ';
                if (activeSection === section) {
                    return styles + 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white shadow-lg shadow-green-500/40';
                }
                if (draggingItem === section) {
                    return styles + 'bg-green-200 dark:bg-green-900 opacity-50 scale-105';
                }
                if (!isVisible && isReorderable) {
                    return styles + 'text-slate-400 dark:text-slate-600 hover:bg-gradient-to-r hover:from-green-100/50 hover:to-emerald-200/50 dark:hover:bg-gradient-to-r dark:hover:from-emerald-900/50 dark:hover:to-green-800/50 opacity-70';
                }
                return styles + 'text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-green-100/50 hover:to-emerald-200/50 dark:hover:bg-gradient-to-r dark:hover:from-emerald-900/50 dark:hover:to-green-800/50';
            };

            return (
              <button
                key={section}
                draggable={isReorderable}
                onDragStart={(e) => isReorderable && handleDragStart(e, section)}
                onDragEnd={isReorderable ? handleDragEnd : undefined}
                onDragOver={handleDragOver}
                onDrop={(e) => isReorderable && handleDrop(e, section)}
                onClick={() => setActiveSection(section)}
                className={getStyles()}
              >
                {isReorderable && (
                  <Bars3Icon className="h-5 w-5 mr-3 text-slate-400 cursor-grab group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                )}
                <SectionIcon section={section} className={`h-5 w-5 mr-3 ${isReorderable ? '' : 'ml-8'} ${activeSection === section ? 'text-white' : ''}`} />
                <span className="flex-grow text-left">{section}</span>
                {isReorderable && (
                    <div onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(section); }} className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                        {isVisible ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                    </div>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="flex flex-col items-center">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Theme</p>
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={`w-14 h-8 rounded-full p-1 flex items-center transition-colors duration-300 bg-gradient-to-r ${theme === 'light' ? 'from-green-400 to-emerald-500' : 'from-slate-700 to-slate-800'}`}
        >
          <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${theme === 'light' ? 'translate-x-0' : 'translate-x-6'}`}>
            {theme === 'light' 
                ? <SunIcon className="h-4 w-4 m-1 text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-500" /> 
                : <MoonIcon className="h-4 w-4 m-1 text-slate-400" />
            }
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;