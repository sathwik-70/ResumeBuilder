import { ResumeData } from '../types'

const STORAGE_KEY = 'resumeData'

export const saveResumeData = (data: ResumeData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving resume data:', error)
  }
}

export const loadResumeData = (): ResumeData | null => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      return JSON.parse(savedData)
    }
    return null
  } catch (error) {
    console.error('Error loading resume data:', error)
    return null
  }
}

export const clearResumeData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing resume data:', error)
  }
}

export const exportResumeData = (): void => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'resume-data.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  } catch (error) {
    console.error('Error exporting resume data:', error)
  }
}

export const importResumeData = (file: File): Promise<ResumeData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        resolve(data)
      } catch (error) {
        reject(new Error('Invalid resume data file'))
      }
    }
    reader.onerror = () => reject(new Error('Error reading file'))
    reader.readAsText(file)
  })
} 