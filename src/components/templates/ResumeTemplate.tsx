import { ResumeData } from '../../types'
import ModernTemplate from './ModernTemplate'
import TraditionalTemplate from './TraditionalTemplate'
import MinimalistTemplate from './MinimalistTemplate'
import ProfessionalTemplate from './ProfessionalTemplate'
import ExecutiveTemplate from './ExecutiveTemplate'
import CompactTemplate from './CompactTemplate'
import TwoColumnTemplate from './TwoColumnTemplate'

interface ResumeTemplateProps {
  data: ResumeData
}

export function ResumeTemplate({ data }: ResumeTemplateProps) {
  const getTemplateComponent = () => {
    switch (data.template) {
      case 'modern-tech':
      case 'modern-creative':
        return <ModernTemplate data={data} />
      case 'traditional-business':
      case 'traditional-academic':
        return <TraditionalTemplate data={data} />
      case 'minimalist-clean':
      case 'minimalist-elegant':
        return <MinimalistTemplate data={data} />
      case 'professional-business':
      case 'professional-corporate':
        return <ProfessionalTemplate data={data} />
      case 'executive-senior':
      case 'executive-c-level':
        return <ExecutiveTemplate data={data} />
      case 'compact-efficient':
      case 'compact-experienced':
        return <CompactTemplate data={data} />
      case 'two-column-modern':
      case 'two-column-balanced':
        return <TwoColumnTemplate data={data} />
      default:
        return <ModernTemplate data={data} />
    }
  }

  return (
    <div className="resume-container">
      {getTemplateComponent()}
    </div>
  )
} 