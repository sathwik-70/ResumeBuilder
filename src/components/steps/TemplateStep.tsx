import { useResume } from '../../context/ResumeContext'

const templates = [
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    category: 'tech',
    style: 'modern',
    description: 'Clean and professional design perfect for tech roles',
    preview: 'Modern layout with accent colors'
  },
  {
    id: 'modern-creative',
    name: 'Modern Creative',
    category: 'creative',
    style: 'modern',
    description: 'Bold and creative design for artistic positions',
    preview: 'Creative layout with vibrant colors'
  },
  {
    id: 'professional-business',
    name: 'Professional Business',
    category: 'business',
    style: 'professional',
    description: 'Classic professional format for corporate environments',
    preview: 'Professional business layout'
  },
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    category: 'business',
    style: 'professional',
    description: 'Corporate-friendly design with traditional structure',
    preview: 'Corporate layout with clean lines'
  },
  {
    id: 'executive-senior',
    name: 'Executive Senior',
    category: 'executive',
    style: 'executive',
    description: 'Sophisticated design for senior management positions',
    preview: 'Executive layout with serif typography'
  },
  {
    id: 'executive-c-level',
    name: 'Executive C-Level',
    category: 'executive',
    style: 'executive',
    description: 'Premium design for C-suite and board-level positions',
    preview: 'C-level layout with elegant styling'
  },
  {
    id: 'compact-efficient',
    name: 'Compact Efficient',
    category: 'experienced',
    style: 'compact',
    description: 'Space-efficient design for experienced professionals',
    preview: 'Compact layout with dense information'
  },
  {
    id: 'compact-experienced',
    name: 'Compact Experienced',
    category: 'experienced',
    style: 'compact',
    description: 'Condensed format for professionals with extensive experience',
    preview: 'Experienced layout with tight spacing'
  },
  {
    id: 'two-column-modern',
    name: 'Two-Column Modern',
    category: 'modern',
    style: 'two-column',
    description: 'Modern two-column layout for better space utilization',
    preview: 'Two-column modern layout'
  },
  {
    id: 'two-column-balanced',
    name: 'Two-Column Balanced',
    category: 'modern',
    style: 'two-column',
    description: 'Balanced two-column design with sidebar organization',
    preview: 'Two-column balanced layout'
  },
  {
    id: 'traditional-business',
    name: 'Traditional Business',
    category: 'management',
    style: 'traditional',
    description: 'Classic business format for corporate roles',
    preview: 'Traditional business layout'
  },
  {
    id: 'traditional-academic',
    name: 'Traditional Academic',
    category: 'traditional',
    style: 'traditional',
    description: 'Academic format for research and education roles',
    preview: 'Academic layout with citations'
  },
  {
    id: 'minimalist-clean',
    name: 'Minimalist Clean',
    category: 'tech',
    style: 'minimalist',
    description: 'Ultra-clean design focusing on content',
    preview: 'Minimalist layout with clean typography'
  },
  {
    id: 'minimalist-elegant',
    name: 'Minimalist Elegant',
    category: 'creative',
    style: 'minimalist',
    description: 'Elegant minimalist design for sophisticated roles',
    preview: 'Elegant minimalist layout'
  }
]

export default function TemplateStep() {
  const { state, updateResumeData } = useResume()

  const handleTemplateSelect = (templateId: string) => {
    updateResumeData({ template: templateId })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Template
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select a professional template that matches your industry and personal style.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleTemplateSelect(template.id)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              state.data.template === template.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
            }`}
          >
            <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded mb-3 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {template.preview}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              {template.name}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {template.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {template.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {template.style}
              </span>
            </div>
          </div>
        ))}
      </div>

                    <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                  Template Tips
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• <strong>Professional:</strong> Perfect for corporate environments and traditional industries</li>
                  <li>• <strong>Executive:</strong> Ideal for senior management and C-level positions</li>
                  <li>• <strong>Compact:</strong> Great for experienced professionals with extensive backgrounds</li>
                  <li>• <strong>Two-Column:</strong> Excellent for better space utilization and modern appearance</li>
                  <li>• <strong>Modern:</strong> Works well for tech and creative industries</li>
                  <li>• <strong>Traditional:</strong> Ideal for business and academic roles</li>
                  <li>• <strong>Minimalist:</strong> Focuses attention on your content</li>
                  <li>• All templates are ATS-friendly and print-ready</li>
                </ul>
              </div>
    </div>
  )
} 