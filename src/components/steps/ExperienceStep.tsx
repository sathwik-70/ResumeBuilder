import { useResume } from '../../context/ResumeContext'
import { Experience } from '../../types'
import { Plus, Trash2, X } from 'lucide-react'

export default function ExperienceStep() {
  const { state, updateResumeData } = useResume()

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      achievements: []
    }
    updateResumeData({ experience: [...state.data.experience, newExperience] })
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    const updatedExperience = state.data.experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    )
    updateResumeData({ experience: updatedExperience })
  }

  const removeExperience = (id: string) => {
    const filteredExperience = state.data.experience.filter(exp => exp.id !== id)
    updateResumeData({ experience: filteredExperience })
  }

  const addAchievement = (experienceId: string) => {
    const updatedExperience = state.data.experience.map(exp =>
      exp.id === experienceId 
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    )
    updateResumeData({ experience: updatedExperience })
  }

  const updateAchievement = (experienceId: string, index: number, value: string) => {
    const updatedExperience = state.data.experience.map(exp => {
      if (exp.id === experienceId) {
        const newAchievements = [...exp.achievements]
        newAchievements[index] = value
        return { ...exp, achievements: newAchievements }
      }
      return exp
    })
    updateResumeData({ experience: updatedExperience })
  }

  const removeAchievement = (experienceId: string, index: number) => {
    const updatedExperience = state.data.experience.map(exp => {
      if (exp.id === experienceId) {
        const newAchievements = exp.achievements.filter((_, i) => i !== index)
        return { ...exp, achievements: newAchievements }
      }
      return exp
    })
    updateResumeData({ experience: updatedExperience })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Work Experience
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add your work experience, starting with the most recent position. Include your achievements and responsibilities.
        </p>
      </div>

      <div className="space-y-6">
        {state.data.experience.map((experience) => (
          <div key={experience.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {experience.position || 'New Experience Entry'}
              </h3>
              <button
                onClick={() => removeExperience(experience.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Position *</label>
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  className="form-input"
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <label className="form-label">Company *</label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  className="form-input"
                  placeholder="Tech Company Inc."
                />
              </div>

              <div>
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  className="form-input"
                  placeholder="San Francisco, CA"
                />
              </div>

              <div>
                <label className="form-label">Start Date</label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">End Date</label>
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label">Job Description</label>
              <textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                rows={3}
                className="form-input"
                placeholder="Describe your role, responsibilities, and key contributions..."
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="form-label">Key Achievements</label>
                <button
                  onClick={() => addAchievement(experience.id)}
                  className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Achievement</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {experience.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => updateAchievement(experience.id, index, e.target.value)}
                      className="form-input flex-1"
                      placeholder="e.g., Increased team productivity by 25% through process optimization"
                    />
                    <button
                      onClick={() => removeAchievement(experience.id, index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addExperience}
          className="flex items-center space-x-2 btn-secondary w-full"
        >
          <Plus className="h-4 w-4" />
          <span>Add Work Experience</span>
        </button>
      </div>
    </div>
  )
} 