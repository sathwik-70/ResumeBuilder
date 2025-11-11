import { Link } from 'react-router-dom'
import { Moon, Sun, FileText } from 'lucide-react'

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Resume Builder
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <Link
              to="/builder"
              className="btn-primary"
            >
              Create Resume
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 