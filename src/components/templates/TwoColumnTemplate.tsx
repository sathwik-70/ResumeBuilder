import { ResumeData } from '../../types'

interface TwoColumnTemplateProps {
  data: ResumeData
}

export default function TwoColumnTemplate({ data }: TwoColumnTemplateProps) {
  const { personalInfo, education, experience, skills, certifications, projects, languages, achievements, interests } = data

  return (
    <div className="font-sans text-gray-900 leading-relaxed">
      {/* Header */}
      <header className="text-center border-b-2 border-primary-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-3 max-w-2xl mx-auto">{personalInfo.summary}</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.city}, {personalInfo.state}</span>
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary-600 mb-4 border-b-2 border-primary-200 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-primary-300 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <span className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="text-primary-600 font-medium mb-1">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2 italic">{exp.location}</p>
                    <p className="text-gray-700 mb-2">{exp.description}</p>
                    {exp.achievements.length > 0 && (
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary-600 mb-4 border-b-2 border-primary-200 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border-l-4 border-primary-300 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{edu.degree} in {edu.field}</h3>
                      <span className="text-sm text-gray-600">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="text-primary-600 font-medium mb-1">{edu.institution}</p>
                    <p className="text-sm text-gray-600 mb-2 italic">{edu.location}</p>
                    {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-primary-600 mb-4 border-b-2 border-primary-200 pb-2">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border-l-4 border-primary-300 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <span className="text-sm text-gray-600">{project.startDate} - {project.endDate}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-primary-600 mb-3 border-b border-primary-200 pb-1">
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-xs text-gray-600 capitalize">{skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-primary-600 mb-3 border-b border-primary-200 pb-1">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="font-semibold text-sm">{cert.name}</p>
                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                    <p className="text-xs text-gray-600">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-primary-600 mb-3 border-b border-primary-200 pb-1">
                Languages
              </h2>
              <div className="space-y-2">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-xs text-gray-600 capitalize">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-primary-600 mb-3 border-b border-primary-200 pb-1">
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id}>
                    <h3 className="font-semibold text-sm">{achievement.title}</h3>
                    <p className="text-xs text-gray-600 mb-1">{achievement.date}</p>
                    <p className="text-xs text-gray-700">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-primary-600 mb-3 border-b border-primary-200 pb-1">
                Interests
              </h2>
              <div className="space-y-2">
                {interests.map((interest) => (
                  <div key={interest.id}>
                    <p className="font-medium text-sm">{interest.name}</p>
                    <p className="text-xs text-gray-600">{interest.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
} 