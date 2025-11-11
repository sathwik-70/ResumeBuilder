import { useResume } from '../context/ResumeContext'
import { ResumeTemplate } from './templates/ResumeTemplate'

export default function ResumePreview() {
  const { state } = useResume()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Live Preview
        </h4>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          A4 Size
        </div>
      </div>
      
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white">
        <div id="resume-preview" className="resume-page transform scale-[0.4] origin-top-left">
          <ResumeTemplate data={state.data} />
        </div>
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        <p>This is how your resume will look when downloaded</p>
        <p className="mt-1">Scroll to see more content</p>
      </div>
    </div>
  )
} 