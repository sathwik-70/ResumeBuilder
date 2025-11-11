import { ResumeData } from '../../types'
import ModernTemplate from './ModernTemplate'

interface MinimalistTemplateProps {
  data: ResumeData
}

export default function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  // For now, use the modern template as a base
  // This can be customized later with a more minimalist design
  return <ModernTemplate data={data} />
} 