import { useResume } from '../../context/ResumeContext'
import { Achievement } from '../../types'
import { Plus, Trash2 } from 'lucide-react'

export default function AchievementsStep() {
  const { state, updateResumeData } = useResume()

  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: '',
      date: ''
    }
    updateResumeData({ achievements: [...state.data.achievements, newAchievement] })
  }

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    const updatedAchievements = state.data.achievements.map(achievement =>
      achievement.id === id ? { ...achievement, [field]: value } : achievement
    )
    updateResumeData({ achievements: updatedAchievements })
  }

  const removeAchievement = (id: string) => {
    const filteredAchievements = state.data.achievements.filter(achievement => achievement.id !== id)
    updateResumeData({ achievements: filteredAchievements })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Achievements
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Highlight your awards, recognitions, and notable accomplishments that demonstrate your capabilities and success.
        </p>
      </div>

      <div className="space-y-6">
        {state.data.achievements.map((achievement) => (
          <div key={achievement.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {achievement.title || 'New Achievement'}
              </h3>
              <button
                onClick={() => removeAchievement(achievement.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Achievement Title *</label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => updateAchievement(achievement.id, 'title', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Employee of the Year, Best Project Award"
                />
              </div>

              <div>
                <label className="form-label">Date</label>
                <input
                  type="month"
                  value={achievement.date}
                  onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label">Description *</label>
              <textarea
                value={achievement.description}
                onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
                rows={3}
                className="form-input"
                placeholder="Describe the achievement, criteria, impact, and what it demonstrates about your capabilities..."
              />
            </div>
          </div>
        ))}

        <button
          onClick={addAchievement}
          className="flex items-center space-x-2 btn-secondary w-full"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Achievement Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Include awards, recognitions, and notable accomplishments</li>
          <li>• Quantify achievements when possible (e.g., "Top 5% of sales team")</li>
          <li>• Focus on achievements relevant to your target role</li>
          <li>• Include both professional and academic achievements if relevant</li>
        </ul>
      </div>
    </div>
  )
} 