import { ResumeData } from '../../types'

interface ExecutiveTemplateProps {
  data: ResumeData
}

export default function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  const { personalInfo, education, experience, skills, certifications, projects, languages, achievements, interests } = data

  return (
    <div className="font-serif text-gray-900 leading-relaxed">
      {/* Header */}
      <header className="border-b-4 border-gray-800 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-xl text-gray-700 mb-4 leading-relaxed max-w-3xl">{personalInfo.summary}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="font-semibold w-20">Email:</span>
              <span className="text-gray-700">{personalInfo.email}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold w-20">Phone:</span>
              <span className="text-gray-700">{personalInfo.phone}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <span className="font-semibold w-20">Location:</span>
              <span className="text-gray-700">{personalInfo.city}, {personalInfo.state}</span>
            </div>
            {personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="font-semibold w-20">LinkedIn:</span>
                <span className="text-gray-700">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
            Executive Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600 font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-lg text-gray-700 font-semibold mb-2">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-3 italic">{exp.location}</p>
                <p className="text-gray-700 mb-3 leading-relaxed">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="leading-relaxed">{achievement}</li>
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
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-l-4 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                  <span className="text-sm text-gray-600 font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-lg text-gray-700 font-semibold mb-1">{edu.institution}</p>
                <p className="text-sm text-gray-600 mb-2 italic">{edu.location}</p>
                {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center">
                <span className="font-semibold text-lg">{skill.name}</span>
                <span className="text-sm text-gray-600 capitalize font-medium">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
            Key Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="border-l-4 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{project.name}</h3>
                  <span className="text-sm text-gray-600 font-medium">{project.startDate} - {project.endDate}</span>
                </div>
                <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Technologies:</span> {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
            Professional Certifications
          </h2>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg">{cert.name}</p>
                  <p className="text-sm text-gray-600">{cert.issuer}</p>
                </div>
                <span className="text-sm text-gray-600">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between items-center">
                <span className="font-semibold text-lg">{lang.name}</span>
                <span className="text-sm text-gray-600 capitalize font-medium">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
            Notable Achievements
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="border-l-4 border-gray-300 pl-6">
                <h3 className="font-semibold text-lg">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{achievement.date}</p>
                <p className="text-gray-700 leading-relaxed">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wider border-b-2 border-gray-300 pb-2">
            Professional Interests
          </h2>
          <div className="space-y-3">
            {interests.map((interest) => (
              <div key={interest.id}>
                <p className="font-semibold text-lg">{interest.name}</p>
                <p className="text-sm text-gray-600">{interest.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
} 