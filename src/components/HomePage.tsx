import { Link } from 'react-router-dom'
import { CheckCircle, FileText, Palette, Download, Eye, Zap } from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Professional Templates',
      description: 'Choose from a variety of ATS-friendly templates designed for different industries and job types.'
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Customizable Design',
      description: 'Personalize colors, fonts, and layouts to match your personal brand and preferences.'
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'Real-time Preview',
      description: 'See your changes instantly with our live preview feature as you build your resume.'
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: 'PDF Export',
      description: 'Download your resume as a professional PDF file ready for job applications.'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'ATS Optimized',
      description: 'Our templates are designed to pass through Applicant Tracking Systems effectively.'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Auto-save',
      description: 'Your progress is automatically saved, so you never lose your work.'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Create Professional
              <span className="text-primary-600"> Resumes</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Build ATS-friendly resumes that stand out to employers. Choose from professional templates, 
              customize your content, and download as PDF in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/builder"
                className="btn-primary text-lg px-8 py-3"
              >
                Start Building
              </Link>
              <button className="btn-secondary text-lg px-8 py-3">
                View Templates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Create the Perfect Resume
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Professional tools and templates to help you land your dream job
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of job seekers who have successfully landed their dream jobs with our resume builder.
          </p>
          <Link
            to="/builder"
            className="bg-white text-primary-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  )
} 