import { useResume } from '../../context/ResumeContext'
import { Certification } from '../../types'
import { Plus, Trash2 } from 'lucide-react'

export default function CertificationsStep() {
  const { state, updateResumeData } = useResume()

  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: ''
    }
    updateResumeData({ certifications: [...state.data.certifications, newCertification] })
  }

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    const updatedCertifications = state.data.certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    )
    updateResumeData({ certifications: updatedCertifications })
  }

  const removeCertification = (id: string) => {
    const filteredCertifications = state.data.certifications.filter(cert => cert.id !== id)
    updateResumeData({ certifications: filteredCertifications })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Certifications
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Add your professional certifications, licenses, and credentials that are relevant to your career.
        </p>
      </div>

      <div className="space-y-6">
        {state.data.certifications.map((certification) => (
          <div key={certification.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {certification.name || 'New Certification'}
              </h3>
              <button
                onClick={() => removeCertification(certification.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Certification Name *</label>
                <input
                  type="text"
                  value={certification.name}
                  onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                  className="form-input"
                  placeholder="e.g., AWS Certified Solutions Architect"
                />
              </div>

              <div>
                <label className="form-label">Issuing Organization *</label>
                <input
                  type="text"
                  value={certification.issuer}
                  onChange={(e) => updateCertification(certification.id, 'issuer', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Amazon Web Services"
                />
              </div>

              <div>
                <label className="form-label">Date Earned</label>
                <input
                  type="month"
                  value={certification.date}
                  onChange={(e) => updateCertification(certification.id, 'date', e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Expiry Date</label>
                <input
                  type="month"
                  value={certification.expiryDate}
                  onChange={(e) => updateCertification(certification.id, 'expiryDate', e.target.value)}
                  className="form-input"
                  placeholder="Leave empty if no expiry"
                />
              </div>

              <div className="md:col-span-2">
                <label className="form-label">Credential ID</label>
                <input
                  type="text"
                  value={certification.credentialId}
                  onChange={(e) => updateCertification(certification.id, 'credentialId', e.target.value)}
                  className="form-input"
                  placeholder="e.g., AWS-123456789"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addCertification}
          className="flex items-center space-x-2 btn-secondary w-full"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Tips */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Certification Tips
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Include only relevant certifications for your target role</li>
          <li>• List the most recent and prestigious certifications first</li>
          <li>• Include credential IDs when available for verification</li>
          <li>• Remove expired certifications unless they're still relevant</li>
        </ul>
      </div>
    </div>
  )
} 