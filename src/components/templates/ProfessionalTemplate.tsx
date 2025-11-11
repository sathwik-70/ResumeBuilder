import { ResumeData } from '../../types'

interface ProfessionalTemplateProps {
  data: ResumeData
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalInfo, education, experience, skills, certifications, projects, languages, achievements, interests } = data

  return (
    <div className="font-sans text-gray-900 leading-relaxed">
      {/* Header */}
      <header className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600 mb-3 max-w-2xl mx-auto">{personalInfo.summary}</p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center">
            <span className="font-semibold mr-2">Email:</span>
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Phone:</span>
            <span>{personalInfo.phone}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Location:</span>
            <span>{personalInfo.city}, {personalInfo.state}</span>
          </div>
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <span className="font-semibold mr-2">LinkedIn:</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{exp.position}</h3>
                  <span className="text-sm text-gray-600 font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <p className="text-gray-700 font-semibold mb-1">{exp.company}</p>
                <p className="text-sm text-gray-600 mb-2 italic">{exp.location}</p>
                <p className="text-gray-700 mb-2">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
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
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{edu.degree} in {edu.field}</h3>
                  <span className="text-sm text-gray-600 font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
                <p className="text-gray-700 font-semibold mb-1">{edu.institution}</p>
                <p className="text-sm text-gray-600 mb-2 italic">{edu.location}</p>
                {edu.gpa && <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-gray-600 capitalize">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <span className="text-sm text-gray-600 font-medium">{project.startDate} - {project.endDate}</span>
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

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{cert.name}</p>
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
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Languages
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between items-center">
                <span className="font-medium">{lang.name}</span>
                <span className="text-sm text-gray-600 capitalize">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Achievements
          </h2>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="mb-3">
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{achievement.date}</p>
                <p className="text-gray-700">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
            Interests
          </h2>
          <div className="space-y-2">
            {interests.map((interest) => (
              <div key={interest.id}>
                <p className="font-medium">{interest.name}</p>
                <p className="text-sm text-gray-600">{interest.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
} 