
import React from 'react';
import { Template } from '../types';

type TemplateSelectorProps = {
  template: Template;
  setTemplate: (template: Template) => void;
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
                activeTemplate === templateName ? 'shadow-2xl' : 'shadow-lg hover:shadow-xl'
            }`}
        >
            {activeTemplate === templateName && (
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            )}
            <div className="relative w-full h-48 rounded-xl bg-white dark:bg-slate-800 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-green-50 dark:group-hover:from-slate-800 dark:group-hover:to-emerald-900 overflow-hidden transition-all duration-300 group-hover:scale-105">
                {children}
            </div>
        </button>
        <p className={`mt-4 text-sm font-semibold transition-colors ${activeTemplate === templateName ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500' : 'text-slate-600 dark:text-slate-300'}`}>{templateName}</p>
    </div>
);

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ template, setTemplate }) => {
  return (
    <div className="h-full p-8 overflow-y-auto bg-transparent">
      <h2 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-6 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">Choose a Template</h2>
      <div className="rounded-2xl bg-gradient-to-br from-emerald-200 via-green-200 to-teal-200 dark:from-emerald-800/80 dark:via-green-800/80 dark:to-slate-900/80 p-px shadow-2xl">
        <div className="bg-white/80 dark:bg-slate-800/90 backdrop-blur-lg rounded-[15px] p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                <TemplateThumbnail templateName={Template.CRAFTER} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-gray-800 flex">
                        <div className="w-1/3 h-full bg-gray-100 p-2 space-y-2">
                             <div className="h-2 w-full bg-gray-400 rounded"></div>
                             <div className="h-1.5 w-5/6 bg-gray-400 rounded"></div>
                        </div>
                         <div className="w-2/3 h-full bg-white p-3 space-y-2">
                            <div className="h-4 w-1/2 bg-black rounded-sm"></div>
                            <div className="h-1 w-8 bg-black"></div>
                            <div className="h-2 w-1/2 bg-gray-500 rounded mt-4"></div>
                         </div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.ONYX} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 flex overflow-hidden">
                        <div className="w-1/3 h-full bg-gray-800 p-2 space-y-2">
                            <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                            <div className="h-1.5 w-full bg-sky-400 rounded"></div>
                            <div className="h-1.5 w-5/6 bg-sky-400 rounded"></div>
                        </div>
                        <div className="w-2/3 h-full p-3 space-y-2">
                            <div className="h-4 w-1/2 bg-gray-800 rounded-sm mb-1"></div>
                            <div className="w-8 h-0.5 bg-gray-800"></div>
                            <div className="h-2 w-1/2 bg-gray-500 rounded mt-4"></div>
                            <div className="h-1.5 w-full bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.MODERN} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 p-3 space-y-3">
                        <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
                        <div className="h-1.5 w-full bg-slate-400 rounded"></div>
                        <div className="h-2 w-1/2 bg-indigo-600 rounded mt-4"></div>
                        <div className="h-1.5 w-full bg-indigo-100 rounded"></div>
                        <div className="h-1.5 w-full bg-indigo-100 rounded"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.CLASSIC} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 p-3 space-y-2 font-serif">
                        <div className="h-4 w-2/3 bg-gray-800 rounded-sm mx-auto"></div>
                        <div className="h-px w-full bg-black my-3"></div>
                        <div className="h-2.5 w-1/3 bg-gray-800 rounded-sm"></div>
                        <div className="h-2 w-full bg-gray-300 rounded-sm mt-2"></div>
                        <div className="h-2 w-5/6 bg-gray-300 rounded-sm"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.EXECUTIVE} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 flex overflow-hidden font-serif">
                        <div className="w-2/3 p-3 space-y-2">
                            <div className="h-4 w-3/4 bg-slate-800 rounded-sm"></div>
                            <div className="h-2.5 w-1/3 bg-slate-700 rounded-sm mt-4"></div>
                            <div className="h-2 w-full bg-slate-300 rounded-sm"></div>
                        </div>
                        <div className="w-1/3 bg-slate-50 p-2 space-y-2">
                            <div className="h-2 w-1/2 bg-slate-600 rounded-sm"></div>
                            <div className="h-1.5 w-full bg-slate-300 rounded-sm"></div>
                        </div>
                    </div>
                </TemplateThumbnail>
                 <TemplateThumbnail templateName={Template.INFOGRAPHIC} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 p-3 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-teal-500"></div>
                            <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
                        </div>
                        <div className="h-2 w-1/3 bg-teal-600 rounded mt-2"></div>
                        <div className="flex gap-2">
                            <div className="w-1 h-full bg-teal-200 rounded-full"></div>
                            <div className="h-1.5 w-full bg-slate-300 rounded"></div>
                        </div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.MIDNIGHT} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-slate-900 border border-slate-700 p-3 space-y-3">
                        <div className="h-4 w-1/2 bg-cyan-400 rounded"></div>
                         <div className="h-2 w-1/4 bg-cyan-400 rounded mt-4"></div>
                        <div className="h-1.5 w-full bg-slate-600 rounded"></div>
                        <div className="h-1.5 w-5/6 bg-slate-600 rounded"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.COLORFUL} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 flex overflow-hidden">
                        <div className="w-1/3 h-full bg-gradient-to-br from-cyan-500 to-blue-700 p-2 space-y-2">
                            <div className="h-2 w-full bg-cyan-200 rounded"></div>
                            <div className="h-2 w-5/6 bg-cyan-200 rounded"></div>
                        </div>
                        <div className="w-2/3 h-full p-3 space-y-3">
                            <div className="h-3 w-3/4 bg-blue-800 rounded"></div>
                            <div className="h-2 w-full bg-gray-300 rounded"></div>
                            <div className="h-2 w-5/6 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.CREATIVE} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 p-3 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-200 to-purple-300 flex-shrink-0"></div>
                        <div className="space-y-3 w-full">
                            <div className="h-4 w-3/4 bg-fuchsia-700 rounded"></div>
                            <div className="h-2 w-full bg-gray-300 rounded"></div>
                            <div className="h-2 w-5/6 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.MONOCHROME} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 p-3 space-y-3">
                        <div className="h-5 w-2/3 bg-black rounded-sm"></div>
                        <div className="h-px w-full bg-gray-300 my-2"></div>
                        <div className="h-2.5 w-1/3 bg-gray-500 rounded-sm"></div>
                        <div className="h-2 w-full bg-gray-300 rounded-sm"></div>
                        <div className="h-2 w-5/6 bg-gray-300 rounded-sm"></div>
                    </div>
                </TemplateThumbnail>
                {/* New Templates */}
                <TemplateThumbnail templateName={Template.CORPORATE_BLUE} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 flex flex-col overflow-hidden">
                        <div className="w-full h-8 bg-blue-900"></div>
                        <div className="p-3 space-y-2 flex-grow">
                            <div className="h-3 w-1/3 bg-blue-800 rounded-sm"></div>
                            <div className="h-2 w-full bg-slate-300 rounded-sm"></div>
                            <div className="h-2 w-full bg-slate-300 rounded-sm"></div>
                        </div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.SLATE} activeTemplate={template} setTemplate={setTemplate}>
                     <div className="w-full h-full bg-slate-50 border border-slate-200 flex overflow-hidden">
                        <div className="w-1/3 h-full bg-slate-800 p-2 space-y-2">
                            <div className="h-3 w-3/4 bg-white rounded"></div>
                        </div>
                        <div className="w-2/3 p-3 space-y-2">
                            <div className="w-full h-4 border-l-4 border-slate-300 pl-2">
                                <div className="h-2 w-1/2 bg-slate-700 rounded-sm"></div>
                            </div>
                             <div className="w-full h-4 border-l-4 border-slate-300 pl-2">
                                <div className="h-2 w-3/4 bg-slate-700 rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.CAMBRIDGE} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-[#FBF9F4] border border-slate-200 p-3 font-serif">
                        <div className="h-4 w-1/2 bg-emerald-800 rounded-sm mx-auto"></div>
                        <div className="h-px w-full bg-gray-300 my-2"></div>
                        <div className="h-2 w-1/3 bg-emerald-800 rounded-sm"></div>
                        <div className="h-1.5 w-full bg-gray-300 rounded-sm mt-1"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.TECHIE} activeTemplate={template} setTemplate={setTemplate}>
                     <div className="w-full h-full bg-gray-900 border border-green-400/30 p-3 font-mono space-y-2">
                        <div className="h-3 w-1/2 bg-green-400 rounded-sm"></div>
                        <div className="h-2 w-1/4 bg-green-400 rounded-sm"></div>
                        <div className="h-1.5 w-full bg-gray-600 rounded-sm"></div>
                        <div className="h-1.5 w-5/6 bg-gray-600 rounded-sm"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.VANGUARD} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 flex overflow-hidden">
                        <div className="w-1/4 h-full bg-red-600"></div>
                        <div className="w-3/4 p-3 space-y-2">
                            <div className="h-2 w-full bg-gray-300"></div>
                            <div className="h-2 w-1/2 bg-red-600"></div>
                            <div className="h-3 w-1/3 bg-gray-800 mt-3"></div>
                        </div>
                    </div>
                </TemplateThumbnail>
                 <TemplateThumbnail templateName={Template.CRIMSON} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 p-3 space-y-2">
                        <div className="h-3 w-2/3 bg-gray-800 rounded-sm"></div>
                        <div className="h-1 w-full bg-red-700"></div>
                        <div className="h-2 w-1/2 bg-red-700 rounded-sm mt-3"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.MINIMAL} activeTemplate={template} setTemplate={setTemplate}>
                     <div className="w-full h-full bg-white border border-slate-200 p-6 space-y-4">
                        <div className="h-3 w-2/3 tracking-widest bg-gray-300 mx-auto"></div>
                        <div className="h-px w-1/4 bg-gray-200 mx-auto"></div>
                        <div className="h-2 w-1/3 bg-gray-500"></div>
                     </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.SPECTRUM} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 p-2">
                        <div className="h-6 w-full rounded-t-md bg-gradient-to-r from-pink-500 to-yellow-500"></div>
                        <div className="h-2 w-1/3 bg-pink-500 mt-3 ml-2"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.SUNRISE} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-orange-50 border border-slate-200 overflow-hidden">
                        <div className="h-10 w-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
                        <div className="h-2 w-1/3 bg-orange-700 mt-3 ml-2"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.OCEAN} activeTemplate={template} setTemplate={setTemplate}>
                     <div className="w-full h-full bg-white border border-slate-200 flex overflow-hidden">
                        <div className="w-1/3 h-full bg-blue-700"></div>
                        <div className="w-2/3 h-full relative">
                            <div className="absolute top-0 right-0 h-16 w-16 bg-blue-100 rounded-bl-full"></div>
                        </div>
                     </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.ARTISAN} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-[#FDFCFB] border border-gray-300 p-3 text-center">
                        <div className="h-4 w-1/2 bg-gray-400 mx-auto" style={{fontFamily: "'Brush Script MT', cursive"}}></div>
                        <div className="h-px w-full border-t-2 border-dashed border-gray-300 my-3"></div>
                    </div>
                </TemplateThumbnail>
                <TemplateThumbnail templateName={Template.TYPOGRAPHIC} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 p-3">
                        <div className="text-3xl font-black">NAME</div>
                        <div className="text-3xl font-black text-gray-300">SURNAME</div>
                    </div>
                </TemplateThumbnail>
                 <TemplateThumbnail templateName={Template.EMERALD} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-emerald-50 border border-slate-200 p-2 overflow-hidden">
                        <div className="h-10 bg-emerald-600 rounded-lg"></div>
                        <div className="h-2 w-1/3 bg-emerald-600 mt-3 ml-2"></div>
                    </div>
                </TemplateThumbnail>
                 <TemplateThumbnail templateName={Template.RUBY} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-white border border-slate-200 flex overflow-hidden">
                        <div className="w-1/3 h-full bg-red-800"></div>
                        <div className="w-2/3 p-3 space-y-2">
                            <div className="h-3 w-1/2 bg-red-800"></div>
                            <div className="h-2 w-full bg-gray-300"></div>
                        </div>
                     </div>
                </TemplateThumbnail>
                 <TemplateThumbnail templateName={Template.GOLDENROD} activeTemplate={template} setTemplate={setTemplate}>
                    <div className="w-full h-full bg-yellow-500 border border-slate-200 p-3 text-center">
                        <div className="h-8 w-2/3 bg-gray-900 text-white mx-auto flex items-center justify-center font-black">NAME</div>
                        <div className="h-10 bg-white/70 mt-3"></div>
                    </div>
                </TemplateThumbnail>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;