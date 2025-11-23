
import React, { useRef, useLayoutEffect, useState } from 'react';
import { Resume, Template, Section } from '../types';
import { UserIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon, BriefcaseIcon, AcademicCapIcon, CodeBracketIcon, SparklesIcon, LinkIcon, BadgeCheckIcon, GlobeAltIcon, XMarkIcon, PencilSquareIcon, ArrowLeftIcon, Squares2X2Icon } from './ui/Icons';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from 'html2pdf.js';

type PreviewProps = {
  resume: Resume;
  template: Template;
  onEdit?: () => void;
  onChangeTemplate?: () => void;
};

const ensureHttps = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    if (url.includes('@') && !url.startsWith('mailto:')) {
        return `mailto:${url}`;
    }
    return `https://${url}`;
};

// --- Helper for rendering lists ---
const renderList = (items: string[]) => (
    <ul className="list-disc list-inside">
        {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
);

// --- Template Components ---

const CrafterTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const renderProficiencyBar = (proficiency: number) => {
        const totalSquares = 5;
        const filledSquares = Math.round(proficiency);
        return (
            <div className="flex gap-1 mt-1.5">
                {Array.from({ length: totalSquares }).map((_, i) => (
                    <div key={i} className={`w-5 h-1.5 rounded-full ${i < filledSquares ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
                ))}
            </div>
        );
    };

    const LeftColumnSections = {
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-sm font-bold tracking-wider uppercase mb-3 text-slate-800">Websites &amp; Profiles</h2>
                <ul className="space-y-2 text-xs">
                    {profiles.map((profile, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-500 mt-0.5">&bull;</span>
                            <a href={ensureHttps(profile)} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{profile}</a>
                        </li>
                    ))}
                </ul>
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-sm font-bold tracking-wider uppercase mb-3 text-slate-800">Certifications</h2>
                <ul className="space-y-3 text-xs">
                     {certifications.map(cert => (
                        <li key={cert.id} className="flex items-start gap-2">
                           <span className="text-slate-500 mt-0.5">&bull;</span>
                           <div>
                            <p className="font-bold">{cert.name}</p>
                            <p className="italic text-slate-600">{cert.issuer}</p>
                           </div>
                        </li>
                    ))}
                </ul>
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className="text-sm font-bold tracking-wider uppercase mb-3 text-slate-800">Languages</h2>
                {languages.map(lang => (
                    <div key={lang.id} className="text-xs mb-2">
                        <p className="font-bold">{lang.name}</p>
                        <p className="italic text-slate-600">{lang.level}</p>
                        {renderProficiencyBar(lang.proficiency)}
                    </div>
                ))}
            </section>
        ),
    };

    const RightColumnSections = {
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-base font-bold tracking-wider uppercase mb-4 text-slate-900">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-4">
                        <p className="text-xs text-slate-500 font-semibold">{edu.gradDate}</p>
                        <p className="font-bold text-base">{edu.degree}</p>
                        <p className="italic text-sm text-slate-700">{edu.school}, {edu.location}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                 <h2 className="text-base font-bold tracking-wider uppercase mb-4 text-slate-900">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 text-sm">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base">{exp.title}</h3>
                            <p className="text-slate-500 text-xs">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="italic">{exp.company}, {exp.location}</p>
                        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-600">
                            {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-base font-bold tracking-wider uppercase mb-4 text-slate-900">Skills</h2>
                <ul className="columns-2 gap-x-6 text-sm list-disc list-inside text-slate-700">
                    {skills.map(skill => <li key={skill} className="mb-1">{skill}</li>)}
                </ul>
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-base font-bold tracking-wider uppercase mb-4 text-slate-900">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                        <h3 className="font-bold text-base">{proj.name}</h3>
                        <p className="text-sm my-1 text-slate-600">{proj.description}</p>
                        {proj.tech && <p className="text-xs text-slate-500 mb-1"><strong>Tech:</strong> {proj.tech}</p>}
                        {proj.link && <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs break-all">{proj.link}</a>}
                    </div>
                ))}
            </section>
        )
    };
    
    const leftColumnOrder = sectionOrder.filter(s => s in LeftColumnSections);
    const rightColumnOrder = sectionOrder.filter(s => s in RightColumnSections);

    return (
        <div className="h-full flex font-sans text-sm border-8 border-slate-700">
            <aside className="w-[35%] bg-slate-100 p-6 flex flex-col gap-y-8 text-slate-700">
                <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-slate-300 overflow-hidden shadow-lg border-4 border-white">
                        {personalInfo.image ? (
                            <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                <UserIcon className="w-20 h-20 text-slate-400" />
                            </div>
                        )}
                    </div>
                </div>
                <section>
                    <h2 className="text-sm font-bold tracking-wider uppercase mb-3 text-slate-800">Contact</h2>
                    <div className="space-y-2 text-xs">
                        {personalInfo.location && <p className="flex items-center gap-2"><GlobeAltIcon className="w-4 h-4 text-slate-500 flex-shrink-0" /> {personalInfo.location}</p>}
                        {personalInfo.phone && <p className="flex items-center gap-2"><BriefcaseIcon className="w-4 h-4 text-slate-500 flex-shrink-0" /> {personalInfo.phone}</p>}
                        {personalInfo.email && <p className="flex items-center gap-2 break-all"><LinkIcon className="w-4 h-4 text-slate-500 flex-shrink-0" /> {personalInfo.email}</p>}
                        {personalInfo.linkedin && <p className="flex items-center gap-2 break-words"><LinkIcon className="w-4 h-4 text-slate-500 flex-shrink-0" /> <a href={ensureHttps(personalInfo.linkedin)} className="hover:underline">{personalInfo.linkedin}</a></p>}
                    </div>
                </section>
                {leftColumnOrder.map(section => LeftColumnSections[section as keyof typeof LeftColumnSections])}
            </aside>
            <main className="w-[65%] bg-white p-8 flex flex-col gap-y-6 text-slate-800">
                <header>
                    <h1 className="text-4xl font-bold tracking-wider text-slate-900">{personalInfo.name}</h1>
                    <div className="w-20 h-1.5 bg-slate-800 mt-2"></div>
                </header>
                <section>
                    <h2 className="text-base font-bold tracking-wider uppercase mb-2 text-slate-900">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-slate-600">{personalInfo.summary}</p>
                </section>
                {rightColumnOrder.map(section => RightColumnSections[section as keyof typeof RightColumnSections])}
            </main>
        </div>
    );
};

const OnyxTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, education, experience, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    
    const Sections = {
      [Section.EXPERIENCE]: (
        <section key={Section.EXPERIENCE}>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-slate-900">Experience</h2>
            {experience.map(exp => (
                <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-base">{exp.title}</h3>
                        <p className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</p>
                    </div>
                    <p className="italic text-sm text-slate-600">{exp.company}, {exp.location}</p>
                    <ul className="mt-1 list-disc list-inside text-sm space-y-1 text-slate-700">
                        {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                </div>
            ))}
        </section>
      ),
      [Section.EDUCATION]: (
        <section key={Section.EDUCATION}>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-slate-900">Education</h2>
            {education.map(edu => (
                <div key={edu.id} className="mb-3">
                    <p className="font-bold text-base">{edu.degree}</p>
                    <p className="italic text-slate-600">{edu.school}, {edu.location}</p>
                    <p className="text-xs text-slate-500">{edu.gradDate}</p>
                </div>
            ))}
        </section>
      ),
      [Section.SKILLS]: (
        <section key={Section.SKILLS}>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-slate-900">Skills</h2>
            <div className="columns-2 gap-x-4 text-sm">
                {skills.map(skill => <p key={skill} className="mb-1">&bull; {skill}</p>)}
            </div>
        </section>
      ),
      [Section.PROJECTS]: (
        <section key={Section.PROJECTS}>
            <h2 className="text-lg font-bold uppercase tracking-wider mb-3 text-slate-900">Projects</h2>
            {projects.map(proj => (
                 <div key={proj.id} className="mb-3">
                    <h3 className="font-bold text-base">{proj.name}</h3>
                    <p className="my-1 text-slate-700 text-sm">{proj.description}</p>
                    {proj.tech && <p className="text-xs italic text-slate-500">{proj.tech}</p>}
                    <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">{proj.link}</a>
                </div>
            ))}
        </section>
      ),
    };
    
    const SidebarSections = {
      [Section.PROFILES]: (
        <section key={Section.PROFILES}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-600 pb-1 mb-3">Websites &amp; Profiles</h2>
            <ul className="space-y-1 text-xs">
                {profiles.map((profile, i) => (
                    <li key={i}><a href={ensureHttps(profile)} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 break-all">{profile}</a></li>
                ))}
            </ul>
        </section>
      ),
      [Section.CERTIFICATIONS]: (
        <section key={Section.CERTIFICATIONS}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-600 pb-1 mb-3">Certifications</h2>
             <ul className="space-y-1 text-xs">
                {certifications.map(cert => (
                    <li key={cert.id}>{cert.name} - <span className="italic opacity-80">{cert.issuer}</span></li>
                ))}
            </ul>
        </section>
      ),
      [Section.LANGUAGES]: (
         <section key={Section.LANGUAGES}>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-600 pb-1 mb-3">Languages</h2>
            {languages.map(lang => (
                 <div key={lang.id} className="text-xs mb-2">
                    <p className="font-semibold">{lang.name} <span className="font-normal italic opacity-80">({lang.level})</span></p>
                    <div className="w-full bg-slate-600 rounded-full h-1.5 mt-1">
                        <div className="bg-sky-400 h-1.5 rounded-full" style={{ width: `${lang.proficiency * 20}%` }}></div>
                    </div>
                </div>
            ))}
        </section>
      ),
    };

    return (
        <div className="bg-white text-sm font-sans text-slate-800 h-full flex flex-col border-4 border-slate-200">
            <header className="p-8 border-b-2 border-slate-200 flex-shrink-0">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">{personalInfo.name}</h1>
                <div className="w-16 h-1 bg-slate-900 mt-2 mb-4"></div>
            </header>
            <div className="flex flex-grow overflow-hidden">
                <aside className="w-1/3 bg-slate-800 text-slate-300 p-6 space-y-8 overflow-y-auto">
                    <div className="w-32 h-32 rounded-full mx-auto bg-slate-700 overflow-hidden mb-4 border-2 border-slate-500">
                        {personalInfo.image ? (
                            <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-full h-full text-slate-500 p-6" />
                        )}
                    </div>
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-white border-b border-slate-600 pb-1 mb-3">Contact</h2>
                        <div className="space-y-1 text-xs">
                            <p>{personalInfo.location}</p>
                            <p>Mobile: {personalInfo.phone}</p>
                            <p><a href={ensureHttps(personalInfo.email)} className="text-sky-400 hover:text-sky-300">{personalInfo.email}</a></p>
                            <p><a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300">LinkedIn Profile</a></p>
                        </div>
                    </section>
                    {sectionOrder.map(section => SidebarSections[section as keyof typeof SidebarSections])}
                </aside>
                <main className="w-2/3 p-8 space-y-6 overflow-y-auto">
                     <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider mb-2 text-slate-900">Professional Summary</h2>
                        <p className="leading-relaxed text-slate-700">{personalInfo.summary}</p>
                    </section>
                    {sectionOrder.map(section => Sections[section as keyof typeof Sections])}
                </main>
            </div>
        </div>
    );
};

const ModernTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, profiles, languages, sectionOrder } = resume;

    const MainSections = {
        [Section.EXPERIENCE]: (
             <section key={Section.EXPERIENCE} className="mb-6">
                <h2 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">EXPERIENCE</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-md font-semibold text-slate-800">{exp.title}</h3>
                            <p className="text-xs font-medium text-slate-500">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="text-sm font-medium text-slate-600">{exp.company} | {exp.location}</p>
                        <ul className="mt-1 list-disc list-inside text-sm text-slate-700 space-y-1">
                            {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
             <section key={Section.PROJECTS} className="mb-6">
                <h2 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">PROJECTS</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                         <h3 className="text-md font-semibold text-slate-800">
                            {proj.name}
                            {proj.link && <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-indigo-600 underline hover:text-indigo-800 transition-colors">View Project</a>}
                        </h3>
                        <p className="text-sm text-slate-700">{proj.description}</p>
                        {proj.tech && <p className="text-xs italic text-slate-500 mt-1">{proj.tech}</p>}
                    </div>
                ))}
            </section>
        )
    };
    
    const SideSections = {
         [Section.EDUCATION]: (
            <section key={Section.EDUCATION} className="mb-6">
                <h2 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">EDUCATION</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <div>
                            <h3 className="text-md font-semibold text-slate-800">{edu.degree}</h3>
                            <p className="text-sm text-slate-600">{edu.school}, {edu.location}</p>
                        </div>
                        <p className="text-xs font-medium text-slate-500">{edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS} className="mb-6">
                <h2 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">CERTIFICATIONS</h2>
                {certifications.map(cert => (
                    <div key={cert.id} className="mb-2">
                        <h3 className="text-md font-semibold text-slate-800">{cert.name}</h3>
                        <p className="text-sm text-slate-600">{cert.issuer}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => <span key={skill} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">{skill}</span>)}
                </div>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES} className="mb-6">
                <h2 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">PROFILES</h2>
                <div className="text-sm space-y-1">
                    {profiles.map((prof, i) => <a key={i} href={ensureHttps(prof)} target="_blank" rel="noopener noreferrer" className="block text-indigo-600 hover:underline truncate">{prof}</a>)}
                </div>
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES} className="mb-6">
                <h2 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">LANGUAGES</h2>
                <div className="text-sm space-y-1">
                    {languages.map(lang => (
                        <p key={lang.id} className="text-slate-800">{lang.name} <span className="text-slate-600">({lang.level})</span></p>
                    ))}
                </div>
            </section>
        ),
    };

    return (
        <div className="p-8 font-sans bg-white text-slate-800 h-full overflow-y-auto border-4 border-indigo-100">
            <header className="flex items-center mb-8 border-b-2 border-slate-200 pb-6">
                 <div className="w-24 h-24 rounded-full bg-slate-200 mr-6 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-slate-400" />
                    )}
                </div>
                <div className="flex-grow flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">{personalInfo.name}</h1>
                        <p className="mt-2 text-md font-medium text-indigo-600">Full-Stack Developer</p>
                    </div>
                     <div className="text-right text-sm text-slate-600 space-y-1">
                        <p><a href={ensureHttps(personalInfo.email)} className="hover:text-indigo-600">{personalInfo.email}</a></p>
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.location}</p>
                        <p><a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">LinkedIn Profile</a></p>
                        <p><a href={ensureHttps(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">Portfolio Website</a></p>
                    </div>
                </div>
            </header>

            <main>
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-indigo-700 border-b-2 border-indigo-200 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
                    <p className="text-sm text-slate-700 leading-relaxed">{personalInfo.summary}</p>
                </section>
                
                {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                
                <div className="grid grid-cols-2 gap-x-8">
                    {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                </div>

            </main>
        </div>
    );
};

const ClassicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, profiles, languages } = resume;
    return (
        <div className="p-8 h-full overflow-y-auto text-slate-800 font-serif bg-white">
            <div className="border-b-2 border-slate-800 pb-6 mb-6">
                <h1 className="text-4xl font-bold uppercase text-slate-800">{personalInfo.name}</h1>
                <div className="text-sm text-slate-600 mt-2 space-y-1">
                    <div>{personalInfo.email} • {personalInfo.phone}</div>
                    <div>{personalInfo.location}</div>
                    {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
                    {profiles.map(p => <div key={p} className="inline-block mr-2">{p}</div>)}
                </div>
            </div>
            
            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase mb-2 text-slate-800">Summary</h2>
                <p className="text-sm leading-relaxed text-slate-700">{personalInfo.summary}</p>
            </div>

             <div className="mb-6">
                <h2 className="text-lg font-bold uppercase mb-3 text-slate-800">Experience</h2>
                 {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base">{exp.title}</h3>
                            <span className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-sm italic text-slate-600 mb-1">{exp.company}, {exp.location}</p>
                         <ul className="list-disc list-inside text-sm text-slate-700">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase mb-3 text-slate-800">Projects</h2>
                 {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                        <h3 className="font-bold text-base">{proj.name}</h3>
                        <p className="text-sm text-slate-700">{proj.description}</p>
                        {proj.link && <p className="text-xs text-blue-600 underline">{proj.link}</p>}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <h2 className="text-lg font-bold uppercase mb-3 text-slate-800">Education</h2>
                     {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <p className="font-bold text-sm">{edu.school}</p>
                            <p className="text-xs text-slate-600">{edu.degree}</p>
                            <p className="text-xs text-slate-500">{edu.gradDate}</p>
                        </div>
                    ))}
                </div>
                 <div>
                    <h2 className="text-lg font-bold uppercase mb-3 text-slate-800">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map(skill => <span key={skill} className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-200">{skill}</span>)}
                    </div>
                </div>
            </div>
             <div className="mt-6 grid grid-cols-2 gap-6">
                 {certifications.length > 0 && (
                     <div>
                         <h2 className="text-lg font-bold uppercase mb-3 text-slate-800">Certifications</h2>
                         {certifications.map(c => <p key={c.id} className="text-sm text-slate-700">{c.name} - <span className="text-slate-500 text-xs">{c.issuer}</span></p>)}
                     </div>
                 )}
                 {languages.length > 0 && (
                     <div>
                         <h2 className="text-lg font-bold uppercase mb-3 text-slate-800">Languages</h2>
                         {languages.map(l => <p key={l.id} className="text-sm text-slate-700">{l.name} - <span className="text-slate-500 text-xs">{l.level}</span></p>)}
                     </div>
                 )}
             </div>
        </div>
    );
}

const ExecutiveTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, languages, certifications, sectionOrder } = resume;
    const LeftSections = {
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION} className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3">
                        <p className="font-bold text-sm">{edu.degree}</p>
                        <p className="text-xs italic text-slate-600">{edu.school}</p>
                        <p className="text-xs text-slate-500">{edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.SKILLS]: (
             <section key={Section.SKILLS} className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">Expertise</h2>
                <ul className="text-xs space-y-1 text-slate-700">
                    {skills.map(s => <li key={s}>• {s}</li>)}
                </ul>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES} className="mb-6">
                 <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">Contact</h2>
                 <div className="text-xs space-y-2 text-slate-700 break-words">
                    <p>{personalInfo.email}</p>
                    <p>{personalInfo.phone}</p>
                    <p>{personalInfo.location}</p>
                    {profiles.map(p => <a key={p} href={ensureHttps(p)} className="block text-blue-800 hover:underline">{p}</a>)}
                 </div>
            </section>
        ),
         [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES} className="mb-6">
                 <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">Languages</h2>
                 {languages.map(l => <p key={l.id} className="text-xs text-slate-700">{l.name} ({l.level})</p>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS} className="mb-6">
                 <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-3 text-slate-800">Certifications</h2>
                 {certifications.map(c => <p key={c.id} className="text-xs text-slate-700">{c.name}</p>)}
            </section>
        )
    };
    const RightSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE} className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-4 text-slate-900">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-5">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-md font-bold text-slate-800">{exp.title}</h3>
                            <span className="text-xs font-semibold text-slate-600">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-sm italic text-slate-700 mb-2">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
             <section key={Section.PROJECTS} className="mb-6">
                <h2 className="text-lg font-bold uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-4 text-slate-900">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                        <h3 className="font-bold text-md text-slate-800">{proj.name}</h3>
                        <p className="text-sm text-slate-600 mb-1">{proj.description}</p>
                    </div>
                ))}
            </section>
        )
    };

    return (
        <div className="h-full bg-white font-serif flex text-slate-800 border-t-8 border-slate-800">
            <aside className="w-1/3 bg-slate-50 p-6 border-r border-slate-200">
                 {sectionOrder.map(s => LeftSections[s as keyof typeof LeftSections])}
            </aside>
            <main className="w-2/3 p-8">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">{personalInfo.name}</h1>
                    <p className="text-sm mt-4 leading-relaxed text-slate-600 border-l-4 border-slate-300 pl-3">{personalInfo.summary}</p>
                </header>
                 {sectionOrder.map(s => RightSections[s as keyof typeof RightSections])}
            </main>
        </div>
    );
};

const InfographicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    return (
        <div className="h-full bg-white font-sans p-8 overflow-y-auto">
            <div className="flex items-center gap-4 mb-8">
                 <div className="h-16 w-16 bg-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                     {resume.personalInfo.name.charAt(0)}
                 </div>
                 <div>
                     <h1 className="text-3xl font-bold text-slate-800">{resume.personalInfo.name}</h1>
                     <div className="h-1 w-20 bg-teal-500 mt-1"></div>
                 </div>
            </div>
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-1 space-y-6 border-r border-slate-100 pr-4">
                    <section>
                        <h3 className="text-teal-600 font-bold uppercase mb-2">Skills</h3>
                        <div className="space-y-2">
                            {resume.skills.map(s => (
                                <div key={s}>
                                    <div className="flex justify-between text-xs mb-0.5"><span>{s}</span></div>
                                    <div className="h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-teal-400 rounded-full w-3/4"></div></div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <h3 className="text-teal-600 font-bold uppercase mb-2">Education</h3>
                        {resume.education.map(edu => (
                            <div key={edu.id} className="mb-2">
                                <p className="font-bold text-xs">{edu.degree}</p>
                                <p className="text-xs text-slate-500">{edu.school}</p>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h3 className="text-teal-600 font-bold uppercase mb-2">Contact</h3>
                        <div className="text-xs text-slate-600 space-y-1">
                            {resume.profiles.map(p => <div key={p}>{p}</div>)}
                        </div>
                    </section>
                    {resume.languages.length > 0 && <section>
                        <h3 className="text-teal-600 font-bold uppercase mb-2">Languages</h3>
                        <div className="text-xs text-slate-600 space-y-1">
                            {resume.languages.map(l => <div key={l.id}>{l.name} ({l.level})</div>)}
                        </div>
                    </section>}
                </div>
                <div className="col-span-2 space-y-6">
                    <section>
                         <h3 className="text-teal-600 font-bold uppercase mb-3 flex items-center"><BriefcaseIcon className="w-4 h-4 mr-2"/> Experience</h3>
                         <div className="border-l-2 border-teal-100 pl-4 space-y-4">
                             {resume.experience.map(exp => (
                                 <div key={exp.id} className="relative">
                                     <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-teal-400"></div>
                                     <h4 className="font-bold text-sm">{exp.title}</h4>
                                     <p className="text-xs text-slate-500">{exp.company}</p>
                                     <p className="text-xs text-slate-600 mt-1">{exp.description[0]}</p>
                                 </div>
                             ))}
                         </div>
                    </section>
                    <section>
                         <h3 className="text-teal-600 font-bold uppercase mb-3 flex items-center"><CodeBracketIcon className="w-4 h-4 mr-2"/> Projects</h3>
                         <div className="space-y-4">
                             {resume.projects.map(proj => (
                                 <div key={proj.id}>
                                     <h4 className="font-bold text-sm">{proj.name}</h4>
                                     <p className="text-xs text-slate-600">{proj.description}</p>
                                 </div>
                             ))}
                         </div>
                    </section>
                    {resume.certifications.length > 0 && <section>
                         <h3 className="text-teal-600 font-bold uppercase mb-3 flex items-center"><BadgeCheckIcon className="w-4 h-4 mr-2"/> Certifications</h3>
                         <div className="space-y-2">
                             {resume.certifications.map(cert => (
                                 <div key={cert.id} className="text-sm">
                                     <span className="font-bold">{cert.name}</span> - <span className="text-xs text-slate-500">{cert.issuer}</span>
                                 </div>
                             ))}
                         </div>
                    </section>}
                </div>
            </div>
        </div>
    )
}

const MidnightTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages } = resume;
    return (
        <div className="bg-slate-900 text-slate-300 h-full p-8 overflow-y-auto font-sans">
            <div className="border-b border-cyan-500 pb-6 mb-6">
                <h1 className="text-4xl font-bold text-cyan-400 uppercase">{personalInfo.name}</h1>
                <p className="mt-2 text-sm">{personalInfo.email} | {personalInfo.location}</p>
            </div>
            <div className="grid grid-cols-1 gap-8">
                 <section>
                    <h2 className="text-cyan-400 font-bold uppercase tracking-wider mb-3">Summary</h2>
                    <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
                </section>
                <section>
                    <h2 className="text-cyan-400 font-bold uppercase tracking-wider mb-3">Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <div className="flex justify-between text-white">
                                <span className="font-bold">{exp.title}</span>
                                <span className="text-xs text-cyan-200">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="text-sm italic mb-1 text-cyan-100/70">{exp.company}</div>
                             <ul className="list-disc list-inside text-xs text-slate-400">
                                {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
                <section>
                    <h2 className="text-cyan-400 font-bold uppercase tracking-wider mb-3">Projects</h2>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="font-bold text-white">{proj.name}</h3>
                            <p className="text-xs text-slate-400">{proj.description}</p>
                        </div>
                    ))}
                </section>
                <div className="grid grid-cols-2 gap-8">
                     <section>
                        <h2 className="text-cyan-400 font-bold uppercase tracking-wider mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map(s => <span key={s} className="px-2 py-1 bg-slate-800 text-cyan-300 text-xs rounded">{s}</span>)}
                        </div>
                    </section>
                    <section>
                        <h2 className="text-cyan-400 font-bold uppercase tracking-wider mb-3">Education</h2>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2">
                                <p className="font-bold text-white text-sm">{edu.degree}</p>
                                <p className="text-xs">{edu.school}</p>
                            </div>
                        ))}
                    </section>
                </div>
                 <section>
                    <h2 className="text-cyan-400 font-bold uppercase tracking-wider mb-3">Additional</h2>
                    <div className="text-xs text-slate-400 space-y-1">
                        {certifications.map(c => <div key={c.id}>{c.name}</div>)}
                        {languages.map(l => <div key={l.id}>{l.name} ({l.level})</div>)}
                        {profiles.map(p => <div key={p}>{p}</div>)}
                    </div>
                </section>
            </div>
        </div>
    );
};

const ColorfulTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    return (
        <div className="h-full bg-white font-sans overflow-y-auto flex flex-col">
             <div className="h-32 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center px-8 text-white">
                <div>
                    <h1 className="text-4xl font-bold">{resume.personalInfo.name}</h1>
                    <p className="opacity-90">{resume.personalInfo.location}</p>
                </div>
             </div>
             <div className="p-8">
                  <div className={`p-2 h-full overflow-y-auto text-slate-800`}>
                    <div className={`mb-6`}>
                        <h2 className={`text-lg font-bold uppercase mb-2 text-purple-700`}>Summary</h2>
                        <p className="text-sm leading-relaxed text-slate-700">{resume.personalInfo.summary}</p>
                    </div>
                     <div className="mb-6">
                        <h2 className={`text-lg font-bold uppercase mb-3 text-purple-700`}>Experience</h2>
                         {resume.experience.map(exp => (
                            <div key={exp.id} className="mb-4">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-base">{exp.title}</h3>
                                    <span className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="text-sm italic text-slate-600 mb-1">{exp.company}, {exp.location}</p>
                                 <ul className="list-disc list-inside text-sm text-slate-700">
                                    {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="mb-6">
                        <h2 className={`text-lg font-bold uppercase mb-3 text-purple-700`}>Projects</h2>
                        {resume.projects.map(proj => (
                            <div key={proj.id} className="mb-2">
                                <h3 className="font-bold text-sm">{proj.name}</h3>
                                <p className="text-xs text-slate-600">{proj.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="mb-6">
                            <h2 className={`text-lg font-bold uppercase mb-3 text-purple-700`}>Education</h2>
                            {resume.education.map(edu => (
                                <div key={edu.id} className="mb-2">
                                    <p className="font-bold text-sm">{edu.degree}</p>
                                    <p className="text-xs text-slate-600">{edu.school}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mb-6">
                            <h2 className={`text-lg font-bold uppercase mb-3 text-purple-700`}>Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {resume.skills.map(s => <span key={s} className="text-xs bg-purple-50 text-purple-800 px-2 py-1 rounded">{s}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 text-xs text-slate-500">
                        <div>
                             <h3 className="font-bold uppercase text-purple-700 mb-1">Profiles</h3>
                             {resume.profiles.map(p => <div key={p}>{p}</div>)}
                        </div>
                        <div>
                             <h3 className="font-bold uppercase text-purple-700 mb-1">Languages</h3>
                             {resume.languages.map(l => <div key={l.id}>{l.name} ({l.level})</div>)}
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    );
}

const CreativeTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    return (
        <div className="h-full bg-white flex font-sans overflow-hidden">
            <aside className="w-1/3 bg-fuchsia-50 p-6 overflow-y-auto border-r border-fuchsia-100">
                 <div className="w-24 h-24 bg-fuchsia-200 rounded-full mx-auto mb-4 overflow-hidden">
                    {resume.personalInfo.image ? (
                        <img src={resume.personalInfo.image} alt="" className="w-full h-full object-cover"/>
                    ) : (
                        <UserIcon className="w-full h-full p-4 text-fuchsia-300"/>
                    )}
                 </div>
                 <div className="text-center mb-6">
                     <h2 className="text-lg font-bold text-fuchsia-900">Contact</h2>
                     <p className="text-xs text-slate-600 mt-2 break-all">{resume.personalInfo.email}</p>
                 </div>
                 <div className="mb-6">
                     <h2 className="text-lg font-bold text-fuchsia-900 mb-2">Skills</h2>
                     <div className="flex flex-wrap gap-1">{resume.skills.map(s => <span key={s} className="text-xs bg-white border border-fuchsia-200 px-1.5 py-0.5 rounded text-fuchsia-800">{s}</span>)}</div>
                 </div>
                 <div className="mb-6">
                     <h2 className="text-lg font-bold text-fuchsia-900 mb-2">Education</h2>
                     {resume.education.map(edu => (
                         <div key={edu.id} className="mb-2 text-xs">
                             <p className="font-bold">{edu.degree}</p>
                             <p>{edu.school}</p>
                         </div>
                     ))}
                 </div>
                 <div className="mb-6">
                     <h2 className="text-lg font-bold text-fuchsia-900 mb-2">Links</h2>
                     {resume.profiles.map(p => <div key={p} className="text-xs truncate">{p}</div>)}
                 </div>
                 <div className="mb-6">
                     <h2 className="text-lg font-bold text-fuchsia-900 mb-2">Certifications</h2>
                     {resume.certifications.map(c => <div key={c.id} className="text-xs mb-1">{c.name}</div>)}
                 </div>
            </aside>
            <main className="w-2/3 overflow-y-auto p-6">
                <h1 className="text-4xl font-black text-fuchsia-900 mb-1">{resume.personalInfo.name}</h1>
                <p className="text-slate-500 mb-6 text-sm">{resume.personalInfo.summary}</p>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-4 bg-white rounded-lg">
                        <h3 className="font-bold text-fuchsia-800">{exp.title}</h3>
                        <p className="text-xs text-slate-400 mb-1">{exp.company}</p>
                        <p className="text-sm text-slate-700">{exp.description[0]}</p>
                    </div>
                ))}
                <h2 className="text-xl font-bold text-fuchsia-900 mt-6 mb-4">Projects</h2>
                {resume.projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                        <h3 className="font-bold text-sm">{proj.name}</h3>
                        <p className="text-xs text-slate-600">{proj.description}</p>
                    </div>
                ))}
                 <h2 className="text-xl font-bold text-fuchsia-900 mt-6 mb-4">Languages</h2>
                 <div className="flex gap-4">
                    {resume.languages.map(l => (
                        <div key={l.id} className="text-sm">{l.name} <span className="text-slate-400 text-xs">({l.level})</span></div>
                    ))}
                 </div>
            </main>
        </div>
    );
}

const MonochromeTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, languages, certifications } = resume;
    return (
        <div className="h-full bg-white font-sans p-8 border-[6px] border-black text-black">
            <header className="border-b-4 border-black pb-6 mb-6">
                <h1 className="text-5xl font-black uppercase tracking-tighter">{personalInfo.name}</h1>
                <div className="flex justify-between items-end mt-2">
                    <p className="font-bold text-sm bg-black text-white px-2 py-1 inline-block">FULL STACK DEVELOPER</p>
                    <div className="text-xs font-mono text-right">
                        {personalInfo.location} | {personalInfo.email}
                    </div>
                </div>
            </header>
            <main className="grid grid-cols-1 gap-8">
                <section>
                    <h2 className="text-2xl font-black uppercase mb-4 border-b-2 border-black inline-block">Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-6 pl-4 border-l-2 border-black">
                            <h3 className="text-xl font-bold">{exp.title}</h3>
                            <p className="text-xs font-mono mb-2">{exp.company} // {exp.startDate} - {exp.endDate}</p>
                            <p className="text-sm font-medium">{exp.description[0]}</p>
                        </div>
                    ))}
                </section>
                <section>
                    <h2 className="text-2xl font-black uppercase mb-4 border-b-2 border-black inline-block">Projects</h2>
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h3 className="font-bold">{proj.name}</h3>
                            <p className="text-sm">{proj.description}</p>
                        </div>
                    ))}
                </section>
                <div className="grid grid-cols-2 gap-8">
                     <section>
                        <h2 className="text-xl font-black uppercase mb-3 border-b-2 border-black inline-block">Education</h2>
                        {education.map(edu => (
                            <div key={edu.id} className="mb-2">
                                <p className="font-bold">{edu.degree}</p>
                                <p className="text-xs font-mono">{edu.school}</p>
                            </div>
                        ))}
                    </section>
                    <section>
                        <h2 className="text-xl font-black uppercase mb-3 border-b-2 border-black inline-block">Skills</h2>
                        <div className="flex flex-wrap gap-2 text-xs font-bold">
                            {skills.map(s => <span key={s} className="border border-black px-1">{s}</span>)}
                        </div>
                    </section>
                </div>
                <section className="text-xs font-mono border-t-2 border-black pt-4 grid grid-cols-2 gap-4">
                    <div>
                        <strong>LINKS: </strong>
                        {profiles.map(p => <span key={p} className="mr-4 block">{p}</span>)}
                    </div>
                    <div>
                         <strong>CERTIFICATIONS: </strong>
                         {certifications.map(c => <span key={c.id} className="mr-4 block">{c.name}</span>)}
                    </div>
                </section>
            </main>
        </div>
    )
}

const CorporateBlueTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans text-slate-800 p-8 border-t-8 border-blue-900">
        <header className="mb-6 border-b border-slate-300 pb-4">
            <h1 className="text-4xl font-bold text-blue-900">{resume.personalInfo.name}</h1>
            <p className="text-sm text-slate-600 mt-1">{resume.personalInfo.email} | {resume.personalInfo.phone} | {resume.personalInfo.location}</p>
        </header>
        <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 border-b border-blue-200 mb-2">Summary</h2>
            <p className="text-sm text-slate-700">{resume.personalInfo.summary}</p>
        </div>
        <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 border-b border-blue-200 mb-2">Experience</h2>
            {resume.experience.map(exp => (
                <div key={exp.id} className="mb-3">
                    <div className="flex justify-between font-bold text-sm">
                        <span>{exp.title}</span>
                        <span>{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-xs italic text-slate-600 mb-1">{exp.company}</p>
                    <p className="text-sm text-slate-700">{exp.description[0]}</p>
                </div>
            ))}
        </div>
         <div className="mb-6">
            <h2 className="text-lg font-bold text-blue-900 border-b border-blue-200 mb-2">Projects</h2>
            {resume.projects.map(proj => (
                <div key={proj.id} className="mb-2">
                    <span className="font-bold text-sm block">{proj.name}</span>
                    <span className="text-xs text-slate-600">{proj.description}</span>
                </div>
            ))}
        </div>
         <div className="grid grid-cols-2 gap-6">
             <div>
                <h2 className="text-lg font-bold text-blue-900 border-b border-blue-200 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">{resume.skills.map(s => <span key={s} className="text-xs bg-blue-50 text-blue-800 px-2 py-1 rounded">{s}</span>)}</div>
             </div>
             <div>
                <h2 className="text-lg font-bold text-blue-900 border-b border-blue-200 mb-2">Education</h2>
                {resume.education.map(edu => <div key={edu.id} className="text-sm"><p className="font-bold">{edu.degree}</p><p className="text-xs text-slate-600">{edu.school}</p></div>)}
             </div>
         </div>
         <div className="grid grid-cols-2 gap-6 mt-6">
             <div>
                <h2 className="text-lg font-bold text-blue-900 border-b border-blue-200 mb-2">Languages</h2>
                {resume.languages.map(l => <div key={l.id} className="text-sm">{l.name} ({l.level})</div>)}
             </div>
             <div>
                <h2 className="text-lg font-bold text-blue-900 border-b border-blue-200 mb-2">Certifications</h2>
                {resume.certifications.map(c => <div key={c.id} className="text-sm">{c.name}</div>)}
             </div>
         </div>
    </div>
);

const SlateTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-slate-50 font-sans flex text-slate-800">
        <aside className="w-1/3 bg-slate-200 p-6 flex flex-col gap-6">
             <div className="text-center">
                 <h1 className="text-2xl font-bold text-slate-800">{resume.personalInfo.name}</h1>
                 <p className="text-xs text-slate-600 mt-2">{resume.personalInfo.email}</p>
             </div>
             <div>
                 <h3 className="font-bold text-slate-700 uppercase text-xs mb-2">Skills</h3>
                 <div className="text-sm space-y-1">{resume.skills.map(s => <div key={s}>{s}</div>)}</div>
             </div>
             <div>
                 <h3 className="font-bold text-slate-700 uppercase text-xs mb-2">Contact</h3>
                 <div className="text-sm space-y-1 text-xs">
                     <p>{resume.personalInfo.phone}</p>
                     <p>{resume.personalInfo.location}</p>
                     {resume.profiles.map(p => <div key={p} className="break-all">{p}</div>)}
                 </div>
             </div>
             <div>
                 <h3 className="font-bold text-slate-700 uppercase text-xs mb-2">Education</h3>
                 {resume.education.map(edu => <div key={edu.id} className="text-xs mb-2"><p className="font-bold">{edu.degree}</p><p>{edu.school}</p></div>)}
             </div>
             <div>
                 <h3 className="font-bold text-slate-700 uppercase text-xs mb-2">Languages</h3>
                 {resume.languages.map(l => <div key={l.id} className="text-xs">{l.name}</div>)}
             </div>
        </aside>
        <main className="w-2/3 p-8">
             <section className="mb-6">
                 <h2 className="text-xl font-bold text-slate-800 mb-2">Profile</h2>
                 <p className="text-sm text-slate-600">{resume.personalInfo.summary}</p>
             </section>
             <section className="mb-6">
                 <h2 className="text-xl font-bold text-slate-800 mb-4">Experience</h2>
                 {resume.experience.map(exp => (
                     <div key={exp.id} className="mb-4">
                         <h3 className="font-bold text-sm">{exp.title}</h3>
                         <p className="text-xs text-slate-500 mb-1">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                         <p className="text-sm text-slate-600">{exp.description[0]}</p>
                     </div>
                 ))}
             </section>
             <section className="mb-6">
                 <h2 className="text-xl font-bold text-slate-800 mb-4">Projects</h2>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-3">
                         <h3 className="font-bold text-sm">{proj.name}</h3>
                         <p className="text-sm text-slate-600">{proj.description}</p>
                     </div>
                 ))}
             </section>
              <section className="mb-6">
                 <h2 className="text-xl font-bold text-slate-800 mb-4">Certifications</h2>
                 {resume.certifications.map(c => <div key={c.id} className="text-sm">{c.name}</div>)}
             </section>
        </main>
    </div>
);

const CambridgeTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-[#fdfbf7] font-serif text-slate-900 p-8 border-4 border-double border-slate-300">
        <header className="text-center border-b border-slate-300 pb-6 mb-6">
            <h1 className="text-3xl font-bold">{resume.personalInfo.name}</h1>
            <p className="text-sm italic mt-2 text-slate-600">{resume.personalInfo.location} &bull; {resume.personalInfo.email}</p>
        </header>
        <section className="mb-6">
            <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-4">Professional Experience</h2>
            {resume.experience.map(exp => (
                <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-sm">{exp.title}</span>
                        <span className="text-xs italic">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-600 mb-1">{exp.company}</div>
                    <p className="text-sm">{exp.description[0]}</p>
                </div>
            ))}
        </section>
         <section className="mb-6">
            <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-4">Projects</h2>
            {resume.projects.map(proj => (
                <div key={proj.id} className="mb-3">
                    <div className="font-bold text-sm">{proj.name}</div>
                    <p className="text-sm">{proj.description}</p>
                </div>
            ))}
        </section>
        <section className="mb-6">
            <h2 className="text-center text-sm font-bold uppercase tracking-widest mb-4">Education</h2>
            {resume.education.map(edu => (
                <div key={edu.id} className="text-center mb-2">
                    <div className="font-bold text-sm">{edu.degree}</div>
                    <div className="text-xs italic">{edu.school}</div>
                </div>
            ))}
        </section>
         <section className="mb-6 text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Skills & Certifications</h2>
            <div className="text-sm italic">{resume.skills.join(', ')}</div>
            <div className="text-xs mt-2">{resume.certifications.map(c => c.name).join(' | ')}</div>
        </section>
    </div>
);

const TechieTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-slate-900 font-mono text-green-400 p-8 overflow-y-auto">
        <header className="mb-8 border-b border-green-800 pb-4">
            <h1 className="text-2xl font-bold">&lt;{resume.personalInfo.name} /&gt;</h1>
            <p className="text-xs opacity-80 mt-2">// {resume.personalInfo.summary}</p>
        </header>
        <div className="grid grid-cols-1 gap-6">
            <section>
                <h2 className="text-green-600 font-bold mb-2">const experience = [</h2>
                <div className="pl-4 border-l border-green-900">
                    {resume.experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <p className="text-sm text-white">"{exp.title}" @ "{exp.company}"</p>
                            <p className="text-xs text-green-700 opacity-70">/* {exp.startDate} - {exp.endDate} */</p>
                            <p className="text-xs opacity-90 mt-1">{exp.description[0]}</p>
                        </div>
                    ))}
                </div>
                <h2 className="text-green-600 font-bold mt-2">];</h2>
            </section>
             <section>
                <h2 className="text-green-600 font-bold mb-2">const projects = [</h2>
                <div className="pl-4 border-l border-green-900">
                    {resume.projects.map(proj => (
                        <div key={proj.id} className="mb-2">
                            <p className="text-sm text-white">"{proj.name}": "{proj.description}"</p>
                        </div>
                    ))}
                </div>
                <h2 className="text-green-600 font-bold mt-2">];</h2>
            </section>
            <section>
                 <h2 className="text-green-600 font-bold mb-2">const skills = </h2>
                 <div className="text-sm text-white break-words">[{resume.skills.map(s => `'${s}'`).join(', ')}]</div>
            </section>
             <section>
                 <h2 className="text-green-600 font-bold mb-2">const education = </h2>
                 <div className="text-sm text-white break-words">
                     {resume.education.map(edu => `{ degree: '${edu.degree}', school: '${edu.school}' }`).join(',\n')}
                 </div>
            </section>
            <section>
                 <h2 className="text-green-600 font-bold mb-2">const links = </h2>
                 <div className="text-sm text-white break-words">[{resume.profiles.map(p => `'${p}'`).join(', ')}]</div>
            </section>
        </div>
    </div>
);

const VanguardTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans text-slate-800 flex">
        <div className="w-16 bg-red-600 flex-shrink-0"></div>
        <div className="p-8 flex-grow overflow-y-auto">
            <h1 className="text-5xl font-bold text-slate-900 mb-2">{resume.personalInfo.name}</h1>
            <p className="text-lg text-red-600 mb-8">{resume.personalInfo.email}</p>
            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <h3 className="text-xl font-bold uppercase mb-4 border-b-2 border-slate-200">Experience</h3>
                    {resume.experience.map(exp => (
                        <div key={exp.id} className="mb-6">
                            <h4 className="font-bold text-lg">{exp.title}</h4>
                            <p className="text-sm text-slate-500 mb-2">{exp.company}</p>
                            <p className="text-sm text-slate-700">{exp.description[0]}</p>
                        </div>
                    ))}
                    <h3 className="text-xl font-bold uppercase mb-4 border-b-2 border-slate-200 mt-8">Projects</h3>
                    {resume.projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h4 className="font-bold text-md">{proj.name}</h4>
                            <p className="text-sm text-slate-700">{proj.description}</p>
                        </div>
                    ))}
                </div>
                <div>
                     <h3 className="text-xl font-bold uppercase mb-4 border-b-2 border-slate-200">Skills</h3>
                     <ul className="list-disc list-inside text-sm space-y-2">{resume.skills.map(s => <li key={s}>{s}</li>)}</ul>
                     <h3 className="text-xl font-bold uppercase mb-4 border-b-2 border-slate-200 mt-8">Education</h3>
                     {resume.education.map(edu => <div key={edu.id} className="text-sm mb-2"><p className="font-bold">{edu.degree}</p><p>{edu.school}</p></div>)}
                     <h3 className="text-xl font-bold uppercase mb-4 border-b-2 border-slate-200 mt-8">Contact</h3>
                     {resume.profiles.map(p => <div key={p} className="text-xs mb-1 truncate">{p}</div>)}
                </div>
            </div>
        </div>
    </div>
);

const CrimsonTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-serif p-8 border-t-8 border-red-800">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-900">{resume.personalInfo.name}</h1>
            <div className="text-sm text-slate-500 mt-2 flex justify-center gap-4">
                <span>{resume.personalInfo.location}</span>
                <span>{resume.personalInfo.email}</span>
            </div>
        </div>
        <div className="space-y-6">
            <section>
                <h2 className="text-lg font-bold text-red-800 uppercase border-b border-red-200 mb-3">Profile</h2>
                <p className="text-sm text-slate-700">{resume.personalInfo.summary}</p>
            </section>
            <section>
                 <h2 className="text-lg font-bold text-red-800 uppercase border-b border-red-200 mb-3">Experience</h2>
                 {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between font-bold text-sm">
                            <span>{exp.title}</span>
                            <span className="text-slate-500 font-normal text-xs">{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <div className="text-xs italic text-slate-600 mb-1">{exp.company}</div>
                        <p className="text-sm text-slate-700">{exp.description[0]}</p>
                    </div>
                ))}
            </section>
             <section>
                 <h2 className="text-lg font-bold text-red-800 uppercase border-b border-red-200 mb-3">Projects</h2>
                 {resume.projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                         <span className="font-bold text-sm">{proj.name}</span>
                         <p className="text-sm text-slate-700">{proj.description}</p>
                    </div>
                ))}
            </section>
            <div className="grid grid-cols-2 gap-6">
                <section>
                     <h2 className="text-lg font-bold text-red-800 uppercase border-b border-red-200 mb-3">Education</h2>
                     {resume.education.map(edu => <div key={edu.id} className="text-sm mb-1"><span className="font-bold">{edu.degree}</span> - {edu.school}</div>)}
                </section>
                <section>
                     <h2 className="text-lg font-bold text-red-800 uppercase border-b border-red-200 mb-3">Skills</h2>
                     <div className="text-sm">{resume.skills.join(', ')}</div>
                </section>
            </div>
        </div>
    </div>
);

const MinimalTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans p-10 text-slate-800">
        <h1 className="text-2xl font-light uppercase tracking-[0.2em] mb-8 text-center">{resume.personalInfo.name}</h1>
        <div className="text-center text-xs uppercase tracking-widest text-slate-500 mb-12 space-x-4">
            <span>{resume.personalInfo.location}</span>
            <span>{resume.personalInfo.email}</span>
        </div>
        <div className="max-w-xl mx-auto space-y-10">
            <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-center">Experience</h2>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-6 text-center">
                        <h3 className="text-sm font-bold">{exp.title}</h3>
                        <p className="text-xs text-slate-500 mb-2">{exp.company}</p>
                        <p className="text-xs leading-relaxed text-slate-600">{exp.description[0]}</p>
                    </div>
                ))}
            </section>
            <section>
                 <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-center">Projects</h2>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-4 text-center">
                         <h3 className="text-sm font-bold">{proj.name}</h3>
                         <p className="text-xs leading-relaxed text-slate-600">{proj.description}</p>
                     </div>
                 ))}
            </section>
            <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-4 text-center">Education & Skills</h2>
                <div className="text-center text-xs leading-loose text-slate-600">
                    {resume.education.map(edu => <div key={edu.id} className="mb-2 font-bold">{edu.degree} - {edu.school}</div>)}
                    <div className="mt-4">{resume.skills.join('  •  ')}</div>
                </div>
            </section>
        </div>
    </div>
);

const SpectrumTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans p-8 border-4 border-transparent" style={{borderImage: 'linear-gradient(to right, #ef4444, #eab308, #22c55e, #3b82f6) 1'}}>
         <header className="mb-6">
             <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">{resume.personalInfo.name}</h1>
             <p className="text-slate-600 font-medium mt-1">{resume.personalInfo.summary}</p>
         </header>
         <div className="grid grid-cols-3 gap-6">
             <div className="col-span-1 border-r border-slate-200 pr-4">
                 <h3 className="font-bold text-slate-900 mb-3">Contact</h3>
                 <p className="text-xs text-slate-600 mb-4">{resume.personalInfo.email}<br/>{resume.personalInfo.phone}</p>
                 <h3 className="font-bold text-slate-900 mb-3">Skills</h3>
                 <div className="flex flex-wrap gap-1 mb-4">
                     {resume.skills.map(s => <span key={s} className="text-xs px-2 py-0.5 bg-slate-100 rounded">{s}</span>)}
                 </div>
                 <h3 className="font-bold text-slate-900 mb-3">Education</h3>
                 {resume.education.map(edu => <div key={edu.id} className="text-xs mb-2">{edu.degree}<br/><span className="text-slate-500">{edu.school}</span></div>)}
             </div>
             <div className="col-span-2">
                 <h3 className="font-bold text-xl text-slate-900 mb-4">Experience</h3>
                 {resume.experience.map(exp => (
                     <div key={exp.id} className="mb-4 bg-slate-50 p-3 rounded">
                         <div className="flex justify-between font-bold text-sm">
                             <span>{exp.title}</span>
                             <span className="text-slate-500 text-xs">{exp.startDate}</span>
                         </div>
                         <p className="text-xs text-slate-600 mb-2">{exp.company}</p>
                         <p className="text-sm text-slate-700">{exp.description[0]}</p>
                     </div>
                 ))}
                 <h3 className="font-bold text-xl text-slate-900 mb-4 mt-6">Projects</h3>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-3">
                         <span className="font-bold text-sm">{proj.name}</span>
                         <p className="text-xs text-slate-600">{proj.description}</p>
                     </div>
                 ))}
             </div>
         </div>
    </div>
);

const SunriseTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-orange-50 font-sans p-8 text-slate-800">
        <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-orange-600">{resume.personalInfo.name}</h1>
            <div className="h-1 w-24 bg-orange-400 mx-auto mt-2 mb-2"></div>
            <p className="text-sm text-slate-600">{resume.personalInfo.summary}</p>
        </header>
        <div className="space-y-6">
            <section>
                <h2 className="text-lg font-bold text-orange-700 mb-2">Experience</h2>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-3 border-l-2 border-orange-300 pl-3">
                        <h3 className="font-bold text-sm">{exp.title}</h3>
                        <p className="text-xs text-slate-500">{exp.company}</p>
                        <p className="text-sm text-slate-700">{exp.description[0]}</p>
                    </div>
                ))}
            </section>
            <section>
                 <h2 className="text-lg font-bold text-orange-700 mb-2">Projects</h2>
                 {resume.projects.map(proj => (
                    <div key={proj.id} className="mb-3 border-l-2 border-orange-300 pl-3">
                        <h3 className="font-bold text-sm">{proj.name}</h3>
                        <p className="text-sm text-slate-700">{proj.description}</p>
                    </div>
                ))}
            </section>
            <div className="grid grid-cols-2 gap-6">
                <section>
                    <h2 className="text-lg font-bold text-orange-700 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">{resume.skills.map(s => <span key={s} className="bg-white border border-orange-200 px-2 py-1 text-xs rounded text-orange-800">{s}</span>)}</div>
                </section>
                 <section>
                    <h2 className="text-lg font-bold text-orange-700 mb-2">Education</h2>
                    {resume.education.map(edu => <div key={edu.id} className="text-sm"><p className="font-bold">{edu.degree}</p><p className="text-xs">{edu.school}</p></div>)}
                </section>
            </div>
             <section className="text-xs text-slate-500 mt-4 text-center">
                 {resume.profiles.map(p => <span key={p} className="mx-2">{p}</span>)}
             </section>
        </div>
    </div>
);

const OceanTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans flex flex-col">
        <header className="bg-sky-600 text-white p-8">
            <h1 className="text-3xl font-bold">{resume.personalInfo.name}</h1>
            <p className="text-sky-100 text-sm mt-1">{resume.personalInfo.email} &bull; {resume.personalInfo.location}</p>
        </header>
        <div className="p-8 flex-grow bg-sky-50 overflow-y-auto">
             <section className="mb-6 bg-white p-4 rounded shadow-sm">
                 <h2 className="text-sky-700 font-bold uppercase text-sm mb-3">Experience</h2>
                 {resume.experience.map(exp => (
                     <div key={exp.id} className="mb-4 last:mb-0">
                         <h3 className="font-bold text-sm text-slate-800">{exp.title}</h3>
                         <p className="text-xs text-slate-500 mb-1">{exp.company}</p>
                         <p className="text-sm text-slate-600">{exp.description[0]}</p>
                     </div>
                 ))}
             </section>
              <section className="mb-6 bg-white p-4 rounded shadow-sm">
                 <h2 className="text-sky-700 font-bold uppercase text-sm mb-3">Projects</h2>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-3 last:mb-0">
                         <h3 className="font-bold text-sm text-slate-800">{proj.name}</h3>
                         <p className="text-sm text-slate-600">{proj.description}</p>
                     </div>
                 ))}
             </section>
             <div className="grid grid-cols-2 gap-6">
                 <section className="bg-white p-4 rounded shadow-sm">
                      <h2 className="text-sky-700 font-bold uppercase text-sm mb-3">Education</h2>
                      {resume.education.map(edu => (
                          <div key={edu.id} className="text-sm mb-2">
                              <span className="font-bold">{edu.degree}</span><br/><span className="text-slate-500 text-xs">{edu.school}</span>
                          </div>
                      ))}
                 </section>
                 <section className="bg-white p-4 rounded shadow-sm">
                      <h2 className="text-sky-700 font-bold uppercase text-sm mb-3">Skills</h2>
                      <div className="text-sm text-slate-700">{resume.skills.join(', ')}</div>
                 </section>
             </div>
        </div>
    </div>
);

const ArtisanTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-[#faf9f6] font-serif p-8 text-slate-800 border-l-[12px] border-stone-400">
        <h1 className="text-4xl italic font-bold text-stone-700 mb-1">{resume.personalInfo.name}</h1>
        <p className="text-sm font-sans text-stone-500 mb-8 uppercase tracking-widest">{resume.personalInfo.location}</p>
        
        <h2 className="text-lg font-bold text-stone-700 border-b border-stone-300 mb-4">Experience</h2>
        {resume.experience.map(exp => (
            <div key={exp.id} className="mb-5">
                <div className="flex items-baseline justify-between">
                    <h3 className="font-bold text-md">{exp.title}</h3>
                    <span className="text-xs font-sans text-stone-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-sm italic text-stone-600 mb-1">{exp.company}</p>
                <p className="text-sm text-slate-700">{exp.description[0]}</p>
            </div>
        ))}

        <h2 className="text-lg font-bold text-stone-700 border-b border-stone-300 mb-4 mt-6">Projects</h2>
        {resume.projects.map(proj => (
            <div key={proj.id} className="mb-4">
                <h3 className="font-bold text-md">{proj.name}</h3>
                <p className="text-sm text-slate-700">{proj.description}</p>
            </div>
        ))}
        
        <div className="grid grid-cols-2 gap-8 mt-6">
            <div>
                <h2 className="text-lg font-bold text-stone-700 border-b border-stone-300 mb-4">Skills</h2>
                <p className="text-sm text-slate-700 leading-relaxed">{resume.skills.join(', ')}</p>
            </div>
            <div>
                 <h2 className="text-lg font-bold text-stone-700 border-b border-stone-300 mb-4">Education</h2>
                 {resume.education.map(edu => <div key={edu.id} className="text-sm mb-2"><span className="font-bold">{edu.degree}</span><br/><span className="text-xs">{edu.school}</span></div>)}
            </div>
        </div>
    </div>
);

const TypographicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans p-8 text-black">
        <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">{resume.personalInfo.name.toUpperCase()}</h1>
        <p className="text-xl font-medium mb-12 border-l-4 border-black pl-4">{resume.personalInfo.summary}</p>
        
        <div className="grid grid-cols-2 gap-12">
            <div>
                <h2 className="text-2xl font-black mb-4 uppercase">Experience</h2>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-6">
                        <h3 className="text-lg font-bold leading-tight">{exp.title}</h3>
                        <p className="text-sm font-mono mt-1 mb-2 bg-black text-white inline-block px-1">{exp.company}</p>
                        <p className="text-sm font-medium">{exp.description[0]}</p>
                    </div>
                ))}
                <h2 className="text-2xl font-black mb-4 uppercase mt-8">Projects</h2>
                 {resume.projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                        <h3 className="text-lg font-bold leading-tight">{proj.name}</h3>
                        <p className="text-sm font-medium">{proj.description}</p>
                    </div>
                ))}
            </div>
            <div>
                <h2 className="text-2xl font-black mb-4 uppercase">Info</h2>
                <div className="text-sm font-bold space-y-2 mb-8">
                    <p>{resume.personalInfo.email}</p>
                    <p>{resume.personalInfo.phone}</p>
                    <p>{resume.personalInfo.location}</p>
                    {resume.profiles.map(p => <p key={p} className="text-xs font-mono">{p}</p>)}
                </div>
                <h2 className="text-2xl font-black mb-4 uppercase">Education</h2>
                {resume.education.map(edu => <div key={edu.id} className="text-sm font-bold mb-2">{edu.degree}<br/><span className="text-xs font-mono">{edu.school}</span></div>)}

                <h2 className="text-2xl font-black mb-4 uppercase mt-8">Skills</h2>
                <div className="text-sm font-bold">{resume.skills.join(' / ')}</div>
            </div>
        </div>
    </div>
);

const EmeraldTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans p-8 border-t-[16px] border-emerald-600">
        <header className="flex justify-between items-end mb-8 border-b border-emerald-100 pb-4">
            <h1 className="text-3xl font-bold text-emerald-800">{resume.personalInfo.name}</h1>
            <div className="text-right text-xs text-emerald-700">
                <p>{resume.personalInfo.email}</p>
                <p>{resume.personalInfo.phone}</p>
            </div>
        </header>
        <div className="flex gap-8">
            <main className="flex-1">
                <h2 className="text-md font-bold text-emerald-700 uppercase mb-3">Experience</h2>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-bold text-sm text-slate-800">{exp.title}</h3>
                        <p className="text-xs text-emerald-600 mb-1">{exp.company}</p>
                        <p className="text-sm text-slate-600">{exp.description[0]}</p>
                    </div>
                ))}
                <h2 className="text-md font-bold text-emerald-700 uppercase mb-3 mt-6">Projects</h2>
                {resume.projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                        <h3 className="font-bold text-sm text-slate-800">{proj.name}</h3>
                        <p className="text-sm text-slate-600">{proj.description}</p>
                    </div>
                ))}
            </main>
            <aside className="w-1/3 bg-emerald-50 p-4 rounded-lg h-fit">
                <h2 className="text-sm font-bold text-emerald-800 uppercase mb-3">Skills</h2>
                <ul className="text-xs text-emerald-900 space-y-1">{resume.skills.map(s => <li key={s}>• {s}</li>)}</ul>
                <h2 className="text-sm font-bold text-emerald-800 uppercase mb-3 mt-6">Education</h2>
                {resume.education.map(edu => <div key={edu.id} className="text-xs mb-2"><p className="font-bold">{edu.degree}</p><p>{edu.school}</p></div>)}
                 <h2 className="text-sm font-bold text-emerald-800 uppercase mb-3 mt-6">Links</h2>
                 {resume.profiles.map(p => <div key={p} className="text-xs text-emerald-900 mb-1 truncate">{p}</div>)}
            </aside>
        </div>
    </div>
);

const RubyTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
     <div className="h-full bg-white font-sans text-slate-800 flex">
        <aside className="w-24 bg-rose-700 flex-shrink-0 flex flex-col items-center py-8">
            <div className="text-white text-4xl font-black writing-vertical-rl rotate-180 uppercase tracking-widest">{resume.personalInfo.name.split(' ')[0]}</div>
        </aside>
        <main className="p-8 flex-1 overflow-y-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-1">{resume.personalInfo.name}</h1>
            <p className="text-rose-600 font-medium mb-8">{resume.personalInfo.summary}</p>
            
            <h2 className="text-xl font-bold text-rose-800 mb-4 border-l-4 border-rose-500 pl-3">Experience</h2>
             {resume.experience.map(exp => (
                <div key={exp.id} className="mb-5">
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-sm text-slate-500">{exp.company} &bull; {exp.startDate}</p>
                    <p className="text-sm mt-1">{exp.description[0]}</p>
                </div>
            ))}

            <h2 className="text-xl font-bold text-rose-800 mb-4 border-l-4 border-rose-500 pl-3 mt-8">Projects</h2>
             {resume.projects.map(proj => (
                <div key={proj.id} className="mb-4">
                    <h3 className="font-bold text-md">{proj.name}</h3>
                    <p className="text-sm mt-1">{proj.description}</p>
                </div>
            ))}
            
            <div className="grid grid-cols-2 gap-6 mt-8">
                 <div>
                    <h2 className="text-xl font-bold text-rose-800 mb-4 border-l-4 border-rose-500 pl-3">Skills</h2>
                    <div className="flex gap-2 flex-wrap">{resume.skills.map(s => <span key={s} className="px-2 py-1 bg-rose-50 text-rose-800 text-xs font-bold rounded">{s}</span>)}</div>
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-rose-800 mb-4 border-l-4 border-rose-500 pl-3">Education</h2>
                    {resume.education.map(edu => <div key={edu.id} className="text-sm mb-2"><span className="font-bold">{edu.degree}</span><br/>{edu.school}</div>)}
                 </div>
            </div>
        </main>
    </div>
);

const GoldenrodTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-yellow-50 font-serif p-8 text-slate-900 border-4 border-yellow-400">
         <div className="text-center mb-10">
             <h1 className="text-4xl font-bold text-slate-900 border-b-2 border-yellow-400 inline-block pb-1">{resume.personalInfo.name}</h1>
             <p className="mt-4 text-sm font-sans">{resume.personalInfo.summary}</p>
         </div>
         <div className="grid grid-cols-2 gap-8">
             <div>
                 <h2 className="font-sans font-bold text-yellow-600 uppercase mb-3 text-sm">Experience</h2>
                 {resume.experience.map(exp => (
                     <div key={exp.id} className="mb-4">
                         <h3 className="font-bold text-md">{exp.title}</h3>
                         <p className="text-xs italic text-slate-600">{exp.company}</p>
                         <p className="text-sm mt-1">{exp.description[0]}</p>
                     </div>
                 ))}
                  <h2 className="font-sans font-bold text-yellow-600 uppercase mb-3 text-sm mt-6">Projects</h2>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-4">
                         <h3 className="font-bold text-md">{proj.name}</h3>
                         <p className="text-sm mt-1">{proj.description}</p>
                     </div>
                 ))}
             </div>
             <div>
                  <h2 className="font-sans font-bold text-yellow-600 uppercase mb-3 text-sm">Skills & Education</h2>
                  <div className="mb-4">
                      <h3 className="font-bold text-sm mb-1">Skills</h3>
                      <p className="text-sm">{resume.skills.join(', ')}</p>
                  </div>
                  <div className="mb-4">
                      <h3 className="font-bold text-sm mb-1">Education</h3>
                      {resume.education.map(edu => <div key={edu.id} className="text-sm"><p>{edu.degree}</p><p className="italic text-xs">{edu.school}</p></div>)}
                  </div>
                   <div>
                      <h3 className="font-bold text-sm mb-1">Links</h3>
                      {resume.profiles.map(p => <div key={p} className="text-xs">{p}</div>)}
                  </div>
             </div>
         </div>
    </div>
);

const AuroraTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-slate-900 text-white font-sans p-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-green-400/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-purple-400/20 to-transparent"></div>
        <div className="relative z-10 flex flex-col h-full overflow-y-auto">
            <h1 className="text-5xl font-thin mb-2 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-purple-300">{resume.personalInfo.name}</h1>
            <p className="text-slate-400 text-sm mb-8">{resume.personalInfo.email} | {resume.personalInfo.location}</p>
            
            <h2 className="text-green-300 uppercase tracking-widest text-sm font-bold mb-4">Experience</h2>
            {resume.experience.map(exp => (
                <div key={exp.id} className="mb-6 border-l border-purple-500/30 pl-4">
                    <h3 className="font-bold text-lg">{exp.title}</h3>
                    <p className="text-xs text-purple-200 mb-2">{exp.company}</p>
                    <p className="text-sm text-slate-300 font-light">{exp.description[0]}</p>
                </div>
            ))}
            
            <h2 className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-4 mt-6">Projects</h2>
             {resume.projects.map(proj => (
                <div key={proj.id} className="mb-4 pl-4 border-l border-green-500/30">
                    <h3 className="font-bold text-md">{proj.name}</h3>
                    <p className="text-sm text-slate-300 font-light">{proj.description}</p>
                </div>
            ))}

            <div className="grid grid-cols-2 gap-8 mt-6">
                <div>
                     <h2 className="text-green-300 uppercase tracking-widest text-sm font-bold mb-4">Education</h2>
                     {resume.education.map(edu => <div key={edu.id} className="text-sm mb-2"><span className="font-bold">{edu.degree}</span><br/><span className="text-slate-400 text-xs">{edu.school}</span></div>)}
                </div>
                <div>
                     <h2 className="text-purple-300 uppercase tracking-widest text-sm font-bold mb-4">Skills</h2>
                     <div className="text-sm text-slate-300 font-light">{resume.skills.join('  //  ')}</div>
                </div>
            </div>
        </div>
    </div>
);

const VoltaicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-neutral-900 font-mono p-6 text-yellow-400 border-2 border-yellow-400">
        <div className="border border-yellow-400/50 p-6 h-full flex flex-col">
            <header className="border-b border-yellow-400 pb-4 mb-6 flex justify-between items-end">
                <h1 className="text-3xl font-bold">{resume.personalInfo.name.toUpperCase()}</h1>
                <div className="text-xs text-right">
                    <p>ID: {Math.floor(Math.random() * 10000)}</p>
                    <p>LOC: {resume.personalInfo.location}</p>
                </div>
            </header>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <h2 className="bg-yellow-400 text-black inline-block px-2 font-bold mb-3">>> EXPERIENCE</h2>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <p className="text-sm font-bold text-white">> {exp.title}</p>
                        <p className="text-xs text-neutral-400">@ {exp.company}</p>
                        <p className="text-xs mt-1 text-neutral-300">{exp.description[0]}</p>
                    </div>
                ))}
                
                <h2 className="bg-yellow-400 text-black inline-block px-2 font-bold mb-3 mt-4">>> PROJECTS</h2>
                {resume.projects.map(proj => (
                    <div key={proj.id} className="mb-2">
                        <p className="text-sm font-bold text-white">> {proj.name}</p>
                        <p className="text-xs mt-1 text-neutral-300">{proj.description}</p>
                    </div>
                ))}

                <h2 className="bg-yellow-400 text-black inline-block px-2 font-bold mb-3 mt-4">>> SKILLS</h2>
                <div className="text-xs text-white grid grid-cols-3 gap-2">
                    {resume.skills.map(s => <div key={s}>[x] {s}</div>)}
                </div>

                <div className="mt-6 border-t border-neutral-700 pt-4 text-xs text-neutral-500">
                     <p>USER: {resume.personalInfo.email}</p>
                     {resume.education.map(edu => <p key={edu.id}>EDU: {edu.degree}</p>)}
                </div>
            </div>
        </div>
    </div>
);

const NordicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-slate-50 font-sans text-slate-600 p-10">
        <div className="text-center mb-12">
            <h1 className="text-3xl font-light text-slate-800 tracking-widest uppercase">{resume.personalInfo.name}</h1>
            <div className="w-8 h-px bg-slate-400 mx-auto my-4"></div>
            <p className="text-xs tracking-widest uppercase">{resume.personalInfo.location}</p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 max-w-lg mx-auto">
             <section>
                 <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Work</h2>
                 {resume.experience.map(exp => (
                     <div key={exp.id} className="mb-6 text-center">
                         <h3 className="font-medium text-slate-800">{exp.title}</h3>
                         <p className="text-xs italic mb-2">{exp.company}</p>
                         <p className="text-sm font-light leading-relaxed">{exp.description[0]}</p>
                     </div>
                 ))}
             </section>
             <section>
                 <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Projects</h2>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-4 text-center">
                         <h3 className="font-medium text-slate-800 text-sm">{proj.name}</h3>
                         <p className="text-xs font-light">{proj.description}</p>
                     </div>
                 ))}
             </section>
             <section>
                 <h2 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Skills & Education</h2>
                 <p className="text-center text-xs mb-4">{resume.skills.join(' • ')}</p>
                 {resume.education.map(edu => <p key={edu.id} className="text-center text-xs">{edu.degree} | {edu.school}</p>)}
             </section>
        </div>
    </div>
);

const GlacierTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans flex flex-col">
        <header className="bg-cyan-50 p-8">
            <h1 className="text-4xl font-thin text-cyan-900">{resume.personalInfo.name}</h1>
            <p className="text-cyan-600 mt-2">{resume.personalInfo.summary}</p>
        </header>
        <div className="p-8 flex gap-8">
            <div className="w-2/3">
                 <h2 className="text-lg font-bold text-cyan-800 mb-4">Experience</h2>
                 {resume.experience.map(exp => (
                     <div key={exp.id} className="mb-5 border-l-2 border-cyan-100 pl-4">
                         <h3 className="font-bold text-slate-700">{exp.title}</h3>
                         <p className="text-xs text-cyan-500 mb-1">{exp.company}</p>
                         <p className="text-sm text-slate-600">{exp.description[0]}</p>
                     </div>
                 ))}
                 <h2 className="text-lg font-bold text-cyan-800 mb-4 mt-6">Projects</h2>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-4">
                         <h3 className="font-bold text-sm text-slate-700">{proj.name}</h3>
                         <p className="text-sm text-slate-600">{proj.description}</p>
                     </div>
                 ))}
            </div>
            <div className="w-1/3 bg-slate-50 p-4 rounded-xl h-fit">
                <h2 className="text-sm font-bold text-cyan-800 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {resume.skills.map(s => <span key={s} className="text-xs bg-white px-2 py-1 rounded shadow-sm text-cyan-700">{s}</span>)}
                </div>
                <h2 className="text-sm font-bold text-cyan-800 mb-3 mt-6">Education</h2>
                {resume.education.map(edu => <div key={edu.id} className="text-xs mb-2"><span className="font-bold">{edu.degree}</span><br/>{edu.school}</div>)}
                <h2 className="text-sm font-bold text-cyan-800 mb-3 mt-6">Contact</h2>
                <p className="text-xs text-slate-600 break-all">{resume.personalInfo.email}</p>
                {resume.profiles.map(p => <p key={p} className="text-xs text-slate-500 mt-1 truncate">{p}</p>)}
            </div>
        </div>
    </div>
);

const NovaTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-indigo-950 text-indigo-100 font-sans p-8 overflow-hidden">
        <div className="flex justify-between items-start mb-10">
            <div>
                <h1 className="text-5xl font-bold text-white mb-2">{resume.personalInfo.name}</h1>
                <p className="text-indigo-300">{resume.personalInfo.location}</p>
            </div>
            <div className="text-right text-sm text-indigo-300">
                <p>{resume.personalInfo.email}</p>
                <p>{resume.personalInfo.phone}</p>
            </div>
        </div>
        
        <div className="grid grid-cols-2 gap-12">
            <div>
                 <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>Experience</h2>
                 {resume.experience.map(exp => (
                     <div key={exp.id} className="mb-6">
                         <h3 className="text-xl font-semibold text-pink-200">{exp.title}</h3>
                         <p className="text-sm text-indigo-400 mb-2">{exp.company}</p>
                         <p className="text-sm leading-relaxed opacity-80">{exp.description[0]}</p>
                     </div>
                 ))}
                 <h2 className="text-2xl font-bold text-white mb-4 mt-6 flex items-center"><span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>Projects</h2>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-4">
                         <h3 className="text-lg font-semibold text-pink-200">{proj.name}</h3>
                         <p className="text-sm opacity-80">{proj.description}</p>
                     </div>
                 ))}
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Skills</h2>
                <ul className="grid grid-cols-2 gap-2 mb-8">
                    {resume.skills.map(s => <li key={s} className="bg-indigo-900/50 p-2 rounded text-sm text-purple-200">{s}</li>)}
                </ul>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>Education</h2>
                {resume.education.map(edu => <div key={edu.id} className="mb-2"><p className="font-bold">{edu.degree}</p><p className="text-sm opacity-70">{edu.school}</p></div>)}
            </div>
        </div>
    </div>
);

const FolioTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans p-8">
        <header className="flex items-center gap-6 mb-10">
            <div className="h-20 w-20 bg-black text-white rounded-lg flex items-center justify-center text-3xl font-bold">
                {resume.personalInfo.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
                <h1 className="text-3xl font-bold text-black">{resume.personalInfo.name}</h1>
                <p className="text-slate-500">Portfolio & Resume</p>
                <p className="text-xs text-slate-400 mt-1">{resume.personalInfo.email}</p>
            </div>
        </header>
        
        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1">
                <h3 className="font-bold text-lg mb-4 text-black">Projects</h3>
                <div className="space-y-4">
                    {resume.projects.map(proj => (
                        <div key={proj.id} className="bg-slate-50 p-4 rounded border border-slate-100">
                            <h4 className="font-bold text-sm">{proj.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{proj.description}</p>
                        </div>
                    ))}
                </div>
                <h3 className="font-bold text-lg mb-4 mt-8 text-black">Skills</h3>
                <div className="text-sm text-slate-600">{resume.skills.join(', ')}</div>
                
                <h3 className="font-bold text-lg mb-4 mt-8 text-black">Education</h3>
                {resume.education.map(edu => <div key={edu.id} className="text-sm mb-2"><span className="font-bold">{edu.degree}</span><br/><span className="text-xs text-slate-500">{edu.school}</span></div>)}
            </div>
            <div className="col-span-2">
                <h3 className="font-bold text-lg mb-4 text-black">Work History</h3>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-6 flex gap-4">
                        <div className="text-xs font-bold text-slate-400 w-24 pt-1 flex-shrink-0">{exp.startDate}</div>
                        <div>
                            <h4 className="font-bold text-black">{exp.title}</h4>
                            <p className="text-sm text-slate-600 mb-1">{exp.company}</p>
                            <p className="text-sm text-slate-700">{exp.description[0]}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const CulinaryTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-[#fcfaf7] font-serif p-8 text-stone-800 border-8 border-double border-stone-300">
        <div className="text-center border-b border-stone-300 pb-6 mb-8">
            <h1 className="text-4xl italic font-bold text-stone-900">{resume.personalInfo.name}</h1>
            <p className="mt-2 text-sm uppercase tracking-widest text-stone-500">Professional Profile</p>
        </div>
        
        <div className="grid grid-cols-2 gap-12">
            <section>
                <h2 className="text-center text-lg font-bold uppercase tracking-widest mb-6 text-stone-900 border-b border-stone-200 pb-2">Menu of Skills</h2>
                <div className="text-center space-y-2 text-sm italic">
                    {resume.skills.map(s => <div key={s}>{s}</div>)}
                </div>
                <h2 className="text-center text-lg font-bold uppercase tracking-widest mb-6 mt-8 text-stone-900 border-b border-stone-200 pb-2">Signature Projects</h2>
                {resume.projects.map(proj => (
                    <div key={proj.id} className="text-center mb-4">
                        <h3 className="font-bold text-sm">{proj.name}</h3>
                        <p className="text-xs text-stone-600">{proj.description}</p>
                    </div>
                ))}
            </section>
            <section>
                <h2 className="text-center text-lg font-bold uppercase tracking-widest mb-6 text-stone-900 border-b border-stone-200 pb-2">Experience</h2>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-4 text-center">
                        <h3 className="font-bold text-sm">{exp.title}</h3>
                        <p className="text-xs italic text-stone-500 mb-1">{exp.company}</p>
                        <p className="text-sm text-stone-600">{exp.description[0]}</p>
                    </div>
                ))}
                 <h2 className="text-center text-lg font-bold uppercase tracking-widest mb-6 mt-8 text-stone-900 border-b border-stone-200 pb-2">Education</h2>
                 {resume.education.map(edu => <div key={edu.id} className="text-center text-sm mb-2"><span className="font-bold">{edu.degree}</span><br/>{edu.school}</div>)}
            </section>
        </div>
    </div>
);

const CareTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-teal-50/50 font-sans p-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm h-full flex flex-col">
            <header className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                    <UserIcon className="w-8 h-8"/>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-teal-900">{resume.personalInfo.name}</h1>
                    <p className="text-sm text-teal-600">{resume.personalInfo.email}</p>
                </div>
            </header>
            
            <section className="mb-6">
                <h2 className="text-teal-700 font-bold uppercase text-xs tracking-wider mb-3">About Me</h2>
                <p className="text-sm text-slate-600 leading-relaxed bg-teal-50 p-4 rounded-xl">{resume.personalInfo.summary}</p>
            </section>
            
            <section className="flex-1 overflow-y-auto">
                <h2 className="text-teal-700 font-bold uppercase text-xs tracking-wider mb-3">Experience</h2>
                {resume.experience.map(exp => (
                    <div key={exp.id} className="mb-4 pl-4 border-l-2 border-teal-200">
                        <h3 className="font-bold text-sm text-slate-800">{exp.title}</h3>
                        <p className="text-xs text-slate-500">{exp.company}</p>
                        <p className="text-sm text-slate-600 mt-1">{exp.description[0]}</p>
                    </div>
                ))}
                
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <div>
                         <h2 className="text-teal-700 font-bold uppercase text-xs tracking-wider mb-3">Skills</h2>
                         <div className="text-sm text-slate-600">{resume.skills.join(', ')}</div>
                    </div>
                    <div>
                         <h2 className="text-teal-700 font-bold uppercase text-xs tracking-wider mb-3">Education</h2>
                         {resume.education.map(edu => <div key={edu.id} className="text-sm text-slate-600 mb-2"><span className="font-bold">{edu.degree}</span><br/>{edu.school}</div>)}
                    </div>
                </div>
            </section>
        </div>
    </div>
);

const VibrantTemplate: React.FC<{ resume: Resume }> = ({ resume }) => (
    <div className="h-full bg-white font-sans overflow-y-auto">
        <header className="bg-gradient-to-r from-violet-600 to-indigo-600 p-10 text-white">
            <h1 className="text-5xl font-black mb-2">{resume.personalInfo.name}</h1>
            <p className="text-violet-200 text-lg">{resume.personalInfo.location}</p>
        </header>
        <div className="p-10">
            <section className="mb-8">
                 <h2 className="text-3xl font-black text-indigo-900 mb-4">EXPERIENCE</h2>
                 {resume.experience.map(exp => (
                     <div key={exp.id} className="mb-6">
                         <h3 className="text-xl font-bold text-violet-700">{exp.title}</h3>
                         <p className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wide">{exp.company} // {exp.startDate}</p>
                         <p className="text-slate-700 text-lg">{exp.description[0]}</p>
                     </div>
                 ))}
            </section>
            <section className="mb-8">
                 <h2 className="text-3xl font-black text-indigo-900 mb-4">PROJECTS</h2>
                 {resume.projects.map(proj => (
                     <div key={proj.id} className="mb-4">
                         <h3 className="text-lg font-bold text-violet-700">{proj.name}</h3>
                         <p className="text-slate-700">{proj.description}</p>
                     </div>
                 ))}
            </section>
            <div className="grid grid-cols-2 gap-10">
                <section>
                    <h2 className="text-3xl font-black text-indigo-900 mb-4">SKILLS</h2>
                    <div className="flex flex-wrap gap-3">
                        {resume.skills.map(s => <span key={s} className="bg-violet-100 text-violet-800 px-4 py-2 rounded-full font-bold text-sm">{s}</span>)}
                    </div>
                </section>
                <section>
                    <h2 className="text-3xl font-black text-indigo-900 mb-4">EDUCATION</h2>
                    {resume.education.map(edu => <div key={edu.id} className="text-lg font-bold">{edu.degree}<br/><span className="text-base font-normal text-slate-500">{edu.school}</span></div>)}
                </section>
            </div>
        </div>
    </div>
);


export const ResumeContainer = React.forwardRef<HTMLDivElement, { resume: Resume, template: Template, id?: string }>(({ resume, template, id = "resume-preview" }, ref) => {
    const renderTemplate = () => {
        switch (template) {
            case Template.CRAFTER: return <CrafterTemplate resume={resume} />;
            case Template.ONYX: return <OnyxTemplate resume={resume} />;
            case Template.MODERN: return <ModernTemplate resume={resume} />;
            case Template.CLASSIC: return <ClassicTemplate resume={resume} />;
            case Template.COLORFUL: return <ColorfulTemplate resume={resume} />;
            case Template.CREATIVE: return <CreativeTemplate resume={resume} />;
            case Template.MONOCHROME: return <MonochromeTemplate resume={resume} />;
            case Template.CORPORATE_BLUE: return <CorporateBlueTemplate resume={resume} />;
            case Template.SLATE: return <SlateTemplate resume={resume} />;
            case Template.CAMBRIDGE: return <CambridgeTemplate resume={resume} />;
            case Template.TECHIE: return <TechieTemplate resume={resume} />;
            case Template.VANGUARD: return <VanguardTemplate resume={resume} />;
            case Template.CRIMSON: return <CrimsonTemplate resume={resume} />;
            case Template.MINIMAL: return <MinimalTemplate resume={resume} />;
            case Template.SPECTRUM: return <SpectrumTemplate resume={resume} />;
            case Template.SUNRISE: return <SunriseTemplate resume={resume} />;
            case Template.OCEAN: return <OceanTemplate resume={resume} />;
            case Template.ARTISAN: return <ArtisanTemplate resume={resume} />;
            case Template.TYPOGRAPHIC: return <TypographicTemplate resume={resume} />;
            case Template.EMERALD: return <EmeraldTemplate resume={resume} />;
            case Template.RUBY: return <RubyTemplate resume={resume} />;
            case Template.GOLDENROD: return <GoldenrodTemplate resume={resume} />;
            case Template.EXECUTIVE: return <ExecutiveTemplate resume={resume} />;
            case Template.INFOGRAPHIC: return <InfographicTemplate resume={resume} />;
            case Template.MIDNIGHT: return <MidnightTemplate resume={resume} />;
            case Template.AURORA: return <AuroraTemplate resume={resume} />;
            case Template.VOLTAIC: return <VoltaicTemplate resume={resume} />;
            case Template.NORDIC: return <NordicTemplate resume={resume} />;
            case Template.GLACIER: return <GlacierTemplate resume={resume} />;
            case Template.NOVA: return <NovaTemplate resume={resume} />;
            case Template.FOLIO: return <FolioTemplate resume={resume} />;
            case Template.CULINARY: return <CulinaryTemplate resume={resume} />;
            case Template.CARE: return <CareTemplate resume={resume} />;
            case Template.VIBRANT: return <VibrantTemplate resume={resume} />;
            default: return <CrafterTemplate resume={resume} />;
        }
    };

    const getTemplateBackground = () => {
        switch (template) {
            case Template.MIDNIGHT: return 'bg-slate-900';
            case Template.CAMBRIDGE: return 'bg-[#FBF9F4]';
            case Template.TECHIE: return 'bg-gray-900';
            case Template.ARTISAN: return 'bg-[#FDFCFB]';
            case Template.NORDIC: return 'bg-slate-50';
            case Template.SLATE: return 'bg-slate-50';
            case Template.SUNRISE: return 'bg-orange-50';
            case Template.EMERALD: return 'bg-emerald-50';
            case Template.GOLDENROD: return 'bg-yellow-500';
            case Template.CULINARY: return 'bg-stone-50';
            case Template.CARE: return 'bg-teal-50';
            case Template.VOLTAIC: return 'bg-neutral-900';
            case Template.NOVA: return 'bg-indigo-950';
            case Template.AURORA: return 'bg-slate-900';
            default: return 'bg-white';
        }
    };

    return (
        <div 
            id={id} 
            ref={ref} 
            className={`${getTemplateBackground()} overflow-hidden`}
            style={{ width: '210mm', height: '296mm' }}
        >
           {renderTemplate()}
        </div>
    );
});


const Preview: React.FC<PreviewProps> = ({ resume, template, onEdit, onChangeTemplate }) => {
    const resumeContainerRef = useRef<HTMLDivElement>(null);
    const previewPaneRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1.0);
    const fitScaleRef = useRef(1.0);
    const isInitialMount = useRef(true);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [filename, setFilename] = useState('resume.pdf');

    const initiateDownload = () => {
        if (resume.personalInfo.name) {
            const safeName = resume.personalInfo.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            setFilename(`${safeName}_resume.pdf`);
        }
        setShowDownloadModal(true);
    };

    const confirmDownload = () => {
        const element = resumeContainerRef.current;
        if (!element) return;
        
        const opt = {
          margin: 0,
          filename: filename.endsWith('.pdf') ? filename : `${filename}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 4, useCORS: true, scrollY: 0 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        html2pdf().from(element).set(opt).save().then(() => {
             setShowDownloadModal(false);
        });
    };
    
    const handleZoomIn = () => setZoom(prev => Math.min(2.0, prev * 1.2));
    const handleZoomOut = () => setZoom(prev => Math.max(0.25, prev / 1.2));
    const handleResetZoom = () => setZoom(fitScaleRef.current);
    
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            handleZoomIn();
        } else {
            handleZoomOut();
        }
    };

    useLayoutEffect(() => {
        const calculateScale = () => {
            const previewPane = previewPaneRef.current;

            if (!previewPane || previewPane.clientWidth === 0) return;

            const padding = 64; 
            const availableWidth = previewPane.clientWidth - padding;
            const availableHeight = previewPane.clientHeight - padding;
            
            const resumeWidth = 794; 
            const resumeHeight = 1123;

            const scaleX = availableWidth / resumeWidth;
            const scaleY = availableHeight / resumeHeight;
            const newScale = Math.min(scaleX, scaleY);

            fitScaleRef.current = newScale;
            if (isInitialMount.current) {
                setZoom(newScale);
                isInitialMount.current = false;
            }
        };

        const resizeObserver = new ResizeObserver(calculateScale);
        const pane = previewPaneRef.current;
        if (pane) {
            resizeObserver.observe(pane);
        }
        
        calculateScale();

        return () => {
            if (pane) {
                resizeObserver.unobserve(pane);
            }
        };
    }, []);


    return (
        <aside className="h-full bg-transparent p-8 pb-24 md:pb-8 flex flex-col relative">
             {showDownloadModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm rounded-2xl">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl w-96 max-w-[90%] transform transition-all scale-100">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Download PDF</h3>
                            <button onClick={() => setShowDownloadModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Filename</label>
                            <input 
                                type="text" 
                                value={filename} 
                                onChange={(e) => setFilename(e.target.value)}
                                className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-transparent rounded-lg focus:bg-white dark:focus:bg-slate-600 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-slate-800 dark:text-white"
                                autoFocus
                            />
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button 
                                onClick={() => setShowDownloadModal(false)}
                                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDownload}
                                className="px-6 py-2 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            )}

             <div className="flex-shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                     <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">Preview</h2>
                     {onChangeTemplate && (
                        <button onClick={onChangeTemplate} className="flex items-center px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors border border-emerald-200 shadow-sm">
                            <Squares2X2Icon className="w-4 h-4 mr-1.5" />
                            Change Template
                        </button>
                     )}
                </div>
                 <div className="p-px rounded-full bg-gradient-to-r from-slate-300/50 via-slate-400/50 to-slate-300/50 dark:from-slate-600/80 dark:to-slate-700/80 w-full sm:w-auto">
                    <div className="flex items-center justify-between sm:justify-start gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full shadow-lg p-1.5">
                        <div className="flex items-center">
                            <button onClick={handleZoomOut} title="Zoom Out" className="p-2.5 w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-gradient-to-br hover:from-emerald-100 hover:to-green-100 dark:hover:from-slate-700 dark:hover:to-slate-600 rounded-full transition-all">
                                <MagnifyingGlassMinusIcon className="h-5 w-5" />
                            </button>
                            <button onClick={handleResetZoom} className="px-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-full transition-all">
                                {Math.round(zoom * 100)}%
                            </button>
                            <button onClick={handleZoomIn} title="Zoom In" className="p-2.5 w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-gradient-to-br hover:from-emerald-100 hover:to-green-100 dark:hover:from-slate-700 dark:hover:to-slate-600 rounded-full transition-all">
                                <MagnifyingGlassPlusIcon className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="hidden md:block w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                        <button 
                            onClick={initiateDownload}
                            className="hidden md:block px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-slate-900 focus:ring-green-500 transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Download PDF
                        </button>
                    </div>
                 </div>
            </div>
            <div 
                ref={previewPaneRef}
                onWheel={handleWheel}
                className="flex-1 overflow-auto bg-gradient-to-br from-emerald-100/50 via-green-100/50 to-teal-100/50 dark:from-slate-800/50 dark:via-emerald-950/50 dark:to-green-950/50 rounded-2xl flex justify-center items-start p-8 shadow-inner"
                style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"52\" height=\"52\" viewBox=\"0 0 52 52\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M1 1h50v50H1V1zm49 1H2v48h48V2z\" fill=\"%239ca3af\" fill-opacity=\"0.1\" fill-rule=\"evenodd\"%3E%3C/path%3E%3C/svg%3E')"}}
            >
                <div 
                    className="origin-top my-4 transition-transform duration-200 shadow-2xl dark:shadow-slate-900/50"
                    style={{ transform: `scale(${zoom})` }}
                >
                    <ResumeContainer ref={resumeContainerRef} resume={resume} template={template} />
                </div>
            </div>
            <div className="md:hidden mt-4 text-center text-xs text-slate-400 pb-8">
                crafted with ❤️ by Sathwik Pamu
            </div>

            {/* Mobile Fixed Preview Footer - REMOVED CHANGE TEMPLATE BUTTON */}
            <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-emerald-100 dark:border-slate-700 z-30 flex gap-3 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                 {onEdit && (
                    <button 
                        onClick={onEdit}
                        className="flex-1 flex items-center justify-center px-4 py-3 text-sm font-semibold rounded-full text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 active:bg-slate-200 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4 mr-2" />
                        Edit Info
                    </button>
                 )}
                 <button
                    onClick={initiateDownload}
                    className="flex-[2] flex items-center justify-center px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full shadow-lg active:scale-95 transition-transform"
                 >
                    Download PDF
                 </button>
            </div>
        </aside>
    );
};

export default Preview;
