import React, { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { Language } from '../../types'
import { Plus, Trash2 } from 'lucide-react'

const proficiencyLevels = [
  { value: 'basic', label: 'Basic' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'native', label: 'Native' }
]

export default function LanguagesStep() {
  const { state, updateResumeData } = useResume()
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'conversational' as const })

  const addLanguage = () => {
    if (newLanguage.name.trim()) {
      const language: Language = {
        id: Date.now().toString(),
        name: newLanguage.name.trim(),
        proficiency: newLanguage.proficiency
      }
      updateResumeData({ languages: [...state.data.languages, language] })
      setNewLanguage({ name: '', proficiency: 'conversational' })
    }
  }

  const removeLanguage = (id: string) => {
    const filteredLanguages = state.data.languages.filter(lang => lang.id !== id)
    updateResumeData({ languages: filteredLanguages })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addLanguage()
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Languages
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          List your language proficiencies and fluency levels. This can be valuable for international companies or roles requiring multilingual skills.
        </p>
      </div>

      {/* Add New Language */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add New Language
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="form-label">Language Name *</label>
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="e.g., Spanish, French, Mandarin"
            />
          </div>

          <div>
            <label className="form-label">Proficiency Level</label>
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value as any })}
              className="form-input"
            >
              {proficiencyLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={addLanguage}
          disabled={!newLanguage.name.trim()}
          className="flex items-center space-x-2 btn-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Add Language</span>
        </button>
      </div>

      {/* Languages List */}
      <div className="space-y-4">
        {state.data.languages.length > 0 ? (
          state.data.languages.map((language) => (
            <div key={language.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">{language.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{language.proficiency}</p>
              </div>
              <button
                onClick={() => removeLanguage(language.id)}
                className="text-red-500 hover:text-red-700 p-1 ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No languages added yet. Start by adding your first language above.
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Language Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Include languages that are relevant to your target role or company</li>
          <li>• Be honest about your proficiency level</li>
          <li>• List your native language first, followed by others</li>
          <li>• Consider including certifications if you have them (e.g., TOEFL, DELF)</li>
        </ul>
      </div>
    </div>
  )
} 