import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { StepType } from '../types'
import StepIndicator from './StepIndicator'
import PersonalInfoStep from './steps/PersonalInfoStep'
import EducationStep from './steps/EducationStep'
import ExperienceStep from './steps/ExperienceStep'
import SkillsStep from './steps/SkillsStep'
import CertificationsStep from './steps/CertificationsStep'
import ProjectsStep from './steps/ProjectsStep'
import LanguagesStep from './steps/LanguagesStep'
import AchievementsStep from './steps/AchievementsStep'
import InterestsStep from './steps/InterestsStep'
import TemplateStep from './steps/TemplateStep'
import ResumePreview from './ResumePreview'
import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { exportToPDF } from '../utils/pdfExport'

const steps: { key: StepType; label: string; description: string }[] = [
  { key: 'personal', label: 'Personal Info', description: 'Basic information' },
  { key: 'education', label: 'Education', description: 'Academic background' },
  { key: 'experience', label: 'Experience', description: 'Work history' },
  { key: 'skills', label: 'Skills', description: 'Technical & soft skills' },
  { key: 'certifications', label: 'Certifications', description: 'Professional certifications' },
  { key: 'projects', label: 'Projects', description: 'Portfolio projects' },
  { key: 'languages', label: 'Languages', description: 'Language proficiency' },
  { key: 'achievements', label: 'Achievements', description: 'Awards & recognition' },
  { key: 'interests', label: 'Interests', description: 'Personal interests' },
  { key: 'template', label: 'Template', description: 'Choose design' }
]

export default function ResumeBuilder() {
  const { state, goToStep, completeStep } = useResume()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const currentStepIndex = steps.findIndex(step => step.key === state.currentStep)
  const canGoNext = currentStepIndex < steps.length - 1
  const canGoPrev = currentStepIndex > 0

  const handleNext = () => {
    if (canGoNext) {
      completeStep(state.currentStep)
      goToStep(steps[currentStepIndex + 1].key)
    }
  }

  const handlePrev = () => {
    if (canGoPrev) {
      goToStep(steps[currentStepIndex - 1].key)
    }
  }

  const handleStepClick = (stepKey: StepType) => {
    goToStep(stepKey)
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    try {
      const filename = `${state.data.personalInfo.firstName}_${state.data.personalInfo.lastName}_Resume.pdf`
      await exportToPDF('resume-preview', filename)
      toast.success('PDF downloaded successfully!')
    } catch (error) {
      toast.error('Failed to generate PDF')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 'personal':
        return <PersonalInfoStep />
      case 'education':
        return <EducationStep />
      case 'experience':
        return <ExperienceStep />
      case 'skills':
        return <SkillsStep />
      case 'certifications':
        return <CertificationsStep />
      case 'projects':
        return <ProjectsStep />
      case 'languages':
        return <LanguagesStep />
      case 'achievements':
        return <AchievementsStep />
      case 'interests':
        return <InterestsStep />
      case 'template':
        return <TemplateStep />
      default:
        return <PersonalInfoStep />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex]?.label}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Steps */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
              <StepIndicator
                steps={steps}
                currentStep={state.currentStep}
                completedSteps={state.completedSteps}
                onStepClick={handleStepClick}
              />
            </div>
          </div>

          {/* Center - Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              {renderStepContent()}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>
                
                <div className="flex space-x-2">
                  {state.currentStep === 'template' && (
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPDF}
                      className="flex items-center space-x-2 btn-primary"
                    >
                      <Download className="h-4 w-4" />
                      <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
                    </button>
                  )}
                  
                  {canGoNext && (
                    <button
                      onClick={handleNext}
                      className="flex items-center space-x-2 btn-primary"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Preview
              </h3>
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 