
import React, { useState, useRef } from 'react';
import { Resume, Section, PersonalInfo, Experience, Education, Project, ListSectionKey, Certification, Language } from '../types';
import { enhanceWithAI } from '../services/geminiService';
import { SparklesIcon, PlusCircleIcon, TrashIcon, UserIcon } from './ui/Icons';

type EditorProps = {
  activeSection: Section;
  resume: Resume;
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
  addListItem: <T extends { id: string }>(section: ListSectionKey, newItem: T) => void;
  updateListItem: <T extends { id: string }>(section: ListSectionKey, updatedItem: T) => void;
  removeListItem: (section: ListSectionKey, id: string) => void;
  updateSkills: (skills: string[]) => void;
  updateProfiles: (profiles: string[]) => void;
  setResume: React.Dispatch<React.SetStateAction<Resume>>; // For AI update
};

const Editor: React.FC<EditorProps> = (props) => {
  const { activeSection } = props;

  const renderForm = () => {
    switch (activeSection) {
      case Section.PERSONAL_INFO: return <PersonalInfoForm {...props} />;
      case Section.EXPERIENCE: return <ExperienceForm {...props} />;
      case Section.EDUCATION: return <EducationForm {...props} />;
      case Section.SKILLS: return <SkillsForm {...props} />;
      case Section.PROJECTS: return <ProjectsForm {...props} />;
      case Section.PROFILES: return <ProfilesForm {...props} />;
      case Section.CERTIFICATIONS: return <CertificationsForm {...props} />;
      case Section.LANGUAGES: return <LanguagesForm {...props} />;
      default: return null;
    }
  };

  return (
    <div className="h-full p-8 overflow-y-auto bg-transparent">
      <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-6 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">{activeSection}</h2>
      <div className="rounded-2xl bg-gradient-to-br from-emerald-200 via-green-200 to-teal-200 dark:from-emerald-800/80 dark:via-green-800/80 dark:to-teal-900/80 p-px shadow-2xl">
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-lg rounded-[15px] p-8">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};

// --- Reusable Form Field Components ---

const InputField: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string, placeholder?: string, type?: string}> = ({label, name, ...rest}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
    <div className="p-px rounded-lg focus-within:bg-gradient-to-r focus-within:from-emerald-400 focus-within:to-green-400 transition-all duration-300 bg-transparent">
      <input type="text" id={name} name={name} {...rest} className="w-full px-4 py-2.5 bg-slate-100/80 dark:bg-slate-900/80 border border-transparent rounded-[7px] shadow-sm focus:outline-none focus:ring-0 sm:text-sm text-slate-900 dark:text-slate-200 transition-all duration-300" />
    </div>
  </div>
);

const TextareaField: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, name: string, placeholder?: string, rows?: number}> = ({label, name, ...rest}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
     <div className="p-px rounded-lg focus-within:bg-gradient-to-r focus-within:from-emerald-400 focus-within:to-green-400 transition-all duration-300 bg-transparent">
      <textarea id={name} name={name} {...rest} className="w-full px-4 py-2.5 bg-slate-100/80 dark:bg-slate-900/80 border border-transparent rounded-[7px] shadow-sm focus:outline-none focus:ring-0 sm:text-sm text-slate-900 dark:text-slate-200 transition-all duration-300" />
    </div>
  </div>
);


// --- Form Components ---

const PersonalInfoForm: React.FC<Pick<EditorProps, 'resume' | 'updatePersonalInfo'>> = ({ resume, updatePersonalInfo }) => {
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updatePersonalInfo('image', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEnhanceSummary = async () => {
        setIsLoading(true);
        try {
            const enhancedSummary = await enhanceWithAI(resume.personalInfo.summary, 'summary');
            updatePersonalInfo('summary', enhancedSummary);
        } catch (error) {
            console.error(error);
            alert((error as Error).message);
        }
        setIsLoading(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0 overflow-hidden flex items-center justify-center ring-4 ring-white/50 dark:ring-slate-800/50 shadow-lg">
                    {resume.personalInfo.image ? (
                        <img src={resume.personalInfo.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-16 h-16 text-slate-400 dark:text-slate-500" />
                    )}
                </div>
                <div className="flex-grow">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Profile Photo</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
                    <button onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 border-2 border-slate-300 dark:border-slate-600 text-sm font-semibold rounded-lg shadow-sm text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700 transition transform hover:-translate-y-0.5">
                        Upload Image
                    </button>
                    {resume.personalInfo.image && (
                         <button onClick={() => updatePersonalInfo('image', '')} className="ml-3 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 transition">
                            Remove
                        </button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="name" value={resume.personalInfo.name} onChange={e => updatePersonalInfo('name', e.target.value)} placeholder="Sathwik Pamu" />
                <InputField label="Email" name="email" type="email" value={resume.personalInfo.email} onChange={e => updatePersonalInfo('email', e.target.value)} placeholder="sathwikpamu@gmail.com" />
                <InputField label="Phone" name="phone" value={resume.personalInfo.phone} onChange={e => updatePersonalInfo('phone', e.target.value)} placeholder="+919676074942" />
                <InputField label="Location" name="location" value={resume.personalInfo.location} onChange={e => updatePersonalInfo('location', e.target.value)} placeholder="Karimnagar, India" />
                <div className="md:col-span-2">
                  <InputField label="Website" name="website" value={resume.personalInfo.website} onChange={e => updatePersonalInfo('website', e.target.value)} placeholder="your-portfolio.com" />
                </div>
                <div className="md:col-span-2">
                  <InputField label="LinkedIn" name="linkedin" value={resume.personalInfo.linkedin} onChange={e => updatePersonalInfo('linkedin', e.target.value)} placeholder="linkedin.com/in/your-profile" />
                </div>
            </div>
            <div className="space-y-4 pt-6 border-t border-slate-200/80 dark:border-slate-700/80">
                <TextareaField label="Professional Summary" name="summary" value={resume.personalInfo.summary} onChange={e => updatePersonalInfo('summary', e.target.value)} rows={8} placeholder="A passionate full-stack developer..." />
                <button onClick={handleEnhanceSummary} disabled={isLoading} className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-full shadow-lg shadow-green-500/30 text-green-900 bg-gradient-to-r from-emerald-400 to-green-300 hover:from-emerald-500 hover:to-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:from-slate-400 disabled:to-slate-500 disabled:shadow-none disabled:cursor-not-allowed disabled:text-white transition-all duration-300 transform hover:-translate-y-1">
                    <SparklesIcon className="h-5 w-5 mr-2" />
                    {isLoading ? 'Enhancing...' : 'Enhance with AI'}
                </button>
            </div>
        </div>
    );
};

const ExperienceForm: React.FC<Pick<EditorProps, 'resume' | 'addListItem' | 'updateListItem' | 'removeListItem' | 'setResume'>> = ({ resume, addListItem, updateListItem, removeListItem, setResume }) => {
  const handleAdd = () => addListItem('experience', { id: crypto.randomUUID(), title: '', company: '', location: '', startDate: '', endDate: '', description: [''] });
  const [loadingAi, setLoadingAi] = useState<[string, number] | null>(null);

  const handleDescriptionChange = (expId: string, index: number, value: string) => {
    const experience = resume.experience.find(e => e.id === expId);
    if (!experience) return;
    const newDescription = [...experience.description];
    newDescription[index] = value;
    updateListItem('experience', { ...experience, description: newDescription });
  };
  
  const handleAddBullet = (expId: string) => {
      const experience = resume.experience.find(e => e.id === expId);
      if (!experience) return;
      updateListItem('experience', { ...experience, description: [...experience.description, ''] });
  };

  const handleRemoveBullet = (expId: string, index: number) => {
    const experience = resume.experience.find(e => e.id === expId);
    if (!experience) return;
    const newDescription = experience.description.filter((_, i) => i !== index);
    updateListItem('experience', { ...experience, description: newDescription });
  };
  
  const handleEnhanceBullet = async (expId: string, index: number) => {
    const experience = resume.experience.find(e => e.id === expId);
    if (!experience) return;
    const text = experience.description[index];
    if (!text.trim()) return;

    setLoadingAi([expId, index]);
    try {
        const enhancedText = await enhanceWithAI(text, 'bulletPoint');
        handleDescriptionChange(expId, index, enhancedText);
    } catch (error) {
        console.error(error);
        alert((error as Error).message);
    }
    setLoadingAi(null);
  };

  return (
    <div className="space-y-6">
      {resume.experience.map(exp => (
        <div key={exp.id} className="rounded-xl bg-gradient-to-br from-indigo-200/80 to-purple-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-px shadow-md">
            <div className="p-5 bg-white/80 dark:bg-slate-800/90 rounded-[11px] space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Job Title" name={`title-${exp.id}`} value={exp.title} onChange={e => updateListItem('experience', { ...exp, title: e.target.value })} />
                <InputField label="Company" name={`company-${exp.id}`} value={exp.company} onChange={e => updateListItem('experience', { ...exp, company: e.target.value })} />
                <InputField label="Location" name={`location-${exp.id}`} value={exp.location} onChange={e => updateListItem('experience', { ...exp, location: e.target.value })} />
                <InputField label="Start Date" name={`startDate-${exp.id}`} value={exp.startDate} onChange={e => updateListItem('experience', { ...exp, startDate: e.target.value })} />
                <InputField label="End Date" name={`endDate-${exp.id}`} value={exp.endDate} onChange={e => updateListItem('experience', { ...exp, endDate: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                <div className="space-y-2">
                    {exp.description.map((desc, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <InputField label="" name={`desc-${exp.id}-${i}`} value={desc} onChange={e => handleDescriptionChange(exp.id, i, e.target.value)} placeholder="Bullet point" />
                            <button onClick={() => handleEnhanceBullet(exp.id, i)} disabled={!!loadingAi} title="Enhance with AI" className="p-2 rounded-full text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 disabled:text-slate-400 transition hover:bg-sky-100 dark:hover:bg-sky-900/50 flex-shrink-0">
                               {loadingAi && loadingAi[0] === exp.id && loadingAi[1] === i ? <div className="h-5 w-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div> : <SparklesIcon className="h-5 w-5" />}
                            </button>
                            <button onClick={() => handleRemoveBullet(exp.id, i)} className="p-2 rounded-full text-slate-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 flex-shrink-0"><TrashIcon className="h-5 w-5" /></button>
                        </div>
                    ))}
                </div>
                 <button onClick={() => handleAddBullet(exp.id)} className="mt-3 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold">+ Add bullet point</button>
              </div>
              <button onClick={() => removeListItem('experience', exp.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 text-sm font-medium">Remove Experience</button>
            </div>
        </div>
      ))}
      <button onClick={handleAdd} className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-full shadow-lg text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transform hover:-translate-y-1 transition-all duration-300">
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        Add Experience
      </button>
    </div>
  );
};

const EducationForm: React.FC<Pick<EditorProps, 'resume' | 'addListItem' | 'updateListItem' | 'removeListItem'>> = ({ resume, addListItem, updateListItem, removeListItem }) => {
    const handleAdd = () => addListItem('education', { id: crypto.randomUUID(), degree: '', school: '', location: '', gradDate: '' });
    return (
      <div className="space-y-6">
        {resume.education.map(edu => (
          <div key={edu.id} className="rounded-xl bg-gradient-to-br from-indigo-200/80 to-purple-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-px shadow-md">
            <div className="p-5 bg-white/80 dark:bg-slate-800/90 rounded-[11px] space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Degree" name={`degree-${edu.id}`} value={edu.degree} onChange={e => updateListItem('education', { ...edu, degree: e.target.value })} />
                  <InputField label="School" name={`school-${edu.id}`} value={edu.school} onChange={e => updateListItem('education', { ...edu, school: e.target.value })} />
                  <InputField label="Location" name={`location-${edu.id}`} value={edu.location} onChange={e => updateListItem('education', { ...edu, location: e.target.value })} />
                  <InputField label="Graduation Date" name={`gradDate-${edu.id}`} value={edu.gradDate} onChange={e => updateListItem('education', { ...edu, gradDate: e.target.value })} />
                </div>
                <button onClick={() => removeListItem('education', edu.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 text-sm font-medium">Remove Education</button>
            </div>
          </div>
        ))}
        <button onClick={handleAdd} className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-full shadow-lg text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transform hover:-translate-y-1 transition-all duration-300">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Add Education
        </button>
      </div>
    );
};

const ProjectsForm: React.FC<Pick<EditorProps, 'resume' | 'addListItem' | 'updateListItem' | 'removeListItem'>> = ({ resume, addListItem, updateListItem, removeListItem }) => {
    const handleAdd = () => addListItem('projects', { id: crypto.randomUUID(), name: '', description: '', tech: '', link: '' });
    return (
      <div className="space-y-6">
        {resume.projects.map(proj => (
          <div key={proj.id} className="rounded-xl bg-gradient-to-br from-indigo-200/80 to-purple-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-px shadow-md">
             <div className="p-5 bg-white/80 dark:bg-slate-800/90 rounded-[11px] space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <InputField label="Project Name" name={`name-${proj.id}`} value={proj.name} onChange={e => updateListItem('projects', { ...proj, name: e.target.value })} />
                  <InputField label="Link" name={`link-${proj.id}`} value={proj.link} onChange={e => updateListItem('projects', { ...proj, link: e.target.value })} />
                  <InputField label="Tech Stack" name={`tech-${proj.id}`} value={proj.tech} onChange={e => updateListItem('projects', { ...proj, tech: e.target.value })} placeholder="e.g., React, TypeScript, Firebase" />
                  <TextareaField label="Description" name={`description-${proj.id}`} value={proj.description} onChange={e => updateListItem('projects', { ...proj, description: e.target.value })} rows={3}/>
                </div>
                <button onClick={() => removeListItem('projects', proj.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 text-sm font-medium">Remove Project</button>
            </div>
          </div>
        ))}
        <button onClick={handleAdd} className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-full shadow-lg text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transform hover:-translate-y-1 transition-all duration-300">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Add Project
        </button>
      </div>
    );
};

const SkillsForm: React.FC<Pick<EditorProps, 'resume' | 'updateSkills'>> = ({ resume, updateSkills }) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const skillsArray = e.target.value.split('\n').filter(s => s.trim() !== '');
        updateSkills(skillsArray);
    };
    return <TextareaField label="Skills" name="skills" value={resume.skills.join('\n')} onChange={handleChange} rows={8} placeholder="Enter one skill per line" />;
};

const ProfilesForm: React.FC<Pick<EditorProps, 'resume' | 'updateProfiles'>> = ({ resume, updateProfiles }) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const profilesArray = e.target.value.split('\n').filter(p => p.trim() !== '');
        updateProfiles(profilesArray);
    };
    return <TextareaField label="Websites & Profiles" name="profiles" value={resume.profiles.join('\n')} onChange={handleChange} rows={6} placeholder="Enter one URL per line" />;
};

const CertificationsForm: React.FC<Pick<EditorProps, 'resume' | 'addListItem' | 'updateListItem' | 'removeListItem'>> = ({ resume, addListItem, updateListItem, removeListItem }) => {
    const handleAdd = () => addListItem('certifications', { id: crypto.randomUUID(), name: '', issuer: '' });
    return (
      <div className="space-y-6">
        {resume.certifications.map(cert => (
          <div key={cert.id} className="rounded-xl bg-gradient-to-br from-indigo-200/80 to-purple-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-px shadow-md">
            <div className="p-5 bg-white/80 dark:bg-slate-800/90 rounded-[11px] space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Certification Name" name={`name-${cert.id}`} value={cert.name} onChange={e => updateListItem('certifications', { ...cert, name: e.target.value })} />
                  <InputField label="Issuer" name={`issuer-${cert.id}`} value={cert.issuer} onChange={e => updateListItem('certifications', { ...cert, issuer: e.target.value })} />
                </div>
                <button onClick={() => removeListItem('certifications', cert.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 text-sm font-medium">Remove Certification</button>
            </div>
          </div>
        ))}
        <button onClick={handleAdd} className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-full shadow-lg text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transform hover:-translate-y-1 transition-all duration-300">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Add Certification
        </button>
      </div>
    );
};

const LanguagesForm: React.FC<Pick<EditorProps, 'resume' | 'addListItem' | 'updateListItem' | 'removeListItem'>> = ({ resume, addListItem, updateListItem, removeListItem }) => {
    const handleAdd = () => addListItem('languages', { id: crypto.randomUUID(), name: '', level: '', proficiency: 3 });
    return (
      <div className="space-y-6">
        {resume.languages.map(lang => (
          <div key={lang.id} className="rounded-xl bg-gradient-to-br from-indigo-200/80 to-purple-200/80 dark:from-slate-700/80 dark:to-slate-800/80 p-px shadow-md">
             <div className="p-5 bg-white/80 dark:bg-slate-800/90 rounded-[11px] space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField label="Language" name={`name-${lang.id}`} value={lang.name} onChange={e => updateListItem('languages', { ...lang, name: e.target.value })} />
                  <InputField label="Level" name={`level-${lang.id}`} value={lang.level} onChange={e => updateListItem('languages', { ...lang, level: e.target.value })} placeholder="e.g. Native, Fluent, C1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Proficiency</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    value={lang.proficiency} 
                    onChange={e => updateListItem('languages', { ...lang, proficiency: parseInt(e.target.value) })}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-emerald-500 [&::-webkit-slider-thumb]:to-green-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-emerald-500 [&::-moz-range-thumb]:to-green-500"
                  />
                </div>
                <button onClick={() => removeListItem('languages', lang.id)} className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 text-sm font-medium">Remove Language</button>
            </div>
          </div>
        ))}
        <button onClick={handleAdd} className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-bold rounded-full shadow-lg text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transform hover:-translate-y-1 transition-all duration-300">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Add Language
        </button>
      </div>
    );
};


export default Editor;