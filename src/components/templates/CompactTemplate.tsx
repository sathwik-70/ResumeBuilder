import { ResumeData } from '../../types'

interface CompactTemplateProps {
  data: ResumeData
}

export default function CompactTemplate({ data }: CompactTemplateProps) {
  const { personalInfo, education, experience, skills, certifications, projects, languages, achievements, interests } = data

  return (
    <div className="font-sans text-gray-900 leading-tight text-sm">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-400 pb-3 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1 uppercase tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-sm text-gray-600 mb-2 max-w-2xl mx-auto">{personalInfo.summary}</p>
        
        <div className="flex flex-wrap justify-center gap-4 text-xs">
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

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-base">{exp.position}</h3>
                  <span className="text-xs text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-gray-700 font-semibold mb-1">{exp.company}, {exp.location}</p>
                <p className="text-gray-700 mb-1">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-0.5 ml-3 text-xs">
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
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-base">{edu.degree} in {edu.field}</h3>
                  <span className="text-xs text-gray-600">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-gray-700 font-semibold">{edu.institution}, {edu.location}</p>
                {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center">
                <span className="font-medium">{skill.name}</span>
                <span className="text-xs text-gray-600 capitalize">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id} className="mb-2">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-base">{project.name}</h3>
                  <span className="text-xs text-gray-600">{project.startDate} - {project.endDate}</span>
                </div>
                <p className="text-gray-700 mb-1">{project.description}</p>
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">Tech:</span> {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-xs text-gray-600">{cert.issuer}</p>
                </div>
                <span className="text-xs text-gray-600">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Languages
          </h2>
          <div className="grid grid-cols-3 gap-2">
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
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Achievements
          </h2>
          <div className="space-y-1">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="mb-2">
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-xs text-gray-600 mb-1">{achievement.date}</p>
                <p className="text-gray-700">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Interests
          </h2>
          <div className="space-y-1">
            {interests.map((interest) => (
              <div key={interest.id}>
                <p className="font-medium">{interest.name}</p>
                <p className="text-xs text-gray-600">{interest.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
} 