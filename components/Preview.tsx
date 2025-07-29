
import React, { useRef, useLayoutEffect, useState } from 'react';
import { Resume, Template, Section } from '../types';
import { UserIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon, BriefcaseIcon, AcademicCapIcon, CodeBracketIcon, SparklesIcon, LinkIcon, BadgeCheckIcon, GlobeAltIcon } from './ui/Icons';

type PreviewProps = {
  resume: Resume;
  template: Template;
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
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    
    const Sections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE} className="mb-6">
                <h2 className="text-base font-bold tracking-widest border-b-2 border-black pb-1.5 mb-3">EXPERIENCE</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-base">{exp.company}</h3>
                            <p className="font-bold">{exp.location}</p>
                        </div>
                         <div className="flex justify-between italic">
                            <h4>{exp.title}</h4>
                            <p>{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <ul className="mt-2 list-disc list-inside space-y-1">
                            {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS} className="mb-6">
                <h2 className="text-base font-bold tracking-widest border-b-2 border-black pb-1.5 mb-3">PROJECTS</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                         <h3 className="font-bold text-base">
                            {proj.name}
                            {proj.link && <> - <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="font-normal italic underline hover:text-gray-600 transition-colors">View Project</a></>}
                         </h3>
                         <p className="mt-1">{proj.description}</p>
                         {proj.tech && <p className="text-xs italic mt-1">{proj.tech}</p>}
                    </div>
                ))}
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION} className="mb-6">
                <h2 className="text-base font-bold tracking-widest border-b-2 border-black pb-1.5 mb-3">EDUCATION</h2>
                {education.map(edu => (
                    <div key={edu.id} className="flex justify-between mb-2">
                       <div>
                         <h3 className="font-bold text-base">{edu.school}</h3>
                         <p>{edu.degree}</p>
                       </div>
                       <p className='font-bold'>{edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-base font-bold tracking-widest border-b-2 border-black pb-1.5 mb-3">SKILLS</h2>
                <p>{skills.join(' • ')}</p>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES} className="mb-6">
                <h2 className="text-base font-bold tracking-widest border-b-2 border-black pb-1.5 mb-3">PROFILES</h2>
                <ul className="list-disc list-inside space-y-1">
                    {profiles.map((p, i) => <li key={i}><a href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="hover:underline">{p}</a></li>)}
                </ul>
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS} className="mb-6">
                <h2 className="text-base font-bold tracking-widest border-b-2 border-black pb-1.5 mb-3">CERTIFICATIONS</h2>
                {certifications.map(c => (
                    <div key={c.id} className="mb-2">
                        <h3 className="font-bold">{c.name}</h3>
                        <p className="italic">{c.issuer}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES} className="mb-6">
                <h2 className="text-base font-bold tracking-widest border-b-2 border-black pb-1.5 mb-3">LANGUAGES</h2>
                {languages.map(l => (
                    <p key={l.id} className="mb-1">{l.name} - {l.level}</p>
                ))}
            </section>
        ),
    };
    
    return (
        <div className="p-12 font-[Roboto_Slab] bg-white text-gray-900 h-full overflow-y-auto border-4 border-black">
            <header className="text-center mb-10">
                 <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden border-2 border-gray-300 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-20 h-20 text-gray-400" />
                    )}
                </div>
                <h1 className="text-4xl font-bold tracking-wider">{personalInfo.name}</h1>
                 <div className="mt-3 flex justify-center items-center flex-wrap gap-x-3 text-sm">
                   {personalInfo.location && <span>{personalInfo.location}</span>}
                   {personalInfo.phone && <><span>|</span><span>{personalInfo.phone}</span></>}
                   {personalInfo.email && <><span>|</span><a href={ensureHttps(personalInfo.email)} className="hover:underline">{personalInfo.email}</a></>}
                   {personalInfo.linkedin && (
                        <>
                            <span>|</span>
                            <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                        </>
                    )}
                    {personalInfo.website && (
                         <>
                            <span>|</span>
                            <a href={ensureHttps(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>
                        </>
                    )}
                </div>
            </header>

            <main className="text-sm">
                <section className="mb-6">
                    <h2 className="text-base font-bold tracking-widest border-b-2 border-black pb-1.5 mb-3">SUMMARY</h2>
                    <p className="leading-relaxed text-base">{personalInfo.summary}</p>
                </section>
                
                {sectionOrder.map(section => Sections[section as keyof typeof Sections])}

            </main>
        </div>
    );
};

const ColorfulTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, languages, certifications, sectionOrder } = resume;
    
    const SidebarSections = {
        [Section.PROFILES]: (
            <section key={Section.PROFILES} className="mt-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-cyan-300 pb-1 mb-3">Links</h2>
                <div className="text-sm space-y-2 text-blue-100">
                    {profiles.map((prof,i) => <p key={i}><a href={ensureHttps(prof)} target="_blank" rel="noopener noreferrer" className="hover:text-white break-all">{prof}</a></p>)}
                </div>
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS} className="mt-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-cyan-300 pb-1 mb-3">Skills</h2>
                <ul className="text-sm space-y-1">
                    {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION} className="mt-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-cyan-300 pb-1 mb-3">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="text-sm mb-3">
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="text-blue-200">{edu.school}</p>
                        <p className="text-blue-200 text-xs">{edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES} className="mt-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-cyan-300 pb-1 mb-3">Languages</h2>
                {languages.map(lang => (
                    <div key={lang.id} className="text-sm mb-2">
                       <p>{lang.name} <span className="text-blue-200">({lang.level})</span></p>
                    </div>
                ))}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS} className="mt-6">
                <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-cyan-300 pb-1 mb-3">Certifications</h2>
                {certifications.map(cert => (
                    <div key={cert.id} className="text-sm mb-3">
                        <h3 className="font-bold">{cert.name}</h3>
                        <p className="text-blue-200">{cert.issuer}</p>
                    </div>
                ))}
            </section>
        ),
    };

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE} className="mb-6">
                <h2 className="text-2xl font-bold text-blue-800 uppercase tracking-wider pb-1 mb-3">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="text-lg font-semibold text-slate-800">{exp.title}</h3>
                        <div className="flex justify-between text-sm text-slate-500 italic mb-1">
                            <span>{exp.company} | {exp.location}</span>
                            <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                            {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-2xl font-bold text-blue-800 uppercase tracking-wider pb-1 mb-3">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                         <h3 className="text-lg font-semibold text-slate-800">
                            {proj.name}
                            {proj.link && <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="ml-2 text-sm text-cyan-600 underline hover:text-blue-800">View Project</a>}
                         </h3>
                        <p className="mt-1 text-sm">{proj.description}</p>
                        {proj.tech && <p className="text-xs italic text-slate-500 mt-1">{proj.tech}</p>}
                    </div>
                ))}
            </section>
        ),
    };

    return (
        <div className="flex bg-white font-sans h-full border-4 border-blue-500">
            <aside className="w-1/3 bg-gradient-to-br from-cyan-600 to-blue-800 text-white p-6 overflow-y-auto">
                 <div className="w-24 h-24 rounded-full mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-blue-600 overflow-hidden flex items-center justify-center ring-4 ring-white/50">
                    {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-blue-100" />
                    )}
                </div>
                <header className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">{personalInfo.name}</h1>
                </header>
                 <section>
                    <h2 className="text-lg font-semibold uppercase tracking-wider border-b-2 border-cyan-300 pb-1 mb-3">Contact</h2>
                     <div className="mt-3 text-sm space-y-2 text-blue-100">
                        <p><a href={ensureHttps(personalInfo.email)} className="hover:text-white">{personalInfo.email}</a></p>
                        {personalInfo.phone && <p>{personalInfo.phone}</p>}
                        {personalInfo.location && <p>{personalInfo.location}</p>}
                    </div>
                </section>
                {sectionOrder.map(section => SidebarSections[section as keyof typeof SidebarSections])}
            </aside>
            <main className="w-2/3 p-8 text-slate-800 overflow-y-auto">
                 <section className="mb-6">
                    <h2 className="text-2xl font-bold text-blue-800 uppercase tracking-wider pb-1 mb-3">Summary</h2>
                    <p className="text-sm text-slate-700 leading-relaxed">{personalInfo.summary}</p>
                </section>
                 {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
            </main>
        </div>
    );
};

const CreativeTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, profiles, languages, sectionOrder } = resume;

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-xl font-semibold text-fuchsia-700 mb-3">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="text-lg font-semibold">{exp.title} at {exp.company}</h3>
                        <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc list-inside text-sm mt-1">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-xl font-semibold text-fuchsia-700 mb-3">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                        <h3 className="font-semibold">{proj.name}</h3>
                        <p className="text-sm text-gray-600">{proj.description}</p>
                         <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:underline">View Project</a>
                    </div>
                ))}
            </section>
        )
    };
    
    const SideSections = {
         [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-xl font-semibold text-fuchsia-700 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => <span key={skill} className="bg-fuchsia-100 text-fuchsia-800 text-xs font-medium px-2 py-1 rounded">{skill}</span>)}
                </div>
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-xl font-semibold text-fuchsia-700 mb-3">Education</h2>
                {education.map(edu => (
                    <div key={edu.id}>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">{edu.school}</p>
                        <p className="text-xs text-gray-500">{edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-xl font-semibold text-fuchsia-700 mb-3">Certifications</h2>
                {certifications.map(cert => (
                    <div key={cert.id} className="text-sm">
                        <p className="font-semibold">{cert.name}</p>
                        <p className="text-gray-600">{cert.issuer}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.LANGUAGES]: (
             <section key={Section.LANGUAGES}>
                <h2 className="text-xl font-semibold text-fuchsia-700 mb-3">Languages</h2>
                {languages.map(lang => (
                    <div key={lang.id} className="text-sm">
                        <p className="font-semibold">{lang.name} <span className="text-gray-600">({lang.level})</span></p>
                    </div>
                ))}
            </section>
        ),
         [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-xl font-semibold text-fuchsia-700 mb-3">Profiles</h2>
                {profiles.map((p,i) => (
                    <a key={i} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-600 hover:underline block truncate">{p}</a>
                ))}
            </section>
        ),
    };
    
    return (
        <div className="p-8 bg-white font-sans text-gray-800 h-full overflow-y-auto border-4 border-fuchsia-200">
            <header className="flex items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-fuchsia-200 to-purple-300 flex items-center justify-center mr-6 flex-shrink-0 shadow-md overflow-hidden">
                    {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-fuchsia-700" />
                    )}
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-fuchsia-800">{personalInfo.name}</h1>
                    <div className="mt-1 flex flex-wrap gap-x-3 text-sm text-gray-600">
                        <span>{personalInfo.location}</span>
                        <span>&bull;</span>
                        <a href={ensureHttps(personalInfo.email)} className="hover:text-fuchsia-700">{personalInfo.email}</a>
                        <span>&bull;</span>
                        <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-fuchsia-700">LinkedIn</a>
                    </div>
                </div>
            </header>
            <main>
                <p className="mb-8 italic text-center text-gray-600 border-t border-b border-gray-200 py-4">{personalInfo.summary}</p>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                    </div>
                    <div className="col-span-1 space-y-6">
                       {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                    </div>
                </div>
            </main>
        </div>
    );
};

const MonochromeTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    
    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-base font-bold tracking-widest uppercase text-gray-500 mb-4">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-5">
                        <div className="flex justify-between">
                            <h3 className="text-lg font-bold text-gray-800">{exp.title}</h3>
                            <p className="text-sm font-medium text-gray-500">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="text-md font-semibold text-gray-700">{exp.company}</p>
                        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-base font-bold tracking-widest uppercase text-gray-500 mb-4">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{proj.name}</h3>
                        <p className="text-gray-600 my-1">{proj.description}</p>
                        <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Project</a>
                    </div>
                ))}
            </section>
        ),
    };
    
    const SideSections = {
         [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-base font-bold tracking-widest uppercase text-gray-500 mb-4">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3">
                        <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                        <p className="text-md text-gray-700">{edu.school}</p>
                        <p className="text-sm text-gray-500">{edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-base font-bold tracking-widest uppercase text-gray-500 mb-4">Skills</h2>
                <ul className="space-y-1.5">
                    {skills.map(skill => <li key={skill} className="text-md text-gray-700">{skill}</li>)}
                </ul>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-base font-bold tracking-widest uppercase text-gray-500 mb-4">Profiles</h2>
                <ul className="space-y-1.5">
                    {profiles.map((p, i) => <li key={i}><a href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block">{p}</a></li>)}
                </ul>
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-base font-bold tracking-widest uppercase text-gray-500 mb-4">Certifications</h2>
                <ul className="space-y-1.5">
                    {certifications.map(c => <li key={c.id} className="text-md text-gray-700">{c.name}</li>)}
                </ul>
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className="text-base font-bold tracking-widest uppercase text-gray-500 mb-4">Languages</h2>
                <ul className="space-y-1.5">
                    {languages.map(l => <li key={l.id} className="text-md text-gray-700">{l.name} ({l.level})</li>)}
                </ul>
            </section>
        ),
    };
    
    return (
        <div className="p-10 bg-white font-sans text-gray-900 h-full overflow-y-auto border-4 border-gray-300">
            <header className="text-center mb-8">
                 <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden border-2 border-gray-300 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-gray-400" />
                    )}
                </div>
                <h1 className="text-5xl font-black tracking-tighter">{personalInfo.name}</h1>
                <p className="text-lg font-medium text-gray-500 mt-2">{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</p>
            </header>
            <div className="w-full h-px bg-gray-300 my-8"></div>
            <main className="text-sm">
                <section className="mb-8">
                    <h2 className="text-base font-bold tracking-widest uppercase text-gray-500 mb-3">Summary</h2>
                    <p className="text-base leading-relaxed text-gray-700">{personalInfo.summary}</p>
                </section>
                <div className="grid grid-cols-3 gap-10">
                    <div className="col-span-2 space-y-8">
                        {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                    </div>
                    <div className="col-span-1 space-y-8">
                        {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- START NEW TEMPLATES ---

const CorporateBlueTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, sectionOrder } = resume;

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-1 mb-3">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="font-semibold text-slate-700">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-1 mb-3">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                        <h3 className="font-bold text-lg">{proj.name}</h3>
                        <p className="text-slate-600">{proj.description}</p>
                        <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">View Project</a>
                    </div>
                ))}
            </section>
        )
    };
    
    const SideSections = {
         [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">Skills</h2>
                <ul className="list-disc list-inside text-slate-600">
                    {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="text-slate-600">{edu.school}</p>
                        <p className="text-xs text-slate-500">{edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-lg font-bold text-blue-800 border-b border-blue-200 pb-1 mb-2">Certifications</h2>
                 {certifications.map(cert => (
                    <div key={cert.id} className="mb-2">
                        <h3 className="font-bold text-sm">{cert.name}</h3>
                        <p className="text-slate-600 text-xs">{cert.issuer}</p>
                    </div>
                ))}
            </section>
        ),
    };
    
    return (
        <div className="font-serif bg-white text-slate-900 h-full overflow-y-auto border-4 border-blue-200">
            <header className="bg-blue-900 text-white p-8 flex items-center gap-6">
                <div className="w-24 h-24 rounded-md bg-blue-800 flex-shrink-0 overflow-hidden border-2 border-blue-500 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-blue-300" />
                    )}
                </div>
                <div>
                    <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-2 text-blue-200">
                        <span>{personalInfo.phone}</span>
                        <a href={ensureHttps(personalInfo.email)} className="hover:text-white">{personalInfo.email}</a>
                        <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                        <a href={ensureHttps(personalInfo.website)} target="_blank" rel="noopener noreferrer" className="hover:text-white">Website</a>
                    </div>
                </div>
            </header>
            <main className="p-8 grid grid-cols-3 gap-8 text-sm">
                <div className="col-span-2 space-y-6">
                    <section>
                        <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-200 pb-1 mb-3">Summary</h2>
                        <p className="leading-relaxed">{personalInfo.summary}</p>
                    </section>
                    {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                </div>
                <div className="col-span-1 space-y-6">
                    {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                </div>
            </main>
        </div>
    );
};

const SlateTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const SidebarSections = {
        [Section.EDUCATION]: (
            <div key={Section.EDUCATION}>
                <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-1">Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-slate-300">{edu.school}</p>
                        <p className="text-xs text-slate-400">{edu.gradDate}</p>
                    </div>
                ))}
            </div>
        ),
        [Section.PROFILES]: (
            <div key={Section.PROFILES}>
                <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-1">Links</h2>
                {profiles.map((p, i) => <a key={i} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="block hover:text-white break-all">{p}</a>)}
            </div>
        ),
        [Section.CERTIFICATIONS]: (
            <div key={Section.CERTIFICATIONS}>
                <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-1">Certifications</h2>
                {certifications.map(c => (
                    <div key={c.id} className="mb-2">
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-slate-300 text-xs">{c.issuer}</p>
                    </div>
                ))}
            </div>
        ),
        [Section.LANGUAGES]: (
            <div key={Section.LANGUAGES}>
                <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-1">Languages</h2>
                {languages.map(l => (
                    <p key={l.id} className="font-semibold">{l.name} <span className="text-slate-300">({l.level})</span></p>
                ))}
            </div>
        ),
    };

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-2xl font-bold text-slate-700 mb-2">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 border-l-4 border-slate-300 pl-4">
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="font-semibold">{exp.company} <span className="text-slate-500">| {exp.startDate} - {exp.endDate}</span></p>
                        <ul className="list-disc list-inside mt-1 text-slate-600">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
             <section key={Section.PROJECTS}>
                <h2 className="text-2xl font-bold text-slate-700 mb-2">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3 border-l-4 border-slate-300 pl-4">
                        <h3 className="font-bold text-lg">{proj.name}</h3>
                        <p className="text-slate-600">{proj.description}</p>
                         <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">View Project</a>
                    </div>
                ))}
            </section>
        ),
    };
    
    return (
        <div className="bg-slate-50 text-slate-800 h-full flex font-sans overflow-hidden border-4 border-slate-300">
            <aside className="w-1/3 bg-slate-800 text-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
                <div>
                     <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-slate-700 overflow-hidden border-2 border-slate-500 flex items-center justify-center">
                        {personalInfo.image ? (
                            <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-16 h-16 text-slate-500" />
                        )}
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-8 text-center">{personalInfo.name}</h1>
                    <section className="space-y-4 text-sm">
                        <div>
                            <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-1">Contact</h2>
                            <p>{personalInfo.phone}</p>
                            <a href={ensureHttps(personalInfo.email)} className="hover:text-white break-all">{personalInfo.email}</a>
                        </div>
                        {sectionOrder.map(section => SidebarSections[section as keyof typeof SidebarSections])}
                    </section>
                </div>
                <div>
                     {sectionOrder.includes(Section.SKILLS) && (
                        <div>
                            <h2 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2">Skills</h2>
                            <div className="flex flex-wrap gap-1 text-xs">
                                {skills.map(skill => <span key={skill} className="bg-slate-700 px-2 py-1 rounded">{skill}</span>)}
                            </div>
                        </div>
                    )}
                </div>
            </aside>
            <main className="w-2/3 p-8 space-y-6 overflow-y-auto text-sm">
                <section>
                    <h2 className="text-2xl font-bold text-slate-700 mb-2">Summary</h2>
                    <p className="leading-relaxed">{personalInfo.summary}</p>
                </section>
                {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
            </main>
        </div>
    );
};

const CambridgeTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    const accentColor = "text-emerald-800";

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE} className="mb-5">
                <h2 className={`text-sm font-bold tracking-widest uppercase ${accentColor} mb-2`}>Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-lg font-bold">{exp.title}</h3>
                            <p className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="font-semibold italic">{exp.company}, {exp.location}</p>
                        <ul className="list-disc list-inside text-gray-700 mt-1">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
             <section key={Section.PROJECTS} className="mb-5">
                <h2 className={`text-sm font-bold tracking-widest uppercase ${accentColor} mb-2`}>Projects</h2>
                 {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                        <h3 className="text-lg font-bold">{proj.name}</h3>
                        <p>{proj.description}</p>
                        <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className={`${accentColor} hover:underline text-xs`}>View Project</a>
                    </div>
                ))}
            </section>
        )
    };

    const SideSections = {
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className={`text-sm font-bold tracking-widest uppercase ${accentColor} mb-2`}>Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="italic">{edu.school} ({edu.gradDate})</p>
                    </div>
                ))}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                 <h2 className={`text-sm font-bold tracking-widest uppercase ${accentColor} mb-2`}>Skills</h2>
                <p>{skills.join(', ')}</p>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className={`text-sm font-bold tracking-widest uppercase ${accentColor} mb-2`}>Profiles</h2>
                {profiles.map(p => <a key={p} href={ensureHttps(p)} target='_blank' rel='noopener noreferrer' className={`block hover:underline`}>{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className={`text-sm font-bold tracking-widest uppercase ${accentColor} mb-2`}>Certifications</h2>
                {certifications.map(c => <p key={c.id} className="font-bold">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className={`text-sm font-bold tracking-widest uppercase ${accentColor} mb-2`}>Languages</h2>
                {languages.map(l => <p key={l.id}>{l.name} ({l.level})</p>)}
            </section>
        ),
    };
    
    return (
        <div className="bg-[#FBF9F4] font-serif text-gray-800 h-full p-10 overflow-y-auto border-4 border-emerald-200">
            <header className="text-center pb-6 border-b-2 border-gray-300">
                <div className="w-24 h-24 rounded-full bg-emerald-50 mx-auto mb-4 overflow-hidden border-2 border-emerald-200 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-emerald-300" />
                    )}
                </div>
                <h1 className={`text-4xl font-extrabold ${accentColor}`}>{personalInfo.name}</h1>
                <p className="mt-2 text-sm">{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</p>
            </header>
            <main className="mt-6 text-sm">
                <section className="mb-5">
                    <h2 className={`text-sm font-bold tracking-widest uppercase ${accentColor} mb-2`}>Summary</h2>
                    <p className="text-justify">{personalInfo.summary}</p>
                </section>
                
                {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}

                <div className="grid grid-cols-2 gap-6">
                    {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                </div>
            </main>
        </div>
    );
};

const TechieTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    const accentColor = "text-green-400";

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-lg font-bold text-green-400 mb-2"># Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <p><span className="text-green-400">title:</span> "{exp.title}"</p>
                        <p><span className="text-green-400">company:</span> "{exp.company}"</p>
                        <p><span className="text-green-400">period:</span> ["{exp.startDate}", "{exp.endDate}"]</p>
                        <p className="text-green-400">description:</p>
                        <ul className="pl-4">
                            {exp.description.map((d, i) => <li key={i}>- "{d}"</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-lg font-bold text-green-400 mb-2"># Projects</h2>
                 {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                        <p><span className="text-green-400">name:</span> "{proj.name}"</p>
                        <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">View Project</a>
                    </div>
                ))}
            </section>
        ),
    };
    
    const SideSections = {
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-lg font-bold text-green-400 mb-2"># Skills</h2>
                <ul className="pl-4">
                    {skills.map(skill => <li key={skill}>- {skill}</li>)}
                </ul>
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-lg font-bold text-green-400 mb-2"># Education</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <p><span className="text-green-400">degree:</span> "{edu.degree}"</p>
                        <p><span className="text-green-400">school:</span> "{edu.school}"</p>
                    </div>
                ))}
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-lg font-bold text-green-400 mb-2"># Profiles</h2>
                <ul className="pl-4">
                    {profiles.map(p => <li key={p}><a href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{p}</a></li>)}
                </ul>
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-lg font-bold text-green-400 mb-2"># Certifications</h2>
                <ul className="pl-4">
                    {certifications.map(c => <li key={c.id}>- {c.name}</li>)}
                </ul>
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className="text-lg font-bold text-green-400 mb-2"># Languages</h2>
                <ul className="pl-4">
                    {languages.map(l => <li key={l.id}>- {l.name} ({l.level})</li>)}
                </ul>
            </section>
        ),
    };

    return (
        <div className="bg-[#1a1a1a] text-gray-300 font-mono h-full p-8 overflow-y-auto text-sm border-4 border-green-400/30">
            <header className="flex justify-between items-center pb-4 border-b border-green-400/30">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-black border-2 border-green-400/50 flex items-center justify-center p-1">
                        {personalInfo.image ? (
                            <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover grayscale" />
                        ) : (
                            <UserIcon className="w-10 h-10 text-green-400/50" />
                        )}
                    </div>
                    <h1 className={`text-3xl font-bold ${accentColor}`}>&gt; {personalInfo.name}</h1>
                </div>
                <div className="text-xs text-right space-y-1">
                    <p>{personalInfo.email}</p>
                    <p>{personalInfo.phone}</p>
                    <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className={`${accentColor} hover:underline`}>LinkedIn</a>
                </div>
            </header>
            <main className="mt-6">
                <p className="mb-6 text-green-300/80">/* {personalInfo.summary} */</p>
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 space-y-6">
                        {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                    </div>
                    <div className="col-span-1 space-y-6">
                        {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                    </div>
                </div>
            </main>
        </div>
    );
};

const VanguardTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const Sections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-lg font-extrabold tracking-wider uppercase mb-3">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-bold text-base">{exp.title}</h3>
                        <p className="font-semibold text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc list-inside mt-1 text-gray-600">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-lg font-extrabold tracking-wider uppercase mb-3">Projects</h2>
                {projects.map(proj => <p key={proj.id} className="mb-1"><span className="font-bold">{proj.name}:</span> {proj.description}</p>)}
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-lg font-extrabold tracking-wider uppercase mb-2">Education</h2>
                {education.map(edu => <p key={edu.id}><span className="font-bold">{edu.degree}</span>, {edu.school} ({edu.gradDate})</p>)}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-lg font-extrabold tracking-wider uppercase mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                   {skills.map(skill => <span key={skill} className="bg-gray-200 text-xs px-2 py-0.5 rounded">{skill}</span>)}
                </div>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-lg font-extrabold tracking-wider uppercase mb-2">Profiles</h2>
                {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline block">{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-lg font-extrabold tracking-wider uppercase mb-2">Certifications</h2>
                {certifications.map(c => <p key={c.id} className="font-bold">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className="text-lg font-extrabold tracking-wider uppercase mb-2">Languages</h2>
                {languages.map(l => <p key={l.id}>{l.name} ({l.level})</p>)}
            </section>
        ),
    };
    
    return (
        <div className="bg-white text-gray-800 h-full flex font-sans overflow-hidden border-4 border-red-200">
            <div className="w-1/4 bg-red-600 p-6 flex flex-col justify-between items-center text-white">
                <h1 className="text-5xl font-extrabold tracking-tighter" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    {personalInfo.name}
                </h1>
                <div className="w-24 h-24 rounded-full bg-red-500 flex-shrink-0 overflow-hidden border-2 border-red-300 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-white" />
                    )}
                </div>
            </div>
            <main className="w-3/4 p-8 space-y-6 overflow-y-auto text-sm">
                <section>
                    <p className="text-lg font-light leading-relaxed mb-4">{personalInfo.summary}</p>
                    <div className="text-xs text-red-600 font-bold space-x-4">
                        <span>{personalInfo.email}</span>
                        <span>{personalInfo.phone}</span>
                        <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">LINKEDIN</a>
                    </div>
                </section>
                <div className="w-full h-px bg-gray-200"></div>
                {sectionOrder.map(section => Sections[section as keyof typeof Sections])}
            </main>
        </div>
    );
};

const CrimsonTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    const accent = "text-red-700";

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className={`text-xl font-bold ${accent} uppercase tracking-wider`}>Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mt-2">
                        <h3 className="text-lg font-semibold">{exp.title}</h3>
                        <p className="font-medium text-slate-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc list-inside mt-1 text-slate-600">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
    };
    
    const SideSections = {
         [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className={`text-lg font-bold ${accent}`}>SKILLS</h2>
                <ul className="list-disc list-inside text-slate-600">
                    {skills.map(s => <li key={s}>{s}</li>)}
                </ul>
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className={`text-lg font-bold ${accent}`}>EDUCATION</h2>
                {education.map(edu => (
                    <div key={edu.id} className="mt-1">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-slate-600">{edu.school}, {edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className={`text-lg font-bold ${accent}`}>PROJECTS</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mt-1">
                        <h3 className="font-semibold">{proj.name}</h3>
                        <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">View Project</a>
                    </div>
                ))}
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className={`text-lg font-bold ${accent}`}>PROFILES</h2>
                <ul className="list-disc list-inside text-slate-600">
                    {profiles.map(p => <li key={p}><a href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">{p}</a></li>)}
                </ul>
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className={`text-lg font-bold ${accent}`}>CERTIFICATIONS</h2>
                <ul className="list-disc list-inside text-slate-600">
                    {certifications.map(c => <li key={c.id}>{c.name}</li>)}
                </ul>
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className={`text-lg font-bold ${accent}`}>LANGUAGES</h2>
                <ul className="list-disc list-inside text-slate-600">
                    {languages.map(l => <li key={l.id}>{l.name} ({l.level})</li>)}
                </ul>
            </section>
        ),
    };

    return (
        <div className="bg-white font-sans text-slate-800 h-full p-10 overflow-y-auto border-4 border-red-200">
            <header className="pb-4 border-b-4 border-red-700 mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
                    <p className="text-lg text-slate-600">Full-Stack Developer</p>
                    <div className="text-sm flex gap-x-4 mt-2">
                        <span>{personalInfo.phone}</span>
                        <a href={ensureHttps(personalInfo.email)} className={`hover:${accent}`}>{personalInfo.email}</a>
                        <a href={ensureHttps(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className={`hover:${accent}`}>LinkedIn</a>
                    </div>
                </div>
                 <div className="w-24 h-24 rounded-full bg-red-50 flex-shrink-0 overflow-hidden border-2 border-red-200 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-red-300" />
                    )}
                </div>
            </header>
            <main className="text-sm leading-relaxed grid grid-cols-3 gap-8">
                <div className="col-span-2 space-y-5">
                    <section>
                        <h2 className={`text-xl font-bold ${accent} uppercase tracking-wider`}>Summary</h2>
                        <p className="mt-2">{personalInfo.summary}</p>
                    </section>
                    {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                </div>
                <div className="col-span-1 space-y-5">
                    {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                </div>
            </main>
        </div>
    );
};

const MinimalTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const Sections: {[key in Section]?: React.ReactNode} = {
        [Section.EXPERIENCE]: (
             <div className="grid grid-cols-6 gap-12" key={Section.EXPERIENCE}>
                <div className="col-span-2 text-right">
                     <h2 className="font-bold tracking-widest uppercase mb-4">Experience</h2>
                </div>
                <div className="col-span-4">
                     {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                            <p className="text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
        [Section.PROJECTS]: (
            <div className="grid grid-cols-6 gap-12" key={Section.PROJECTS}>
               <div className="col-span-2 text-right">
                    <h2 className="font-bold tracking-widest uppercase mb-4">Projects</h2>
               </div>
               <div className="col-span-4">
                    {projects.map(proj => (
                       <div key={proj.id} className="mb-4">
                           <h3 className="font-semibold text-gray-800">{proj.name}</h3>
                           <p className="text-gray-600">{proj.description}</p>
                           {proj.link && <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:underline">{proj.link}</a>}
                       </div>
                   ))}
               </div>
           </div>
       ),
        [Section.SKILLS]: (
            <div className="grid grid-cols-6 gap-12" key={Section.SKILLS}>
                <div className="col-span-2 text-right">
                     <h2 className="font-bold tracking-widest uppercase mb-4">Skills</h2>
                </div>
                <div className="col-span-4">
                     <p className="mb-4">{skills.join(' / ')}</p>
                </div>
            </div>
        ),
        [Section.EDUCATION]: (
             <div className="grid grid-cols-6 gap-12" key={Section.EDUCATION}>
                <div className="col-span-2 text-right">
                     <h2 className="font-bold tracking-widest uppercase mb-4">Education</h2>
                </div>
                <div className="col-span-4">
                     {education.map(edu => (
                        <div key={edu.id} className="mb-2">
                            <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.school} | {edu.gradDate}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
        [Section.PROFILES]: (
            <div className="grid grid-cols-6 gap-12" key={Section.PROFILES}>
               <div className="col-span-2 text-right">
                    <h2 className="font-bold tracking-widest uppercase mb-4">Profiles</h2>
               </div>
               <div className="col-span-4">
                    {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline block">{p}</a>)}
               </div>
           </div>
        ),
        [Section.CERTIFICATIONS]: (
            <div className="grid grid-cols-6 gap-12" key={Section.CERTIFICATIONS}>
               <div className="col-span-2 text-right">
                    <h2 className="font-bold tracking-widest uppercase mb-4">Certifications</h2>
               </div>
               <div className="col-span-4">
                    {certifications.map(c => <p key={c.id} className="font-semibold">{c.name}</p>)}
               </div>
           </div>
        ),
        [Section.LANGUAGES]: (
            <div className="grid grid-cols-6 gap-12" key={Section.LANGUAGES}>
               <div className="col-span-2 text-right">
                    <h2 className="font-bold tracking-widest uppercase mb-4">Languages</h2>
               </div>
               <div className="col-span-4">
                    {languages.map(l => <p key={l.id}>{l.name} ({l.level})</p>)}
               </div>
           </div>
        ),
    };
    
    return (
        <div className="bg-white font-sans text-gray-700 h-full p-16 overflow-y-auto text-sm border-4 border-gray-200">
            <header className="text-center mb-12">
                <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-gray-300" />
                    )}
                </div>
                <h1 className="text-3xl tracking-widest font-light">{personalInfo.name}</h1>
                <p className="mt-2 text-xs tracking-wider text-gray-500">{personalInfo.email} | {personalInfo.phone} | {personalInfo.location}</p>
            </header>
            <main>
                <section className="mb-8">
                    <p className="text-center text-base leading-relaxed">{personalInfo.summary}</p>
                </section>
                {sectionOrder.map((section, index) => (
                    <React.Fragment key={section}>
                        <div className="w-1/4 mx-auto h-px bg-gray-200 my-8"></div>
                        {Sections[section]}
                    </React.Fragment>
                ))}
            </main>
        </div>
    );
};

// ... Add more templates in a similar fashion ...

// Final 8 templates
const SpectrumTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    const colors = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6', '#d946ef'];
    
    const SectionHeader: React.FC<{title: string, color: string}> = ({title, color}) => (
        <h2 className="text-xl font-bold uppercase tracking-wider" style={{ color }}>{title}</h2>
    );

    const Sections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <SectionHeader title="Experience" color={colors[1]} />
                {experience.map(exp => (
                    <div key={exp.id} className="mt-2 text-sm">
                        <h3 className="font-bold">{exp.title}</h3>
                        <p className="text-slate-600">{exp.company} | {exp.startDate}-{exp.endDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <SectionHeader title="Projects" color={colors[2]} />
                 {projects.map(p => <p key={p.id} className="text-sm"><span className="font-bold">{p.name}:</span> {p.description}</p>)}
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <SectionHeader title="Education" color={colors[3]} />
                {education.map(edu => <p key={edu.id} className="text-sm">{edu.degree}, {edu.school}</p>)}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <SectionHeader title="Skills" color={colors[4]} />
                <div className="flex flex-wrap gap-2 mt-2">
                   {skills.map((skill, i) => <span key={skill} className="text-white text-xs px-2 py-1 rounded" style={{backgroundColor: colors[i % colors.length]}}>{skill}</span>)}
                </div>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <SectionHeader title="Profiles" color={colors[5]} />
                 {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline block" style={{color: colors[5]}}>{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <SectionHeader title="Certifications" color={colors[6]} />
                {certifications.map(c => <p key={c.id} className="text-sm font-bold">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <SectionHeader title="Languages" color={colors[7]} />
                {languages.map(l => <p key={l.id} className="text-sm">{l.name} ({l.level})</p>)}
            </section>
        ),
    };
    
    return (
        <div className="bg-white font-sans text-slate-800 h-full p-8 overflow-y-auto border-4 border-slate-200">
            <header className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-t-lg">
                <div className="bg-white p-6 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                        {personalInfo.image ? (
                            <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                        ) : (
                            <UserIcon className="w-14 h-14 text-slate-300" />
                        )}
                    </div>
                    <div>
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">{personalInfo.name}</h1>
                        <p className="text-slate-600">{personalInfo.email} | {personalInfo.phone}</p>
                    </div>
                </div>
            </header>
            <main className="space-y-6 pt-6">
                <section>
                    <SectionHeader title="Summary" color={colors[0]} />
                    <p className="mt-1 text-sm">{personalInfo.summary}</p>
                </section>
                <div className="grid grid-cols-2 gap-6">
                   {sectionOrder.map(section => Sections[section as keyof typeof Sections])}
                </div>
            </main>
        </div>
    );
};

const SunriseTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-xl font-bold text-orange-700 mb-2">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-semibold text-lg">{exp.title}</h3>
                        <p className="text-orange-900/80">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc list-inside text-gray-600 mt-1">
                            {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-xl font-bold text-orange-700 mb-2">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-4">
                        <h3 className="font-semibold text-lg">{proj.name}</h3>
                        <p className="text-gray-600 mt-1">{proj.description}</p>
                        {proj.tech && <p className="text-xs text-gray-500">Tech: {proj.tech}</p>}
                        {proj.link && <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline text-sm">View Project</a>}
                    </div>
                ))}
            </section>
        ),
    };
    
    const SideSections = {
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-xl font-bold text-orange-700 mb-2">Education</h2>
                {education.map(edu => <div key={edu.id}><p className="font-semibold">{edu.degree}</p><p className="text-gray-600">{edu.school}</p></div>)}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-xl font-bold text-orange-700 mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {skills.map(skill => <span key={skill} className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">{skill}</span>)}
                </div>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-xl font-bold text-orange-700 mb-2">Profiles</h2>
                {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline block">{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-xl font-bold text-orange-700 mb-2">Certifications</h2>
                {certifications.map(c => <p key={c.id} className="font-semibold">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className="text-xl font-bold text-orange-700 mb-2">Languages</h2>
                {languages.map(l => <p key={l.id}>{l.name} ({l.level})</p>)}
            </section>
        ),
    };

    return (
        <div className="bg-orange-50 font-sans text-gray-800 h-full overflow-y-auto border-4 border-orange-200">
            <header className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-white/30 mx-auto mb-4 overflow-hidden border-2 border-white/50 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-white/80" />
                    )}
                </div>
                <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
                <p className="mt-2 text-lg">Full-Stack Developer</p>
            </header>
            <main className="p-8 text-sm">
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-orange-700 mb-2">About Me</h2>
                    <p className="leading-relaxed">{personalInfo.summary}</p>
                </section>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                    </div>
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-bold text-orange-700 mb-2">Contact</h2>
                            <p>{personalInfo.phone}</p>
                            <p>{personalInfo.email}</p>
                            <p>{personalInfo.location}</p>
                        </section>
                         {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                    </div>
                </div>
            </main>
        </div>
    );
};

const OceanTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const SideSections = {
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-2">Education</h2>
                {education.map(edu => <div key={edu.id}><p className="font-semibold">{edu.degree}</p><p className="text-blue-200">{edu.school}</p></div>)}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-2">Skills</h2>
                <ul className="list-disc list-inside">
                    {skills.map(s => <li key={s}>{s}</li>)}
                </ul>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-2">Profiles</h2>
                {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 block truncate">{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-2">Certifications</h2>
                {certifications.map(c => <p key={c.id} className="font-semibold">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-2">Languages</h2>
                {languages.map(l => <p key={l.id}>{l.name} ({l.level})</p>)}
            </section>
        ),
    };

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-2xl font-bold text-blue-800">Experience</h2>
                {experience.map(exp => <div key={exp.id} className="mt-2"><h3 className="font-bold text-lg">{exp.title}</h3><p className="font-semibold">{exp.company}</p><ul className="list-disc list-inside text-gray-600">{exp.description.map((d, i) => <li key={i}>{d}</li>)}</ul></div>)}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-2xl font-bold text-blue-800">Projects</h2>
                 {projects.map(p => <div key={p.id} className="mt-2"><h3 className="font-bold text-lg">{p.name}</h3><p>{p.description}</p></div>)}
            </section>
        ),
    };

    return (
        <div className="bg-white text-gray-800 h-full flex font-sans overflow-hidden border-4 border-blue-200">
            <aside className="w-1/3 bg-blue-700 text-white p-6 overflow-y-auto">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-blue-600 overflow-hidden border-2 border-blue-400 flex items-center justify-center">
                    {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-blue-200" />
                    )}
                </div>
                <h1 className="text-3xl font-bold text-center">{personalInfo.name}</h1>
                <div className="mt-8 space-y-6 text-sm">
                    <section>
                        <h2 className="text-lg font-semibold border-b-2 border-blue-400 pb-1 mb-2">Contact</h2>
                        <p>{personalInfo.phone}</p>
                        <a href={ensureHttps(personalInfo.email)} className="hover:text-blue-200">{personalInfo.email}</a>
                    </section>
                     {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                </div>
            </aside>
            <main className="w-2/3 p-8 space-y-6 overflow-y-auto text-sm relative">
                 <svg className="absolute top-0 right-0 h-full w-auto text-blue-50 -z-10" viewBox="0 0 200 790" fill="currentColor" preserveAspectRatio="none"><path d="M200 0C200 0 50 200 50 400S200 790 200 790V0z"/></svg>
                <section>
                    <h2 className="text-2xl font-bold text-blue-800">Summary</h2>
                    <p className="leading-relaxed mt-1">{personalInfo.summary}</p>
                </section>
                 {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
            </main>
        </div>
    );
};

const ArtisanTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-center text-lg tracking-widest font-bold uppercase border-y-2 border-gray-300 py-1 mb-3">Experience</h2>
                {experience.map(exp => <div key={exp.id} className="mb-3 text-center"><h3 className="font-bold text-base">{exp.title} at {exp.company}</h3><p>{exp.startDate} - {exp.endDate}</p></div>)}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-center text-lg tracking-widest font-bold uppercase border-y-2 border-gray-300 py-1 mb-3">Projects</h2>
                 {projects.map(p => <p key={p.id} className="mb-1 text-center"><span className="font-bold">{p.name}:</span> {p.description}</p>)}
            </section>
        ),
    };
    
    const GridSections = {
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-lg font-bold">Education</h2>
                {education.map(edu => <div key={edu.id}><p>{edu.degree}</p><p className="text-xs">{edu.school}</p></div>)}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-lg font-bold">Skills</h2>
                <p>{skills.join(' | ')}</p>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-lg font-bold">Profiles</h2>
                {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="hover:underline block">{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-lg font-bold">Certifications</h2>
                {certifications.map(c => <p key={c.id}>{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className="text-lg font-bold">Languages</h2>
                {languages.map(l => <p key={l.id}>{l.name}</p>)}
            </section>
        ),
    };

    return (
        <div className="bg-[#FDFCFB] font-serif text-[#4A4A4A] h-full p-10 overflow-y-auto border-4 border-gray-300" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"6\" height=\"6\" viewBox=\"0 0 6 6\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23e0ded9\" fill-opacity=\"0.4\" fill-rule=\"evenodd\"%3E%3Cpath d=\"M5 0h1L0 6V5zM6 5v1H5z\"/%3E%3C/g%3E%3C/svg%3E')"}}>
            <header className="text-center mb-8">
                 <div className="w-24 h-24 rounded-full bg-white mx-auto mb-4 overflow-hidden shadow-lg border-2 border-gray-200 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-gray-300" />
                    )}
                </div>
                <h1 className="text-5xl" style={{fontFamily: "'Brush Script MT', cursive"}}> {personalInfo.name} </h1>
                <p className="text-sm mt-2">{personalInfo.email} | {personalInfo.phone}</p>
            </header>
            <main className="space-y-6 text-sm">
                <p className="text-center italic">{personalInfo.summary}</p>
                {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                <div className="grid grid-cols-2 gap-8 pt-4">
                    {sectionOrder.map(section => GridSections[section as keyof typeof GridSections])}
                </div>
            </main>
        </div>
    );
};

const TypographicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const SideSections = {
        [Section.SKILLS]: (
             <section key={Section.SKILLS}>
                <h2 className="text-lg font-bold tracking-wider uppercase mb-2">Skills</h2>
                <p className="text-gray-600">{skills.join(', ')}</p>
            </section>
        ),
        [Section.PROFILES]: (
             <section key={Section.PROFILES}>
                <h2 className="text-lg font-bold tracking-wider uppercase mb-2">Profiles</h2>
                {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:underline block truncate">{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
             <section key={Section.CERTIFICATIONS}>
                <h2 className="text-lg font-bold tracking-wider uppercase mb-2">Certifications</h2>
                 {certifications.map(c => <p key={c.id} className="text-gray-600">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
             <section key={Section.LANGUAGES}>
                <h2 className="text-lg font-bold tracking-wider uppercase mb-2">Languages</h2>
                 {languages.map(l => <p key={l.id} className="text-gray-600">{l.name} ({l.level})</p>)}
            </section>
        ),
    };

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-2xl font-black tracking-wider uppercase mb-2">Experience</h2>
                {experience.map(exp => <div key={exp.id} className="mb-3"><h3 className="font-bold text-base">{exp.title}</h3><p className="text-gray-600">{exp.company} / {exp.startDate}-{exp.endDate}</p></div>)}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-2xl font-black tracking-wider uppercase mb-2">Projects</h2>
                {projects.map(p => <p key={p.id} className="mb-1"><span className="font-bold">{p.name}:</span> {p.description}</p>)}
            </section>
        ),
        [Section.EDUCATION]: (
             <section key={Section.EDUCATION}>
                <h2 className="text-2xl font-black tracking-wider uppercase mb-2">Education</h2>
                 {education.map(edu => <div key={edu.id} className="mt-2"><h3 className="font-bold text-base">{edu.degree}</h3><p className="text-gray-600">{edu.school}</p></div>)}
            </section>
        )
    };

    return (
        <div className="bg-white font-sans h-full p-10 overflow-y-auto border-4 border-gray-200">
             <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-8xl font-black text-gray-800 leading-none">{personalInfo.name.split(' ')[0]}</h1>
                    <h1 className="text-8xl font-black text-gray-300 leading-none">{personalInfo.name.split(' ').slice(1).join(' ')}</h1>
                </div>
                 <div className="w-24 h-24 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-gray-300" />
                    )}
                </div>
            </div>
            <main className="mt-8 text-sm grid grid-cols-12 gap-8">
                <div className="col-span-4 space-y-6">
                    <section>
                        <h2 className="text-lg font-bold tracking-wider uppercase mb-2">About</h2>
                        <p className="text-gray-600">{personalInfo.summary}</p>
                    </section>
                    <section>
                        <h2 className="text-lg font-bold tracking-wider uppercase mb-2">Contact</h2>
                        <p className="text-gray-600">{personalInfo.email}</p>
                        <p className="text-gray-600">{personalInfo.phone}</p>
                    </section>
                    {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                </div>
                <div className="col-span-8 space-y-6">
                     {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                </div>
            </main>
        </div>
    );
};

const EmeraldTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    const accent = "text-emerald-600";
    
    const Sections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className={`font-bold text-xl ${accent} mb-2`}>Experience</h2>
                {experience.map(exp => <div key={exp.id} className="mb-3"><h3 className="font-semibold text-lg">{exp.title} at {exp.company}</h3><ul className="list-disc list-inside text-slate-600">{exp.description.map((d, i) => <li key={i}>{d}</li>)}</ul></div>)}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className={`font-bold text-xl ${accent} mb-2`}>Projects</h2>
                {projects.map(p => <p key={p.id}>{p.name}</p>)}
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className={`font-bold text-xl ${accent} mb-2`}>Education</h2>
                {education.map(edu => <p key={edu.id}>{edu.degree}</p>)}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className={`font-bold text-xl ${accent} mb-2`}>Skills</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                   {skills.map(skill => <span key={skill} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">{skill}</span>)}
                </div>
            </section>
        ),
        [Section.PROFILES]: (
             <section key={Section.PROFILES}>
                <h2 className={`font-bold text-xl ${accent} mb-2`}>Profiles</h2>
                {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className={`${accent} hover:underline block`}>{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
             <section key={Section.CERTIFICATIONS}>
                <h2 className={`font-bold text-xl ${accent} mb-2`}>Certifications</h2>
                {certifications.map(c => <p key={c.id}>{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
             <section key={Section.LANGUAGES}>
                <h2 className={`font-bold text-xl ${accent} mb-2`}>Languages</h2>
                {languages.map(l => <p key={l.id}>{l.name}</p>)}
            </section>
        ),
    };

    return (
        <div className="bg-emerald-50/50 font-sans text-slate-800 h-full p-8 overflow-y-auto border-4 border-emerald-200">
            <header className="text-center p-6 bg-emerald-600 text-white rounded-lg flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500 flex-shrink-0 overflow-hidden border-2 border-emerald-300 flex items-center justify-center">
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-14 h-14 text-emerald-100" />
                    )}
                </div>
                <div className="text-left">
                    <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
                    <p className="mt-2 opacity-80">{personalInfo.email} | {personalInfo.phone}</p>
                </div>
            </header>
            <main className="mt-6 space-y-5 text-sm">
                <section>
                    <h2 className={`font-bold text-xl ${accent} mb-2`}>Summary</h2>
                    <p className="text-slate-700">{personalInfo.summary}</p>
                </section>
                {sectionOrder.map(section => Sections[section as keyof typeof Sections])}
            </main>
        </div>
    );
};

const RubyTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const SideSections = {
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-lg font-semibold uppercase tracking-wider text-red-200">Skills</h2>
                {skills.map(s => <p key={s}>{s}</p>)}
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-lg font-semibold uppercase tracking-wider text-red-200">Education</h2>
                 {education.map(edu => <div key={edu.id}><p className="font-semibold">{edu.degree}</p><p className="text-red-200">{edu.school}</p></div>)}
            </section>
        ),
        [Section.PROFILES]: (
             <section key={Section.PROFILES}>
                <h2 className="text-lg font-semibold uppercase tracking-wider text-red-200">Profiles</h2>
                 {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="hover:text-red-100 block truncate">{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
             <section key={Section.CERTIFICATIONS}>
                <h2 className="text-lg font-semibold uppercase tracking-wider text-red-200">Certifications</h2>
                 {certifications.map(c => <p key={c.id} className="font-semibold">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
             <section key={Section.LANGUAGES}>
                <h2 className="text-lg font-semibold uppercase tracking-wider text-red-200">Languages</h2>
                 {languages.map(l => <p key={l.id}>{l.name} ({l.level})</p>)}
            </section>
        ),
    };
    
    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-2xl font-bold text-red-800">Experience</h2>
                {experience.map(exp => <div key={exp.id} className="mt-2"><h3 className="font-bold text-lg">{exp.title}</h3><p className="text-gray-600">{exp.company}</p></div>)}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-2xl font-bold text-red-800">Projects</h2>
                 {projects.map(p => <div key={p.id} className="mt-2"><h3 className="font-bold text-lg">{p.name}</h3><p>{p.description}</p></div>)}
            </section>
        ),
    };

    return (
        <div className="bg-white font-sans text-gray-800 h-full flex overflow-hidden border-4 border-red-200">
            <aside className="w-1/3 bg-red-800 text-white p-6 overflow-y-auto">
                 <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-red-700 overflow-hidden border-2 border-red-400 flex items-center justify-center">
                    {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-red-200" />
                    )}
                </div>
                <h1 className="text-4xl font-bold text-center">{personalInfo.name}</h1>
                <div className="mt-8 space-y-6">
                    <section>
                        <h2 className="text-lg font-semibold uppercase tracking-wider text-red-200">Contact</h2>
                        <p>{personalInfo.phone}</p>
                        <p>{personalInfo.email}</p>
                    </section>
                    {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                </div>
            </aside>
            <main className="w-2/3 p-8 space-y-6 overflow-y-auto">
                 <section>
                    <h2 className="text-2xl font-bold text-red-800">Summary</h2>
                    <p className="mt-1">{personalInfo.summary}</p>
                </section>
                {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
            </main>
        </div>
    );
};

const GoldenrodTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;

    const Sections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-lg font-bold border-b-2 border-yellow-600 pb-1">EXPERIENCE</h2>
                {experience.map(exp => <div key={exp.id} className="text-sm mt-1"><p><span className="font-bold">{exp.title}</span> at {exp.company}</p></div>)}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-lg font-bold border-b-2 border-yellow-600 pb-1">PROJECTS</h2>
                <div className="text-sm mt-1">
                    {projects.map(p => <p key={p.id} className="font-bold">{p.name}</p>)}
                </div>
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h2 className="text-lg font-bold border-b-2 border-yellow-600 pb-1">SKILLS</h2>
                <div className="flex flex-wrap gap-2 text-sm mt-1">
                    {skills.map(s => <span key={s} className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">{s}</span>)}
                </div>
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h2 className="text-lg font-bold border-b-2 border-yellow-600 pb-1">EDUCATION</h2>
                <div className="text-sm mt-1">
                    {education.map(e => <p key={e.id}><span className="font-bold">{e.degree}</span>, {e.school}</p>)}
                </div>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h2 className="text-lg font-bold border-b-2 border-yellow-600 pb-1">PROFILES</h2>
                <div className="text-sm mt-1">
                    {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className="hover:underline block">{p}</a>)}
                </div>
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h2 className="text-lg font-bold border-b-2 border-yellow-600 pb-1">CERTIFICATIONS</h2>
                <div className="text-sm mt-1">
                    {certifications.map(c => <p key={c.id}>{c.name}</p>)}
                </div>
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h2 className="text-lg font-bold border-b-2 border-yellow-600 pb-1">LANGUAGES</h2>
                <div className="text-sm mt-1">
                    {languages.map(l => <p key={l.id}>{l.name} ({l.level})</p>)}
                </div>
            </section>
        ),
    };

    return (
        <div className="bg-yellow-500 text-gray-900 h-full p-8 font-sans overflow-y-auto border-4 border-white">
             <header className="text-center">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-yellow-400 overflow-hidden border-4 border-white shadow-lg flex items-center justify-center">
                    {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-yellow-800" />
                    )}
                </div>
                <h1 className="text-4xl font-extrabold text-white bg-gray-900 inline-block px-4 py-2">{personalInfo.name}</h1>
                <p className="mt-2 text-sm text-gray-800">{personalInfo.email} | {personalInfo.phone}</p>
            </header>
            <main className="mt-6 space-y-6 bg-white/70 p-6 rounded-lg">
                <section>
                    <h2 className="text-lg font-bold border-b-2 border-yellow-600 pb-1">SUMMARY</h2>
                    <p className="text-sm mt-1">{personalInfo.summary}</p>
                </section>
                 {sectionOrder.map(section => Sections[section as keyof typeof Sections])}
            </main>
        </div>
    );
};

const ExecutiveTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, languages, profiles, sectionOrder } = resume;

    const MainSections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-3">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-semibold text-lg">{exp.title}</h3>
                            <p className="text-sm text-slate-500">{exp.startDate} - {exp.endDate}</p>
                        </div>
                        <p className="text-md text-slate-600">{exp.company}</p>
                        <ul className="list-disc list-inside text-slate-600 mt-1 space-y-1 text-sm">
                            {exp.description.map(d => <li key={d}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-3">Projects</h2>
                {projects.map(proj => (
                    <div key={proj.id} className="mb-3">
                        <h3 className="font-semibold text-lg">{proj.name}</h3>
                        <p className="text-sm text-slate-600">{proj.description}</p>
                        <a href={ensureHttps(proj.link)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline">View Project</a>
                    </div>
                ))}
            </section>
        ),
    };

    const SideSections = {
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <h3 className="text-base font-bold text-slate-700 mb-2">Skills</h3>
                <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                    {skills.map(skill => <li key={skill}>{skill}</li>)}
                </ul>
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <h3 className="text-base font-bold text-slate-700 mb-2">Education</h3>
                {education.map(edu => (
                    <div key={edu.id} className="text-sm mb-2">
                        <p className="font-semibold">{edu.degree}</p>
                        <p className="text-slate-600">{edu.school}</p>
                        <p className="text-xs text-slate-500">{edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <h3 className="text-base font-bold text-slate-700 mb-2">Certifications</h3>
                {certifications.map(cert => <p key={cert.id} className="text-sm text-slate-600">{cert.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <h3 className="text-base font-bold text-slate-700 mb-2">Languages</h3>
                {languages.map(lang => <p key={lang.id} className="text-sm text-slate-600">{lang.name} ({lang.level})</p>)}
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <h3 className="text-base font-bold text-slate-700 mb-2">Profiles</h3>
                {profiles.map(p => <a href={ensureHttps(p)} key={p} className="text-sm text-blue-700 hover:underline block truncate">{p}</a>)}
            </section>
        )
    };

    return (
        <div className="bg-white font-serif text-slate-900 h-full p-10 overflow-y-auto border-4 border-slate-200">
            <header className="text-center border-b-2 border-slate-200 pb-6 mb-6">
                <h1 className="text-5xl font-bold tracking-tight">{personalInfo.name}</h1>
                <p className="text-xl text-slate-600 mt-2">Full-Stack Developer</p>
            </header>
            <main className="grid grid-cols-3 gap-10">
                <div className="col-span-2">
                    <section className="mb-6">
                        <h2 className="text-xl font-bold tracking-tight text-slate-800 mb-3">Summary</h2>
                        <p className="text-justify leading-relaxed text-sm">{personalInfo.summary}</p>
                    </section>
                    <div className="space-y-6">
                        {sectionOrder.map(section => MainSections[section as keyof typeof MainSections])}
                    </div>
                </div>
                <div className="col-span-1 space-y-6">
                    <section>
                         <h3 className="text-base font-bold text-slate-700 mb-2">Contact</h3>
                         <div className="text-sm text-slate-600 space-y-1">
                            <p>{personalInfo.phone}</p>
                            <p className="truncate">{personalInfo.email}</p>
                            <p>{personalInfo.location}</p>
                         </div>
                    </section>
                    {sectionOrder.map(section => SideSections[section as keyof typeof SideSections])}
                </div>
            </main>
        </div>
    );
};

const InfographicTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    const accentColor = "teal";

    const SectionHeader: React.FC<{icon: React.ReactNode, title:string}> = ({icon, title}) => (
        <div className={`flex items-center gap-3 mb-3 text-${accentColor}-600`}>
            <span className={`w-8 h-8 rounded-full bg-${accentColor}-100 flex items-center justify-center`}>{icon}</span>
            <h2 className="text-2xl font-bold">{title}</h2>
        </div>
    );

    const Sections = {
        [Section.EXPERIENCE]: (
             <section key={Section.EXPERIENCE} className="relative pl-12">
                <div className="absolute left-4 top-4 bottom-4 w-1 bg-slate-200 rounded-full"></div>
                <SectionHeader icon={<BriefcaseIcon className="w-5 h-5"/>} title="Experience" />
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4 relative">
                        <div className={`absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-${accentColor}-500 border-4 border-white`}></div>
                        <p className="text-xs text-slate-500">{exp.startDate} - {exp.endDate}</p>
                        <h3 className="font-bold text-lg">{exp.title}</h3>
                        <p className="text-slate-600">{exp.company}</p>
                        <ul className="list-disc list-inside text-sm text-slate-600 mt-1">
                           {exp.description.map(d => <li key={d}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION} className="pl-12">
                 <SectionHeader icon={<AcademicCapIcon className="w-5 h-5"/>} title="Education" />
                 {education.map(edu => (
                     <div key={edu.id} className="mb-2">
                         <h3 className="font-bold">{edu.degree}</h3>
                         <p className="text-slate-600">{edu.school}</p>
                         <p className="text-sm text-slate-500">{edu.gradDate}</p>
                     </div>
                 ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS} className="pl-12">
                 <SectionHeader icon={<CodeBracketIcon className="w-5 h-5"/>} title="Projects" />
                 {projects.map(proj => (
                     <div key={proj.id} className="mb-2">
                         <h3 className="font-bold">{proj.name}</h3>
                         <p className="text-sm text-slate-600">{proj.description}</p>
                     </div>
                 ))}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS} className="pl-12">
                 <SectionHeader icon={<SparklesIcon className="w-5 h-5"/>} title="Skills" />
                 <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill} className={`bg-${accentColor}-100 text-${accentColor}-800 text-sm font-medium px-3 py-1 rounded-full`}>{skill}</span>
                    ))}
                 </div>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES} className="pl-12">
                 <SectionHeader icon={<LinkIcon className="w-5 h-5"/>} title="Profiles" />
                 {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className={`text-${accentColor}-600 hover:underline block truncate`}>{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS} className="pl-12">
                 <SectionHeader icon={<BadgeCheckIcon className="w-5 h-5"/>} title="Certifications" />
                 {certifications.map(c => <p key={c.id} className="font-bold">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES} className="pl-12">
                 <SectionHeader icon={<GlobeAltIcon className="w-5 h-5"/>} title="Languages" />
                 {languages.map(l => <p key={l.id}>{l.name} ({l.level})</p>)}
            </section>
        ),
    };

    return (
        <div className="bg-white font-sans text-slate-800 h-full p-8 overflow-y-auto border-4 border-slate-200">
            <header className="flex items-center gap-6 mb-8">
                 <div className="w-28 h-28 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden border-4 border-white shadow-lg ring-4 ring-teal-500 flex items-center justify-center">
                    {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-20 h-20 text-slate-400" />
                    )}
                </div>
                <div>
                    <h1 className="text-4xl font-extrabold">{personalInfo.name}</h1>
                    <p className="text-lg text-slate-600">{personalInfo.summary}</p>
                </div>
            </header>
            <main className="space-y-8">
                {sectionOrder.map(section => Sections[section as keyof typeof Sections])}
            </main>
        </div>
    );
};

const MidnightTemplate: React.FC<{ resume: Resume }> = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, profiles, certifications, languages, sectionOrder } = resume;
    const accent = "cyan";

    const SectionHeader: React.FC<{title:string}> = ({title}) => (
        <h2 className={`text-xl font-bold text-${accent}-400 uppercase tracking-widest`}>{title}</h2>
    );

    const Sections = {
        [Section.EXPERIENCE]: (
            <section key={Section.EXPERIENCE}>
                <SectionHeader title="Experience" />
                {experience.map(exp => (
                    <div key={exp.id} className="mt-3 border-l-2 border-slate-600 pl-4">
                        <h3 className="text-lg font-semibold text-slate-100">{exp.title}</h3>
                        <p className="text-slate-400">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                            {exp.description.map(d => <li key={d}>{d}</li>)}
                        </ul>
                    </div>
                ))}
            </section>
        ),
        [Section.PROJECTS]: (
            <section key={Section.PROJECTS}>
                <SectionHeader title="Projects" />
                {projects.map(proj => (
                    <div key={proj.id} className="mt-2">
                        <h3 className="text-lg font-semibold text-slate-100">{proj.name}</h3>
                        <p className="text-slate-400">{proj.description}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.EDUCATION]: (
            <section key={Section.EDUCATION}>
                <SectionHeader title="Education" />
                 {education.map(edu => (
                    <div key={edu.id} className="mt-2">
                        <h3 className="text-lg font-semibold text-slate-100">{edu.degree}</h3>
                        <p className="text-slate-400">{edu.school} - {edu.gradDate}</p>
                    </div>
                ))}
            </section>
        ),
        [Section.SKILLS]: (
            <section key={Section.SKILLS}>
                <SectionHeader title="Skills" />
                <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map(skill => <span key={skill} className={`bg-slate-700 text-${accent}-300 text-xs font-medium px-3 py-1 rounded-full`}>{skill}</span>)}
                </div>
            </section>
        ),
        [Section.PROFILES]: (
            <section key={Section.PROFILES}>
                <SectionHeader title="Profiles" />
                 {profiles.map(p => <a key={p} href={ensureHttps(p)} target="_blank" rel="noopener noreferrer" className={`hover:text-${accent}-300 block truncate`}>{p}</a>)}
            </section>
        ),
        [Section.CERTIFICATIONS]: (
            <section key={Section.CERTIFICATIONS}>
                <SectionHeader title="Certifications" />
                {certifications.map(c => <p key={c.id} className="mt-1 text-slate-100">{c.name}</p>)}
            </section>
        ),
        [Section.LANGUAGES]: (
            <section key={Section.LANGUAGES}>
                <SectionHeader title="Languages" />
                {languages.map(l => <p key={l.id} className="mt-1 text-slate-100">{l.name} ({l.level})</p>)}
            </section>
        ),
    };

    return (
        <div className={`bg-slate-900 font-sans text-slate-300 h-full p-10 overflow-y-auto border-4 border-${accent}-500/20`}>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-5xl font-bold text-white">{personalInfo.name}</h1>
                    <div className="mt-2 flex gap-4 text-sm text-slate-400">
                        <span>{personalInfo.phone}</span>
                        <span>{personalInfo.email}</span>
                        <a href={ensureHttps(personalInfo.linkedin)} className={`hover:text-${accent}-400`}>LinkedIn</a>
                    </div>
                </div>
                 <div className={`w-24 h-24 rounded-full bg-slate-800 flex-shrink-0 overflow-hidden border-2 border-${accent}-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.4)]`}>
                     {personalInfo.image ? (
                        <img src={personalInfo.image} alt={personalInfo.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className={`w-16 h-16 text-${accent}-500/70`} />
                    )}
                </div>
            </header>
            <main className="space-y-6">
                 <section>
                    <SectionHeader title="Summary" />
                    <p className="mt-2 text-slate-300 leading-relaxed">{personalInfo.summary}</p>
                </section>
                {sectionOrder.map(section => Sections[section as keyof typeof Sections])}
            </main>
        </div>
    );
};


// --- END NEW TEMPLATES ---


const ResumeContainer = React.forwardRef<HTMLDivElement, { resume: Resume, template: Template }>(({ resume, template }, ref) => {
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
            default: return <CrafterTemplate resume={resume} />;
        }
    };

    return (
        <div 
            id="resume-preview" 
            ref={ref} 
            className="bg-white shadow-2xl dark:shadow-slate-900/50 overflow-hidden"
            style={{ width: '210mm', height: '297mm' }}
        >
           {renderTemplate()}
        </div>
    );
});


const Preview: React.FC<PreviewProps> = ({ resume, template }) => {
    const resumeContainerRef = useRef<HTMLDivElement>(null);
    const previewPaneRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(1.0);
    const fitScaleRef = useRef(1.0);
    const isInitialMount = useRef(true);

    const handleDownload = () => {
        const element = resumeContainerRef.current;
        if (!element) return;
        
        const opt = {
          margin: 0,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 4, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        html2pdf().from(element).set(opt).save();
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

            const padding = 64; // p-8
            const availableWidth = previewPane.clientWidth - padding;
            const availableHeight = previewPane.clientHeight - padding;
            
            // A4 dimensions in pixels at 96 DPI (common for web)
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
        <aside className="h-full bg-transparent p-8 flex flex-col">
             <div className="flex-shrink-0 flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-500 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">Preview</h2>
                 <div className="p-px rounded-full bg-gradient-to-r from-slate-300/50 via-slate-400/50 to-slate-300/50 dark:from-slate-600/80 dark:to-slate-700/80">
                    <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full shadow-lg p-1.5">
                        <button onClick={handleZoomOut} title="Zoom Out" className="p-2.5 w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-gradient-to-br hover:from-emerald-100 hover:to-green-100 dark:hover:from-slate-700 dark:hover:to-slate-600 rounded-full transition-all">
                            <MagnifyingGlassMinusIcon className="h-5 w-5" />
                        </button>
                        <button onClick={handleResetZoom} className="px-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 rounded-full transition-all">
                            {Math.round(zoom * 100)}%
                        </button>
                        <button onClick={handleZoomIn} title="Zoom In" className="p-2.5 w-10 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-gradient-to-br hover:from-emerald-100 hover:to-green-100 dark:hover:from-slate-700 dark:hover:to-slate-600 rounded-full transition-all">
                            <MagnifyingGlassPlusIcon className="h-5 w-5" />
                        </button>
                        <div className="w-px h-6 bg-slate-300 dark:bg-slate-600 mx-1"></div>
                        <button 
                            onClick={handleDownload}
                            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-slate-900 focus:ring-green-500 transform hover:-translate-y-0.5 transition-all duration-300"
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
                    className="origin-top my-4 transition-transform duration-200"
                    style={{ transform: `scale(${zoom})` }}
                >
                    <ResumeContainer ref={resumeContainerRef} resume={resume} template={template} />
                </div>
            </div>
        </aside>
    );
};

export default Preview;