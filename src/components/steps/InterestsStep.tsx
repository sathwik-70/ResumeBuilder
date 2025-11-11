import { useResume } from '../../context/ResumeContext'
import { Interest } from '../../types'
import { Plus, Trash2 } from 'lucide-react'

export default function InterestsStep() {
  const { state, updateResumeData } = useResume()

  const addInterest = () => {
    const newInterest: Interest = {
      id: Date.now().toString(),
      name: '',
      description: ''
    }
    updateResumeData({ interests: [...state.data.interests, newInterest] })
  }

  const updateInterest = (id: string, field: keyof Interest, value: string) => {
    const updatedInterests = state.data.interests.map(interest =>
      interest.id === id ? { ...interest, [field]: value } : interest
    )
    updateResumeData({ interests: updatedInterests })
  }

  const removeInterest = (id: string) => {
    const filteredInterests = state.data.interests.filter(interest => interest.id !== id)
    updateResumeData({ interests: filteredInterests })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Interests
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add your personal interests and hobbies to show personality and potential conversation starters during interviews.
        </p>
      </div>

      <div className="space-y-6">
        {state.data.interests.map((interest) => (
          <div key={interest.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {interest.name || 'New Interest'}
              </h3>
              <button
                onClick={() => removeInterest(interest.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="form-label">Interest Name *</label>
                <input
                  type="text"
                  value={interest.name}
                  onChange={(e) => updateInterest(interest.id, 'name', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Photography, Hiking, Chess"
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  value={interest.description}
                  onChange={(e) => updateInterest(interest.id, 'description', e.target.value)}
                  rows={2}
                  className="form-input"
                  placeholder="Briefly describe your interest, any achievements, or how it relates to your professional development..."
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addInterest}
          className="flex items-center space-x-2 btn-secondary w-full"
        >
          <Plus className="h-4 w-4" />
          <span>Add Interest</span>
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Interest Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Include interests that show personality and potential conversation starters</li>
          <li>• Focus on interests that demonstrate relevant skills (e.g., problem-solving, creativity)</li>
          <li>• Keep descriptions brief and professional</li>
          <li>• Consider interests that align with company culture or values</li>
        </ul>
      </div>
    </div>
  )
} 