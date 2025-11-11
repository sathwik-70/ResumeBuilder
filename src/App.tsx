import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ResumeBuilder from './components/ResumeBuilder'
import HomePage from './components/HomePage'
import Header from './components/Header'
import { ResumeDataProvider } from './context/ResumeContext'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <ResumeDataProvider>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<ResumeBuilder />} />
          </Routes>
        </ResumeDataProvider>
      </div>
    </div>
  )
}

export default App 