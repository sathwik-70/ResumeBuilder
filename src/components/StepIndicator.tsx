import { Check } from 'lucide-react'
import { StepType } from '../types'

interface StepIndicatorProps {
  steps: { key: StepType; label: string; description: string }[]
  currentStep: StepType
  completedSteps: StepType[]
  onStepClick: (step: StepType) => void
}

export default function StepIndicator({ steps, currentStep, completedSteps, onStepClick }: StepIndicatorProps) {
  const getStepStatus = (stepKey: StepType) => {
    if (completedSteps.includes(stepKey)) return 'completed'
    if (stepKey === currentStep) return 'active'
    return 'pending'
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Progress
      </h3>
      
      <nav className="space-y-2">
        {steps.map((step, index) => {
          const status = getStepStatus(step.key)
          const isClickable = status === 'completed' || status === 'active'
          
          return (
            <button
              key={step.key}
              onClick={() => isClickable && onStepClick(step.key)}
              disabled={!isClickable}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                status === 'active'
                  ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700'
                  : status === 'completed'
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/30'
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`step-indicator ${
                  status === 'active' ? 'step-active' :
                  status === 'completed' ? 'step-completed' : 'step-pending'
                }`}>
                  {status === 'completed' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    status === 'active' ? 'text-primary-900 dark:text-primary-100' :
                    status === 'completed' ? 'text-green-900 dark:text-green-100' :
                    'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                  <p className={`text-xs ${
                    status === 'active' ? 'text-primary-700 dark:text-primary-200' :
                    status === 'completed' ? 'text-green-700 dark:text-green-200' :
                    'text-gray-400 dark:text-gray-500'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </nav>
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> You can click on completed steps to go back and edit them.
        </p>
      </div>
    </div>
  )
} 