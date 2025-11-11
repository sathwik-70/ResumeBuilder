import { ResumeData } from '../../types'
import ModernTemplate from './ModernTemplate'

interface TraditionalTemplateProps {
  data: ResumeData
}

export default function TraditionalTemplate({ data }: TraditionalTemplateProps) {
  // For now, use the modern template as a base
  // This can be customized later with a more traditional design
  return <ModernTemplate data={data} />
} 