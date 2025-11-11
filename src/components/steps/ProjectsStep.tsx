import { useResume } from '../../context/ResumeContext'
import { Project } from '../../types'
import { Plus, Trash2, X } from 'lucide-react'

export default function ProjectsStep() {
  const { state, updateResumeData } = useResume()

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      startDate: '',
      endDate: ''
    }
    updateResumeData({ projects: [...state.data.projects, newProject] })
  }

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    const updatedProjects = state.data.projects.map(project =>
      project.id === id ? { ...project, [field]: value } : project
    )
    updateResumeData({ projects: updatedProjects })
  }

  const removeProject = (id: string) => {
    const filteredProjects = state.data.projects.filter(project => project.id !== id)
    updateResumeData({ projects: filteredProjects })
  }

  const addTechnology = (projectId: string) => {
    const updatedProjects = state.data.projects.map(project =>
      project.id === projectId 
        ? { ...project, technologies: [...project.technologies, ''] }
        : project
    )
    updateResumeData({ projects: updatedProjects })
  }

  const updateTechnology = (projectId: string, index: number, value: string) => {
    const updatedProjects = state.data.projects.map(project => {
      if (project.id === projectId) {
        const newTechnologies = [...project.technologies]
        newTechnologies[index] = value
        return { ...project, technologies: newTechnologies }
      }
      return project
    })
    updateResumeData({ projects: updatedProjects })
  }

  const removeTechnology = (projectId: string, index: number) => {
    const updatedProjects = state.data.projects.map(project => {
      if (project.id === projectId) {
        const newTechnologies = project.technologies.filter((_, i) => i !== index)
        return { ...project, technologies: newTechnologies }
      }
      return project
    })
    updateResumeData({ projects: updatedProjects })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Projects
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Showcase your portfolio projects, personal work, and technical achievements. Include links to live demos or repositories.
        </p>
      </div>

      <div className="space-y-6">
        {state.data.projects.map((project) => (
          <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {project.name || 'New Project'}
              </h3>
              <button
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Project Name *</label>
                <input
                  type="text"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                  className="form-input"
                  placeholder="e.g., E-commerce Platform"
                />
              </div>

              <div>
                <label className="form-label">Project URL</label>
                <input
                  type="url"
                  value={project.url}
                  onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                  className="form-input"
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div>
                <label className="form-label">Start Date</label>
                <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">End Date</label>
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="form-label">Project Description *</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                rows={3}
                className="form-input"
                placeholder="Describe what the project does, your role, challenges solved, and key features..."
              />
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="form-label">Technologies Used</label>
                <button
                  onClick={() => addTechnology(project.id)}
                  className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Technology</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {project.technologies.map((technology, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={technology}
                      onChange={(e) => updateTechnology(project.id, index, e.target.value)}
                      className="form-input flex-1"
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                    <button
                      onClick={() => removeTechnology(project.id, index)}
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
          onClick={addProject}
          className="flex items-center space-x-2 btn-secondary w-full"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Project Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Include projects that demonstrate relevant skills for your target role</li>
          <li>• Provide links to live demos, GitHub repositories, or deployed versions</li>
          <li>• Highlight your specific contributions and technical challenges solved</li>
          <li>• Use action verbs and quantify results when possible</li>
        </ul>
      </div>
    </div>
  )
} 