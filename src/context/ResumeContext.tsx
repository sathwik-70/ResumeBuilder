import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { ResumeData, StepType } from '../types'

type ResumeAction =
  | { type: 'UPDATE_DATA'; payload: Partial<ResumeData> }
  | { type: 'SET_STEP'; payload: StepType }
  | { type: 'COMPLETE_STEP'; payload: StepType }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'RESET' }

interface ResumeState {
  data: ResumeData
  currentStep: StepType
  completedSteps: StepType[]
  isEditing: boolean
}

const initialState: ResumeState = {
  data: {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      linkedin: '',
      website: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: [],
    certifications: [],
    projects: [],
    languages: [],
    achievements: [],
    interests: [],
    template: 'professional-business',
    layout: 'single'
  },
  currentStep: 'personal',
  completedSteps: [],
  isEditing: false
}

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'UPDATE_DATA':
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      }
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload
      }
    case 'COMPLETE_STEP':
      return {
        ...state,
        completedSteps: [...new Set([...state.completedSteps, action.payload])]
      }
    case 'SET_EDITING':
      return {
        ...state,
        isEditing: action.payload
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

interface ResumeContextType {
  state: ResumeState
  dispatch: React.Dispatch<ResumeAction>
  updateResumeData: (data: Partial<ResumeData>) => void
  goToStep: (step: StepType) => void
  completeStep: (step: StepType) => void
  resetResume: () => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeDataProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        dispatch({ type: 'UPDATE_DATA', payload: parsedData })
      } catch (error) {
        console.error('Error loading resume data:', error)
      }
    }
  }, [])

  // Debounced save to localStorage
  const debouncedSave = useCallback(
    (() => {
      let timeoutId: number
      return (data: ResumeData) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          try {
            localStorage.setItem('resumeData', JSON.stringify(data))
          } catch (error) {
            console.error('Error saving resume data:', error)
          }
        }, 300) // 300ms delay
      }
    })(),
    []
  )

  // Save data to localStorage whenever it changes
  useEffect(() => {
    debouncedSave(state.data)
  }, [state.data, debouncedSave])

  const updateResumeData = (data: Partial<ResumeData>) => {
    try {
      dispatch({ type: 'UPDATE_DATA', payload: data })
    } catch (error) {
      console.error('Error updating resume data:', error)
    }
  }

  const goToStep = (step: StepType) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }

  const completeStep = (step: StepType) => {
    dispatch({ type: 'COMPLETE_STEP', payload: step })
  }

  const resetResume = () => {
    dispatch({ type: 'RESET' })
  }

  const value: ResumeContextType = {
    state,
    dispatch,
    updateResumeData,
    goToStep,
    completeStep,
    resetResume
  }

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeDataProvider')
  }
  return context
} 