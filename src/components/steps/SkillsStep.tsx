import React, { useState } from 'react'
import { useResume } from '../../context/ResumeContext'
import { Skill } from '../../types'
import { Plus, Trash2 } from 'lucide-react'

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Databases',
  'Cloud & DevOps',
  'Design & Creative',
  'Project Management',
  'Soft Skills',
  'Other'
]

const proficiencyLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' }
]

export default function SkillsStep() {
  const { state, updateResumeData } = useResume()
  const [newSkill, setNewSkill] = useState({ name: '', category: '', level: 'intermediate' as const })

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        category: newSkill.category || 'Other',
        level: newSkill.level
      }
      updateResumeData({ skills: [...state.data.skills, skill] })
      setNewSkill({ name: '', category: '', level: 'intermediate' })
    }
  }

  const removeSkill = (id: string) => {
    const filteredSkills = state.data.skills.filter(skill => skill.id !== id)
    updateResumeData({ skills: filteredSkills })
  }

  const groupedSkills = state.data.skills.reduce((acc, skill) => {
    const category = skill.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Skills
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add your technical and soft skills with proficiency levels. Group them by categories for better organization.
        </p>
      </div>

      {/* Add New Skill */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Add New Skill
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="form-label">Skill Name *</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              onKeyPress={handleKeyPress}
              className="form-input"
              placeholder="e.g., React, Project Management"
            />
          </div>

          <div>
            <label className="form-label">Category</label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="form-input"
            >
              <option value="">Select Category</option>
              {skillCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Proficiency Level</label>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as any })}
              className="form-input"
            >
              {proficiencyLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={addSkill}
          disabled={!newSkill.name.trim()}
          className="flex items-center space-x-2 btn-primary"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Skills List */}
      <div className="space-y-6">
        {Object.keys(groupedSkills).length > 0 ? (
          Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{skill.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{skill.level}</p>
                    </div>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="text-red-500 hover:text-red-700 p-1 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No skills added yet. Start by adding your first skill above.
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Skill Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Include both technical and soft skills relevant to your target role</li>
          <li>• Be honest about your proficiency level</li>
          <li>• Group related skills together for better organization</li>
          <li>• Focus on skills that match the job requirements</li>
        </ul>
      </div>
    </div>
  )
} 