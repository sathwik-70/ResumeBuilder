import { useResume } from '../../context/ResumeContext'
import { Education } from '../../types'
import { Plus, Trash2 } from 'lucide-react'

export default function EducationStep() {
  const { state, updateResumeData } = useResume()

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      location: '',
      description: ''
    }
    updateResumeData({ education: [...state.data.education, newEducation] })
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    const updatedEducation = state.data.education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    )
    updateResumeData({ education: updatedEducation })
  }

  const removeEducation = (id: string) => {
    const filteredEducation = state.data.education.filter(edu => edu.id !== id)
    updateResumeData({ education: filteredEducation })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Education
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add your educational background, starting with the most recent.
        </p>
      </div>

      <div className="space-y-6">
        {state.data.education.map((education) => (
          <div key={education.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {education.institution || 'New Education Entry'}
              </h3>
              <button
                onClick={() => removeEducation(education.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Institution *</label>
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  className="form-input"
                  placeholder="University of Technology"
                />
              </div>

              <div>
                <label className="form-label">Degree *</label>
                <input
                  type="text"
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  className="form-input"
                  placeholder="Bachelor of Science"
                />
              </div>

              <div>
                <label className="form-label">Field of Study *</label>
                <input
                  type="text"
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                  className="form-input"
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                  className="form-input"
                  placeholder="New York, NY"
                />
              </div>

              <div>
                <label className="form-label">Start Date</label>
                <input
                  type="month"
                  value={education.startDate}
                  onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">End Date</label>
                <input
                  type="month"
                  value={education.endDate}
                  onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">GPA</label>
                <input
                  type="text"
                  value={education.gpa}
                  onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                  className="form-input"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label">Description</label>
              <textarea
                value={education.description}
                onChange={(e) => updateEducation(education.id, 'description', e.target.value)}
                rows={3}
                className="form-input"
                placeholder="Relevant coursework, honors, activities..."
              />
            </div>
          </div>
        ))}

        <button
          onClick={addEducation}
          className="flex items-center space-x-2 btn-secondary w-full"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>
    </div>
  )
} 